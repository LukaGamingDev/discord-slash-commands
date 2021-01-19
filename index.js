const axios = require('axios')
class Client {
	/**
     * @param {string} token
     * @param {string} id
     */
	constructor(token, id) {
		if (typeof token !== 'string') {
			throw new TypeError('Token is not a string!')
		}
		if (typeof id !== 'string') {
			throw new TypeError('Id is not a string!')
		}
		this.token = token
		this.id = id
	}
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
	async createCommand(commandOptions, guildid) {
		guildid = guildid || null
		commandOptions.options = commandOptions.options || null
		if (typeof commandOptions.name !== 'string') {
			throw new TypeError('commandOptions.name is not a string!')
		}
		if (typeof commandOptions.description !== 'string') {
			throw new TypeError('commandOptions.description is not a string!')
		}
		if (Array.isArray(commandOptions.options)) {
			commandOptions.options.forEach((element) => {
				if (typeof element.name !== 'string') {
					throw new TypeError('commandOptions.options.name is not a string!')
				}
				if (typeof element.description !== 'string') {
					throw new TypeError('commandOptions.options.description is not a string!')
				}
				if (typeof element.type !== 'number') {
					throw new TypeError('commandOptions.options.type is not a number!')
				}
				if (typeof element.required !== 'boolean') {
					throw new TypeError('commandOptions.options.required is not a string!')
				}
				if (typeof element.choices !== 'object') {
					throw new TypeError('commandOptions.options.description is not a string!')
				}
			})
		}
		if (typeof guildid !== 'string' && guildid !== null) {
			throw new TypeError('guildid is not a string!')
		}
		let url
		if (guildid) {
			url = `https://discord.com/api/v8/applications/${this.id}/guilds/${guildid}/commands`
		} else {
			url = `https://discord.com/api/v8/applications/${this.id}/commands`
		}
		const headers = {
			Authorization: `Bot ${this.token}`
		}
		await axios
			.post(url, commandOptions, {
				headers: headers
			})
			.catch((e) => console.log(JSON.stringify(e.response.data, null, 2)))
	}
	/**		
	 * @param {string} [guildid]
    * @param {string} name
     */
	async deleteCommand(name, guildid) {
		guildid = guildid || null
		if (typeof name !== 'string') {
			throw new TypeError('name is not a string!')
		}
		if (typeof guildid !== 'string' && guildid !== null) {
			throw new TypeError('guildid is not a string!')
		}
		const headers = {
			Authorization: `Bot ${this.token}`
		}
		let url
		if (guildid) {
			url = `https://discord.com/api/v8/applications/${this.id}/guilds/${guildid}/commands`
		} else {
			url = `https://discord.com/api/v8/applications/${this.id}/commands`
		}
		const commands = await axios
			.get(url, {
				headers: headers
			})
			.catch((e) => console.log(JSON.stringify(e.response.data, null, 2)))
		commands.data.forEach(async (element) => {
			if (element.name === name) {
				let url2
				if (guildid) {
					url2 = `https://discord.com/api/v8/applications/${this.id}/guilds/${guildid}/commands/${element.id}`
				} else {
					url2 = `https://discord.com/api/v8/applications/${this.id}/commands/${element.id}`
				}
				await axios
					.delete(url2, {
						headers: headers
					})
					.catch((e) => console.log(JSON.stringify(e.response.data, null, 2)))
			}
		})
	}
}

module.exports = Client
