

class ArchesTransformer {
	constructor(completion) {
		this.completion = completion;
	}

	transformExtractedFile(file, data, completion) {

		// upload file for transform step then render the result
		// var formData = new FormData($('#arches-extractor')[0]);
		var formData = new FormData();
		formData.append("file", file);
		$.ajax({
		    url: '/transform',
		    type: 'POST',
		    contentType: false,
		    processData: false,
		    cache: false,
		    data: formData,
		    success: function(d) {
			    completion("Parsed NBT Format:\n------------\n" + d);
		    },
		    error: function(d) {
			    completion("Error Parsing:\n------------\n" + d);
		    }
		});
	}
}