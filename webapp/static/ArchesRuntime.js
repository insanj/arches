
// EXTRACTOR API
requirejs(['static/ArchesExtractorManager', 'static/ArchesExtractorFrontend'], function(util) {
	const dragAndDropDivID = "arches-drag-n-drop";
	$("body").append("<div class='jumbotron' id='" + dragAndDropDivID + "'></div>");

	var extractorManager = new ArchesExtractorManager(function(data) {
		// transition to transform step
		$("#" + dragAndDropDivID).hide();

		const transformDivID = "arches-transform";
		$("body").append("<div class='jumbotron' id='" + transformDivID + "'></div>");
		$("#" + transformDivID).append("<h1 class='lead-1'>Transform</h1><hr/>");
		$("#" + transformDivID).append("<textarea style='width: 100%; height: 500px;'>" + data + "</textarea>");
	});
	
	var extractor = new ArchesExtractorFrontend("#" + dragAndDropDivID, extractorManager);
	extractor.renderDragAndDropUI();
});
