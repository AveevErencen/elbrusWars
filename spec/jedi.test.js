const Jedi = require('../Jedi');
const Ability = require('../Ability');

describe('Класс `Jedi`', () => {
    let jedi;

    beforeEach(() => {
      jedi = new Jedi('Luke', [new Ability('Force Push', 25), new Ability('Force Shield', 15)]);
    });

    test('Использование силы для исцеления', () => {
      jedi.takeDamage=50;
      jedi.useForceHeal();
      expect(jedi.health).toBe(55);
    });

    test('Проверка невозможности исцеления выше максимального здоровья', () => {
      jedi.useForceHeal();
      expect(jedi.health).toBe(100);
    });

    test('Проверка увеличения уровня джедая', () => {
      jedi.gainExperience(400);
      expect(jedi.level).toBe(3);
    });
  });