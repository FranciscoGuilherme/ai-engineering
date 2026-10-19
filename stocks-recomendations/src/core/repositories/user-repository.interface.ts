import RepositoryInterface from "../@shared/repository-interface";
import User from "../entities/user.entity";

export default interface UserRepositoryInterface extends RepositoryInterface<User> {}
