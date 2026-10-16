import User from "../entity/user.entity";
import RepositoryInterface from "../@shared/repository-interface";

export default interface UserRepositoryInterface extends RepositoryInterface<User> {}
