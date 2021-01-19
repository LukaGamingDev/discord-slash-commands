export = Client;
declare class Client {
    /**
     * @param {string} token
     * @param {string} id
     */
    constructor(token: string, id: string);
    token: string;
    id: string;
    /**
    * @typedef {Object} CommandOption
    * @property {string} name
    * @property {string} description
       * @property {number} type
      * @property {boolean} required
      * @property {Object[]} [choices]
      * @property {string} choices.name
      * @property {string} choices.value
     */
    /**
    * @param { Object[] } commandOptions
    * @param {string} commandOptions.name
    * @param {string} commandOptions.description
    * @param {Array<CommandOption>} [commandOptions.options]
   * @param {string} [guildid]
     */
    createCommand(commandOptions: {
        name: string;
        description: string;
        options?: {
            name: string;
            description: string;
            type: number;
            required: boolean;
            choices?: {
                name: string;
                value: string;
            };
        }[];
    }[], guildid?: string): Promise<void>;
    /**
     * @param {string} [guildid]
    * @param {string} name
     */
    deleteCommand(name: string, guildid?: string): Promise<void>;
}
