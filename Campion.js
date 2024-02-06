const Character = require('./Character');

class Campion extends Character {
  constructor(
    name,
    role,
    abilities,
    isAlive,
    attackPower,
    defensePower,
    level,
    experiencePoints
  ) {
    super(
      name,
      role,
      abilities,
      isAlive,
      attackPower,
      defensePower,
      level,
      experiencePoints
    );
  }

  useForceChoke(target) {
    if (target === this) {
      return false;
    }

    const demageForceChoke = this.abilities.find(
      (elem) => elem.name === 'Force Choke'
    );
    target.health -=
      demageForceChoke.power + this.attackPower - target.defensePower;
  }
}

module.exports = Campion;
