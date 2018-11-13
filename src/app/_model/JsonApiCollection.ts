 import {Entity} from './Entity';
import { Deserializable } from './Deserializable';
import { JsonApiEntity } from './JsonApiEntity';

  export class JsonApiCollection implements Deserializable {
    data: Array<Entity>;
    jsonapi: any;
    links: any;
    included: Array<Entity>;

    /** @inheritdoc */
    public deserialize(input: any) {
      Object.assign(this, input);
      this.data = this.data.map((item) => {
        return new Entity().deserialize(item);
      });
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