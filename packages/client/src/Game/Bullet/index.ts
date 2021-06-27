import Collision from 'Collision';
import {Bodies, Body, Vector} from 'matter-js';
import PhysicsObject from 'PhysicsObject';
import World from 'World';

class Bullet extends PhysicsObject {
  private static VELOCITY = 8;
  private static RADIUS = 2;
  private initialSpeed: Vector = {x: 0, y: 0};
  constructor(
    world: World,
    x: number,
    y: number,
    direction: number,
    initialSpeed: Vector
  ) {
    super(world, x, y, direction);
    this.initialSpeed = initialSpeed;
    this.init();
  }
  public init = (): void => {
    this.setBody(
      Bodies.circle(0, 0, Bullet.RADIUS, {
        collisionFilter: {
          mask: Collision.filters.asteroid,
        },
      })
    );
    this.addAction({
      pair: ['Bullet', 'Asteroid'],
      callback: (a: PhysicsObject, b: PhysicsObject) => {
        b.delete();
      },
    });
    Body.setVelocity(this.mBody, {
      x: Math.sin(this.direction) * Bullet.VELOCITY + this.initialSpeed.x,
      y: -Math.cos(this.direction) * Bullet.VELOCITY + this.initialSpeed.y,
    });
    this.mBody.friction = 0;
    this.mBody.frictionAir = 0;
  };
  public update = (): void => {
    const {position} = this.mBody;
    // remove bullet if outside bounds
    if (
      position.x + this.width > this.world.width ||
      position.x - this.width < 0 ||
      position.y + this.height > this.world.height ||
      position.y - this.height < 0
    )
      this.reset();
  };
  reset(): void {
    super.reset();
  }
}

export default Bullet;
