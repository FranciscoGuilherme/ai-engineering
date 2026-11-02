import EntityInterface from "../../core/@shared/entity.interface";
import RepositoryInterface from "../../core/@shared/repository.interface";

export default abstract class BaseRepository<
  T extends EntityInterface,
> implements RepositoryInterface<T> {
  findAll(): Promise<T[]> {
    return null;
  }

  findById(id: string): Promise<T | null> {
    return null;
  }

  create(item: T): Promise<T> {
    return null;
  }

  update(id: string, item: Partial<T>): Promise<T | null> {
    return null;
  }

  delete(id: string): Promise<boolean> {
    return null;
  }
}
