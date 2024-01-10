const Campion = require('../Campion');
const Elbrius = require('../Elbrius');
const Ability = require('../Ability');

describe('Класс `Campion`', () => {
  let campion;

  beforeEach(() => {
    campion = new Campion('Destroyer', 'Campion', [new Ability('Dark Strike', 30), new Ability('Force Choke', 20)]);
  });

  test('Нанесение урона только с использованием Force Choke', () => {
    const elbrius = new Elbrius('Striker', 'Elbrius', [new Ability('Force Push', 25)]);
    campion.useForceChoke(elbrius);
    expect(elbrius.health).toBe(70);
  });

  test('Проверка, что Campion не может удушить себя', () => {
    const initialHealth = campion.health;
    expect(campion.useForceChoke(campion)).toBe(false);
    expect(campion.health).toBe(initialHealth);
  });

  test('Проверка увеличения уровня Campion', () => {
    campion.gainExperience(800);
    expect(campion.level).toBe(4);
  });
});
