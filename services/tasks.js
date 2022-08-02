import { conflict, internal, notFound } from '@hapi/boom';
import Task from '../models/task.js';
import Pagination from '../utils/pagination.js';
class TaskService {
  #to_json(item) {
    const obj = item.toObject();
    const { _id: id, desc = '' } = obj;
    delete obj['_id'];
    delete obj['__v'];

    return {
      ...obj,
      id,
      desc,
    };
  }

  async #get_by_id(item_id) {
    const item = await Task.findById(item_id);
    if (!item) {
      throw notFound('Task not Found');
    }
    return item;
  }

  async create(data) {
    try {
      const item = await Task.create({ ...data });
      item.save();
      return item;
    } catch (error) {
      throw internal(error);
    }
  }

  async get_all(page = 1, limit = 10) {
    const [result, pagination] = await Pagination(Task, page, limit);
    return {
      data: result.map(this.#to_json),
      pagination,
    };
  }

  async get_one(item_id) {
    // TODO: validar que el usuario que pida la tarea sea el mismo asignado
    const task = await this.#get_by_id(item_id);
    return this.#to_json(task);
  }

  async update(item_id, data) {
    const task = await this.#get_by_id(item_id);
    if (['done', 'canceled'].includes(task.status)) {
      throw conflict(`task status is ${task.status}`);
    }
    try {
      await task.update({ ...data });
    } catch (error) {
      throw internal(error);
    }
  }

  async delete(item_id) {
    const task = await this.#get_by_id(item_id);
    try {
      await task.delete();
    } catch (error) {
      throw internal(error);
    }
  }
}

export default TaskService;
