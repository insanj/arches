

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
	            let resultJSON = {"data" : result};
	            var resultJSONString = JSON.stringify(resultJSON);
	            console.log("Sending " + resultJSONString);
				$.ajax({
				   url: extractURL,
				   type: 'POST',
				   data: resultJSONString,
				   contentType: "application/json",
				   success: function(d) {
				   	selfRef.completion(d);
				   },
				   error: function(d, e) {
				   	selfRef.completion(d);
				   }
				});
            } catch (err) {
              console.log("Error " + err);
            }
        };
        fileReader.readAsArrayBuffer(file);

		// derived from https://stackoverflow.com/questions/7431365/filereader-readasbinarystring-to-upload-files
		/*var xmlHttpRequest = new XMLHttpRequest();
		xmlHttpRequest.addEventListener("load", function() {
		   	selfRef.completion(this.responseText);
		});
		xmlHttpRequest.open("POST", '/extract', true);
		xmlHttpRequest.setRequestHeader("Content-Type", file.type);
		xmlHttpRequest.send(file);*/

	}
}