var INDLISH_EXT = {};

const POPUP_CSS = 
	`
	/* Skin for Simple Dialog Box Plugin */
.indlish-dialog-box {
  width:300px;
  height:150px;
  background-color:white;
  border:1px solid #ccc;
  -webkit-box-shadow:0 1px 5px rgba(0,0,0,.2);
  -mz-box-shadow:0 1px 5px rgba(0,0,0,.2);
  box-shadow:0 1px 5px rgba(0,0,0,.2);
  position:absolute;
  width:200px;
  height:100px;
  margin-top:-51px;
  margin-left:-101px;
  z-index:9999;
  color:#666;
  visibility:hidden;
  opacity:0;
}
.indlish-dialog-box .indlish-dialog-title {
  margin:0;
  padding:0;
  font:inherit;
  color:inherit;
  font-weight:bold;
  height:2em;
  line-height:2em;
  overflow:hidden;
  padding:0 .8em;
  background-color:#eee;
  cursor:move;
}
.indlish-dialog-box .indlish-dialog-content {
  border-top:1px solid #ccc;
  padding:1em;
  position:absolute;
  top:2em;
  right:0;
  bottom:3em;
  left:0;
  overflow:auto;
}
.indlish-dialog-box .indlish-dialog-content iframe {
  display:block;
  border:none;
  background:none;
  margin:0;
  padding:0;
  overflow:auto;
  width:100%;
  height:100%;
}
.indlish-dialog-box .indlish-dialog-content::-webkit-scrollbar {
  width:8px;
  height:8px;
  background-color:#f5f5f5;
  border-left:1px solid #ccc;
}
.indlish-dialog-box .indlish-dialog-content::-webkit-scrollbar-thumb {
  background-color:#666;
  border:none;
}
.indlish-dialog-box .indlish-dialog-content::-webkit-scrollbar-thumb:hover {background-color:#555}
.indlish-dialog-box .indlish-dialog-content::-webkit-scrollbar-thumb:active {background-color:#444}
.indlish-dialog-box .indlish-dialog-action {
  position:absolute;
  right:0;
  bottom:0;
  left:0;
  height:2em;
  padding:.5em;
  background-color:#eee;
  border-top:1px solid #ccc;
  text-align:right;
}
.indlish-dialog-box .indlish-dialog-action .btn {
  text-decoration:none;
  border:none;
  outline:none;
  color:inherit;
  font-weight:bold;
  background-color:white;
  border:1px solid #ccc;
  -webkit-border-radius:.2em;
  -moz-border-radius:.2em;
  border-radius:.2em;
  padding:.4em 1em;
  margin-left:.2em;
  line-height:2em;
  cursor:pointer;
}
.indlish-dialog-box .indlish-dialog-close,
.indlish-dialog-box .indlish-dialog-minmax {
  border:none;
  outline:none;
  background:none;
  font:inherit;
  font-family:Arial,Sans-Serif;
  font-style:normal;
  font-weight:bold;
  font-size:150%;
  line-height:1.4em;
  color:#aaa;
  text-decoration:none;
  position:absolute;
  top:0;
  right:.3em;
  text-align:center;
  cursor:pointer;
}
.indlish-dialog-box .indlish-dialog-minmax {right:1.5em}
.indlish-dialog-box .indlish-dialog-close:focus,
.indlish-dialog-box .indlish-dialog-minmax:focus,
.indlish-dialog-box .indlish-dialog-action .btn:focus {
  border-width:0;
  outline:none;
}
.indlish-dialog-box .indlish-dialog-close:hover,
.indlish-dialog-box .indlish-dialog-minmax:hover {color:#777}
.indlish-dialog-box .indlish-dialog-close:focus,
.indlish-dialog-box .indlish-dialog-minmax:focus {color:#C90000}
.indlish-dialog-box .indlish-dialog-close:active,
.indlish-dialog-box .indlish-dialog-minmax:active {color:#444}
.indlish-dialog-box .indlish-dialog-action .btn:hover {border-color:#bbb}
.indlish-dialog-box .indlish-dialog-action .btn:focus {
  border-color:#aaa;
  border-width:1px;
}
.indlish-dialog-box .indlish-dialog-action .btn:active {
  border-color:#aaa;
  background-color:#f5f5f5;
}
.indlish-dialog-box + .indlish-dialog-box-overlay {
  background-color:black;
  opacity:.2;
  filter:alpha(opacity=20);
  position:fixed !important;
  position:absolute;
  top:0;
  right:0;
  bottom:0;
  left:0;
  z-index:9997;
  display:none;
}
.indlish-dialog-box.fixed-indlish-dialog-box {
  position:fixed !important;
  position:absolute;
  resize: both;
  overflow: auto;
}
.indlish-dialog-box.minimize {
  width:2em !important;
  height:2em !important;
  overflow:hidden !important;
  margin-top:0 !important;
  margin-left:0 !important;
  top:-1px !important;
  left:1em !important;
}
.indlish-dialog-box.minimize .indlish-dialog-title {
  color:transparent;
  text-shadow:none;
  text-indent:-9999px;
}
.indlish-dialog-box.minimize .indlish-dialog-minmax {
  right:0;
  left:0;
}
.indlish-dialog-box.minimize .indlish-dialog-close,
.indlish-dialog-box.minimize .indlish-dialog-content,
.indlish-dialog-box.minimize .indlish-dialog-action {
  display:none;
  visibility:hidden;
}
	`;
