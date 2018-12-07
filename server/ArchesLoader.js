const randomColors = ["0074D9","7FDBFF","39CCCC","3D9970","2ECC40","01FF70","FFDC00","FF851B","FF4136","85144b","F012BE","B10DC9"];

class ArchesLoader {
	constructor(databaseFilename) {
		this.databaseFilename = databaseFilename;
	}

	selectAllFromPostgreSQL(db, selectSQLCompletion) {
		var buildTreePayloads = {};
		var buildTree = function(t) {
		    return t.map('SELECT * FROM payloads', [], p => {
		    	var payloadId = p["id"];
		    	// console.log("Selecting items from payload = " + JSON.stringify(p) + " with payload_id = "+ payloadId);

		    	buildTreePayloads[payloadId] = {"payload":p, "items":[]};
		        return t.any('SELECT * FROM items') // WHERE payload_id = ${payloadId}'
	            .then(i => {
	            	buildTreePayloads[payloadId]["items"] = buildTreePayloads[payloadId]["items"].concat([i]);
			    	// console.log("Found items = " + JSON.stringify(i));
	                return i;
	            });
		    }).then(t.batch); // settles the array of generated promises
		}

		var finishPostgreSQLSelect = function (dataArray) {
			// console.log("Got data " + JSON.stringify(dataArray));
	    	var resultString = "PostgreSQL Database Contents";
	    	for (var i in dataArray) {
	    		var dict = dataArray[i];
	    		var dataValue = JSON.stringify(dict, null, '\t');
	    		// var cleanedValue = dataValue.replace("_", " ").toUpperCase();
	    		var randomColorIdx = Math.floor(Math.random() * randomColors.length);
    		    var randomColor = randomColors[randomColorIdx];
	    		resultString += '<div class="card text-center text-white" style="background-color: #'+randomColor+';"><div class="card-body">' + dataValue + "</div></div>";
	    	}

	    	return resultString;
		}

		// console.log("Getting all from inventories database!");
		db.task(buildTree)
	    .then(function(data) {
	    	// console.log("Got inventory data = " + JSON.stringify(data));
	    	var resultString = finishPostgreSQLSelect(buildTreePayloads);
	    	// console.log("Finished up with " + resultString);
		  	selectSQLCompletion(resultString);
	    })
	    .catch(function(error) {
	    	// console.log("Failed to get stuff :( " + error);
		  	selectSQLCompletion(JSON.stringify(error));
	    });
	}

	addAllItemsFromJSONIntoPostgreSQL(inventoryItems, db, addAllItemsCompletion) {
		var selfRef = this;
		db.any('INSERT INTO payloads(e) VALUES ($1) RETURNING *', "v1.0")
		.then(data => {
			var payloadId = data[0]["id"];
			// console.log("Inserted payload with result = " + JSON.stringify(data) + " and id = " + payloadId);
			// console.log("addAllItemsFromJSONIntoPostgreSQL inserted new payload with id = " + payloadId + " from data = " + JSON.stringify(data));
		  	var selfRef = this;
			db.tx(t => {
				const queries = inventoryItems.map(item => {
					var itemIdentifier = item["id"];
					var jsonBlob = JSON.stringify(item);
					// console.log("Inserting item with id " + itemIdentifier + " into payload_id " + payloadId);
				    return t.none('INSERT INTO items(payload_id, name, jsonBlob) VALUES(${payloadId}, ${itemIdentifier}, ${jsonBlob})', {
				    	"payloadId":payloadId, 
				    	"itemIdentifier":itemIdentifier,
				    	"jsonBlob":jsonBlob
				    });
				});
				return t.batch(queries);
			})
			.then(data => {
			  	selfRef.selectAllFromPostgreSQL(db, addAllItemsCompletion);
			})
			.catch(error => {
				console.log("INSERT ITEM ERR addAllItemsFromJSONIntoPostgreSQL error = " + JSON.stringify(error))
			  	selfRef.selectAllFromPostgreSQL(db, addAllItemsCompletion);
			})
		})
		.catch(error => {
			console.log("INSERT PAYLOAD ERR addAllItemsFromJSONIntoPostgreSQL error = " + JSON.stringify(error))
		  	selfRef.selectAllFromPostgreSQL(db, addAllItemsCompletion);
		})		
	}

	loadJSONIntoPostgreSQL(jsonToSave, loadJSONCompletion) {
		var pgp = require('pg-promise')(/*options*/)

		var databaseUsername = 'postgres';
		var databasePassword = 'slide';
		var databaseHost = 'localhost';
		var databasePort = '5432';
		var databaseName = 'arches'
		var db = pgp('postgres://'+databaseUsername+':'+databasePassword+'@'+databaseHost+':'+databasePort+'/'+databaseName)
		var selfRef = this;

		var inventoryItems = jsonToSave["inventory"];

		db.tx(t => {
			const queries = [t.none("CREATE TABLE IF NOT EXISTS payloads (e VARCHAR(20), created TIMESTAMP, id SERIAL PRIMARY KEY)"), t.none("CREATE TABLE IF NOT EXISTS items (payload_id VARCHAR(200), name TEXT, jsonBlob TEXT)"), t.none('ALTER TABLE payloads ALTER COLUMN created SET DEFAULT now()')];
			return t.batch(queries);
		})
	    .then(data => {
	    	console.log("Created table");
		  	selfRef.addAllItemsFromJSONIntoPostgreSQL(inventoryItems, db, loadJSONCompletion);
		})
		.catch(error => {
	    	console.log("Failed to create table " + error);
		  	selfRef.addAllItemsFromJSONIntoPostgreSQL(inventoryItems, db, loadJSONCompletion);
		})
	}
}

module.exports = ArchesLoader;
