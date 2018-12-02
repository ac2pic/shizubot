const {Client} = require('discord.js');

// TODO: setup heroku
const token = JSON.parse(require('fs').readFileSync('.env')).token;
const client = new Client();
client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on(`message`, msg => {
	if(msg.content === "hi") {
		msg.reply(`hi.`);
	}
	
	console.log("Received new message:", msg.content);
});

client.login(token);