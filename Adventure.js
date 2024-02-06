class Adventure {
  constructor(character, enemies) {
    this.character = character;
    this.enemies = enemies;
  }

  start() {
    if (!this.character) {
      return 'Приключение не может начаться без персонажа или врагов';
    }
    if (!this.character.isAlive) {
      return true;
    }
    this.enemies.forEach((enemy) => this.character.attack(enemy));
  }

  calculateTotalDamage() {
    return this.enemies.reduce((acc, enemy) => acc + (100 - enemy.health), 0);
  }

  evaluatePerformance() {
    return {
    efficiency: this.calculateTotalDamage() / (this.enemies.length * 100),
    survival: 1 - (100 - this.character.health)
    }
  }

  
}

module.exports = Adventure;
