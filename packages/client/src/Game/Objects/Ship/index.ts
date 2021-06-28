import Geometries from 'assets/geometry';
import Bullet from 'Bullet';
import Collision from 'Collision';
import Controller, {Keycodes} from 'Controller';
import {Bodies, Body} from 'matter-js';
import PhysicsObject from 'PhysicsObject';
import World from 'World';

class Ship extends PhysicsObject {
  private static Delays: Delay = {
    Accelerate: 1000,
    Shoot: 100,
  };
  private static Speed = 7;
  private canShoot = true;
  private canAccelerate = true;
  private shootTimeoutId = -1;
  private accelerateTimeoutId = -1;

  constructor(world: World) {
    super(world, world.width / 2, world.height / 2, 0);
    this.init();
  }
  public init = (): void => {
    this.setBody(
      Bodies.fromVertices(0, 0, Geometries.ship, {
        collisionFilter: {
          category: Collision.filters.ship,
          mask: Collision.filters.asteroid,
        },
      })
    );
    this.mBody.friction = 0;
    // this.mBody.frictionAir = 0;
    this.addAction({
      pair: ['Ship', 'Asteroid'],
      callback: (a: PhysicsObject, b: PhysicsObject) =>
        console.log('reset level, reduce num lives'),
    });
  };
  public reset = (): void => {
    this.canShoot = true;
    this.canAccelerate = true;
    clearTimeout(this.shootTimeoutId);
    clearTimeout(this.accelerateTimeoutId);
    super.reset();
  };
  /**
   * Rotate the ship towards the cursor.
   * @param {number} x
   * @param {number} y
   */
  private rotateToCursor = (x: number, y: number): void => {
    const radians =
      Math.atan2(y - this.mBody.position.y, x - this.mBody.position.x) +
      Math.PI / 2;
    Body.setAngle(this.mBody, Math.round(radians * 3) / 3);
  };
  /**
   * Shoot a bullet.
   */
  private shoot = (): void => {
    const {angle, position} = this.mBody;
    this.shootTimeoutId = window.setTimeout(
      () => (this.canShoot = true),
      Ship.Delays.Shoot
    );
    this.canShoot = false;
    new Bullet(
      this.world,
      position.x + Math.sin(angle) * this.width,
      position.y - Math.cos(angle) * this.height,
      angle,
      {x: Math.sin(angle), y: -Math.cos(angle)}
    );
  };
  /**
   * Accelerate the ship.
   */
  private accelerate = (): void => {
    const {angle} = this.mBody;
    Body.setVelocity(this.mBody, {
      x: Math.sin(angle) * Ship.Speed,
      y: -Math.cos(angle) * Ship.Speed,
    });
    this.canAccelerate = false;
    window.clearTimeout(this.accelerateTimeoutId);
    this.accelerateTimeoutId = -1;
  };
  public update = (): void => {
    super.update();
    if (Controller.down(Keycodes.Space) && this.canShoot) this.shoot();
    if (Controller.down(Keycodes.W) && this.canAccelerate) this.accelerate();
    else if (!Controller.down(Keycodes.W) && this.accelerateTimeoutId < 0) {
      this.accelerateTimeoutId = window.setTimeout(
        () => (this.canAccelerate = true),
        Ship.Delays.Accelerate
      );
    }
    this.rotateToCursor(Controller.mouseX, Controller.mouseY);
  };
  public postUpdate = (): void => {
    // if (this.mBody.speed > Ship.MAX_SPEED)
    //   Body.applyForce(this.mBody, this.mBody.position, {
    //     x: -Math.sin(this.prevAngle) * 0.005,
    //     y: Math.cos(this.prevAngle) * 0.005,
    //   });
  };
}

export default Ship;
