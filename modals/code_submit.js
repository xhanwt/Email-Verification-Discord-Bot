const { EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");


module.exports = {
  id: "codesubmit",
  run: async (client, interaction, config, db) => {
    const dbCode = await db.get(interaction.guild.id + "-" + interaction.user.id);
    if (interaction.member.roles.cache.some(role => role.name === 'Verified')) {return interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setDescription('You are already a verified member.')
              .setColor('#00ff00')
          ],
          ephemeral: true
        });}
    else if (interaction.fields.getTextInputValue('code') === dbCode) {

      interaction.guild.members
        .fetch(interaction.user.id)
        .then(async (user) => {
          let role = interaction.guild.roles.cache.find(
            (role) =>
              role.name === "Verified"
          );
          if (!role) {
            interaction.guild.roles.create({ name: 'Verified', color: '#00ff00', permissions: [] });
            role = interaction.guild.roles.cache.find(
              (role) =>
                role.name === "Verified"
            );
          }
          await user.roles.add(role);
        })

      return interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setDescription('<a:Blue_verify:1019481476091359272> Verification success! Thank you.')
              .setFooter({text: 'You got the verified role.'})
              .setColor('#00ff00')
          ],
          ephemeral: true
        });
    }
    else {
      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId('code')
            .setLabel('Try Again')
            .setStyle(ButtonStyle.Danger),
        );

      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`Invalid code.`)
        ], components: [row], ephemeral: true
      })

    }
  },
};
