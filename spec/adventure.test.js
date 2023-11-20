const Jedi = require('../Jedi');
const Sith = require('../Sith');
const Adventure = require('../Adventure');
const Ability = require('../Ability');


describe('Класс `Adventure`', () => {
    let adventure, emptyAdventure, jedi, sith, sith1, sith2, sith3;

    beforeEach(() => {
      jedi = new Jedi('Luke', 'Jedi',[new Ability('Force Push', 25)]);
      sith = new Sith('Clone','Sith', [new Ability('Laser pistol', 30)]);
      sith1 = new Sith('Clone', 'Sith',[new Ability('Laser pistol', 30)]);
      sith2 = new Sith('Clone','Sith', [new Ability('Laser pistol', 30)]);
      sith3 = new Sith('Clone','Sith', [new Ability('Laser pistol', 30)]);
      adventure = new Adventure(jedi, [sith, sith1, sith2, sith3]);
      emptyAdventure = new Adventure();
    });

    describe('Метод `start`', () => {
      test('Не позволяет начать приключение без персонажей', () => {
        expect(emptyAdventure.start()).toBe(
          'Приключение не может начаться без персонажа или врагов'
        );
      });

      test('Главный герой должен быть жив', () => {
        adventure.start();
        expect(adventure.character.isAlive).toBeTruthy();
      });

      test('Атакует каждого врага, который есть в массиве', () => {
        adventure.start();
        expect(sith.health).toBe(65);
        expect(sith1.health).toBe(65);
        expect(sith2.health).toBe(65);
        expect(sith3.health).toBe(65);
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
      sith.health = 25;
      sith1.health = 25;
      sith2.health = 25;
      sith3.health = 25;
      adventure.start();

      expect(jedi.experiencePoints).toBe(100);
      expect(jedi.level).toBe(2);
    });
  });