(function() {
	INDLISH_EXT.PopUp = PopUp;
	function PopUp() {
		var objRef = this;
		var uniqueId = new Date().getTime();
		var selected = null; // Object of the element to be moved
		
		var a = window;
		var b = document;
		
		init();
		
		dialog = b.getElementById('indlish-dialog-box-' + uniqueId), // The HTML of dialog box
		dialog_title = dialog.children[0],
		dialog_close = dialog.children[1],
		dialog_content = dialog.children[2],
		dialog_overlay = dialog.nextSibling;

		objRef.setDialog = setDialog;
		
		function init() {
			var div = b.createElement('div'),
			ovr = b.createElement('div');
			div.className = 'indlish-dialog-box';
			div.id = 'indlish-dialog-box-' + uniqueId;
			div.innerHTML = '<h3 class="indlish-dialog-title">&nbsp;</h3><a href="javascript:;" class="indlish-dialog-close" title="Close">&times;</a><div class="indlish-dialog-content">&nbsp;</div>';
			ovr.className = 'indlish-dialog-box-overlay';
			b.body.appendChild(div);
			b.body.appendChild(ovr);
		}
		
		function setDialog(set, config) {
			x_pos = 0,
			y_pos = 0, // Stores x & y coordinates of the mouse pointer
			x_elem = 0,
			y_elem = 0, // Stores top, left values (edge) of the element
			defaults = {
				title: dialog_title.innerHTML,
				content: dialog_content.innerHTML,
				width: 300,
				height: 150,
				top: 20,
				left: 30,
				buttons: {
					"Close": function() {
						setDialog('close');
					}
				},
				specialClass: "",
				fixed: true,
				overlay: false
			}; // Default options...

			for (var i in config) { defaults[i] = (typeof(config[i])) ? config[i] : defaults[i]; }

			dialog.className =  "indlish-dialog-box " + (defaults.fixed ? 'fixed-indlish-dialog-box ' : '') + defaults.specialClass;
			dialog.style.visibility = (set == "open") ? "visible" : "hidden";
			dialog.style.opacity = (set == "open") ? 1 : 0;
			dialog.style.width = defaults.width + 'px';
			dialog.style.height = defaults.height + 'px';
			dialog.style.top = (!defaults.top) ? "50%" : '0px';
			dialog.style.left = (!defaults.left) ? "50%" : '0px';
			dialog.style.marginTop = (!defaults.top) ? '-' + defaults.height/2 + 'px' : defaults.top + 'px';
			dialog.style.marginLeft = (!defaults.left) ? '-' + defaults.width/2 + 'px' : defaults.left + 'px';
			dialog_title.innerHTML = defaults.title;
			dialog_content.innerHTML = defaults.content;
			dialog_overlay.style.display = (set == "open" && defaults.overlay) ? "block" : "none";


			// Bind the draggable function here...
			dialog_title.onmousedown = function() {
				_drag_init(this.parentNode);
				return false;
			};

			dialog_close.onclick = function() {
				setDialog("close", {content:""});
			};

			b.onmousemove = _move_elem;
			b.onmouseup = _destroy;
		}
		
		// Will be called when user starts dragging an element
		function _drag_init(elem) {
			selected = elem; // Store the object of the element which needs to be moved
			x_elem = x_pos - selected.offsetLeft;
			y_elem = y_pos - selected.offsetTop;
		}

		// Will be called when user dragging an element
		function _move_elem(e) {
			x_pos = b.all ? a.event.clientX : e.pageX;
			y_pos = b.all ? a.event.clientY : e.pageY;
			if (selected !== null) {
				selected.style.left = !defaults.left ? ((x_pos - x_elem) + selected.offsetWidth/2) + 'px' : ((x_pos - x_elem) - defaults.left) + 'px';
				selected.style.top = !defaults.top ? ((y_pos - y_elem) + selected.offsetHeight/2) + 'px' : ((y_pos - y_elem) - defaults.top) + 'px';
			}
		}

		// Destroy the object when we are done
		function _destroy() {
			selected = null;
		}	
	};
	
	PopUp.getInstance = function () {
		if (!PopUp.instance) {
			PopUp.instance = new PopUp();
		}
		return PopUp.instance;
	};
})();
(function() {
	INDLISH_EXT.UnicodeMap = UnicodeMap;
	function UnicodeMap() {
		var objRef = this;
		var map = {};
		
		objRef.put = put;
		objRef.get = get;
		
		function put(key, value) {
			map[key] = value;
		}
		
		function get(key) {
			return map[key];
		}
	};
})();
(function() {
	INDLISH_EXT.TeluguConverter = TeluguConverter;
	function TeluguConverter() {
		var objRef = this;
		
		var unicodeMap = new INDLISH_EXT.UnicodeMap();
		unicodeMap.put("0C02", "m");   // ం
		unicodeMap.put("0C03", "ah");   // ః
		unicodeMap.put("0C05", "A");   // అ
		unicodeMap.put("0C06", "Aa");   // ఆ
		unicodeMap.put("0C07", "I");   // ఇ
		unicodeMap.put("0C08", "Ee");   // ఈ
		unicodeMap.put("0C09", "U");   // ఉ
		unicodeMap.put("0C0A", "Oo");   // ఊ
		unicodeMap.put("0C0B", "Ru");   // ఋ
		unicodeMap.put("0C0E", "E");   // ఎ
		unicodeMap.put("0C0F", "E");   // ఏ
		unicodeMap.put("0C10", "Ai");   // ఐ
		unicodeMap.put("0C12", "O");   // ఒ
		unicodeMap.put("0C13", "O");   // ఓ
		unicodeMap.put("0C14", "Av");   // ఔ
		
		unicodeMap.put("0C15", "K");   // క
		unicodeMap.put("0C16", "KH");   // ఖ
		unicodeMap.put("0C17", "G");   // గ
		unicodeMap.put("0C18", "GH");   // ఘ
		unicodeMap.put("0C19", "GN");   // ఙ
		unicodeMap.put("0C1A", "CH");   // చ
		unicodeMap.put("0C1B", "CH");   // ఛ
		unicodeMap.put("0C1C", "J");   // జ
		unicodeMap.put("0C1D", "JH");   // ఝ
		unicodeMap.put("0C1E", "IN");   // ఞ
		unicodeMap.put("0C1F", "T");   // ట
		unicodeMap.put("0C20", "T");   // ఠ
		unicodeMap.put("0C21", "D");   // డ
		unicodeMap.put("0C22", "D");   // ఢ
		unicodeMap.put("0C23", "N");   // ణ
		unicodeMap.put("0C24", "T");   // త
		unicodeMap.put("0C25", "TH");   // థ
		unicodeMap.put("0C26", "D");   // ద
		unicodeMap.put("0C27", "DH");   // ధ
		unicodeMap.put("0C28", "N");   // న
		unicodeMap.put("0C2A", "P");   // ప  
		unicodeMap.put("0C2B", "F");   // ఫ  
		unicodeMap.put("0C2C", "B");   // బ  
		unicodeMap.put("0C2D", "BH");   // భ  
		unicodeMap.put("0C2E", "M");   // మ
		unicodeMap.put("0C2F", "Y");   // య 
		unicodeMap.put("0C30", "R");   // ర 
		unicodeMap.put("0C31", "R");   // ఱ 
		unicodeMap.put("0C32", "L");   // ల  
		unicodeMap.put("0C33", "L");   // ళ 
		unicodeMap.put("0C35", "V");   // వ
		unicodeMap.put("0C36", "Sh");   // శ
		unicodeMap.put("0C37", "SH");   // ష
		unicodeMap.put("0C38", "S");   // స 
		unicodeMap.put("0C39", "H");   // హ 
		
		unicodeMap.put("0C3D", "a");   // ఽ
		unicodeMap.put("0C3E", "a");   // ా
		unicodeMap.put("0C3F", "i");   // ి
		unicodeMap.put("0C40", "ee");   // ీ
		unicodeMap.put("0C41", "u");   // ు
		unicodeMap.put("0C42", "oo");   // ూ
		unicodeMap.put("0C43", "ru");   // ృ
		unicodeMap.put("0C44", "roo");   // ౄ
		unicodeMap.put("0C46", "e");   // ె
		unicodeMap.put("0C47", "e");   // ే
		unicodeMap.put("0C48", "ai");   // ై
		unicodeMap.put("0C4A", "o");   // ొ
		unicodeMap.put("0C4B", "o");   // ో
		unicodeMap.put("0C4C", "av");   // ౌ
		unicodeMap.put("0C4D", "");   // ్ 
		
		var langBegin	= parseInt("0C00", 16);
		var langEnd		= parseInt("0C7F", 16);
		
		var consBegin	= parseInt("0C15", 16);
		var consEnd		= parseInt("0C39", 16);
		
		var anthraBegin	= parseInt("0C3D", 16);
		var anthraEnd	= parseInt("0C4D", 16);
		
		var sunnaBegin 	= parseInt("0C15", 16);
		var sunnaEnd  	= parseInt("0C28", 16);
		
		var sunnaCode 	= parseInt("0C02", 16);
		
		var vaCode 		= parseInt("0C35", 16);
		var halfChar	= parseInt("0C4D", 16);
		var shankarSCode= parseInt("0C36", 16);
		
		objRef.convert = convert;
		 
		function convert(data) {
			var englishRes = "";
			var strLen =  data.length;
			for (var i = 0; i < strLen; i++) {
				var code = data.charCodeAt(i);
				if (code >= langBegin && code <= langEnd) {
					var nextCode = null;
					var prevCode = null;
					
					if (i > 0) {
						prevCode = data.charCodeAt(i-1);
					}
					
					if (i < strLen-1) {
						nextCode = data.charCodeAt(i+1);
					}
					
					var unicode = code.toString(16);
					if (unicode.length == 3) {
						unicode = "0" + unicode;
					}
					
					unicode = unicode.toUpperCase();
					
					var letter = unicodeMap.get(unicode) != null ? unicodeMap.get(unicode) : data.charAt(i) + "";
					if (code >= consBegin && code <=consEnd) {
						//Handling Va case, using v and w
						if (code == vaCode && prevCode == halfChar) {
							letter = "w";
						}
						
						//Handling shankar sa
						if (code == shankarSCode && nextCode == halfChar) {
							letter = "s";
						}
						
						if (nextCode >= anthraBegin && nextCode <=anthraEnd) {
								
						} else {
								letter = letter + "a";
						}
					} else if(code == sunnaCode) {
						if (i < strLen-1) {
							var nextCode = data.charCodeAt(i+1);
							if (nextCode >= sunnaBegin && nextCode <=sunnaEnd) {
								letter = "n";
							} 
						}
					}
					
					englishRes += letter;
				} else {
					englishRes += data.charAt(i);
				}
			}
			if (englishRes) {
				englishRes = englishRes.toLowerCase();
			}
			return englishRes;
		}
    };
})();
(function() {
	INDLISH_EXT.HindiConverter = HindiConverter;
	function HindiConverter() {
		var objRef = this;
		
		var unicodeMap = new INDLISH_EXT.UnicodeMap();
		
		unicodeMap.put('0901', 'n');   // ँ
		unicodeMap.put('0902', 'n');   // ं
		unicodeMap.put('0903', 'ah');   // ः
		unicodeMap.put('0905', 'a');   // अ
		unicodeMap.put('0906', 'aa');   // आ
		unicodeMap.put('0907', 'i');   // इ
		unicodeMap.put('0908', 'Ee');   // ई
		unicodeMap.put('0909', 'u');   // उ
		unicodeMap.put('090A', 'oo');   // ऊ
		unicodeMap.put('090B', 'ru');   // ऋ
		unicodeMap.put('090D', '');   // ऍ
		unicodeMap.put('090E', '');   // ऎ
		unicodeMap.put('090F', 'e');   // ए
		unicodeMap.put('0910', 'ai');   // ऐ
		unicodeMap.put('0911', '');   // ऑ
		unicodeMap.put('0912', '');   // ऒ
		unicodeMap.put('0913', 'Vo');   // ओ
		unicodeMap.put('0914', 'Av');   // औ
		
		unicodeMap.put('0915', 'k');   // क
		unicodeMap.put('0916', 'kh');   // ख
		unicodeMap.put('0917', 'g');   // ग
		unicodeMap.put('0918', 'gh');   // घ
		unicodeMap.put('0919', '');   // ङ
		unicodeMap.put('091A', 'ch');   // च
		unicodeMap.put('091B', 'ch');   // छ
		unicodeMap.put('091C', 'j');   // ज
		unicodeMap.put('091D', 'jh');   // झ
		unicodeMap.put('091E', '');   // ञ
		unicodeMap.put('091F', 't');   // ट
		unicodeMap.put('0920', 't');   // ठ
		unicodeMap.put('0921', 'd');   // ड
		unicodeMap.put('0922', 'd');   // ढ
		unicodeMap.put('0923', 'n');   // ण
		unicodeMap.put('0924', 't');   // त
		unicodeMap.put('0925', 'th');   // थ
		unicodeMap.put('0926', 'd');   // द
		unicodeMap.put('0927', 'dh');   // ध
		unicodeMap.put('0928', 'n');   // न
		unicodeMap.put('0929', '');   // ऩ
		unicodeMap.put('092A', 'p');   // प
		unicodeMap.put('092B', 'f');   // फ
		unicodeMap.put('092C', 'b');   // ब
		unicodeMap.put('092D', 'bh');   // भ
		unicodeMap.put('092E', 'm');   // म
		unicodeMap.put('092F', 'y');   // य
		unicodeMap.put('0930', 'r');   // र
		unicodeMap.put('0931', '');   // ऱ
		unicodeMap.put('0932', 'l');   // ल
		unicodeMap.put('0933', '');   // ळ
		unicodeMap.put('0934', '');   // ऴ
		unicodeMap.put('0935', 'v');   // व
		unicodeMap.put('0936', 'sh');   // श
		unicodeMap.put('0937', 'sh');   // ष
		unicodeMap.put('0938', 's');   // स
		unicodeMap.put('0939', 'h');   // ह
		
		unicodeMap.put('093C', '');   // ़
		unicodeMap.put('093D', '');   // ऽ
		unicodeMap.put('093E', 'aa');   // ा
		unicodeMap.put('093F', 'i');   // ि
		unicodeMap.put('0940', 'ee');   // ी
		unicodeMap.put('0941', 'u');   // ु
		unicodeMap.put('0942', 'oo');   // ू
		unicodeMap.put('0943', 'ru');   // ृ
		unicodeMap.put('0944', 'roo');   // ॄ
		unicodeMap.put('0945', '');   // ॅ
		unicodeMap.put('0946', '');   // ॆ
		unicodeMap.put('0947', 'e');   // े
		unicodeMap.put('0948', 'ai');   // ै
		unicodeMap.put('0949', '');   // ॉ
		unicodeMap.put('094A', '');   // ॊ
		unicodeMap.put('094B', 'o');   // ो
		unicodeMap.put('094C', 'av');   // ौ
		unicodeMap.put('094D', '');   // ्
		
		unicodeMap.put('0950', '');   // ॐ
		unicodeMap.put('0951', '');   // ॑
		unicodeMap.put('0952', '');   // ॒
		unicodeMap.put('0953', '');   // ॓
		unicodeMap.put('0954', '');   // ॔
		
		unicodeMap.put('0958', 'K');   // क़
		unicodeMap.put('0959', 'Kh');   // ख़
		unicodeMap.put('095A', 'g');   // ग़
		unicodeMap.put('095B', 'j');   // ज़
		unicodeMap.put('095C', 'd');   // ड़
		unicodeMap.put('095D', 't');   // ढ़
		unicodeMap.put('095E', 'f');   // फ़
		unicodeMap.put('095F', 'y');   // य़
		unicodeMap.put('0960', 'Ri');   // ॠ
		unicodeMap.put('0961', '');   // ॡ
		
		
		var langBegin	= parseInt("0900", 16);
		var langEnd		= parseInt("097E", 16);
		
		var consBegin	= parseInt("0915", 16);
		var consEnd		= parseInt("0939", 16);
		
		var vowelBegin	= parseInt("0901", 16);
		var vowelEnd	= parseInt("0914", 16);
		
		var antraBegin	= parseInt("093C", 16);
		var antraEnd	= parseInt("094D", 16);
		
		var angCode 	= parseInt("0902", 16);
		
		var vaCode 		= parseInt("0935", 16);
		var shankarSCode= parseInt("0936", 16);
		
		var halfChar	=  parseInt("094D", 16);
		
		objRef.convert = convert;
		
		 
		function convert(data) {
			var englishRes = "";
			var strLen =  data.length;
			for (var i = 0; i < strLen; i++) {
				var code = data.charCodeAt(i);
				if (code >= langBegin && code <= langEnd) {
					var nextCode = null;
					var prevCode = null;
					
					if (i > 0) {
						prevCode = data.charCodeAt(i-1);
					}
					
					if (i < strLen-1) {
						nextCode = data.charCodeAt(i+1);
					}
					
					var unicode = code.toString(16);
					if (unicode.length == 3) {
						unicode = "0" + unicode;
					}
					
					unicode = unicode.toUpperCase();
					
					var letter = unicodeMap.get(unicode) != null ? unicodeMap.get(unicode) : data.charAt(i) + "";
					if (code >= consBegin && code <=consEnd) {
						//Handling Va case, using v and w
						if (code == vaCode && prevCode == halfChar) {
							letter = "w";
						}
						
						//Handling shankar sa
						if (code == shankarSCode && nextCode == halfChar) {
							letter = "s";
						}
						
						if ((nextCode >= consBegin && nextCode <=consEnd) || nextCode == angCode ) {
								letter = letter + "a";
						 }
					}
					
					englishRes += letter;
				} else {
					englishRes += data.charAt(i);
				}
			}
			if (englishRes) {
				englishRes = englishRes.toLowerCase();
			}
			return englishRes;
		}
    };
	
})();

