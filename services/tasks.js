import { conflict, notFound } from '@hapi/boom';
class TaskService {
  constructor() {
    this.tasks = [];
    this.generate();
  }

  generate() {
    this.tasks = [...Array(100).keys()].map((i) => ({
      id: i,
      name: `task ${i}`,
      done: Math.random() < 0.5,
      is_private: Math.random() < 0.5,
      end_date: new Date().toISOString(),
    }));
  }

  async create(data) {
    const task = {
      ...data,
      id: this.tasks.length,
      done: false,
    };
    this.tasks.push(task);
    return task;
  }

  async get_all() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.tasks);
      }, 2000);
    });
  }

  async get_one(item_id) {
    const task = this.tasks.find((item) => item.id === parseInt(item_id));
    if (!task) {
      throw notFound('Task not Found');
    }
    if (task.is_private) {
      throw conflict(" Task is private");
    }
    return task;
  }

  async update(item_id, data) {
    const index = this.tasks.findIndex((item) => item.id === parseInt(item_id));
    if (index === -1) {
      throw notFound('Task not Found');
    }

    this.tasks[index] = { ...this.tasks[index], ...data };
  }

  async delete(item_id) {
    const index = this.tasks.findIndex((item) => item.id === parseInt(item_id));
    if (index === -1) {
      throw notFound('Task not Found');
    }
    this.tasks.splice(index, 1);
  }
}

export default TaskService;
