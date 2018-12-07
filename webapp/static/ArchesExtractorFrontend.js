const arches_extractorDivID = "arches-extractor";
const arches_extractButtonID = "arches-extractor-done-button";

class ArchesExtractorFrontend {
	constructor(parentDivSelector, extractorManager, saveDataFile=null) {
		this.parentDivSelector = parentDivSelector;
		this.binaryDivId = 'arches-extractor-binary';
		this.saveDataFile = saveDataFile;
		this.extractorManager = extractorManager;
	}

	handleFinishedReadingTextFromFileUI(file, fr, markup) {
        $(this.parentDivSelector).append("<button type='button' class='btn btn-primary' id='"+arches_extractButtonID+"'><i class='fa fa-cog' aria-hidden='true'></i> Begin Transformation</button>");
        var selfRef = this;
        $("#" + arches_extractButtonID).on("click", function(e) {
        	selfRef.extractorManager.handleExtractionFile(file, fr, markup);
        });
	}

	renderBinaryDiv(tagName, innerHTML) {
        var elm;

        elm = document.createElement(tagName);
        elm.innerHTML = innerHTML;
        $("#" + this.binaryDivId).append(elm);
    }

    // Algorithm partially derived from https://stackoverflow.com/questions/3146483/html5-file-api-read-as-text-and-binary
	renderResultFromFileUI(userUploadedFile, label, fr, completion=null) {
        var markup, result, n, aByte, byteStr;

        markup = [];
        result = fr.result;
        for (n = 0; n < result.length; ++n) {
            aByte = result.charCodeAt(n);
            byteStr = aByte.toString(16);
            if (byteStr.length < 2) {
                byteStr = "0" + byteStr;
            }
            markup.push(byteStr);
        }
        
        $(this.parentDivSelector).append("<pre id='"+this.binaryDivId+"'></pre>");
        this.renderBinaryDiv("p", label + " (" + result.length + "):");
        this.renderBinaryDiv("pre", markup.join(" "));

        if (completion != null) {
	        completion(userUploadedFile, fr, result);
       	}
	}

	handleReadTextFromFileUI(userUploadedFile) {
		const reader = new FileReader();
		var selfRep = this;
		reader.onload = function(e) {
			selfRep.renderResultFromFileUI(userUploadedFile, "Binary", reader, function(file, fr, markup) {
				selfRep.handleFinishedReadingTextFromFileUI(file, fr, markup);
			});
		};

		reader.readAsBinaryString(userUploadedFile);
	}

	handleInputFileUploadedFromUI(userUploadedFile) {
		this.saveDataFile = userUploadedFile;

		const reader = new FileReader();
		var selfRep = this;
		reader.onload = function(e) {
			selfRep.renderResultFromFileUI(userUploadedFile, "Text", reader);
			selfRep.handleReadTextFromFileUI(userUploadedFile);
		};

		reader.readAsText(userUploadedFile);
	}

	renderDragAndDropUI() {
		const openFileLabelText = "<h1 class='lead-1'>Extract</h1><hr/>Find your Minecraft save data in <code>~/Library/Application Support/minecraft</code> or <code>%AppData%/.minecraft</code>.<br/>Once in a world save folder, select a <code>.dat</code> file from the <code>playerdata</code> directory.<br/><span class='text-muted'>Example: <code>1c37c117-a719-4b19-b6b4-01d97f39b326.dat</code></span>";
		const openFileInputDialogHTML = '<form><div class="form-group"><label for="'+arches_extractorDivID+'">'+openFileLabelText+'</label><input accept=".dat" type="file" class="form-control-file" id="'+arches_extractorDivID+'"></div></form>';
		$(this.parentDivSelector).html(openFileInputDialogHTML);

		var selfRep = this;
		$("#" + arches_extractorDivID).change(function(e) {
			$("#" + arches_extractorDivID).hide();
			if (e != null && e.target != null && e.target.files != null && e.target.files.length > 0) {
				selfRep.handleInputFileUploadedFromUI(e.target.files[0]);
			} else {
				return;
			}
		});

		/*if (this.saveDataFile == null) {
			//
		} else {
			///
		}*/
	}
}

