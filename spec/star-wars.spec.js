const Character = require('../Character');
const Jedi = require('../Jedi');
const Sith = require('../Sith');
const Adventure = require('../Adventure');
const Task = require('../Task');

describe('Класс Character', () => {
  let character;

  beforeEach(() => {
    character = new Character('Тестовый Персонаж', 'Роль');
  });

  test('должен создать нового персонажа', () => {
    expect(character.name).toBe('Тестовый Персонаж');
    expect(character.role).toBe('Роль');
    expect(character.health).toBe(100);
    expect(character.level).toBe(1);
    expect(character.experience).toBe(0);
  });

  test('персонаж говорит', () => {
    expect(character.speak('Привет')).toBe('Тестовый Персонаж: Привет');
  });

  test('получить здоровье персонажа', () => {
    expect(character.getHealth()).toBe('Тестовый Персонаж имеет 100 здоровья.');
  });

  test('персонаж получает опыт', () => {
    expect(character.gainExperience(50)).toBe('Тестовый Персонаж получил 50 опыта.');
    expect(character.experience).toBe(50);
  });

  test('персонаж повышает уровень', () => {
    expect(character.gainExperience(100)).toContain('Тестовый Персонаж получил 100 опыта.');
    expect(character.level).toBe(2);
    expect(character.experience).toBe(0);
  });
});

describe('Класс Jedi', () => {
  let jedi;

  beforeEach(() => {
    jedi = new Jedi('Тестовый Jedi');
  });

  test('должен создать нового Jedi', () => {
    expect(jedi.name).toBe('Тестовый Jedi');
    expect(jedi.role).toBe('Jedi');
  });

  test('Jedi использует Силу', () => {
    expect(jedi.useTheForce()).toBe('Тестовый Jedi использует Силу.');
  });

  test('Jedi медитирует', () => {
    jedi.health = 80;
    expect(jedi.meditate()).toBe('Тестовый Jedi медитирует, восстанавливая здоровье до 100.');
  });

  test('Jedi тренируется', () => {
    expect(jedi.train()).toContain('Тестовый Jedi получил 50 опыта.');
  });
});

describe('Класс Sith', () => {
  let sith;

  beforeEach(() => {
    sith = new Sith('Тестовый Sith');
  });

  test('должен создать нового Sith', () => {
    expect(sith.name).toBe('Тестовый Sith');
    expect(sith.role).toBe('Sith');
  });

  test('Sith использует темную сторону', () => {
    expect(sith.useDarkSide()).toBe('Тестовый Sith использует темную сторону Силы.');
  });

  test('Sith ищет знание', () => {
    expect(sith.seekKnowledge()).toContain('Тестовый Sith получил 70 опыта.');
  });
});

describe('Класс Adventure', () => {
  let adventure;
  let character;

  beforeEach(() => {
    adventure = new Adventure();
    character = new Character('Тестовый Персонаж', 'Роль');
  });

  test('должен начать приключение', () => {
    const task = new Task('Тестовое задание', (character) => character.gainExperience(50));
    adventure.addTask(task);
    expect(adventure.startAdventure(character)).toContain(
      'Тестовый Персонаж начинает приключение!'
    );
  });
});

describe('Класс Task', () => {
  let task;
  let character;

  beforeEach(() => {
    task = new Task('Тестовое задание', (character) => character.gainExperience(50));
    character = new Character('Тестовый Персонаж', 'Роль');
  });

  test('должен выполнить задачу', () => {
    expect(task.execute(character)).toContain(
      'Тестовый Персонаж сталкивается с задачей: Тестовое задание'
    );
    expect(character.experience).toBe(50);
  });
});
