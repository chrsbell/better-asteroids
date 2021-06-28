const randomInRange = (min: number, max: number): number =>
  Math.random() * (max - min) + min;

const chance = (percentage: number, valueIfPass = true): boolean =>
  Math.random() * 100 < percentage ? valueIfPass : false;

export {randomInRange, chance};
