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