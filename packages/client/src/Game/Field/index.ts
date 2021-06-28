import Asteroid from 'Asteroid';
import Ship from 'Ship';
import World from 'World';
import WorldObject from 'WorldObject';

/**
 * The game field, spawns asteroids.
 */
class Field extends WorldObject {
  private ship!: Ship;
  private asteroids: Set<Asteroid> = new Set();
  private level = 1;
  private numAsteroidsSpawned = 0;
  private levelData: LevelData = {
    1: {
      asteroidsOnScreen: 5,
      maxAsteroidsSpawned: 50,
    },
  };
  constructor(world: World) {
    super(world);
    this.init();
  }
  public init = (): void => {
    this.ship = new Ship(this.world);
  };
  public reset = (): void => {
    this.level += 1;
    if (this.level in this.levelData) {
      this.numAsteroidsSpawned = 0;
      this.ship.reset();
      this.asteroids.forEach(asteroid => asteroid.delete());
      this.asteroids.clear();
      this.ship.init();
    } else {
      console.log('YOU WON!!');
    }
  };
  public update = (): void => {
    const {asteroidsOnScreen, maxAsteroidsSpawned} = this.levelData[this.level];
    this.asteroids.forEach(asteroid => {
      if (!asteroid.mBody) this.asteroids.delete(asteroid);
    });
    while (this.asteroids.size < asteroidsOnScreen) {
      // spawn more asteroids
      this.numAsteroidsSpawned += 1;
      this.asteroids.add(new Asteroid(this.world, this.ship.mBody.position));
    }
    if (this.numAsteroidsSpawned > maxAsteroidsSpawned) {
      // level ended
      this.reset();
    }
  };
  public postUpdate = (): void => {};
}

export default Field;
