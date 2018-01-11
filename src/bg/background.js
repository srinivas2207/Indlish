var domain;

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
	  var cmd = request.command;
	  
	  switch (cmd) {
		case "init":
			initPage();
			break;
		case "checkRunStatus":
			var state = isRunning();
			sendResponse({runState : state});
			break;
		case "start":
			start();
			break;
		case "pause":
			pause();
			break;
		case "stop":
			block();
			break;
		case  "pageLoad":
			initPage();
			setTimeout(initPageLoad, 1000);
			break;
	}
});

function isCodeInjected() {
	var state = localStorage[domain+"_inject"];	 
	if (state == undefined|| state == "false") {
		return false;
	} else {
		return true;
	}
}

function isRunning() {
	var state = localStorage[domain+"_state"];	 
	if (state == undefined|| state == "false") {
		return false;
	} else {
		return true;
	}
}

function isBlocked() {
	return localStorage[domain+"_block_always"];	 
}

function block() {
	setRunning(false);
	localStorage[domain+"_block_always"] = true; 
}

function start() {
	setRunning(true);
	localStorage[domain+"_block_always"] = false; 
}

function pause() {
	setRunning(false);
}

function setRunning(state) {
	localStorage[domain+"_state"] = state;
	if (state) {
		if (!isCodeInjected()) {
			injectCode();
		}
		addContextMenu();
	} else {
		removeContextmenu();
	}
}

function initPage() {
	chrome.tabs.getSelected(null, function (tab) {
			var url = new URL(tab.url)
			domain = url.hostname;
		});
}

function initPageLoad() {
	localStorage[domain+"_inject"] = false;
	var isBlcked = isBlocked();
	if (isBlcked == true || isBlcked == "true") {
	} else {
		start();
	}
}

function addContextMenu() {
	chrome.contextMenus.removeAll(function() {
        chrome.contextMenus.create({
            "title" : "IndLish Convert",
            "type" : "normal",
            "contexts" : ["selection"],
            "onclick" : convertText
        });
    });
}

function removeContextmenu() {
	chrome.contextMenus.removeAll();
}

function convertText(e) {
	var txt = e.selectionText;
	if (txt) {
		chrome.tabs.getSelected(null, function(tab) {
			chrome.tabs.sendMessage(tab.id, {type: "CONVERT_TEXT", data: txt});
		});
	}
}

function injectCode() {
	localStorage[domain+"_inject"] = true;
	const actualCode = `
		var s = document.createElement('script');
		s.src = chrome.extension.getURL('js/indlish_inject.js');
		s.onload = function() {
			this.remove();
		};
		(document.head || document.documentElement).appendChild(s);  `;

		chrome.tabs.executeScript(null, {code: actualCode, runAt: 'document_end'}, null);	
}