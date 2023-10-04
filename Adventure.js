class Adventure {
  constructor() {
    this.tasks = [];
    this.log = '';
  }

  addTask(task) {
    this.tasks.push(task);
  }

  startAdventure(character) {
    this.log += `${character.name} начинает приключение!\n`;
    this.tasks.forEach((task) => (this.log += task.execute(character) + '\n'));
    return this.log.trim();
  }
}
module.exports = Adventure;
