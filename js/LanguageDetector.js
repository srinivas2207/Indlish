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