const {URL} = require('url');
const fetch = require('node-fetch');
class Gelbooru {
	constructor({api_key, id}) {
		this.baseUrl = 'https://gelbooru.com/index.php';
		this.authParams = `&api_key=${api_key}&user_id=${id}`;
	}
	get(type, args) {
		var url = new URL(this.baseUrl);
		var searchParams = [
			['page', 'dapi'],
			['s', type],
			['q', 'index'],
			['json', 1]
		].concat(args);
		searchParams.forEach(([name, value]) => {
			url.searchParams.append(name, value);
		});
		return fetch(url);
	}
	/**
	* Args - a list of tags
	*
	**/
	async getPost(args) {
		const postArguments = args.map((tag) => ['tags', tag]);
		let response = await this.get('post', postArguments);
		let responseText = await response.text();
		return JSON.parse(responseText);
	}
}


module.exports = Gelbooru