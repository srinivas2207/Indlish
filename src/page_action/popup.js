

function init() {
	sendMessage("init");
	initListeners();
	hide(document.getElementById("btnContainer"));
	
	setTimeout(function(){ 
		sendMessage("checkRunStatus");	
	}, 500);
}


function sendMessage(command) {
	chrome.runtime.sendMessage({
		"command": command
	}, function(response) {
		handleMessageCb(command, response);
	});
}

function handleMessageCb(command, response) {
	if(command === "checkRunStatus") {
		var status = response.runState;
		showContent(status);
	}
	
}

function showContent(isRunning) {
	show(document.getElementById("btnContainer"));
	
	if(!isRunning) {
		hide(document.getElementById("stop"));
		show(document.getElementById("start"));
		hide(document.getElementById("pause"));
	} else {
		show(document.getElementById("pause"));
		show(document.getElementById("stop"));
		hide(document.getElementById("start"));
	}
}

function show(elm) {
	elm.style.display = 'inline-block';
}

function hide(elm) {
	elm.style.display = 'none';
}

function initListeners() {
	document.getElementById("stop").addEventListener("click",function() { stop()});
	document.getElementById("pause").addEventListener("click", function() { pause()});
	document.getElementById("start").addEventListener("click", function() { start()});
}

function start() {
	sendMessage( "start");
	showContent(true);
}

function pause() {
	sendMessage("pause");
	showContent(false);
}

function stop() {
	sendMessage("stop");
	showContent(false);
}

document.addEventListener('DOMContentLoaded', init);