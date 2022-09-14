const { EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("discord.js");

module.exports = {
    name: "code",
    description: "Enter your verification code!",
    type: 1,
    options: [],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages"
    },
    run: async (client, interaction, config, db) => {
        const modal = new ModalBuilder()
            .setCustomId('codesubmit')
            .setTitle('Enter Your Code');

        const code = new TextInputBuilder()
            .setCustomId('code')
            .setLabel("Access Code (case sensitive)")
            .setStyle(TextInputStyle.Short);

        const ActionRow = new ActionRowBuilder().addComponents(code);

        modal.addComponents(ActionRow);

        await interaction.showModal(modal);
    },
};
