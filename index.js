// Require the necessary discord.js classes
const {REST,Routes, Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const { token } = require('./config.json'); // Imports the file
const fs =require('node:fs'); //File system manager
const path = require('node:path');



// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });


// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, readyClient => {
	console.log(`${readyClient.user.tag} is online`);
});





client.commands = new Collection(); // Create a new atribute for the client obj, part of the client class (comes with Discord.js)


const foldersPath = path.join (__dirname,'commands'); //__dirname represents the global directory of the project file
//'commands' is the name of the directory where the files are being taken from
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders){
	// Check if the items in the commands folder are .js files, skips them if they aren't
	const commandsPath = path.join(foldersPath,folder)
	const commandFiles = fs.readdirSync (commandsPath).filter(file => file.endsWith('.js'));

	
	for (const file of commandFiles){
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if('data' in command && 'execute' in command) {
			client.commands.set(command.data.name,command); // Adds the command if it's usable
		} 
		else {console.log(`WARNING: The command at ${filePath} is missing data or is cannot be executed`);}
	}
}

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error executing the command.', ephemeral: true });
    }
});


// Log in to Discord with your client's token
client.login(token);


// Use REST manager
const rest = new REST().setToken(token);
// Deploy commands

(async()=>{
	try{
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(Routes.applicationCommands(clientId),
		{ body: commands },);
		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	}
	catch (error) {console.error(error);}

});
