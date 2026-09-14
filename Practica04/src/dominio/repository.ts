//  TODO: declarar la interfaz generica con estos cuatro metodos.
//     findById(id)      -> Promise<T | null>
//     findAll()         -> Promise<T[]>
//     save(entidad)     -> Promise<T>
//     delete(id)        -> Promise<void>

export interface Repository<T, ID = string> {
  findById(id: ID): Promise<T | null>;
  findAll(): Promise<T[]>;
  save(entity: T): Promise<T>;
  delete(id: ID): Promise<void>;
}
