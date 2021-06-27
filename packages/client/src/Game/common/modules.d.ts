import 'matter-js';
import PhysicsObject from 'PhysicsObject';

declare module 'matter-js' {
  interface Body {
    physicsObject: PhysicsObject;
  }
  interface Composite {
    physicsObject: PhysicsObject;
  }
  interface Constraint {
    physicsObject: PhysicsObject;
  }
}

declare module 'matter-types' {
  import {Body, Composite, Constraint} from 'matter-js';
  type Composeable = Composite | Body | Constraint;
}
