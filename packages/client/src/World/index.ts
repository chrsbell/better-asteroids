import Base from 'Base';
import CollisionMap from 'Collision';
import {Body, Composite, Engine, IEngineDefinition} from 'matter-js';
import Renderer from 'Renderer';

class World extends Base {
  private engine!: Engine;
  private requestId = -1;
  private renderer!: Renderer;
  private collisionActions: CollisionMap = null!;
  constructor() {
    super();
    this.collisionActions = new CollisionMap();
    this.engine = Engine.create(<IEngineDefinition>{
      gravity: {
        scale: 0.001,
        x: 0,
        y: 0,
      },
    });
    this.renderer = new Renderer(this.engine, this);
    this.renderer.start();
    this.requestId = window.requestAnimationFrame(this.main);
  }
  /**
   * Gets all composites in the world.
   * @returns {World}
   */
  getComposite = (): Matter.World => this.engine.world;
  /**
   * Gets all of the world's bodies.
   * @returns {[Body]}
   */
  getPhysicsObjects = (): Body[] => Composite.allBodies(this.getComposite());
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
