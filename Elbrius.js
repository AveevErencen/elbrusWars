const Character = require('./Character');

class Elbrius extends Character {
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

  useForceHeal() {
    if (this.health >= 95) {
      this.health = 100;
    } else {
     this.health += this.level * 5;
  }
}
}

module.exports = Elbrius;
