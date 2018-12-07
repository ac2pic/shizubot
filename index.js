const {Client} = require('discord.js');

// TODO: setup heroku
const client = new Client();
client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	console.log(`This is the updated file. :p`);
});

client.on(`message`, msg => {
	if(msg.content === "hi") {
		msg.reply(`hi.`);
	}
	
	console.log("Received new message:", msg.content);
});

client.login(process.env.BOT_TOKEN);