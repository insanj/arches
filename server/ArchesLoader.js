
class ArchesLoader {
	constructor(databaseFilename) {
		this.databaseFilename = databaseFilename;
	}

	saveJSON(jsonToSave, completion) {
		const { Client } = require('pg');
		const client = new Client(this.databaseFilename);

		client.connect();

		client.query('CREATE TABLE recipes (num PRIMARY KEY, id TEXT, name TEXT)', (err, res) => {
			//var firstRecipe = jsonToSave["recipes"][0];
			/*client.query('INSERT INTO recipes (id, name) VALUES ($1::text, $2::text)', [firstRecipe["id"], firstRecipe["name"]], (err, res) => {
			  client.end()
			});*/

		  client.end()
		})

		  completion("Success!");
	}

	renderDatabase(completion) {
		const { Client } = require('pg');
		const client = new Client(this.databaseFilename);

		client.connect();
		client.query('SELECT * FROM arches', (err, res) => {
  		  completion(res.rows)
		  client.end()
		});
	}
}

module.exports = ArchesLoader;
