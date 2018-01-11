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