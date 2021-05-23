import {Composite} from 'matter-js';
import {Composeable} from 'matter-types';
import World from 'World';

class PhysicsObject {
  protected body!: Composeable;
  constructor(world: World, body: Composeable) {
    this.body = body;
    Composite.add(world.getComposite(), this.body);
  }
}

export default PhysicsObject;
