const randomColors = ["0074D9","7FDBFF","39CCCC","3D9970","2ECC40","01FF70","FFDC00","FF851B","FF4136","85144b","F012BE","B10DC9"];

class ArchesLoader {
	constructor(databaseFilename) {
		this.databaseFilename = databaseFilename;
	}

	selectAllFromPostgreSQL(db, selectSQLCompletion) {
		console.log("Getting all from inventories database!");
		db.any('SELECT * FROM inventories')
	    .then(function(dataArray) {
	    	console.log("Got data " + JSON.stringify(dataArray));
	    	var resultString = "PostgreSQL Database Contents";
	    	for (var i in dataArray) {
	    		var dict = dataArray[i];
	    		var dataValue = dict["name"];
	    		var cleanedValue = dataValue.replace("_", " ").toUpperCase();
	    		var randomColorIdx = Math.floor(Math.random() * randomColors.length);
    		    var randomColor = randomColors[randomColorIdx];
	    		resultString += '<div class="card text-center text-white" style="background-color: #'+randomColor+';"><div class="card-body">' + cleanedValue + "</div></div>";
	    	}

	    	console.log("Finished up with " + resultString);
		  	selectSQLCompletion(resultString);
	    })
	    .catch(function(error) {
	    	console.log("Failed to get stuff :( " + error);
		  	selectSQLCompletion(JSON.stringify(error));
	    });
	}

	addAllItemsFromJSONIntoPostgreSQL(inventoryItems, db, addAllItemsCompletion) {
		var selfRef = this;
		db.tx(t => {
			const queries = inventoryItems.map(item => {
				console.log(item);
				var itemIdentifier = item["id"];
				console.log(itemIdentifier);
			    return t.none('INSERT INTO inventories(name) VALUES($1)', itemIdentifier);
			});
			return t.batch(queries);
		})
		.then(data => {
		  	selfRef.selectAllFromPostgreSQL(db, addAllItemsCompletion);
		})
		.catch(error => {
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
		console.log(inventoryItems);

	    db.none("CREATE TABLE IF NOT EXISTS inventories (name TEXT)")
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
