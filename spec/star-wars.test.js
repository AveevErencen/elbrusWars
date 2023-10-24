const Character = require('../Character');
const Jedi = require('../Jedi');
const Sith = require('../Sith');
const Adventure = require('../Adventure');
const Ability = require('../Ability');
const Calculator = require('../Calculator');

describe('Звездные войны', () => {
  describe('Класс `Character`', () => {
    let character;
    let abilities1;
    let abilities2;
    let enemy;
    beforeEach(() => {
      abilities1 = [new Ability('Силовое Поле', 10), new Ability('Волновой Удар', 20)];
      abilities2 = [new Ability('Мощный Рывок', 15), new Ability('Ментальный удар', 25)];
      character = new Character('Свинка Пеппа', 'Разрушитель', abilities1);
      enemy = new Character('Грин-Де-Вальд', 'Мучитель', abilities2);
    });

    describe('Свойства класса `Character`', () => {
      test('Корректно присваивает имя', () => {
        expect(character.name).toBe('Свинка Пеппа');
      });
      test('Корректно присваивает роль', () => {
        expect(character.role).toBe('Разрушитель');
      });
      test('Корректно присваивает способности', () => {
        expect(character.abilities).toBe(abilities1);
      });
      test('По умолчанию устанавливает начальное здоровье персонажа и делает его приватным', () => {
        expect(character.constructor.toString()).toContain('#health');
        expect(character.health).toBe(100);
      });
      test('По умолчанию устанавливает силу атаки', () => {
        expect(character.attackPower).toBe(15);
      });
      test('По умолчанию устанавливает силу защиты', () => {
        expect(character.defensePower).toBe(5);
      });
      test('По умолчанию устанавливает уровень', () => {
        expect(character.level).toBe(1);
      });
      test('По умолчанию устанавливает количество опыта', () => {
        expect(character.experiencePoints).toBe(0);
      });
      test('По умолчанию устанавливает статус `жив`', () => {
        expect(character.isAlive).toBe(true);
      });
    });

    describe('Метод `gainExperience`', () => {
      test('Корректно повышает уровень персонажа', () => {
        character.gainExperience(100);
        expect(character.level).toBe(2);
        enemy.gainExperience(600);
        expect(enemy.level).toBe(4);
      });

      test('Увеличение силы атаки при повышении уровня', () => {
        character.gainExperience(100);
        expect(character.attackPower).toBe(20);
        enemy.gainExperience(800);
        expect(enemy.attackPower).toBe(30);
      });
    });

    describe('Метод `takeDamage`', () => {
      test('Проверка нанесения урона персонажу', () => {
        character.takeDamage(50);
        expect(character.health).toBe(50);
        character.takeDamage(30);
        expect(character.health).toBe(20);
      });
    });

    describe('Метод `attack`', () => {
      test('Проверка нанесения урона персонажу', () => {
        character.attack(enemy);
        expect(enemy.health).toBe(60);
        enemy.attack(character);
        expect(character.health).toBe(50);
      });

      test('Для подсчета количества наносимого урона, использует метод из класса `Calculator`', () => {
        expect(character.attack.toString()).toContain('Calculator.calculateDamage(this, enemy)');
      });

      test('Для нанесения урона применяет метод `takeDamage`', () => {
        expect(character.attack.toString()).toContain('enemy.takeDamage(damage)');
      });
    });

    describe('Метод `heal`', () => {
      test('Проверка увеличения здоровья персонажа', () => {
        character.takeDamage(50);
        character.heal();
        expect(character.health).toBe(60);
      });
      test('Для посчета количества восстановленных жизней использует метод из класса `Calculator`', () => {
        expect(character.heal.toString()).toContain('Calculator.calculateHealing(this)');
      });
    });

    describe('Метод `enhanceAbilities`', () => {
      test('Оптимизации способностей персонажа', () => {
        character.enhanceAbilities();
        expect(character.attackPower).toBe(31.5);
      });
      test('Для оптимизации способностей персонажа использует метод из класса `Calculator`', () => {
        expect(character.enhanceAbilities.toString()).toContain(
          'Calculator.optimizeAbilities(this)'
        );
      });
    });
  });

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

  describe('Класс `Calculator`', () => {
    let jedi, sith, ability1, ability2, ability3;

    beforeEach(() => {
      ability1 = new Ability('Силовой Толчок', 25);
      ability2 = new Ability('Темная Атака', 30);
      ability3 = new Ability('Бесстрашная Воля', 33);
      jedi = new Jedi('Люк', [ability1, ability3]);
      sith = new Sith('Вэйдер', [ability2]);
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

    describe('Метод `calculateHealing`', () => {
      test('Проверка расчета исцеления', () => {
        const healing = Calculator.calculateHealing(jedi);
        expect(healing).toBeGreaterThan(0);
      });
    });
    describe('Метод `optimizeAbilities`', () => {
      test('Проверка оптимизации способностей', () => {
        const optimizedAbilities = Calculator.optimizeAbilities(jedi);
        expect(optimizedAbilities.length).toBeGreaterThan(0);
        expect(optimizedAbilities[0].power).toBeGreaterThan(jedi.abilities[0].power);
      });
    });
  });

  describe('Класс `Jedi`', () => {
    let jedi;

    beforeEach(() => {
      jedi = new Jedi('Luke', [new Ability('Force Push', 25), new Ability('Force Shield', 15)]);
    });

    test('Использование силы для исцеления', () => {
      jedi.takeDamage(50);
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

  describe('Класс `Sith`', () => {
    let sith;

    beforeEach(() => {
      sith = new Sith('Vader', [new Ability('Dark Strike', 30), new Ability('Force Choke', 20)]);
    });

    test('Нанесение урона с использованием Force Choke', () => {
      const jedi = new Jedi('Luke', [new Ability('Force Push', 25)]);
      sith.useForceChoke(jedi);
      expect(jedi.health).toBe(83);
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

  describe('Класс `Adventure`', () => {
    let adventure, emptyAdventure, jedi, sith, sith1, sith2, sith3;

    beforeEach(() => {
      jedi = new Jedi('Luke', [new Ability('Force Push', 25)]);
      sith = new Sith('Clone', [new Ability('Laser pistol', 30)]);
      sith1 = new Sith('Clone', [new Ability('Laser pistol', 30)]);
      sith2 = new Sith('Clone', [new Ability('Laser pistol', 30)]);
      sith3 = new Sith('Clone', [new Ability('Laser pistol', 30)]);
      adventure = new Adventure(jedi, [sith, sith1, sith2, sith3]);
      emptyAdventure = new Adventure();
    });

    describe('Метод `start`', () => {
      test('Не позволяет начать приключение без персонажей', () => {
        expect(() => emptyAdventure.start()).toThrowError(
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

    test('Проверка, что приключение не начнется без персонажей', () => {
      const emptyAdventure = new Adventure(null, []);
      expect(() => emptyAdventure.start()).toThrow();
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
});
