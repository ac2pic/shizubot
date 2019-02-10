// TODO: Before this gets out of control, re organize the code
const {Client} = require('discord.js');

// TODO: setup heroku
const client = new Client();

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	console.log(`This is the updated file. :p`);
});
const commands = {
	gelbooru : require('./modules/command.gelbooru')
};
const specialCommands = {
	talk : require('./modules/command.talk')
}

client.on(`message`, async (msg) => {
	if(msg.author.bot)
		return;
	const {content} = msg;
	
	if(msg.channel.name === "make-shizu-say-hi") {
		await specialCommands.talk.run(msg);
	}
	else if(content.startsWith(process.env.PREFIX)) {
		let endOfString = content.indexOf(' ');
		if(endOfString == -1) {
			endOfString = content.length;
		}
		let commandName = content.substring(1, endOfString);
		let commandArgs = content.substring(endOfString);
		let command = commands[commandName];
		if(command) {
			console.log(commandName, commandArgs);
			command.run(msg, commandArgs);
		}
		
	} 
	
	console.log("Received new message:", msg.content);
});

client.login(process.env.BOT_TOKEN);