(function() {
	INDLISH_EXT.KannadaConverter = KannadaConverter;
	function KannadaConverter() {
		var objRef = this;
		
		var unicodeMap = new INDLISH_EXT.UnicodeMap();
		
		unicodeMap.put("0C82", "m");   // ಂ
		unicodeMap.put("0C83", "ah");   // ಃ
		
		unicodeMap.put("0C85", "a");   // ಅ
		unicodeMap.put("0C86", "aa");   // ಆ
		unicodeMap.put("0C87", "i");   // ಇ
		unicodeMap.put("0C88", "ee");   // ಈ
		unicodeMap.put("0C89", "u");   // ಉ
		unicodeMap.put("0C8A", "00");   // ಊ
		unicodeMap.put("0C8B", "ru");   // ಋ
		unicodeMap.put("0C8C", "l");   // ಌ
		unicodeMap.put("0C8E", "e");   // ಎ
		unicodeMap.put("0C8F", "e");   // ಏ
		unicodeMap.put("0C90", "ai");   // ಐ
		unicodeMap.put("0C92", "o");   // ಒ
		unicodeMap.put("0C93", "oo");   // ಓ
		unicodeMap.put("0C94", "au");   // ಔ
		
		unicodeMap.put("0C95", "k");   // ಕ
		unicodeMap.put("0C96", "kh");   // ಖ
		unicodeMap.put("0C97", "g");   // ಗ
		unicodeMap.put("0C98", "gh");   // ಘ
		unicodeMap.put("0C99", "n");   // ಙ
		unicodeMap.put("0C9A", "ch");   // ಚ
		unicodeMap.put("0C9B", "ch");   // ಛ
		unicodeMap.put("0C9C", "j");   // ಜ
		unicodeMap.put("0C9D", "jh");   // ಝ
		unicodeMap.put("0C9E", "n");   // ಞ
		unicodeMap.put("0C9F", "t");   // ಟ
		unicodeMap.put("0CA0", "t");   // ಠ
		unicodeMap.put("0CA1", "d");   // ಡ
		unicodeMap.put("0CA2", "d");   // ಢ
		unicodeMap.put("0CA3", "n");   // ಣ
		unicodeMap.put("0CA4", "t");   // ತ
		unicodeMap.put("0CA5", "th");   // ಥ
		unicodeMap.put("0CA6", "d");   // ದ
		unicodeMap.put("0CA7", "dh");   // ಧ
		unicodeMap.put("0CA8", "n");   // ನ
		unicodeMap.put("0CAA", "p");   // ಪ
		unicodeMap.put("0CAB", "f");   // ಫ
		unicodeMap.put("0CAC", "b");   // ಬ
		unicodeMap.put("0CAD", "bh");   // ಭ
		unicodeMap.put("0CAE", "m");   // ಮ
		unicodeMap.put("0CAF", "y");   // ಯ
		unicodeMap.put("0CB0", "r");   // ರ
		unicodeMap.put("0CB1", "r");   // ಱ
		unicodeMap.put("0CB2", "l");   // ಲ
		unicodeMap.put("0CB3", "l");   // ಳ
		unicodeMap.put("0CB5", "v");   // ವ
		unicodeMap.put("0CB6", "sh");   // ಶ
		unicodeMap.put("0CB7", "sh");   // ಷ
		unicodeMap.put("0CB8", "s");   // ಸ
		unicodeMap.put("0CB9", "h");   // ಹ
		
		unicodeMap.put("0CBC", "");   // ಼
		unicodeMap.put("0CBD", "a");   // ಽ
		unicodeMap.put("0CBE", "a");   // ಾ
		unicodeMap.put("0CBF", "i");   // ಿ
		unicodeMap.put("0CC0", "ee");   // ೀ
		unicodeMap.put("0CC1", "u");   // ು
		unicodeMap.put("0CC2", "oo");   // ೂ
		unicodeMap.put("0CC3", "ru");   // ೃ
		unicodeMap.put("0CC4", "roo");   // ೄ
		unicodeMap.put("0CC6", "e");   // ೆ
		unicodeMap.put("0CC7", "e");   // ೇ
		unicodeMap.put("0CC8", "ai");   // ೈ
		unicodeMap.put("0CCA", "o");   // ೊ
		unicodeMap.put("0CCB", "oo");   // ೋ
		unicodeMap.put("0CCC", "au");   // ೌ
		unicodeMap.put("0CCD", "");   // ್

		unicodeMap.put("0CD5", "a");   // ೕ
		unicodeMap.put("0CD6", "");   // ೖ
		unicodeMap.put("0CDE", "");   // ೞ
		unicodeMap.put("0CE0", "");   // ೠ
		unicodeMap.put("0CE1", "");   // ೡ
		unicodeMap.put("0CE2", "");   // ೢ
		unicodeMap.put("0CE3", "");   // ೣ
		unicodeMap.put("0CE6", "");   // ೦
		unicodeMap.put("0CE7", "");   // ೧
		unicodeMap.put("0CE8", "");   // ೨
		unicodeMap.put("0CE9", "");   // ೩
		unicodeMap.put("0CEA", "");   // ೪
		unicodeMap.put("0CEB", "");   // ೫
		unicodeMap.put("0CEC", "");   // ೬
		unicodeMap.put("0CED", "");   // ೭
		unicodeMap.put("0CEE", "");   // ೮
		unicodeMap.put("0CEF", "");   // ೯
		unicodeMap.put("0CF1", "");   // ೱ
		unicodeMap.put("0CF2", "");   // ೲ
		
		
		var langBegin	= parseInt("0C80", 16);
		var langEnd		= parseInt("0CFF", 16);
		
		var consBegin = parseInt("0C95", 16);
		var consEnd	  = parseInt("0CB9", 16);
		
		var vowelBegin = parseInt("0C85", 16);
		var vowelEnd   = parseInt("0C94", 16);
		
		var anthraBegin	= parseInt("0CBC", 16);
		var anthraEnd	= parseInt("0CCD", 16);
		
		var vaCode 		= parseInt("0CB5", 16);
		var shankarSCode= parseInt("0CB6", 16);
		
		var halfChar	=  parseInt("0CCD", 16);
		
		var sunnaCode 	= parseInt("0C82", 16);
		var sunnaBegin 	= parseInt("0C95", 16);
		var sunnaEnd  	= parseInt("0CA8", 16);
		
		objRef.convert = convert;
		
	
		function convert(data) {
			var englishRes = "";
			var strLen =  data.length;
			for (var i = 0; i < strLen; i++) {
				var code = data.charCodeAt(i);
				if (code >= langBegin && code <= langEnd) {
					var nextCode = null;
					var prevCode = null;
					
					if (i > 0) {
						prevCode = data.charCodeAt(i-1);
					}
					
					if (i < strLen-1) {
						nextCode = data.charCodeAt(i+1);
					}
					
					var unicode = code.toString(16);
					if (unicode.length == 3) {
						unicode = "0" + unicode;
					}
					
					unicode = unicode.toUpperCase();
					
					var letter = unicodeMap.get(unicode) != null ? unicodeMap.get(unicode) : data.charAt(i) + "";
					if (code >= consBegin && code <=consEnd) {
						//Handling Va case, using v and w
						if (code == vaCode && prevCode == halfChar) {
							letter = "w";
						}
						
						//Handling shankar sa
						if (code == shankarSCode && nextCode == halfChar) {
							letter = "s";
						}
						
						if (nextCode >= anthraBegin && nextCode <=anthraEnd) {
								
						} else {
							letter = letter + "a";
						}
					} else if(code == sunnaCode) {
						if (i < strLen-1) {
							var nextCode = data.charCodeAt(i+1);
							if (nextCode >= sunnaBegin && nextCode <=sunnaEnd) {
								letter = "n";
							} 
						}
					}
					
					englishRes += letter;
				} else {
					englishRes += data.charAt(i);
				}
				
			}
			if (englishRes) {
				englishRes = englishRes.toLowerCase();
			}
			return englishRes;
		}
    };
})();

