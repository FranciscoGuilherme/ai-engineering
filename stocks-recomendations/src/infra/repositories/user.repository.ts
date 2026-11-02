import User from "../../core/entities/user.entity";
import UserRepositoryInterface from "../../core/repositories/user-repository.interface";
import BaseRepository from "./base.repository";

export default class UserRepository
  extends BaseRepository<User>
  implements UserRepositoryInterface {}
