import {Vector} from 'matter-js';

interface VertexSet {
  [key: string]: Array<Array<Vector>>;
}

const Geometries: VertexSet = {
  ship: [
    [
      {x: 0, y: 48},
      {x: 18, y: 0},
      {x: 32, y: 48},
      {x: 18, y: 42},
    ],
  ],
};

export default Geometries;
