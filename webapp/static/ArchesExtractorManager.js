
class ArchesExtractorManager {
	constructor(completion) {
		this.completion = completion;
	}

	handleExtractionFile(file, fr, markup) {
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
	            let resultJSON = {"data" : result, "markup" : btoa(markup)};
	            var resultJSONString = JSON.stringify(resultJSON);
	            console.log("Sending data " + resultJSONString);
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