const Character = require('./Character');
class Jedi extends Character {
  constructor(name) {
    super(name, 'Jedi');
  }

  useTheForce() {
    return `${this.name} использует Силу.`;
  }

  meditate() {
    this.health += 20;
    return `${this.name} медитирует, восстанавливая здоровье до ${this.health}.`;
  }

  train() {
    return this.gainExperience(50) + ' ' + `${this.name} тренируется, улучшая свои навыки.`;
  }
}

module.exports = Jedi;
