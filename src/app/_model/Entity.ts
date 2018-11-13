import { Deserializable } from "./Deserializable";
import { isArray } from "util";

export class Entity implements Deserializable{
    attributes: any = {};
    id: string;
    type: string;
    links: any = {};
    relationships: any = {};
    children: any = {};

    public appendReferenceItem(field: string, entity: Entity) {
        this.relationships[field].data.push(entity);
    }

    public resetReference(field: string) {
        this.relationships[field].data = [];
    }

    public setReferenceItem(field: string, entity: Entity) {
        this.relationships[field].data = entity;
    }

    /**
     * Get the uuid or uuids of a related field.
     * @param field The Field that you want to get the uuid for.
     */
    public getRelatedUuid(field: string):boolean|string|string[] {
        let related = this.relationships;
        if (typeof related[field] !== 'undefined') {
        if (isArray(related[field].data)) {
            return related[field].data.map((item) => {
            return item.id;
            });
        }
        return related[field].data.id;
        }
        return false;
    }

    /** @inheritdoc */
    public deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
 