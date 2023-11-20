
const Ability = require('../Ability');

describe('Класс `Ability`', () => {
    let forceField;
    let waveImpact;
    beforeEach(() => {
      forceField = new Ability('Силовое поле', 10);
      waveImpact = new Ability('Волновой Удар', 20);
    });
    describe('Свойства класса `Ability`', () => {
      test('Корректно присваивает название способности', () => {
        expect(forceField.name).toBe('Силовое поле');
        expect(waveImpact.name).toBe('Волновой Удар');
      });
      test('Корректно присваивает силу способности', () => {
        expect(forceField.power).toBe(10);
        expect(waveImpact.power).toBe(20);
      });
    });
  });