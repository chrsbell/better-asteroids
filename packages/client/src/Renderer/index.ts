import Base from 'Base';
import {Engine, Render} from 'matter-js';

class Renderer extends Base {
  private renderer: Render = null!;
  constructor(engine: Engine) {
    super();
    this.renderer = Render.create({
      element: document.body,
      engine,
    });
  }
  /**
   * Starts the renderer.
   */
  public start = () => {
    Render.run(this.renderer);
  };
  public reset = () => {
    Render.stop(this.renderer);
  };
}

export default Renderer;
