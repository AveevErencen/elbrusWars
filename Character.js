class Character {
  #attackPower;
  constructor(name, role) {
    this.name = name;
    this.role = role;
    this.health = 100;
    this.#attackPower = 15;
    this.level = 1;
    this.experience = 0;
  }

  speak(phrase) {
    return `${this.name}: ${phrase}`;
  }

  getHealth() {
    return `${this.name} имеет ${this.health} здоровья.`;
  }

  get attackPower() {
    return this.#attackPower;
  }

  set attackPower(value) {
    if (value < 0) {
      throw new Error('Сила атаки не может быть отрицательной.');
    }
    this.#attackPower = value;
  }

  gainExperience(points) {
    this.experience += points;
    const log = `${this.name} получил ${points} опыта.`;
    const levelUpLog = this.levelUp();
    return log + (levelUpLog ? '\n' + levelUpLog : '');
  }

  levelUp() {
    let log = '';
    if (this.experience >= this.level * 100) {
      this.level++;
      this.experience = 0;
      this.#attackPower += 5;
      log = `${this.name} повысил уровень! Теперь он уровня ${
        this.level
      } и его сила атаки увеличилась до ${this.#attackPower}.`;
    }
    return log;
  }

  explore(area) {
    return `${this.name} исследует ${area} и находит что-то интересное.`;
  }

  interact(object) {
    return `${this.name} взаимодействует с ${object}.`;
  }
}
module.exports = Character;
