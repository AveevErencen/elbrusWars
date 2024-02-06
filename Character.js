class Character {
  #health;

  constructor(
    name,
    role,
    abilities,
    health,
    isAlive = true,
    attackPower = 15,
    defensePower = 5,
    level = 1,
    experiencePoints = 0,
  ) {
    this.name = name;
    this.role = role;
    this.abilities = abilities;
    this.#health = health;
    this.isAlive = isAlive,
    this.attackPower = attackPower;
    this.defensePower = defensePower;
    this.level = level;
    this.experiencePoints = experiencePoints;
  }

  get health() {
    return this.#health = 100;
  }

  gainExperience(points) {
    let res = 0;
    let step = 0;
    for (let i = 0; i <= points / 100; i++) {
        res += i;
        if (res === points / 100) {
          step = i;
        }
    }
    this.level = step + 1;
    this.attackPower = (15 + step * 5)
    }

 takeDamage(damage) {
     set health(damage) {
        this.#health -= damage
    }
  }

  attack(enemy) {

  }
}

module.exports = Character;
