const Calculator = require("./Calculator");

class Character {
  #health = 100;

  constructor(
    name,
    role,
    abilities = [],
    isAlive = true,
    attackPower = 15,
    defensePower = 5,
    level = 1,
    experiencePoints = 0
  ) {
    this.name = name;
    this.role = role;
    this.abilities = abilities;
    this.#health = 100;
    (this.isAlive = isAlive), (this.attackPower = attackPower);
    this.defensePower = defensePower;
    this.level = level;
    this.experiencePoints = experiencePoints;
  }

  get health() {
    return this.#health;
  }

  set health(health) {
    if (health < 0) {
      this.#health = 0;
    } else {this.#health = health}
  }

  gainExperience(points) {
    this.experiencePoints += points;
    let levelUp = true;
    while (levelUp) {
      if (this.experiencePoints >= this.level * 100) {
        this.experiencePoints -= this.level * 100;
        this.level += 1;
        this.attackPower += 5;
      }
      if (this.experiencePoints < this.level * 100) {
        levelUp = false;
      }
    }
  }

  takeDamage(damage) {
    this.#health -= damage;
  }

  attack(enemy) {
    enemy.takeDamage(Calculator.calculateDamage(this, enemy));
    return enemy.health;
  }
}

module.exports = Character;
