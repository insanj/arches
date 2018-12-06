
// EXTRACTOR API
requirejs(['static/ArchesExtractorFrontend'], function(util) {
	const dragAndDropDivID = "arches-drag-n-drop";
	$("body").append("<div id='" + dragAndDropDivID + "'></div>");

	var extractor = new ArchesExtractorFrontend();
	extractor.renderDragAndDropUI("#" + dragAndDropDivID);
});