(function() {
	INDLISH_EXT.TamilConverter = TamilConverter;
	function TamilConverter() {
		var objRef = this;
		
		var unicodeMap = new INDLISH_EXT.UnicodeMap();
		
		unicodeMap.put("0B82", "");   // ஂ  / no char
		unicodeMap.put("0B83", "auk");   // ஃ   / aik
		unicodeMap.put("0B85", "a");   // அ   / a
		unicodeMap.put("0B86", "aa");   // ஆ   /aa
		unicodeMap.put("0B87", "i");   // இ  /e
		unicodeMap.put("0B88", "e");   // ஈ	/ee
		unicodeMap.put("0B89", "u");   // உ	/u
		unicodeMap.put("0B8A", "uu");   // ஊ 	/uu
		unicodeMap.put("0B8E", "ae");   // எ	/ae
		unicodeMap.put("0B8F", "aae");   // ஏ	/aae
		unicodeMap.put("0B90", "ai");   // ஐ	/ai
		unicodeMap.put("0B92", "o");   // ஒ	/ o
		unicodeMap.put("0B93", "oh");   // ஓ	/oh
		unicodeMap.put("0B94", "au");   // ஔ 	/aw
		unicodeMap.put("0B95", "k");   // க	/k 'a
		unicodeMap.put("0B99", "ng");   // ங	ng 'a
		unicodeMap.put("0B9A", "ch");   // ச	/ch 'a
		unicodeMap.put("0B9C", "j");   // ஜ	/j'a
		unicodeMap.put("0B9E", "ny");   // ஞ	/ ny 'a
		unicodeMap.put("0B9F", "d");   // ட	/ d 'a
		unicodeMap.put("0BA3", "nn");   // ண	/nn 'a	
		unicodeMap.put("0BA4", "th");   // த	/th'a
		unicodeMap.put("0BA8", "N");   // ந	/Nn'a
		unicodeMap.put("0BA9", "n");   // ன	/n'a
		unicodeMap.put("0BAA", "p");   // ப    /p'a
		unicodeMap.put("0BAE", "m");   // ம	/m'a
		unicodeMap.put("0BAF", "y");   // ய 	/y'a
		unicodeMap.put("0BB0", "r");   // ர		/r'a
		unicodeMap.put("0BB1", "r");   // ற	/rr'a
		unicodeMap.put("0BB2", "l");   // ல	/l'a
		unicodeMap.put("0BB3", "ll");   // ள	/ll'a
		unicodeMap.put("0BB4", "zh");   // ழ	/zh'a
		unicodeMap.put("0BB5", "v");   // வ	/v'a
		unicodeMap.put("0BB6", "");   // ஶ
		unicodeMap.put("0BB7", "sh");   // ஷ	/sh'a
		unicodeMap.put("0BB8", "sh");   // ஸ	/s'a
		unicodeMap.put("0BB9", "h");   // ஹ	/h'a
		unicodeMap.put("0BBE", "aa");   // ா	/a in suffix
		unicodeMap.put("0BBF", "i");   // ி	/i in suffix
		unicodeMap.put("0BC0", "e");   // ீ		/e in suffix
		unicodeMap.put("0BC1", "u");   // ு	/u in suffix
		unicodeMap.put("0BC2", "uu");   // ூ	/uw in suffix
		unicodeMap.put("0BC6", "a");   // ெ	/ae in suffix
		unicodeMap.put("0BC7", "ae");   // ே	/aae in suffix 
		unicodeMap.put("0BC8", "ai");   // ை	/ai in suffix
		unicodeMap.put("0BCA", "o");   // ொ	/o in suffix
		unicodeMap.put("0BCB", "oh");   // ோ	/oh in suffix
		unicodeMap.put("0BCC", "au");   // ௌ	/aw in suffix
		unicodeMap.put("0BCD", "");   // ்		/ i in prefix
		unicodeMap.put("0BD0", "om");   // ௐ	/om
		unicodeMap.put("0BD7", "la");   // ௗ
		unicodeMap.put("0BE6", "");   // ௦	
		unicodeMap.put("0BE7", "ka");   // ௧   	/ka
		unicodeMap.put("0BE8", "u");   // ௨	/u
		unicodeMap.put("0BE9", "");   // ௩
		unicodeMap.put("0BEA", "");   // ௪
		unicodeMap.put("0BEB", "ru");   // ௫	ru
		unicodeMap.put("0BEC", "kuu");   // ௬	/kuu
		unicodeMap.put("0BED", "a");   // ௭	/ae
		unicodeMap.put("0BEE", "a");   // ௮	/a
		unicodeMap.put("0BEF", "");   // ௯
		unicodeMap.put("0BF0", "");   // ௰
		unicodeMap.put("0BF1", "");   // ௱
		unicodeMap.put("0BF2", "");   // ௲
		unicodeMap.put("0BF3", "");   // ௳
		unicodeMap.put("0BF4", "");   // ௴
		unicodeMap.put("0BF5", "");   // ௵
		unicodeMap.put("0BF6", "");   // ௶
		unicodeMap.put("0BF7", "");   // ௷
		unicodeMap.put("0BF8", "");   // ௸
		unicodeMap.put("0BF9", "");   // ௹
		unicodeMap.put("0BFA", "");   // ௺
		
		
		var langBegin	= parseInt("0B82", 16);
		var langEnd		= parseInt("0BFA", 16);
		
		var consBegin	= parseInt("0B95", 16);
		var consEnd		= parseInt("0BB5", 16);
		
		var vowelBegin	= parseInt("0B85", 16);
		var vowelEnd	= parseInt("0B94", 16);
		
		var anthraBegin	= parseInt("0BBE", 16);
		var anthraEnd	= parseInt("0BCC", 16);
		
		var vaCode 		= parseInt("0BB5", 16);
		var shankarSCode= parseInt("0BB8", 16);
		
		var halfChar 	= parseInt("0BCD", 16);
		
		objRef.convert = convert;
		
		function convert(data) {
			var englishRes = "";
			var strLen =  data.length;
			for (var i = 0; i < strLen; i++) {
				var code = data.charCodeAt(i);
				if (code >= langBegin && code <= langEnd) {
					var nextCode = null;
					var prevCode = null;
					
					if (i > 0) {
						prevCode = data.charCodeAt(i-1);
					}
					
					if (i < strLen-1) {
						nextCode = data.charCodeAt(i+1);
					}
					
					var unicode = code.toString(16);
					if (unicode.length == 3) {
						unicode = "0" + unicode;
					}
					
					unicode = unicode.toUpperCase();
					
					var letter = unicodeMap.get(unicode) != null ? unicodeMap.get(unicode) : data.charAt(i) + "";
					if (code >= consBegin && code <=consEnd) {
						//Handling Va case, using v and w
						if (code == vaCode && prevCode == halfChar) {
							letter = "w";
						}
						
						//Handling shankar sa
						if (code == shankarSCode && nextCode == halfChar) {
							letter = "s";
						}
						
						if (nextCode >= anthraBegin && nextCode <= anthraEnd) {
							
						} else if (nextCode >= vowelBegin && nextCode <= vowelEnd) {
								
						} else if (nextCode == halfChar) {
							letter = "i" + letter;
						} else {
							letter = letter + "a";
						}
					}
					
					englishRes += letter;
					
					
				} else {
					englishRes += data.charAt(i);
				}
			}
			if (englishRes) {
				englishRes = englishRes.toLowerCase();
			}
			return englishRes;
		}
    };
})();

