import { conflict, forbidden, internal, notFound } from '@hapi/boom';
import Task from '../models/task.js';
import Pagination from '../utils/pagination.js';
class TaskService {
  #to_json(item) {
    const obj = item.toJSON();

    const {_id: id , desc = '' } = obj;
    delete obj['_id'];

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
      console.log(item.assigned);
     //item.save();
      return {id: 1};
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

  async update(item_id, data, user_id) {
    // TODO refactorizar todo esto ya que esta funcion hace dos cosas

    const task = await this.#get_by_id(item_id);
    const {requester} = task;
    if (requester.user && requester.user != user){
      throw forbidden("You cant edit others tasks")
    }
    if (['done', 'canceled'].includes(task.status)) {
      throw conflict(`task status is ${task.status}`);
    }
    try {
      await task.update({ ...data });
    } catch (error) {
      throw internal(error);
    }
  }

  async get_mines(user_id, page = 1, limit = 10){
    const filters = {
      'assigned.user': user_id
    }
    const [result, pagination] = await Pagination(Task, page, limit, filters);
    return {
      data: result.map(this.#to_json),
      pagination,
    };
  }

}

export default TaskService;
