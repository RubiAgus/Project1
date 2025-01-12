const { SlashCommandBuilder } = require("discord.js");

module.exports = {
//Slash comand builder  is a discord.js class
//The 'new' operator lets you create an instance of an object  wether it's built in or user defined that has
// a constructor function
ping : new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Reply with PONG'),

    async execute(interaction) {
        await interaction.reply('PONG')
}


}