(function() {
	INDLISH_EXT.MalayalamConverter = MalayalamConverter;
	function MalayalamConverter() {
		var objRef = this;
		
		var unicodeMap = new INDLISH_EXT.UnicodeMap();
		
		unicodeMap.put('0901', 'n');   // ँ
		unicodeMap.put('0902', 'n');   // ं
		unicodeMap.put('0903', 'ah');   // ः
		unicodeMap.put('0905', 'a');   // अ
		unicodeMap.put('0906', 'aa');   // आ
		unicodeMap.put('0907', 'i');   // इ
		unicodeMap.put('0908', 'Ee');   // ई
		unicodeMap.put('0909', 'u');   // उ
		unicodeMap.put('090A', 'oo');   // ऊ
		unicodeMap.put('090B', 'ru');   // ऋ
		unicodeMap.put('090D', '');   // ऍ
		unicodeMap.put('090E', '');   // ऎ
		unicodeMap.put('090F', 'e');   // ए
		unicodeMap.put('0910', 'ai');   // ऐ
		unicodeMap.put('0911', '');   // ऑ
		unicodeMap.put('0912', '');   // ऒ
		unicodeMap.put('0913', 'Vo');   // ओ
		unicodeMap.put('0914', 'Av');   // औ
		
		unicodeMap.put('0915', 'k');   // क
		unicodeMap.put('0916', 'kh');   // ख
		unicodeMap.put('0917', 'g');   // ग
		unicodeMap.put('0918', 'gh');   // घ
		unicodeMap.put('0919', '');   // ङ
		unicodeMap.put('091A', 'ch');   // च
		unicodeMap.put('091B', 'ch');   // छ
		unicodeMap.put('091C', 'j');   // ज
		unicodeMap.put('091D', 'jh');   // झ
		unicodeMap.put('091E', '');   // ञ
		unicodeMap.put('091F', 't');   // ट
		unicodeMap.put('0920', 't');   // ठ
		unicodeMap.put('0921', 'd');   // ड
		unicodeMap.put('0922', 'd');   // ढ
		unicodeMap.put('0923', 'n');   // ण
		unicodeMap.put('0924', 't');   // त
		unicodeMap.put('0925', 'th');   // थ
		unicodeMap.put('0926', 'd');   // द
		unicodeMap.put('0927', 'dh');   // ध
		unicodeMap.put('0928', 'n');   // न
		unicodeMap.put('0929', '');   // ऩ
		unicodeMap.put('092A', 'p');   // प
		unicodeMap.put('092B', 'ph');   // फ
		unicodeMap.put('092C', 'b');   // ब
		unicodeMap.put('092D', 'bh');   // भ
		unicodeMap.put('092E', 'm');   // म
		unicodeMap.put('092F', 'y');   // य
		unicodeMap.put('0930', 'r');   // र
		unicodeMap.put('0931', '');   // ऱ
		unicodeMap.put('0932', 'l');   // ल
		unicodeMap.put('0933', '');   // ळ
		unicodeMap.put('0934', '');   // ऴ
		unicodeMap.put('0935', 'v');   // व
		unicodeMap.put('0936', 's');   // श
		unicodeMap.put('0937', 'sh');   // ष
		unicodeMap.put('0938', 's');   // स
		unicodeMap.put('0939', 'h');   // ह
		
		unicodeMap.put('093C', '');   // ़
		unicodeMap.put('093D', '');   // ऽ
		unicodeMap.put('093E', 'aa');   // ा
		unicodeMap.put('093F', 'i');   // ि
		unicodeMap.put('0940', 'ee');   // ी
		unicodeMap.put('0941', 'u');   // ु
		unicodeMap.put('0942', 'oo');   // ू
		unicodeMap.put('0943', 'ru');   // ृ
		unicodeMap.put('0944', 'roo');   // ॄ
		unicodeMap.put('0945', '');   // ॅ
		unicodeMap.put('0946', '');   // ॆ
		unicodeMap.put('0947', 'e');   // े
		unicodeMap.put('0948', 'ai');   // ै
		unicodeMap.put('0949', '');   // ॉ
		unicodeMap.put('094A', '');   // ॊ
		unicodeMap.put('094B', 'o');   // ो
		unicodeMap.put('094C', 'av');   // ौ
		unicodeMap.put('094D', '');   // ्
		
		unicodeMap.put('0950', '');   // ॐ
		unicodeMap.put('0951', '');   // ॑
		unicodeMap.put('0952', '');   // ॒
		unicodeMap.put('0953', '');   // ॓
		unicodeMap.put('0954', '');   // ॔
		
		unicodeMap.put('0958', 'K');   // क़
		unicodeMap.put('0959', 'Kh');   // ख़
		unicodeMap.put('095A', 'g');   // ग़
		unicodeMap.put('095B', 'j');   // ज़
		unicodeMap.put('095C', 'd');   // ड़
		unicodeMap.put('095D', 't');   // ढ़
		unicodeMap.put('095E', 'ph');   // फ़
		unicodeMap.put('095F', 'y');   // य़
		unicodeMap.put('0960', 'Ri');   // ॠ
		unicodeMap.put('0961', '');   // ॡ
		
		
		var langBegin	= parseInt("0900", 16);
		var langEnd		= parseInt("097E", 16);
		
		var consBegin	= parseInt("0915", 16);
		var consEnd		= parseInt("0939", 16);
		
		var vowelBegin	= parseInt("0901", 16);
		var vowelEnd	= parseInt("0914", 16);
		
		var antraBegin	= parseInt("093C", 16);
		var antraEnd	= parseInt("094D", 16);
		
		var angCode 	= parseInt("0902", 16);
		
		objRef.convert = convert;
		
		
		 
		function convert(data) {
			var englishRes = "";
			var strLen =  data.length;
			for (var i = 0; i < strLen; i++) {
				var code = data.charCodeAt(i);
				if (code >= langBegin && code <= langEnd) {
					var unicode = code.toString(16);
					if (unicode.length == 3) {
						unicode = "0" + unicode;
					}
					
					unicode = unicode.toUpperCase();
					
					var letter = unicodeMap.get(unicode) != null ? unicodeMap.get(unicode) : data.charAt(i) + "";
					if (code >= consBegin && code <=consEnd) {
						if (i < strLen-1) {
							var nextCode = data.charCodeAt(i+1);
							
							if ((nextCode >= consBegin && nextCode <=consEnd) || nextCode == angCode ) {
								letter = letter + "a";
							} 
						}
					}
					
					englishRes += letter;
				} else {
					englishRes += data.charAt(i);
				}
			}
			if (englishRes) {
				englishRes = englishRes.toLowerCase();
			}
			return englishRes;
		}
    };
})();

