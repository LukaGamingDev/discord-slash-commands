<h1><b>discord-slash-commands, a package to make it easy</b></h1>
<h2>How to install</h2>
It's simple! Just run `npm i @daimond113/discord-slash-commands` and you're done!
<h2>How to use</h2>
Firstly, if you're stuck on something, you can go ask on <a href="https://discord.gg/hTanCT5JMp">my discord server</a> or you can look at <a href="https://discord.com/developers/docs/interactions/slash-commands">discord's slash commands docs</a>
</br>
You will need a client, you can make it by doing 

```javascript
const DiscordSlashCommands = require('@daimond113/discord-slash-commands')
const client = new DiscordSlashCommands('BotToken', 'BotClientID')
```

Now, you can make your commands!
<h2>How to make your commands</h2>
Now that your client is ready, we will use it please note to add it to your file!

```javascript
client.createCommand(
    {
			name: 'command_name',
			description: 'command_description',
			options: [
				{
					name: 'Option1_Name',
					description: 'Option1_Description',
					type: 3, // see https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoptiontype
					required: true,
					choices: [
						{
							name: 'Choice1',
							value: 'Choice1_Value'
						},
						{
							name: 'Choice2',
							value: 'Choice2_Value'
                        }
					]
				},
				{
					name: 'Option2_Name',
					description: 'Option2_Description',
					type: 5,
					required: false
				}
			]
		},
		'guild_id' // this will make your command only on one guild, but will update instantly
)
```

<h2>Updating your commands</h2>
You can use the same command name to override your old command!
<h2>Deleting a command</h2>
To delete a command you can use Client.deleteCommand() like this!


```javascript 
client.deleteCommand('command_name', 'optional_guild_id')
```

<h2>Handling slash commands</h2>
If you are using gateway events, the library you are using should handle it.  
<br />
If you're using <a href="https://www.npmjs.com/package/discord.js">discord.js</a> you can do  

```javascript
const { Client } = require('discord.js')
const DiscordSlashCommands = require('@daimond113/discord-slash-commands')

const client = new Client()
const slashCommandsClient = new DiscordSlashCommands('BotToken', 'BotClientID')

slashCommandsClient.addCommands(...)

client.ws.on('INTERACTION_CREATE', async (int) => {
	client.api.interactions(int.id, int.token).callback.post({
		data: {
			type: 4,
			data: {
				content: `<@${int.member.user.id}> just fired ${int.data.name}`
			}
		}
	})
})
```
