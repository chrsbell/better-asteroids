import geometry from 'assets/geometry';
import Collision from 'Collision';
import {Bodies} from 'matter-js';
import PhysicsObject from 'PhysicsObject';
import World from 'World';

class Ship extends PhysicsObject {
  constructor(world: World) {
    const body = Bodies.fromVertices(0, 0, geometry.ship, {
      collisionFilter: {
        mask: Collision.filters.ship | Collision.filters.asteroid,
      },
    });
    super(world, body);
  }
}

export default Ship;
