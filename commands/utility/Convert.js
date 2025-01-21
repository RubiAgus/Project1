const {SlashCommandBuilder} = require ('discord.js');
const { execute } = require('./Ping');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('Convert')
    .setDescription('Converts F to C'),

    async execute (interaction){}
}
