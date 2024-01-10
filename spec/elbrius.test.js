const Elbrius = require('../Elbrius');
const Ability = require('../Ability');

describe('Класс `Elbrius`', () => {
  let elbrius;

  beforeEach(() => {
    elbrius = new Elbrius('Striker', [new Ability('Force Push', 25), new Ability('Force Shield', 15)]);
  });

  test('Использование силы для исцеления', () => {
    elbrius.takeDamage(50);
    elbrius.useForceHeal();
    expect(elbrius.health).toBe(55);
  });

  test('Проверка невозможности исцеления выше максимального здоровья', () => {
    elbrius.useForceHeal();
    expect(elbrius.health).toBe(100);
  });

  test('Проверка увеличения уровня Elbrius', () => {
    elbrius.gainExperience(400);
    expect(elbrius.level).toBe(3);
  });
});
