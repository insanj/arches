
class ArchesExtractorManager {
	constructor(completion) {
		this.completion = completion;
	}

	handleExtractionFile(fr, result) {
		var selfRef = this;
		var extractURL = window.location.href;
		if (extractURL.charAt(extractURL.length-1) != "/") {
			extractURL += "/";
		}
		extractURL += "extract";

		$.ajax({
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
		});
	}
}