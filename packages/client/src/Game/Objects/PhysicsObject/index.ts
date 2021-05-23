import Base from 'Base';
import {Action} from 'Collision';
import {Composite} from 'matter-js';
import {Composeable} from 'matter-types';
import World from 'World';

/**
 * A matter.js body.
 */
class PhysicsObject extends Base {
  protected mBody!: Composeable;
  public actions: Action[] = [];
  private world!: World;
  constructor(world: World, mBody: Composeable) {
    super();
    this.world = world;
    this.mBody = mBody;
    this.mBody.name = this.constructor.name;
    this.mBody.physicsObject = this;
    debugger;
    Composite.add(world.getComposite(), this.mBody);
  }
  /**
   * Gets all of the object's collision actions.
   * @returns {[Action]}
   */
  protected getActions = (): Action[] => this.actions;
  /**
   * Add an object action to the map of collision actions.
   * @param action {Action}
   */
  protected addAction = (action: Action): void => {
    this.actions.push(action);
    this.world.getCollisionMap().addAction(action);
  };
  public reset = () => {
    this.actions = [];
    this.world = null!;
    this.mBody = null!;
    Composite.remove(this.world.getComposite(), this.mBody);
  };
}

export default PhysicsObject;
