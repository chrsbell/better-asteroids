import {Bodies, Composite} from 'matter-js';
import {Composeable} from 'matter-types';
import World from 'World';

const world = new World();
const boxA: Composeable = Bodies.rectangle(400, 200, 80, 80);
const boxB: Composeable = Bodies.rectangle(450, 50, 80, 80);
const ground: Composeable = Bodies.rectangle(400, 610, 810, 60, {
  isStatic: true,
});

Composite.add(world.getComposites(), boxA);
Composite.add(world.getComposites(), boxB);
Composite.add(world.getComposites(), ground);
