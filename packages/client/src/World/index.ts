import Base from 'Base';
import CollisionMap from 'Collision';
import {Engine} from 'matter-js';
import Renderer from 'Renderer';

class World extends Base {
  private engine: Engine = null!;
  private requestId = -1;
  private renderer: Renderer = null!;
  private collisionActions: CollisionMap = null!;
  constructor() {
    super();
    this.collisionActions = new CollisionMap();
    this.engine = Engine.create();
    this.renderer = new Renderer(this.engine);
    this.renderer.start();
    this.requestId = window.requestAnimationFrame(this.main);
  }
  /**
   * Gets all composites in the world.
   * @returns {World}
   */
  getComposites = (): Matter.World => this.engine.world;
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
