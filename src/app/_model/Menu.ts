import { JsonApiCollection } from "./JsonApiCollection";
import { THROW_IF_NOT_FOUND } from "@angular/core/src/di/injector";

export class Menu extends JsonApiCollection {
    public getItems(parent: string = null) {
        return this.data.filter((item) => {
            return item.attributes.parent == parent;
        });
    }
}