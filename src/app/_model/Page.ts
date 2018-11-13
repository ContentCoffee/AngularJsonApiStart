import { JsonApiEntity } from "./JsonApiEntity";

export class Page extends JsonApiEntity {
    public getContent():Array<JsonApiEntity> {
        if (typeof this.data.attributes.jsonapi_content_container_content !== 'undefined') {
            return this.data.attributes.jsonapi_content_container_content.map((item) => {
                return new JsonApiEntity().deserialize(item);
            });
        }
        return null;
    }
}