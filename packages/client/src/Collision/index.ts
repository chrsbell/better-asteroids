import Base from 'Base';
import {Engine} from 'matter-js';

type Action = (a: number, b: number) => void;

class CollisionMap extends Base {
  private actionMap: Map<[string, string], Action> = new Map();
  public static filters = {
    ship: 0b1,
    asteroid: 0b10,
  };
  constructor() {
    super();
    this.actionMap.set(['a', 'b'], (a, b) => console.log(`${a}${b}collision`));
  }
  /**
   * Checks list of colliding pairs and calls corresponding callbacks.
   * @param engine {Engine}
   */
  checkCollisions = (engine: Engine): void => {
    this.actionMap.forEach((action, collisionPair) => {
      console.log(collisionPair);
    });
  };
  reset = () => {
    this.actionMap.clear();
  };
}

export default CollisionMap;
