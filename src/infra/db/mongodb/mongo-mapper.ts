export abstract class MongoMapper {
  public static map<Model>(entity: any): Model {
    const { _id, ent } = entity
    return Object.assign({}, ent, { id: _id.toString() })
  }
}
