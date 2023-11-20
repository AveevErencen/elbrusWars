const Sith = require('../Sith');
const Jedi = require('../Jedi');
const Ability = require('../Ability');

describe('Класс `Sith`', () => {
    let sith;

    beforeEach(() => {
      sith = new Sith('Vader', 'Sith',[new Ability('Dark Strike', 30), new Ability('Force Choke', 20)]);
    });

    test('Нанесение урона только с использованием Force Choke', () => {
      const jedi = new Jedi('Luke','Jedi', [new Ability('Force Push', 25)]);
      sith.useForceChoke(jedi);
      expect(jedi.health).toBe(70);
    });

    test('Проверка, что ситх не может удушить себя', () => {
      const initialHealth = sith.health;
      expect(sith.useForceChoke(sith)).toBe(false);
      expect(sith.health).toBe(initialHealth);
    });

    test('Проверка увеличения уровня ситха', () => {
      sith.gainExperience(800);
      expect(sith.level).toBe(4);
    });
  });