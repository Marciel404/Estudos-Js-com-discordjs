const { SlashCommandBuilder, ChannelType, EmbedBuilder, range } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("teste1")
    .setDescription("Teste1")
    .addChannelOption((option) => 
      option
        .setName("channel")
        .setDescription("Teste")
    ),
    async execute(interaction ) {

      if (interaction.options.getChannel("channel") == null || interaction.options.getChannel("channel").type != ChannelType.GuildText) {
        return await interaction.reply(
          {
            content: "Você precisa digitar um canal valido",
            ephemeral: true
          }
        )
      }

      await interaction.reply({content: "tests"})

      e = new EmbedBuilder()

      e.setTitle("testee")

      for (const i of range({ start: 0, end: 11, step: 2 })){
        e.addFields({name: `${i}`, value: `${i}`})
      }

      try{
        await interaction.user.send({content: "Teste", embeds: [e]})
      } catch (err) {
        const channel = interaction.options.getChannel("channel")
        await channel.send({content: "Não consegui enviar mensagem"})
      }
	},
}