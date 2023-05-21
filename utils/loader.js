const {Client, GatewayIntentBits} = require("discord.js")
const { loadSlash, commandSlash } = require("./SlashCommands")

const client = new Client({
    intents: [
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
    ]
})

client.once("ready", (self => {
    loadSlash(self.application.id)
    console.log("Eu entrei como " + self.user.username)
}))

client.on("interactionCreate", async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = commandSlash.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: `${error}`, ephemeral: true });
		} else {
			await interaction.reply({ content: `${error}`, ephemeral: true });
		}
	}
})

module.exports = client