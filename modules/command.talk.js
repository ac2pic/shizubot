const {Wit, log} = require('node-wit');

const client = new Wit({
  accessToken: process.env.WIT_ACCESS_TOKEN
});

async function run(msg) {
	const {content} = msg;
    const response = await client.message(content, {});
	const {entities} = response;
	// TODO: Make this customizable...
	if(entities.intent) {
		if(entities.intent[0].value === "choice") {
			if(entities.typeOfChoice) {
				if(entities.typeOfChoice[0].value === "waifu") {
					console.log(entities);
					if(entities.quality[0].value === "best") {
						msg.reply('I am.');
					} else {
						msg.reply('You are.');
					}				
				}
				else if(entities.typeOfChoice[0].value === "robot") {
					if(entities.quality[0].value === "best") {
						msg.reply('Lea is.');
					} else {
						msg.reply('C\'tron.');
					}				
				}
			}			
		}
		if(entities.intent[0].value === "greet") {
			msg.channel.send('hi');
		}
	}
}


module.exports = {
	run
}