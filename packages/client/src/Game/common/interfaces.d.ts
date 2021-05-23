import 'matter-js';
import PhysicsObject from 'PhysicsObject';

declare module 'matter-js' {
  interface Body {
    name: string;
    physicsObject: PhysicsObject;
  }
  interface Composite {
    name: string;
    physicsObject: PhysicsObject;
  }
  interface Constraint {
    name: string;
    physicsObject: PhysicsObject;
  }
}
