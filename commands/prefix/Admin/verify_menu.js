const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  config: {
    name: "verifymenu",
    description: "Replies with pong!",
  },
  permissions: ['SendMessages'],
  owner: false,
  run: async (client, message, args, prefix, config, db) => {

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('verify')
          .setLabel('Verify!')
          .setEmoji('<a:Blue_verify:1019481476091359272>')
          .setStyle(ButtonStyle.Success),
      ).addComponents(
        new ButtonBuilder()
          .setCustomId('code')
          .setLabel('Already have a code?')
          .setStyle(ButtonStyle.Secondary),
      );

    message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setDescription(`Please verify your status with your Douglas College student email.`)
          .setFooter({ text: "example@student.douglascollege.ca" })
          .setColor("Blue")
      ], components: [row]
    })

  },
};