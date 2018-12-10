// TODO: Before this gets out of control, re organize the code
const {Client} = require('discord.js');
const Gelbooru = require('./gelbooru');
// TODO: setup heroku
const client = new Client();
const gelbooru = new Gelbooru({
	api_key : process.env.GEL_API_KEY,
	id : process.env.GEL_USER_ID
});
client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	console.log(`This is the updated file. :p`);
});
function getRandom(arr) {
	return arr[parseInt(Math.random() * arr.length)];
}

const BANNED_KEYWORDS = ['loli', 'lolicon', 'shota','shotacon', 'bestiality', 'gore','animal'];
client.on(`message`, async (msg) => {
	const {content} = msg;
	if(content.startsWith(`${process.env.PREFIX}gelbooru`)) {
		if(msg.channel.nsfw) {
			const [command, ...args] = content.split(' ');
			if(args.length) {
				// get the posts from the keyword
				let posts = await gelbooru.getPost(args);
				
				
				// filter out banned posts 
				posts = posts.filter((post) => {
					for(let keyword of BANNED_KEYWORDS) {
						if(post.tags.indexOf(keyword) > -1) {
							return false;
						}
					}
					return true;
				});
				
				// get a random legal post
				const post = getRandom(posts);

				if(post) {
					const {owner,source , file_url} = post;
					console.log(post);
					msg.channel.send(`Owner: ${owner}\nSource: <${source}>`, {
						files : [file_url]
					});				
				} else {
					msg.channel.send('Could not find any posts!');
				}

			}			
		} else {
			msg.channel.send('This command can only be used in a nsfw channel.');
		}

		
	}
	
	console.log("Received new message:", msg.content);
});

client.login(process.env.BOT_TOKEN);