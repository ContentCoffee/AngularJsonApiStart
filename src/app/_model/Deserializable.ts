export interface Deserializable {
    /**
     * Desrialize a raw json object from the API most likely and convert it to an instance of this.
     * @param input raw json object ideally.
     */
    deserialize(input: any): this;
}