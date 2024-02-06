class Calculator {
  static getAbilityBonus(character) {
    return character.abilities.reduce((acc, abil) => acc + abil.power, 0);
  }

  static calculateDamage(character, defender) {
    return Calculator.getAbilityBonus(character) + character.attackPower - defender.defensePower;
  }


  constructor() {}
}

module.exports = Calculator;
