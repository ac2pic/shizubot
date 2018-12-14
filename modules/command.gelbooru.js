const Gelbooru = require('./dependencies/gelbooru');
const gelbooru = new Gelbooru({
	api_key : process.env.GEL_API_KEY,
	id : process.env.GEL_USER_ID
});
function getRandom(arr) {
	return arr[parseInt(Math.random() * arr.length)];
}
const BANNED_KEYWORDS = ['loli', 'lolicon', 'shota','shotacon', 'bestiality', 'gore','animal'];

async function run(msg, args) {
	if(msg.channel.nsfw) {
		const {content} = msg; 
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

module.exports = {
	run
}