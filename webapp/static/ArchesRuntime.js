const dragAndDropDivID = "arches-drag-n-drop";
const transformDivID = "arches-transform";
const loadDivID = "arches-load";

// Runtime
function arches_transform(jsonData) {
	// add to database as object
	$.ajax({
	   url: "/transform",
	   type: 'POST',
	   data: jsonData,
	   contentType: "application/json",
	   success: function(loadDataResponse) {
			$("#" + transformDivID).hide();
			$("body").append("<div class='jumbotron' id='" + loadDivID + "'></div>");
			$("#" + loadDivID).html("<h1 class='lead-1'>Load</h1><hr/>" + loadDataResponse);
			console.log(loadDataResponse);
	   },
	   error: function(d, e) {
	   	console.log(e);
	   }
	});
}

// Extract
function arches_extract() {
	$("body").append("<div class='jumbotron' id='" + dragAndDropDivID + "'></div>");

	var extractorManager = new ArchesExtractorManager(function(file, jsonResponseString) {
		var jsonResponse = JSON.parse(jsonResponseString);
		$("#" + dragAndDropDivID).hide();


		$("body").append("<div class='jumbotron' id='" + transformDivID + "'></div>");
		$("#" + transformDivID).append("<h1 class='lead-1'>Transform</h1><hr/>");
		//$("#" + transformDivID).append("<textarea style='width: 100%; height: 500px;'>" + transformedData + "</textarea>");

		var data = "Step Three\nArches JSON:\n\n" + jsonResponse["json"];
		data += "\n\nStep Two\nMinecraft NBT:\n\n" + jsonResponse["nbt"];
		data += "\n\nStep One\nMinecraft Binary:\n\n" + JSON.stringify(jsonResponse["binary"]);
		$("#" + transformDivID).append("<textarea style='width: 100%; height: 500px;'>" + data + "</textarea>");

		const transformButtonID = "arches-transform-begin";
        $("#" + transformDivID).append("<button type='button' class='btn btn-primary' id='"+transformButtonID+"'><i class='fa fa-cog' aria-hidden='true'></i> Finish Transformation</button>");
        var selfRef = this;
        $("#" + transformButtonID).on("click", function(e) {
        	arches_transform(jsonResponse["json"]);
        });
	});	
	
	var extractor = new ArchesExtractorFrontend("#" + dragAndDropDivID, extractorManager);
	extractor.renderDragAndDropUI();
}

// Transform

requirejs(['static/ArchesExtractorManager', 'static/ArchesExtractorFrontend'], function(util) {
	arches_extract();
});
