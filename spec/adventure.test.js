const Elbrius = require('../Elbrius');
const Campion = require('../Campion');
const Adventure = require('../Adventure');
const Ability = require('../Ability');

describe('Класс `Adventure`', () => {
  let adventure;
  let emptyAdventure;
  let elbrius;
  let campion;
  let campion2;
  let campion3;
  let campion4;

  beforeEach(() => {
    elbrius = new Elbrius('Striker', 'Elbrius', [new Ability('Force Push', 25)]);
    campion = new Campion('Destroyer', 'Campion', [new Ability('Laser pistol', 30)]);
    campion2 = new Campion('Destroyer', 'Campion', [new Ability('Laser pistol', 30)]);
    campion3 = new Campion('Destroyer', 'Campion', [new Ability('Laser pistol', 30)]);
    campion4 = new Campion('Destroyer', 'Campion', [new Ability('Laser pistol', 30)]);
    adventure = new Adventure(elbrius, [campion, campion2, campion3, campion4]);
    emptyAdventure = new Adventure();
  });

  describe('Метод `start`', () => {
    test('Не позволяет начать приключение без персонажей', () => {
      expect(emptyAdventure.start()).toBe(
        'Приключение не может начаться без персонажа или врагов',
      );
    });

    test('Главный герой должен быть жив', () => {
      adventure.start();
      expect(adventure.character.isAlive).toBeTruthy();
    });

    test('Атакует каждого врага, который есть в массиве', () => {
      adventure.start();
      expect(campion.health).toBe(65);
      expect(campion2.health).toBe(65);
      expect(campion3.health).toBe(65);
      expect(campion4.health).toBe(65);
    });
  });

  describe('Метод `calculateTotalDamage`', () => {
    test('Считает итоговый урон, нанесенный врагам', () => {
      adventure.start();
      expect(adventure.calculateTotalDamage()).toBe(140);
    });
  });

  test('Оценка производительности', () => {
    adventure.start();
    const performance = adventure.evaluatePerformance();
    expect(performance.efficiency).toBe(0.35);
    expect(performance.survival).toBe(1);
  });

  test('Проверка, что персонаж получает опыт и уровень после победы над врагом', () => {
    campion.health = 25;
    campion2.health = 25;
    campion3.health = 25;
    campion4.health = 25;
    adventure.start();

    expect(elbrius.experiencePoints).toBe(100);
    expect(elbrius.level).toBe(2);
  });
});
