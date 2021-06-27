import World from 'World';

abstract class WorldObject {
  constructor(protected world: World) {}
  /**
   * Initialize the class.
   */
  public abstract init(): void;
  /**
   * Resets the class to initial state.
   */
  public abstract reset(): void;
  /**
   * Update operations before the matter-js update call.
   */
  public abstract update(): void;
  /**
   * Update operations after the matter-js update call.
   */
  public abstract postUpdate(): void;
}

export default WorldObject;