(function() {
	INDLISH_EXT.MarataConverter = MarataConverter;
	function MarataConverter() {
		var objRef = this;
		
		var unicodeMap = new INDLISH_EXT.UnicodeMap();
		unicodeMap.put("0C02", "m");   // ం
		unicodeMap.put("0C03", "ah");   // ః
		unicodeMap.put("0C05", "A");   // అ
		unicodeMap.put("0C06", "Aa");   // ఆ
		unicodeMap.put("0C07", "I");   // ఇ
		unicodeMap.put("0C08", "Ee");   // ఈ
		unicodeMap.put("0C09", "U");   // ఉ
		unicodeMap.put("0C0A", "Oo");   // ఊ
		unicodeMap.put("0C0B", "Ru");   // ఋ
		unicodeMap.put("0C0E", "E");   // ఎ
		unicodeMap.put("0C0F", "E");   // ఏ
		unicodeMap.put("0C10", "Ai");   // ఐ
		unicodeMap.put("0C12", "O");   // ఒ
		unicodeMap.put("0C13", "O");   // ఓ
		unicodeMap.put("0C14", "Av");   // ఔ
		
		unicodeMap.put("0C15", "K");   // క
		unicodeMap.put("0C16", "KH");   // ఖ
		unicodeMap.put("0C17", "G");   // గ
		unicodeMap.put("0C18", "GH");   // ఘ
		unicodeMap.put("0C19", "GN");   // ఙ
		unicodeMap.put("0C1A", "CH");   // చ
		unicodeMap.put("0C1B", "CH");   // ఛ
		unicodeMap.put("0C1C", "J");   // జ
		unicodeMap.put("0C1D", "JH");   // ఝ
		unicodeMap.put("0C1E", "IN");   // ఞ
		unicodeMap.put("0C1F", "T");   // ట
		unicodeMap.put("0C20", "T");   // ఠ
		unicodeMap.put("0C21", "D");   // డ
		unicodeMap.put("0C22", "D");   // ఢ
		unicodeMap.put("0C23", "N");   // ణ
		unicodeMap.put("0C24", "T");   // త
		unicodeMap.put("0C25", "TH");   // థ
		unicodeMap.put("0C26", "D");   // ద
		unicodeMap.put("0C27", "DH");   // ధ
		unicodeMap.put("0C28", "N");   // న
		unicodeMap.put("0C2A", "P");   // ప  
		unicodeMap.put("0C2B", "PH");   // ఫ  
		unicodeMap.put("0C2C", "B");   // బ  
		unicodeMap.put("0C2D", "BH");   // భ  
		unicodeMap.put("0C2E", "M");   // మ
		unicodeMap.put("0C2F", "Y");   // య 
		unicodeMap.put("0C30", "R");   // ర 
		unicodeMap.put("0C31", "R");   // ఱ 
		unicodeMap.put("0C32", "L");   // ల  
		unicodeMap.put("0C33", "L");   // ళ 
		unicodeMap.put("0C35", "V");   // వ
		unicodeMap.put("0C36", "S");   // శ
		unicodeMap.put("0C37", "SH");   // ష
		unicodeMap.put("0C38", "S");   // స 
		unicodeMap.put("0C39", "H");   // హ 
		
		unicodeMap.put("0C3D", "a");   // ఽ
		unicodeMap.put("0C3E", "a");   // ా
		unicodeMap.put("0C3F", "i");   // ి
		unicodeMap.put("0C40", "ee");   // ీ
		unicodeMap.put("0C41", "u");   // ు
		unicodeMap.put("0C42", "oo");   // ూ
		unicodeMap.put("0C43", "ru");   // ృ
		unicodeMap.put("0C44", "roo");   // ౄ
		unicodeMap.put("0C46", "e");   // ె
		unicodeMap.put("0C47", "e");   // ే
		unicodeMap.put("0C48", "ai");   // ై
		unicodeMap.put("0C4A", "o");   // ొ
		unicodeMap.put("0C4B", "o");   // ో
		unicodeMap.put("0C4C", "av");   // ౌ
		unicodeMap.put("0C4D", "");   // ్ 
		
		var langBegin	= parseInt("0C00", 16);
		var langEnd		= parseInt("0C7F", 16);
		
		var consBegin	= parseInt("0C15", 16);
		var consEnd		= parseInt("0C39", 16);
		
		var vowelBegin	= parseInt("0C3D", 16);
		var vowelEnd	= parseInt("0C4D", 16);
		
		var sunnaBegin 	= parseInt("0C15", 16);
		var sunnaEnd  	= parseInt("0C28", 16);
		
		var sunnaCode 	=  parseInt("0C02", 16);
		
		objRef.convert = convert;
		 
		function convert(data) {
			var englishRes = "";
			var strLen =  data.length;
			for (var i = 0; i < strLen; i++) {
				var code = data.charCodeAt(i);
				if (code >= langBegin && code <= langEnd) {
					var unicode = code.toString(16);
					if (unicode.length == 3) {
						unicode = "0" + unicode;
					}
					
					unicode = unicode.toUpperCase();
					
					var letter = unicodeMap.get(unicode) != null ? unicodeMap.get(unicode) : data.charAt(i) + "";
					if (code >= consBegin && code <=consEnd) {
						if (i < strLen-1) {
							var nextCode = data.charCodeAt(i+1);
							
							if (nextCode >= vowelBegin && nextCode <=vowelEnd) {
							} else {
								letter = letter + "a";
							}
						} else {
							letter = letter + "a";
						}
					} else if(code == sunnaCode) {
						if (i < strLen-1) {
							var nextCode = data.charCodeAt(i+1);
							if (nextCode >= sunnaBegin && nextCode <=sunnaEnd) {
								letter = "n";
							} 
						}
					}
					
					englishRes += letter;
				} else {
					englishRes += data.charAt(i);
				}
			}
			if (englishRes) {
				englishRes = englishRes.toLowerCase();
			}
			return englishRes;
		}
    };
})();
(function() {
	INDLISH_EXT.BengaliConverter = BengaliConverter;
	function BengaliConverter() {
		var objRef = this;
		
		var unicodeMap = new INDLISH_EXT.UnicodeMap();
		unicodeMap.put("0C02", "m");   // ం
		unicodeMap.put("0C03", "ah");   // ః
		unicodeMap.put("0C05", "A");   // అ
		unicodeMap.put("0C06", "Aa");   // ఆ
		unicodeMap.put("0C07", "I");   // ఇ
		unicodeMap.put("0C08", "Ee");   // ఈ
		unicodeMap.put("0C09", "U");   // ఉ
		unicodeMap.put("0C0A", "Oo");   // ఊ
		unicodeMap.put("0C0B", "Ru");   // ఋ
		unicodeMap.put("0C0E", "E");   // ఎ
		unicodeMap.put("0C0F", "E");   // ఏ
		unicodeMap.put("0C10", "Ai");   // ఐ
		unicodeMap.put("0C12", "O");   // ఒ
		unicodeMap.put("0C13", "O");   // ఓ
		unicodeMap.put("0C14", "Av");   // ఔ
		
		unicodeMap.put("0C15", "K");   // క
		unicodeMap.put("0C16", "KH");   // ఖ
		unicodeMap.put("0C17", "G");   // గ
		unicodeMap.put("0C18", "GH");   // ఘ
		unicodeMap.put("0C19", "GN");   // ఙ
		unicodeMap.put("0C1A", "CH");   // చ
		unicodeMap.put("0C1B", "CH");   // ఛ
		unicodeMap.put("0C1C", "J");   // జ
		unicodeMap.put("0C1D", "JH");   // ఝ
		unicodeMap.put("0C1E", "IN");   // ఞ
		unicodeMap.put("0C1F", "T");   // ట
		unicodeMap.put("0C20", "T");   // ఠ
		unicodeMap.put("0C21", "D");   // డ
		unicodeMap.put("0C22", "D");   // ఢ
		unicodeMap.put("0C23", "N");   // ణ
		unicodeMap.put("0C24", "T");   // త
		unicodeMap.put("0C25", "TH");   // థ
		unicodeMap.put("0C26", "D");   // ద
		unicodeMap.put("0C27", "DH");   // ధ
		unicodeMap.put("0C28", "N");   // న
		unicodeMap.put("0C2A", "P");   // ప  
		unicodeMap.put("0C2B", "PH");   // ఫ  
		unicodeMap.put("0C2C", "B");   // బ  
		unicodeMap.put("0C2D", "BH");   // భ  
		unicodeMap.put("0C2E", "M");   // మ
		unicodeMap.put("0C2F", "Y");   // య 
		unicodeMap.put("0C30", "R");   // ర 
		unicodeMap.put("0C31", "R");   // ఱ 
		unicodeMap.put("0C32", "L");   // ల  
		unicodeMap.put("0C33", "L");   // ళ 
		unicodeMap.put("0C35", "V");   // వ
		unicodeMap.put("0C36", "S");   // శ
		unicodeMap.put("0C37", "SH");   // ష
		unicodeMap.put("0C38", "S");   // స 
		unicodeMap.put("0C39", "H");   // హ 
		
		unicodeMap.put("0C3D", "a");   // ఽ
		unicodeMap.put("0C3E", "a");   // ా
		unicodeMap.put("0C3F", "i");   // ి
		unicodeMap.put("0C40", "ee");   // ీ
		unicodeMap.put("0C41", "u");   // ు
		unicodeMap.put("0C42", "oo");   // ూ
		unicodeMap.put("0C43", "ru");   // ృ
		unicodeMap.put("0C44", "roo");   // ౄ
		unicodeMap.put("0C46", "e");   // ె
		unicodeMap.put("0C47", "e");   // ే
		unicodeMap.put("0C48", "ai");   // ై
		unicodeMap.put("0C4A", "o");   // ొ
		unicodeMap.put("0C4B", "o");   // ో
		unicodeMap.put("0C4C", "av");   // ౌ
		unicodeMap.put("0C4D", "");   // ్ 
		
		var langBegin	= parseInt("0C00", 16);
		var langEnd		= parseInt("0C7F", 16);
		
		var consBegin	= parseInt("0C15", 16);
		var consEnd		= parseInt("0C39", 16);
		
		var vowelBegin	= parseInt("0C3D", 16);
		var vowelEnd	= parseInt("0C4D", 16);
		
		var sunnaBegin 	= parseInt("0C15", 16);
		var sunnaEnd  	= parseInt("0C28", 16);
		
		var sunnaCode 	=  parseInt("0C02", 16);
		
		objRef.convert = convert;
		
		 
		function convert(data) {
			var englishRes = "";
			var strLen =  data.length;
			for (var i = 0; i < strLen; i++) {
				var code = data.charCodeAt(i);
				if (code >= langBegin && code <= langEnd) {
					var unicode = code.toString(16);
					if (unicode.length == 3) {
						unicode = "0" + unicode;
					}
					
					unicode = unicode.toUpperCase();
					
					var letter = unicodeMap.get(unicode) != null ? unicodeMap.get(unicode) : data.charAt(i) + "";
					if (code >= consBegin && code <=consEnd) {
						if (i < strLen-1) {
							var nextCode = data.charCodeAt(i+1);
							
							if (nextCode >= vowelBegin && nextCode <=vowelEnd) {
							} else {
								letter = letter + "a";
							}
						} else {
							letter = letter + "a";
						}
					} else if(code == sunnaCode) {
						if (i < strLen-1) {
							var nextCode = data.charCodeAt(i+1);
							if (nextCode >= sunnaBegin && nextCode <=sunnaEnd) {
								letter = "n";
							} 
						}
					}
					
					englishRes += letter;
				} else {
					englishRes += data.charAt(i);
				}
			}
			if (englishRes) {
				englishRes = englishRes.toLowerCase();
			}
			return englishRes;
		}
    };
})();
( function()
{
	INDLISH_EXT.LanguageDetector = LanguageDetector;
	
	function LanguageDetector() {
		var objRef = this;
		objRef.getNonLatinText = getNonLatinText;
		objRef.checkLanguage = checkLanguage;
		objRef.getLanguageCodeList = getLanguageCodeList;
		
		var LANGUAGE_LIST = {
			Bengali : { code : 1, begin : parseInt("0900", 16), end: parseInt("0975", 16)},
			Hindi	: { code : 2, begin : parseInt("0900", 16), end: parseInt("0975", 16)},
			Kannada : { code : 3, begin : parseInt("0C80", 16), end: parseInt("0CFF", 16)},
			Malayalam 
					: { code : 4, begin : parseInt("0900", 16), end: parseInt("0975", 16)},
			Marata	: { code : 5, begin : parseInt("0900", 16), end: parseInt("0975", 16)},
			Tamil	: { code : 6, begin : parseInt("0B82", 16), end: parseInt("0BFA", 16)},
			Telugu	: { code : 7, begin : parseInt("0C00", 16), end: parseInt("0C7F", 16)}
		}
		
		var SUPPORTED_LANG = ["Hindi", "Kannada", "Tamil", "Telugu"];
		
		function getLanguageCodeList() {
			return LANGUAGE_LIST;
		}
		
		function checkLanguage(sampleText) {
			var langCount = {};
			for (var i=0; i<SUPPORTED_LANG.length; i++) {
				langCount[SUPPORTED_LANG[i]] = 0;
			}
			
			var textLength = sampleText.length;
			for(var i=0; i<textLength; i++) {
				var code = sampleText.charCodeAt(i);
				for (var j=0; j<SUPPORTED_LANG.length; j++) {
					var lang = SUPPORTED_LANG[j];
					var langBegin	= LANGUAGE_LIST[lang].begin;
					var langEnd		= LANGUAGE_LIST[lang].end;
					if (code >= langBegin && code <= langEnd) {
						langCount[lang]++;
						break;
					}
				}
			}
			
			var max = 0;
			var langCode = null;
			for (var i=0; i<SUPPORTED_LANG.length; i++) {
				if ( langCount[SUPPORTED_LANG[i]] > max) {
					max = langCount[SUPPORTED_LANG[i]];
					langCode = SUPPORTED_LANG[i];
				}
			}
			
			if (langCode != null && LANGUAGE_LIST[langCode] != null) {
				return LANGUAGE_LIST[langCode].code;
			}
			return 0;
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
	}
	
	LanguageDetector.getInstance = function () {
        if (!LanguageDetector.instance) {
        	LanguageDetector.instance = new LanguageDetector();
        }
        return LanguageDetector.instance;
    };
})();

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
		
		var languageDetector 	= INDLISH_EXT.LanguageDetector.getInstance();
		var TeluguConverter 	= INDLISH_EXT.TeluguConverter;
		var HindiConverter 		= INDLISH_EXT.HindiConverter;
		var TamilConverter 		= INDLISH_EXT.TamilConverter;
		var MalayalamConverter 	= INDLISH_EXT.MalayalamConverter;
		var KannadaConverter 	= INDLISH_EXT.KannadaConverter;
		var MarataConverter 	= INDLISH_EXT.MarataConverter;
		var BengaliConverter 	= INDLISH_EXT.BengaliConverter;
		
		
		var data = {language : null, text : selText};
		
		if (selText) {
			var sampleText = languageDetector.getNonLatinText(selText);
			if (sampleText == null || sampleText.length == 0) {
				data.language = "English";
				data.text = selText;
				return data;
			}
			
			var langCode = languageDetector.checkLanguage(sampleText);
			var langList = languageDetector.getLanguageCodeList();
			
			if (langCode == 0) {
				return data;
			}
			
			var language = null;
			var convertedText = null;
			
			switch(langCode) {
				case langList.Bengali.code:
					convertedText = new BengaliConverter().convert(selText);
					language = "Bengali";
					break;
				case langList.Hindi.code:
					convertedText = new HindiConverter().convert(selText);
					language = "Hindi";
					break;
				case langList.Kannada.code:
					convertedText = new KannadaConverter().convert(selText);
					language = "Kannada";
					break;
				case langList.Malayalam.code:
					convertedText = new MalayalamConverter().convert(selText);
					language = "Malayalam";
					break;
				case langList.Marata.code:
					convertedText = new MarataConverter().convert(selText);
					language = "Marata";
					break;
				case langList.Tamil.code:
					convertedText = new TamilConverter().convert(selText);
					language = "Tamil";
					break;
				case langList.Telugu.code:
					convertedText = new TeluguConverter().convert(selText);
					language = "Telugu";
					break;
			}
			
			data.language = language;
			data.text = convertedText;
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
