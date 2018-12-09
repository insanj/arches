const randomColors = ["0074D9","7FDBFF","39CCCC","3D9970","2ECC40","FFDC00","FF851B","FF4136","85144b","F012BE","B10DC9"];

class ArchesLoader {
	constructor(databaseFilename) {
		this.databaseFilename = databaseFilename;
	}

	selectAllFromPostgreSQL(db, selectSQLCompletion) {
		var buildTreePayloads = {};
		var buildTree = function(t) {
		    return t.map('SELECT * FROM payloads', [], p => {
		    	var payloadId = p["id"];

		    	buildTreePayloads[payloadId] = {"payload":p, "items":[]};
		        return t.any('SELECT * FROM items WHERE payload_id LIKE ${payloadId}', {
		        	"payloadId":String(payloadId)
		        })
	            .then(i => {
	            	buildTreePayloads[payloadId]["items"] = buildTreePayloads[payloadId]["items"].concat([i]);
	                return i;
	            });
		    }).then(t.batch);
		}

		var finishPostgreSQLSelect = function (dataArray) {
	    	var resultString = "PostgreSQL Database Contents";
	    	for (var i in dataArray) {
	    		var dict = dataArray[i];
	    		// dict["items"] = JSON.stringify(dict["items"], null, 4)
	    		var dataValue = JSON.stringify(dict, null, 4)
	    		// var cleanedValue = dataValue.replace("_", " ").toUpperCase();
	    		var randomColorIdx = Math.floor(Math.random() * randomColors.length);
    		    var randomColor = randomColors[randomColorIdx];
	    		resultString += '<div class="card text-center text-white" style="background-color: #'+randomColor+';"><div class="card-body text-left"><textarea style="width: 100%; height: 500px;">' + dataValue + "</textarea></div></div>";
	    	}

	    	return resultString;
		}

		db.task(buildTree)
	    .then(function(data) {
	    	var resultString = finishPostgreSQLSelect(buildTreePayloads);
		  	selectSQLCompletion(resultString);
	    })
	    .catch(function(error) {
	    	console.log("Failed to get stuff :( " + error);
		  	selectSQLCompletion(JSON.stringify(error));
	    });
	}

	addAllItemsFromJSONIntoPostgreSQL(inventoryItems, db, addAllItemsCompletion) {
		var selfRef = this;
		db.any('INSERT INTO payloads(e) VALUES ($1) RETURNING *', "v1.0")
		.then(data => {
			var payloadId = data[0]["id"];
		  	var selfRef = this;
			db.tx(t => {
				const queries = inventoryItems.map(item => {
					var itemIdentifier = item["id"];
					var jsonBlob = JSON.stringify(item);
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

		var databaseUsername = process.env.SQL_USER;
		var databasePassword = process.env.SQL_PASSWORD;
		var databaseHost = process.env.INSTANCE_CONNECTION_NAME ? '/cloudsql/' + process.env.INSTANCE_CONNECTION_NAME : "localhost";
		var databasePort = 5432;
		var databaseName = process.env.SQL_DATABASE;
		var databaseConfig = {
		    host: databaseHost,
		    port: databasePort,
		    database: databaseName,
		    user: databaseUsername,
		    password: databasePassword
		};

		var db = pgp(databaseConfig);
		var selfRef = this;

		var inventoryItems = jsonToSave["inventory"];

		db.tx(t => {
			const queries = [t.none("CREATE TABLE IF NOT EXISTS payloads (e VARCHAR(20), created TIMESTAMP, id SERIAL PRIMARY KEY)"), t.none("CREATE TABLE IF NOT EXISTS items (payload_id TEXT, name TEXT, jsonBlob TEXT)"), t.none('ALTER TABLE payloads ALTER COLUMN created SET DEFAULT now()')];
			return t.batch(queries);
		})
	    .then(data => {
		  	selfRef.addAllItemsFromJSONIntoPostgreSQL(inventoryItems, db, loadJSONCompletion);
		})
		.catch(error => {
	    	console.log("Failed to create table " + error);
		  	selfRef.addAllItemsFromJSONIntoPostgreSQL(inventoryItems, db, loadJSONCompletion);
		})
	}
}

module.exports = ArchesLoader;
