chrome.runtime.sendMessage({
		"command": "pageLoad"
	}, function(response) {
});

chrome.runtime.onMessage.addListener(
	function(request, sender) {
		if (request.type=="CONVERT_TEXT") {
			var txt = request.data;
			var domain = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
			window.postMessage({ type: 'CONVERT_TEXT', text: txt}, domain);
		}
	}
);
