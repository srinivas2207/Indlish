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