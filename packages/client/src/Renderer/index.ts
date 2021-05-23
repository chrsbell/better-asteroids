import Base from 'Base';
import {Engine} from 'matter-js';
import World from 'World';

class Renderer extends Base {
  private requestId = -1;
  private world: World;
  private ctx!: CanvasRenderingContext2D;
  private canvas!: HTMLCanvasElement;
  constructor(engine: Engine, world: World) {
    super();
    this.world = world;
    this.canvas = <HTMLCanvasElement>document.getElementById('asteroidCanvas');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    console.log(this.canvas.width, this.canvas.height);
    this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d');
    window.onresize = <typeof window.onresize>(<unknown>this.resizeDPR());
    this.resizeDPR();
  }
  /**
   * Resize the canvas according to the device's pixel ratio.
   * https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258
   */
  private resizeDPR = (): void => {
    const {canvas, ctx} = this;
    const {width, height} = canvas.getBoundingClientRect();

    if (canvas.width !== width || canvas.height !== height) {
      const {devicePixelRatio: ratio = 1} = window;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      ctx.scale(ratio, ratio);
    }
  };
  /**
   * Starts the renderer.
   */
  public start = (): void => {
    this.requestId = requestAnimationFrame(this.draw);
  };
  public reset = (): void => {
    cancelAnimationFrame(this.requestId);
  };
  /**
   * Draw all of the world's bodies in wireframe.
   */
  public draw = (): void => {
    const {canvas, ctx} = this;
    ctx.setTransform();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const bodies = this.world.getPhysicsObjects();
    bodies.forEach(body => {
      ctx.setTransform();
      ctx.beginPath();
      const {vertices} = body;
      ctx.moveTo(vertices[0].x, vertices[0].y);
      for (let i = 1; i < vertices.length; i++) {
        ctx.lineTo(vertices[i].x, vertices[i].y);
      }
      ctx.closePath();
      ctx.stroke();
    });
    this.requestId = requestAnimationFrame(this.draw);
  };
}

export default Renderer;
