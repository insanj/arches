
class ArchesTransformer {
	constructor(nbtParsedData) {
		this.nbtParsedData = nbtParsedData;
	}

	getRecipesJSONFromData(data) {
		if (data["recipeBook"] != null) {
			const recipesBookDict = data["recipeBook"]["value"];
			const recipesValueDict = recipesBookDict["recipes"]["value"];
			const recipesList = recipesValueDict["value"];
			var transformedRecipes = [];
			for (var i in recipesList) {
				var r = recipesList[i];
				transformedRecipes.push(r.replace("minecraft:", ""))
			}
			return transformedRecipes;
		} else {
			return null;
		}
	}

	getInventoryJSONFromData(data) {
		if (data["Inventory"] != null) {
			const inventoryDict = data["Inventory"]["value"];
			const inventoryList = inventoryDict["value"];
			var transformedItems = [];
			for (var i in inventoryList) {
				var inventoryItem = inventoryList[i];
				var itemJSON = {
					"id" : inventoryItem["id"]["value"].replace("minecraft:", ""),
					"slot" : inventoryItem["Slot"]["value"],
					"count" : inventoryItem["Count"]["value"],
					"damage" : inventoryItem["Damage"] ? inventoryItem["Damage"]["value"] : "unknown"
				}

				transformedItems.push(itemJSON)
			}
			return transformedItems;
		} else {
			return null;
		}
	}

	createJSONObjectFromData(data) {
		var jsonDict = {};
		jsonDict["inventory"] = this.getInventoryJSONFromData(data);
		jsonDict["recipes"] = this.getRecipesJSONFromData(data);
		return jsonDict;
	}

	render() {
		var jsonData = this.nbtParsedData.value;
		var jsonObject = this.createJSONObjectFromData(jsonData);
		return JSON.stringify(jsonObject, null, '\t');
	}
}

module.exports = ArchesTransformer;


