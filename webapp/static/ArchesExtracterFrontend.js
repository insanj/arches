
class ArchesExtractorFrontend {
	constructor(saveDataFile=null) {
		this.saveDataFile = saveDataFile;
	}

	renderDragAndDropUI(parentDivSelector) {
		const openFileInputDialogHTML = '<form><div class="form-group"><label for="exampleFormControlFile1">Example file input</label><input type="file" class="form-control-file" id="exampleFormControlFile1"></div></form>';
		$(parentDivSelector).html(openFileInputDialogHTML);

		/*if (this.saveDataFile == null) {
			//
		} else {
			///
		}*/
	}
}