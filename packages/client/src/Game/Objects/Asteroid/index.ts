import Collision from 'Collision';
import {chance, randomInRange} from 'helpers';
import {Bodies, Body, Vector} from 'matter-js';
import PhysicsObject from 'PhysicsObject';
import World from 'World';

class Asteroid extends PhysicsObject {
  private static NUM_VERTICES = 15;
  private static EDGE_DISTANCE = 50;
  private static MAX_SIZE = 100;
  private static MAX_INITIAL_ROTATION = Math.PI / 12;
  private static MIN_INITIAL_SPEED = 0.5;
  private static MAX_INITIAL_SPEED = 0.5;
  private playerPos!: Vector;
  constructor(world: World, playerPos: Vector) {
    super(world, 0, 0, 0);
    this.playerPos = playerPos;
    this.init();
  }
  private randomPositionOffScreen = (
    length: number,
    staticSide: boolean
  ): number =>
    !staticSide
      ? randomInRange(-Asteroid.EDGE_DISTANCE, length + Asteroid.EDGE_DISTANCE)
      : chance(50)
      ? -Asteroid.EDGE_DISTANCE
      : length + Asteroid.EDGE_DISTANCE;

  public init = (): void => {
    this.generateHullShape();
    const {x, y} = this.mBody.position;
    const angle = Math.atan2(this.playerPos.x - x, this.playerPos.y - y);
    Body.setVelocity(this.mBody, {
      x:
        Math.sin(angle) *
        randomInRange(Asteroid.MIN_INITIAL_SPEED, Asteroid.MAX_INITIAL_SPEED),
      y:
        Math.cos(angle) *
        randomInRange(Asteroid.MIN_INITIAL_SPEED, Asteroid.MAX_INITIAL_SPEED),
    });
    this.mBody.torque =
      (chance(50) ? 1 : -1) * (Math.random() * Asteroid.MAX_INITIAL_ROTATION);
    this.mBody.friction = 0;
    this.mBody.frictionAir = 0;
  };
  public reset = (): void => {
    super.reset();
  };
  private generateHullShape = (): void => {
    // make sure not to set on top of another newly spawned asteroid
    const vertices: Vector[] = [];
    const whichSide = chance(50);
    const x = this.randomPositionOffScreen(this.world.width, whichSide);
    const y = this.randomPositionOffScreen(this.world.height, !whichSide);
    const xSize = randomInRange(Asteroid.MAX_SIZE / 2, Asteroid.MAX_SIZE);
    const ySize = randomInRange(Asteroid.MAX_SIZE / 2, Asteroid.MAX_SIZE);
    for (let i = 0; i < Asteroid.NUM_VERTICES; i++) {
      vertices.push({
        x: randomInRange(0, xSize),
        y: randomInRange(0, ySize),
      });
    }
    this.setBody(
      Bodies.fromVertices(x, y, [vertices], {
        collisionFilter: {
          category: Collision.filters.asteroid,
          mask:
            Collision.filters.asteroid |
            Collision.filters.bullet |
            Collision.filters.ship,
        },
      })
    );
    Body.setPosition(this.mBody, {x: x, y: y});
  };
}

export default Asteroid;
