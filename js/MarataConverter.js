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