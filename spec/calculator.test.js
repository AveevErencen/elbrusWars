const Calculator = require('../Calculator');
const Ability = require('../Ability');
const Elbrius = require('../Elbrius');
const Campion = require('../Campion');

describe('Класс `Calculator`', () => {
  let elbrius;
  let campion;
  let campion2;
  let campion3;
  let campion4;

  beforeEach(() => {
    campion2 = new Ability('Силовой Толчок', 25);
    campion3 = new Ability('Темная Атака', 30);
    campion4 = new Ability('Бесстрашная Воля', 33);
    elbrius = new Elbrius('Striker', 'Elbrius', [campion2, campion4]);
    campion = new Campion('Destroyer', 'Campion', [campion3]);
  });

  describe('Метод `getAbilityBonus`', () => {
    test('Суммирует и возвращает силы способностей с силой атаки персонажа', () => {
      const elbriusDamage = Calculator.getAbilityBonus(elbrius);
      const campionDamage = Calculator.getAbilityBonus(campion);
      expect(elbriusDamage).toBe(58);
      expect(campionDamage).toBe(30);
    });
  });

  describe('Метод `calculateDamage`', () => {
    test('Проверка расчета урона', () => {
      const damage1 = Calculator.calculateDamage(elbrius, campion);
      const damage2 = Calculator.calculateDamage(campion, elbrius);
      expect(damage1).toBe(68);
      expect(damage2).toBe(40);
    });
    test('Использует внутри метод `getAbilityBonus`', () => {
      expect(Calculator.calculateDamage.toString()).toContain(
        'Calculator.getAbilityBonus(character)',
      );
    });
  });
});
