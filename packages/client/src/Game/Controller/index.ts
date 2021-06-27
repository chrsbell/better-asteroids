import Base from 'Base';

const Keycodes: Code = {Space: 'Space', W: 'KeyW'};

class Controller extends Base {
  private keystate: KeyState = {};
  private _mouseX = 0;
  get mouseX(): number {
    return this._mouseX;
  }
  set mouseX(value) {
    this._mouseX = value;
  }
  private _mouseY = 0;
  get mouseY(): number {
    return this._mouseY;
  }
  set mouseY(value) {
    this._mouseY = value;
  }
  constructor() {
    super();
    this.init();
  }
  public init = (): void => {
    Object.values(Keycodes).forEach(code => (this.keystate[code] = false));
    window.addEventListener('keydown', this.setKey);
    window.addEventListener('keyup', this.resetKey);
    window.addEventListener('mousemove', this.setMousePosition);
  };
  public reset = (): void => {
    Object.values(Keycodes).forEach(code => delete this.keystate[code]);
    window.removeEventListener('keydown', this.setKey);
    window.removeEventListener('keyup', this.resetKey);
    window.removeEventListener('mousemove', this.setMousePosition);
  };
  private setMousePosition = (e: MouseEvent): void => {
    this._mouseX = e.x;
    this._mouseY = e.y;
  };
  private setKey = (e: KeyboardEvent): void => {
    this.keystate[e.code] = true;
  };
  private resetKey = (e: KeyboardEvent): void => {
    this.keystate[e.code] = false;
  };
  public down = (code: string): boolean => this.keystate[code] ?? false;
}

export default new Controller();
export {Keycodes};
