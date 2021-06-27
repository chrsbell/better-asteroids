import PhysicsObject from 'PhysicsObject';
import World from 'World';

class Asteroid extends PhysicsObject {
  constructor(world: World) {
    super(world, 0, 0, 0);
  }
  public init = (): void => {
    // Generate a random convex hull (rectangle to square shape)
  };
  public reset = (): void => {
    super.reset();
  };
  private generateHullShape = () => {};
}

export default Asteroid;
