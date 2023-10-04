class Task {
  constructor(description, action) {
    this.description = description;
    this.action = action;
  }

  execute(character) {
    const actionLog = this.action(character);
    return `${character.name} сталкивается с задачей: ${this.description}\n${actionLog}`;
  }
}
module.exports = Task;
