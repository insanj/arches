
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

		// derived from https://stackoverflow.com/questions/7431365/filereader-readasbinarystring-to-upload-files
		var xmlHttpRequest = new XMLHttpRequest();
		xmlHttpRequest.addEventListener("load", function() {
		   	selfRef.completion(this.responseText);
		});
		xmlHttpRequest.open("POST", '/extract', true);
		xmlHttpRequest.setRequestHeader("Content-Type", file.type);
		xmlHttpRequest.send(file);

		/*$.ajax({
		   url: extractURL,
		   type: 'POST',
		   data: result,
   		   contentType: false,
		   processData: false,
			crossDomain: true,
		   success: function(d) {
		   	selfRef.completion(d);
		   },
		   error: function(d, e) {
		   	selfRef.completion(d);
		   }
		});*/
	}
}