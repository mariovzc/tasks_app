import { conflict, internal, notFound, unauthorized } from '@hapi/boom';
import User from '../models/user.js';
import Pagination from '../utils/pagination.js';
import bycript from 'bcrypt';

class UserService {
  #to_json(item) {
    const obj = item.toJSON();
    const { _id: id } = obj;
    delete obj['_id'];

    return {
      ...obj,
      id,
    };
  }

  async #get_by_email(email) {
    const item = await User.findOne({ email });
    if (!item) {
      throw notFound('User not Found');
    }
    return item;
  }

  async login(email, password) {
    const item = await this.#get_by_email(email);

    const isMatch = await bycript.compare(password, item.password);
    if (!isMatch) {
      throw unauthorized();
    }

    return this.#to_json(item);
  }

  async create(data) {
    const { email } = data;
    const user = await this.#get_by_email(email);
    if (user) {
      throw conflict('User Already exists');
    }
    try {
      const password = await bycript.hash(data.password, 10);
      const item = await User.create({ ...data, password });
      return item;
    } catch (error) {
      throw internal(error);
    }
  }

  async get_all(page = 1, limit = 10) {
    const [result, pagination] = await Pagination(User, page, limit);
    return {
      data: result.map(this.#to_json),
      pagination,
    };
  }

  async get_one(item_id) {
    // TODO: validar que el usuario que pida la tarea sea el mismo asignado
    const user = await this.#get_by_email(item_id);
    return this.#to_json(user);
  }

  async update(item_id, data) {
    const user = await this.#get_by_email(item_id);
    try {
      await user.update({ ...data });
    } catch (error) {
      throw internal(error);
    }
  }
}

export default UserService;
