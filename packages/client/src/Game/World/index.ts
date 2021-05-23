import Base from 'Base';
import CollisionMap from 'Collision';
import Field from 'Field';
import {Body, Composite, Engine, Events, IEngineDefinition} from 'matter-js';
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
  constructor() {
    super();
    this.collisionActions = new CollisionMap();
    this.engine = Engine.create(<IEngineDefinition>{
      gravity: {
        scale: 0.001,
        x: 0,
        y: 0.3,
      },
    });
    this.renderer = new Renderer(this.engine, this);
    this.renderer.start();
    this.requestId = window.requestAnimationFrame(this.main);
    Events.on(
      this.engine,
      'collisionStart',
      (event: Matter.IEventCollision<Engine>) => {
        this.collisionActions.checkCollisions(event.pairs);
      }
    );
  }
  /**
   * Gets all composites in the world.
   * @returns {World}
   */
  public getComposite = (): Matter.World => this.engine.world;
  /**
   * Gets all of the world's bodies.
   * @returns {[Body]}
   */
  public getPhysicsObjects = (): Body[] =>
    Composite.allBodies(this.getComposite());
  /**
   * Gets the collision map.
   * @returns {CollisionMap}
   */
  public getCollisionMap = (): CollisionMap => this.collisionActions;
  /**
   * Main update loop.
   */
  main = (): void => {
    Engine.update(this.engine);
    this.requestId = window.requestAnimationFrame(this.main);
  };
  reset = (): void => {
    window.cancelAnimationFrame(this.requestId);
    Engine.clear(this.engine);
    this.renderer.reset();
  };
}

export default World;
