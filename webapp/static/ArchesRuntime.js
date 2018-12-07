
// EXTRACTOR API
requirejs(['static/ArchesExtractorManager', 'static/ArchesExtractorFrontend'], function(util) {
	const dragAndDropDivID = "arches-drag-n-drop";
	$("body").append("<div class='jumbotron' id='" + dragAndDropDivID + "'></div>");

	var extractorManager = new ArchesExtractorManager(function(data) {
		// transition to transform step
		console.log(data);
	});
	
	var extractor = new ArchesExtractorFrontend("#" + dragAndDropDivID, extractorManager);
	extractor.renderDragAndDropUI();
});
