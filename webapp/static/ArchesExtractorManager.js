

class ArchesExtractorManager {
	constructor(completion) {
		this.completion = completion;
	}

	handleExtractionFile(file, fr, result) {
		var selfRef = this;
		var extractURL = window.location.href;
		if (extractURL.charAt(extractURL.length-1) != "/") {
			extractURL += "/";
		}
		extractURL += "extract";

        var arrayBuffer;
        var fileReader = new FileReader();
        fileReader.onload = function() {
            arrayBuffer = this.result;
            try {
	            let result = pako.ungzip(new Uint8Array(arrayBuffer), {"to": "string"});
	            let binaryResult = pako.ungzip(new Uint8Array(arrayBuffer), {"to": "binary"}); //document.getElementById("arches-extractor").files[0].getAsBinary();

	            let resultJSON = {"data" : result, "binary" : binaryResult};
	            var resultJSONString = JSON.stringify(resultJSON);
	            console.log("Sending " + resultJSONString);
				$.ajax({
				   url: extractURL,
				   type: 'POST',
				   data: resultJSONString,
				   contentType: "application/json",
				   success: function(d) {
				   	selfRef.completion(file, d);
				   },
				   error: function(d, e) {
				   	selfRef.completion(file, d);
				   }
				});
            } catch (err) {
              console.log("Error " + err);
            }
        };
        fileReader.readAsArrayBuffer(file);
	}
}