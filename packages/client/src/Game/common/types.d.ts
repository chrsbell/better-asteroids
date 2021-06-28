declare interface Delay {
  [key: string]: number;
}

declare interface KeyState {
  [key: string]: boolean;
}

declare interface Code {
  [key: string]: string;
}

interface Level {
  asteroidsOnScreen: number;
  maxAsteroidsSpawned: number;
}

interface LevelData {
  [key: number]: Level;
}
