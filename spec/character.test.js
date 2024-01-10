const Character = require('../Character');
const Ability = require('../Ability');

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
      character.takeDamage = 50;
      expect(character.health).toBe(50);
      character.takeDamage = 30;
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
  });
});
