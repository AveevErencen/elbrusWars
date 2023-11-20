const Calculator = require('../Calculator');
const Ability = require('../Ability');
const Jedi = require('../Jedi');
const Sith = require('../Sith');

describe('Класс `Calculator`', () => {
    let jedi, sith, ability1, ability2, ability3;

    beforeEach(() => {
      ability1 = new Ability('Силовой Толчок', 25);
      ability2 = new Ability('Темная Атака', 30);
      ability3 = new Ability('Бесстрашная Воля', 33);
      jedi = new Jedi('Люк','Джидай', [ability1, ability3]);
      sith = new Sith('Вэйдер', 'Ситх',[ability2]);
    });

    describe('Метод `getAbilityBonus`', () => {
      test('Суммирует и возвращает силы способностей с силой атаки персонажа', () => {
        const jediDamage = Calculator.getAbilityBonus(jedi);
        const sithDamage = Calculator.getAbilityBonus(sith);
        expect(jediDamage).toBe(58);
        expect(sithDamage).toBe(30);
      });
    });

    describe('Метод `calculateDamage`', () => {
      test('Проверка расчета урона', () => {
        const damage1 = Calculator.calculateDamage(jedi, sith);
        const damage2 = Calculator.calculateDamage(sith, jedi);
        expect(damage1).toBe(68);
        expect(damage2).toBe(40);
      });
      test('Использует внутри метод `getAbilityBonus`', () => {
        expect(Calculator.calculateDamage.toString()).toContain(
          'Calculator.getAbilityBonus(character)'
        );
      });
    });
  });