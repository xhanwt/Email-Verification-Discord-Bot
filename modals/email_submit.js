const { EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const cooldown = require('bot-cooldown');
const commandCooldowns = {
  //Assign one:
  'emailsend': { uses: 2, coolTime: 600 }
};
var guildGroup = new cooldown.guildGroup();
guildGroup.createConfig("global", commandCooldowns);

module.exports = {
  id: "emailsubmit",
  run: async (client, interaction, config, db) => {

    if (interaction.fields.getTextInputValue('email').endsWith("@student.douglascollege.ca")) {

    //From left to right: command name, user's id, unix time number (current time)
    var commandStatus = guildGroup["global"].updateUsage('emailsend', interaction.guild.id + "-"+ interaction.user.id, interaction.createdTimestamp);
    //^ Should come back with {cooldownHit: false, triedAgain: false}

    const leftTime = Math.round(Date.now() / 1000);
    if (commandStatus.cooldownHit) {
      if (!commandStatus.triedAgain) {
        //The user just hit the cooldown, present a message
        return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription('Cooldown hit! Please try again <t:' + (leftTime + commandStatus.secondsLeft) + ':R>.')
        ],
        ephemeral: true
      });
        
      }
      //If the user tried again after this, ignore
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription('Cooldown hit! Please try again <t:' + (leftTime + commandStatus.secondsLeft) + ':R>.')
        ],
        ephemeral: true
      });
    }

    else {
      //Run the command
    }
      
      "use strict";
      const nodemailer = require("nodemailer");

      function makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
        }
        return result;
      }
      // Code
      var code = makeid(5);
      // async..await is not allowed in global scope, must use a wrapper
      async function main() {
        // create reusable transporter object using the default SMTP transport
        var transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
            user: `thewatchermailing@gmail.com`,
            pass: process.env.mailpw
          }
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: 'thewatchermailing@gmail.com', // sender address
          to: interaction.fields.getTextInputValue('email'), // list of receivers
          subject: interaction.guild.name + " - Verification Code ("+ code + ")", // Subject line
          text:  "", // plain text body
          html: "<p>Hi "+ interaction.user.username + ",<br><br><h3>Access code: " + code + "</h3><br><br> <h5>THIS CODE WILL EXPIRE IN 10 MINUTES. <br>DO NOT SHARE THIS CODE WITH ANYONE. </h5></p>"+"<p> <h7>This is an access code for " + interaction.guild.name + " Discord Server. If you did not perform this action, please ignore this message. <br> Do not reply to this email.</h7></p>", // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      }

      await main().catch(console.error);
      const sentTime = Math.round(Date.now() / 1000);
      await db.set(interaction.guild.id + "-"+ interaction.user.id, code, 600)

      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId('code')
            .setEmoji('<a:pepe_hacker:1019482523824295977>')
            .setLabel('Enter code')
            .setStyle(ButtonStyle.Success),
        );

      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`The code was sent to \n**` + interaction.fields.getTextInputValue('email') + '**\n <t:' + (sentTime) + ':R>! Please enter your code to verify.\nExpiry: <t:' + (sentTime + 600) + ':R>')
            .setColor("Blue")
        ], components: [row],
        ephemeral: true
      })
    }
    else {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription('Please enter your student email that ends with \"@student.douglascollege.ca\"')
        ],
        ephemeral: true
      });
    }
  },
};
