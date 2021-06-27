abstract class Base {
  constructor() {}
  /**
   * Initialize the class.
   */
  public abstract init(): void;
  /**
   * Resets the class to initial state.
   */
  public abstract reset(): void;
}

export default Base;
