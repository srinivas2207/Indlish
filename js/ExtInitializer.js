
(function() {
	init();
	
	function init() {
		initCss();
		messageListener();
	}
	
	function initCss() {
		var cssPanel = POPUP_CSS;
		var css = document.createElement("style");
		css.type = "text/css";
		css.innerHTML = cssPanel;
		document.body.appendChild(css);
	}
	
	function messageListener(){
		window.addEventListener("message", function(event) {
				if (event.source != window)
					return;

				if (event.data.type && (event.data.type == "CONVERT_TEXT")) {
					var data = convertText(event.data.text);
					showPopUp(data);
				}
			}, false);
	}
	
	function showPopUp(data) {
		var popUp = INDLISH_EXT.PopUp.getInstance();
		if(data) {
			var coord = getSelectionCoords();
			var title = "IndLish" + (data.language ? (" - " + data.language) : ""); 
			var content = data.language ? data.text : "Unable to detect language.";
			var content = titleCase(content);
			
			var config = {
				title: title, 
				content: content,
				width: (coord.w > 600 ? 600 : (coord.w < 200 ? 200 : coord.w)),
				height:(coord.h < 150 ? 150 : coord.h) + 20,
				top: coord.y + coord.h + 10,
				left: coord.x
			};
			
			popUp.setDialog('open', config);
		}
	}
	
	function titleCase(str) {
	  return str.toLowerCase().split(' ').map(function(word) {
		var upperCase = word[0];
		try {
			upperCase = word[0].toUpperCase();
		}catch(e){}
		return word.replace(word[0],upperCase);
	  }).join(' ');
	}
	
	function getSelectionCoords() {
		var win = window;
		var doc = win.document;
		var sel = doc.selection, range, rects, rect;
		var x = 0, y = 0;
		var h = 0, w = 0;
		if (sel) {
			if (sel.type != "Control") {
				range = sel.createRange();
				range.collapse(true);
				x = range.boundingLeft;
				y = range.boundingTop;
				w = range.boundingWidth;
				h = range.boundingHeight;
			}
		} else if (win.getSelection) {
			sel = win.getSelection();
			if (sel.rangeCount) {
				range = sel.getRangeAt(0).cloneRange();
				if (range.getBoundingClientRect) {
					var rect = range.getBoundingClientRect();
					w = rect.right - rect.left;
					h = rect.bottom - rect.top;
				}
				
				if (range.getClientRects) {
					range.collapse(true);
					rects = range.getClientRects();
					if (rects.length > 0) {
						rect = rects[0];
					}
					x = rect.left;
					y = rect.top;
				}
				// Fall back to inserting a temporary element
				if (x == 0 && y == 0) {
					var span = doc.createElement("span");
					if (span.getClientRects) {
						// Ensure span has dimensions and position by
						// adding a zero-width space character
						span.appendChild( doc.createTextNode("\u200b") );
						range.insertNode(span);
						rect = span.getClientRects()[0];
						x = rect.left;
						y = rect.top;
						var spanParent = span.parentNode;
						spanParent.removeChild(span);

						// Glue any broken text nodes back together
						spanParent.normalize();
					}
				}
			}
		}
		
		x = x < 0 ? 10 : x;
		y = y < 0 ? 10 : y;
		
		return { x: x, y: y, w: w, h: h};
	}
	
	function convertText(selText) {
		
		var TeluguConverter 	= INDLISH_EXT.TeluguConverter;
		var HindiConverter 		= INDLISH_EXT.HindiConverter;
		var TamilConverter 		= INDLISH_EXT.TamilConverter;
		var MalayalamConverter 	= INDLISH_EXT.MalayalamConverter;
		var KannadaConverter 	= INDLISH_EXT.KannadaConverter;
		var MarataConverter 	= INDLISH_EXT.MarataConverter;
		var BengaliConverter 	= INDLISH_EXT.BengaliConverter;
		
		var data = {language : null, text : selText};
		
		if (selText) {
			
			var sampleText = getNonLatinText(selText);
			
			if (sampleText == null) {
				data.language = "English";
				data.text = selText;
				return data;
			}
			
			
			// Telugu converter
			var teluguConverter = new TeluguConverter();
			if (teluguConverter.checkLanguage(sampleText)) {
				data.language = "Telugu";
				data.text = teluguConverter.convert(selText);
				return data;
			}
			
			// Hindi converter
			var hindiConverter = new HindiConverter();
			if (hindiConverter.checkLanguage(sampleText)) {
				data.language = "Hindi";
				data.text = hindiConverter.convert(selText);
				return data;
			}
			
			// Kannada converter
			var kannadaConverter = new KannadaConverter();
			if (kannadaConverter.checkLanguage(sampleText)) {
				data.language = "Kannada";
				data.text = kannadaConverter.convert(selText);
				return data;
			}
			
			// Tamil converter
			var tamilConverter = new TamilConverter();
			if (tamilConverter.checkLanguage(sampleText)) {
				data.language = "Tamil";
				data.text = tamilConverter.convert(selText);
				return data;
			}
			
			// Malayalam converter
			var malayalamConverter = new MalayalamConverter();
			if (malayalamConverter.checkLanguage(sampleText)) {
				data.language = "Malayalam";
				data.text = malayalamConverter.convert(selText);
				return data;
			}
			
			// Marata converter
			var marataConverter = new MarataConverter();
			if (marataConverter.checkLanguage(sampleText)) {
				data.language = "Marati";
				data.text = marataConverter.convert(selText);
				return data;
			}
			
			// Bengali converter
			var bengaliConverter = new BengaliConverter();
			if (bengaliConverter.checkLanguage(sampleText)) {
				data.language = "Bengali";
				data.text = bengaliConverter.convert(selText);
				return data;
			}
		}
		return data;
	}
	
	function getNonLatinText(selText) {
		selText = selText.replace(/\s/g, "X");
		
		var langBegin	= parseInt("0020", 16);
		var langEnd		= parseInt("007F", 16);
		
		var randomCheckLength = selText.length > 4 ? 4 : selText.length;
		var falseCount = 0;
		var text = "";
			
		for(var i=0; i<randomCheckLength; i++) {
			var index = Math.floor(Math.random() * selText.length);
			var code = selText.charCodeAt(index);
			if (code >= langBegin && code <= langEnd) {
				falseCount++;
				i--;
				if (falseCount >= randomCheckLength) {
					return null;
				}
			} else {
				text += selText[index];
			}
		}
		return text;		
	}
	
	
})();