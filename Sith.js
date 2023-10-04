const Character = require('./Character');
class Sith extends Character {
  constructor(name) {
    super(name, 'Sith');
  }

  useDarkSide() {
    return `${this.name} использует темную сторону Силы.`;
  }

  seekKnowledge() {
    return (
      this.gainExperience(70) +
      ' ' +
      `${this.name} ищет знание в древних текстах, увеличивая свой опыт.`
    );
  }
}

module.exports = Sith;
