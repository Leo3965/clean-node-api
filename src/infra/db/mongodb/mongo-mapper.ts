export abstract class MongoMapper {
  public static map<Model>(entity: any, id: string): Model {
    return Object.assign({}, entity, { id })
  }
}
