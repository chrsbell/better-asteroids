import PhysicsObject from 'PhysicsObject';
import World from 'World';
import WorldObject from 'WorldObject';

export type ActionCallback = (a: PhysicsObject, b: PhysicsObject) => void;

export type CollisionPair = string;

export interface Action {
  pair: [string, string];
  callback: ActionCallback;
}

class CollisionMap extends WorldObject {
  private actionMap: Map<CollisionPair, ActionCallback> = new Map();
  public static filters = {
    ship: 0b1,
    asteroid: 0b10,
    bullet: 0b100,
  };
  constructor(world: World) {
    super(world);
  }
  public addAction = (action: Action): void => {
    this.actionMap.set(action.pair.join('-'), action.callback);
  };
  /**
   * Checks list of colliding pairs and calls corresponding callbacks.
   * @param {Engine} engine
   */
  public checkCollisions = (pairs: Array<Matter.IPair>): void => {
    pairs.forEach(pair => {
      const collPair = <CollisionPair>(
        [pair.bodyA.label, pair.bodyB.label].join('-')
      );
      const action: ActionCallback | undefined = this.actionMap.get(collPair);
      const reverseAction: ActionCallback | undefined = this.actionMap.get(
        <CollisionPair>collPair.split('-').reverse().join('-')
      );
      // this may not be necessary tbh
      if (action) {
        action(pair.bodyA.physicsObject, pair.bodyB.physicsObject);
      } else if (reverseAction) {
        reverseAction(pair.bodyB.physicsObject, pair.bodyA.physicsObject);
      }
    });
  };
  public update = (): void => {};
  public postUpdate = (): void => {};
  public init = (): void => {};
  public reset = (): void => {
    this.actionMap.clear();
  };
}

export default CollisionMap;
