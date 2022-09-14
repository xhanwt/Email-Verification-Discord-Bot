const { EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("discord.js");

module.exports = {
    name: "verify",
    description: "Replies with a modal menu!",
    type: 1,
    options: [],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages"
    },
    run: async (client, interaction, config, db) => {
        const modal = new ModalBuilder()
            .setCustomId('emailsubmit')
            .setTitle('Enter Your Douglas College Student Email');

        const email = new TextInputBuilder()
            .setCustomId('email')
            .setLabel("Type your student email here")
            .setStyle(TextInputStyle.Short);

        const ActionRow = new ActionRowBuilder().addComponents(email);

        modal.addComponents(ActionRow);

        await interaction.showModal(modal);
    },
};
