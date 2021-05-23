declare module 'matter-types' {
  import {Body, Composite, Constraint} from 'matter-js';
  type Composeable = Composite | Body | Constraint;
}
