import Base from 'Base';
import Ship from 'Ship';
import World from 'World';

/**
 * The game field, spawns enemies.
 */
class Field extends Base {
  private width = 0;
  private height = 0;
  private ship!: Ship;
  constructor(world: World, width: number, height: number) {
    super();
    this.ship = new Ship(world);
    this.width = width;
    this.height = height;
  }
  public reset = () => {
    this.width = 0;
    this.height = 0;
  };
}

export default Field;
