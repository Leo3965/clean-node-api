export abstract class MongoMapper {
  public static map<Model>(entity: any, id: string): Model {
    const { _id, ...ent } = entity
    return Object.assign({}, ent, { id })
  }
}
