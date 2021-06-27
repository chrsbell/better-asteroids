import World from 'World';
import WorldObject from 'WorldObject';

class Renderer extends WorldObject {
  private requestId = -1;
  private ctx!: CanvasRenderingContext2D;
  private canvas!: HTMLCanvasElement;
  private scaleX = 1;
  private scaleY = 1;
  constructor(world: World) {
    super(world);
    this.init();
  }
  public init = (): void => {
    this.canvas = <HTMLCanvasElement>document.getElementById('asteroidCanvas');
    this.canvas.width = this.world.width;
    this.canvas.height = this.world.height;
    this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d');
    this.requestId = requestAnimationFrame(this.draw);
  };
  get width(): number {
    return this.canvas.width;
  }
  get height(): number {
    return this.canvas.height;
  }
  /**
   * Resize the canvas according to the device's pixel ratio.
   * https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258
   */
  private adjustCanvasScale = (): void => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    if (this.canvas.width !== width || this.canvas.height !== height) {
      const {devicePixelRatio: ratio = 1} = window;
      this.canvas.width = width * ratio;
      this.canvas.height = height * ratio;
      this.scaleX = (this.canvas.width / this.world.width) * ratio;
      this.scaleY = (this.canvas.height / this.world.height) * ratio;
      this.ctx.scale(this.scaleX, this.scaleY);
    }
  };
  public reset = (): void => {
    cancelAnimationFrame(this.requestId);
  };
  /**
   * Draw all of the world's bodies in wireframe.
   */
  public draw = (): void => {
    const {canvas, ctx} = this;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const physicsObjects = this.world.getPhysicsObjects();
    physicsObjects.forEach(obj => {
      const {vertices} = obj.mBody;
      ctx.beginPath();
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
