import Base from 'Base';
import {Engine} from 'matter-js';
import PhysicsObject from 'PhysicsObject';

export type ActionCallback = (a: PhysicsObject, b: PhysicsObject) => void;

export type CollisionPair = [string, string];

export interface Action {
  pair: [string, string];
  callback: ActionCallback;
}

class CollisionMap extends Base {
  private actionMap: Map<CollisionPair, ActionCallback> = new Map();
  public static filters = {
    ship: 0b1,
    asteroid: 0b10,
  };
  constructor() {
    super();
  }
  public addAction = (action: Action): void => {
    // Need to add collisions in both directions
    this.actionMap.set(action.pair, action.callback);
  };
  /**
   * Checks list of colliding pairs and calls corresponding callbacks.
   * @param engine {Engine}
   */
  public checkCollisions = (pairs: Array<Matter.IPair>): void => {
    debugger;
    pairs.forEach(pair => {
      const collPair = <CollisionPair>[pair.bodyA.name, pair.bodyB.name];
      const action: ActionCallback | undefined = this.actionMap.get(collPair);
      if (action) {
        action(pair.bodyA.physicsObject, pair.bodyB.physicsObject);
      }
    });
  };
  public reset = () => {
    this.actionMap.clear();
  };
}

export default CollisionMap;
