import { Entity } from './Entity';
import { Deserializable } from './Deserializable';
import { isArray } from 'util';

export class JsonApiEntity implements Deserializable{
  data: Entity = new Entity;
  jsonapi: any;
  links: any;
  included: Array<Entity>;

  /** @inheritdoc */
  public deserialize(input: any) {
    Object.assign(this, input);
    this.data = new Entity().deserialize(this.data);
    return this;
  }

  /**
   * Get the entity out of the included that matches the uuid.
   * @param uuid The uuid that you want to fish out of the included.
   */
  public getInclude(uuid: string):boolean|Entity {
    if (typeof this.included !== 'undefined' && this.included.length) {
      return new Entity().deserialize(
        this.included.filter((item) => {
          return item.id == uuid;
        }).pop()
      );
    }
    return false;
  }

}
  