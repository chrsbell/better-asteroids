import {Action} from 'Collision';
import {Body, Composite} from 'matter-js';
import World from 'World';
import WorldObject from 'WorldObject';

/**
 * A matter.js body.
 */
class PhysicsObject extends WorldObject {
  private _mBody!: Body;
  get mBody(): Body {
    return this._mBody;
  }
  set mBody(value: Body) {
    this._mBody = value;
  }
  public actions: Action[] = [];
  protected width = 0;
  protected height = 0;
  constructor(
    world: World,
    private initialX: number,
    private initialY: number,
    protected direction: number
  ) {
    super(world);
  }
  init(): void {}
  reset(): void {
    this.delete();
    this.actions = [];
  }
  /**
   * Set the matter.js body.
   * @param {Body} mBody
   */
  protected setBody = (mBody: Body): void => {
    this.mBody = mBody;
    this.mBody.label = this.constructor.name;
    this.mBody.physicsObject = this;
    this.width = this.mBody.bounds.max.x - this.mBody.bounds.min.x;
    this.height = this.mBody.bounds.max.y - this.mBody.bounds.min.y;
    Composite.add(this.world.getComposite(), this.mBody);
    Body.setPosition(this.mBody, {x: this.initialX, y: this.initialY});
    Body.setAngle(this.mBody, this.direction);
  };
  /**
   * Gets all of the object's collision actions.
   * @returns {[Action]}
   */
  protected getActions = (): Action[] => this.actions;
  /**
   * Add an object action to the map of collision actions.
   * @param {Action} action
   */
  protected addAction = (action: Action): void => {
    this.actions.push(action);
    this.world.getCollisionMap().addAction(action);
  };
  /**
   * Removes the matter-js body from the world.
   */
  public delete = (): void => {
    Composite.remove(this.world.getComposite(), this.mBody);
    this.mBody = null!;
  };
  public postUpdate = (): void => {};
  update(): void {
    const {position} = this.mBody;
    let newX = position.x;
    let newY = position.y;
    if (position.x < -this.width) {
      newX = this.world.width;
    } else if (position.x > this.world.width) {
      newX = -this.width;
    }
    if (position.y < -this.height) {
      newY = this.world.height;
    } else if (position.y > this.world.height) {
      newY = -this.height;
    }
    Body.setPosition(this.mBody, {
      x: newX,
      y: newY,
    });
  }
}

export default PhysicsObject;
