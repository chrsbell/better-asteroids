import Base from 'Base';
import CollisionMap from 'Collision';
import Field from 'Field';
import {Composite, Engine, Events, IEngineDefinition} from 'matter-js';
import PhysicsObject from 'PhysicsObject';
import Renderer from 'Renderer';

/**
 * Main game world.
 */
class World extends Base {
  private engine!: Engine;
  private requestId = -1;
  private renderer!: Renderer;
  private collisionActions!: CollisionMap;
  private field!: Field;
  public width = window.innerWidth;
  public height = window.innerHeight;
  constructor() {
    super();
    this.collisionActions = new CollisionMap(this);
    this.engine = Engine.create(<IEngineDefinition>{
      gravity: {
        x: 0,
        y: 0,
      },
    });
    this.renderer = new Renderer(this);
    this.field = new Field(this);
    this.requestId = window.requestAnimationFrame(this.main);
    Events.on(
      this.engine,
      'collisionStart',
      (event: Matter.IEventCollision<Engine>) => {
        this.collisionActions.checkCollisions(event.pairs);
      }
    );
  }
  public init = (): void => {};
  /**
   * Gets all composites in the world.
   * @returns {World}
   */
  public getComposite = (): Matter.World => this.engine.world;
  /**
   * Gets all of the world's bodies.
   * @returns {[PhysicsObject]}
   */
  public getPhysicsObjects = (): PhysicsObject[] =>
    Composite.allBodies(this.getComposite()).map(body => body.physicsObject);
  /**
   * Gets the collision map.
   * @returns {CollisionMap}
   */
  public getCollisionMap = (): CollisionMap => this.collisionActions;
  /**
   * Main update loop.
   */
  public main = (): void => {
    const objects: PhysicsObject[] = this.getPhysicsObjects();
    objects.forEach(obj => obj.update());
    this.field.update();
    Engine.update(this.engine);
    objects.forEach(obj => obj.postUpdate());
    // how many times to run this per second?
    this.requestId = window.requestAnimationFrame(this.main);
  };
  public reset = (): void => {
    window.cancelAnimationFrame(this.requestId);
    Engine.clear(this.engine);
    this.renderer.reset();
    this.collisionActions.reset();
    this.field.reset();
  };
}

export default World;
