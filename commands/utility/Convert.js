const {SlashCommandBuilder} = require ('discord.js');
const { execute } = require('./Ping');

//Make the units converter
function  temperatureConverter_FtoC (temperature){ 
    convertedTemp = temperature * (5/9) + 32;

    return convertedTemp
}


//Make the command
module.exports = {
    data: new SlashCommandBuilder()
    .setName('Convert')
    .setDescription('Converts F to C')
    .addNumberOption(Option => 
        Option.setName('F')
        .setDescription('temperature to convert in burger units')
        .setRequired(true)

    ),

    async execute (interaction){
        const value = interaction.options.getNumber('F')
        const newValue = temperatureConverter_FtoC(value)
        await interaction.reply(`${value} is ${newValue} in real units`)

    }
}
