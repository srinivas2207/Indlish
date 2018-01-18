# Indlish

<p>This chrome extension detects and converts Indian language script into readable English.
It will be useful for the people, who can understand the language but can't read/write.</p>
<p>To read a text in English, Select the text and click on IndLish Covert context menu.</p>


Supported Languages:
1. Bengali
2. Hindi
3. Kannada
4. Malayalam
5. Marata
6. Tamil
7. Telugu

Code Generation
----------------
<p>
All the JS files inside JS folder need to be merged into one file <b>indlish_inject.js</b>
This file get injected into the web pages by bg/background.js
  </p>
  
 <p>
  To generated the merged file run <b>ant merge</b>  inside JS folder.
  </p>



Installation
------------
1.	Download the project and keep it in some location. (UnZip if downloaded as ZIP)
2.	Go to chrome extensions page (**chrome://extensions/**)
3.	Enable **developer mode**.
4.	Click on **Load Unpacked Extension** and select the extracted folder.
5.	If there’s no error it will show the extension on chrome’s top right corner.
