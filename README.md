# remote-css-injector

 A real-time CSS injector and live inspector for web pages.
Perfect for inspecting and modifying live online projects without requiring local setup.

Whether you're working on a deployed project or collaborating remotely, this tool enables you to inject custom CSS into web pages and see immediate updates — all in real time.

✅ Use cases:
You can't install or run the project locally due to technical issues (missing dependencies, broken builds, permission issues).

You're working with a third-party site you don’t fully control but have access to style.

## Features

- Real-time CSS Injection: Instantly inject custom CSS into any online web page and see the changes live without refreshing the page.

- Works for Both Local and Remote Projects: You can inspect and modify any online project by providing its URL.

- Direct Editing of Pseudo-elements and Keyframes: Easily modify ::before, ::after pseudo-elements, and @keyframes for more dynamic styling adjustments.

- **Live CSS Inspector Popup**: Click any element on the page to instantly view the CSS rules affecting it in a popup window, without opening DevTools.

- **Copy CSS with One Click**: Use the "Copy" button inside the popup to copy all matched CSS rules to your clipboard.

- Collaborative Sharing: Share the live page with others for collaborative styling and debugging in real-time.

- No Local Setup Required: You don’t need to run the project locally to make styling changes. Simply provide the URL of the online project.

- No Interruption to Browser UI: Unlike DevTools, this tool doesn’t take up space on your browser window and doesn’t distract from the page you're working on.
This is especially useful when working on layouts, where opening DevTools can alter element dimensions or layout flow. With this tool, you preserve the natural rendering of the page without needing to juggle multiple windows.

## Install dependencies:

Clone or download this repository to your local machine, or set it up in any Node.js environment (locally or on a remote server).

```bash
npm install
```

## Usage

```bash
npm start 
```

### Inject the Script into the Target Page Using a Bookmarklet

1- Create a new bookmark in your browser:

- Open any page in your browser (the page doesn’t matter).

- Press Ctrl+D (or Cmd+D on Mac) to quickly add the page as a bookmark.

2- Edit the bookmark:

- Open your Bookmarks Bar (Ctrl+Shift+B if hidden).

- Right-click the newly created bookmark and choose Edit.

- Set a name in the Name field: Remote CSS Injector (or any name you like).

- In the URL field, paste the following code.
⚠️ Make sure it starts with javascript: and there is no space before it.

```bash
javascript:(function(){const styleURL="http://localhost:1981/style.css";const injectCSS=()=>{const old=document.querySelector("link[data-live]");if(old)old.remove();const l=document.createElement("link");l.rel="stylesheet";l.href=styleURL+"?t="+Date.now();l.setAttribute("data-live","true");document.head.appendChild(l);const ws=new WebSocket("ws://localhost:1981");ws.onmessage=e=>{if(e.data==="css-updated"){l.href=styleURL+"?t="+Date.now();console.log("Live CSS updated");}}};injectCSS();const createPopup=()=>{const popup=document.createElement("div");popup.id="css-popup";popup.setAttribute("style","position:fixed;top:10%;left:50%;transform:translateX(-50%);width:60%;max-height:70vh;overflow:auto;background:#1e1e1e;color:#f1f1f1;font-family:monospace;z-index:999999;border-radius:8px;padding-top:2.5rem;box-shadow:0 0 15px rgba(0,0,0,0.6);");const toolbar=document.createElement("div");toolbar.setAttribute("style","position:absolute;top:0;left:0;right:0;background:#111;display:flex;justify-content:space-between;padding:0.5rem;border-bottom:1px solid #444;");const copyBtn=document.createElement("button");copyBtn.textContent="Copy";copyBtn.setAttribute("style","background:green;color:white;border:none;padding:4px 8px;cursor:pointer;");const closeBtn=document.createElement("button");closeBtn.textContent="X";closeBtn.setAttribute("style","background:red;color:white;border:none;padding:4px 8px;cursor:pointer;");const codeBox=document.createElement("pre");codeBox.setAttribute("style","padding:1rem;margin:0;white-space:pre-wrap;");copyBtn.onclick=()=>{navigator.clipboard.writeText(codeBox.textContent);copyBtn.textContent="Copied!";setTimeout(()=>copyBtn.textContent="Copy",1000);};closeBtn.onclick=()=>{document.removeEventListener("click",handler,true);popup.remove();};toolbar.appendChild(copyBtn);toolbar.appendChild(closeBtn);popup.appendChild(toolbar);popup.appendChild(codeBox);document.body.appendChild(popup);return{popup,codeBox};};let popupEl=document.getElementById("css-popup");if(popupEl)popupEl.remove();let {popup,codeBox}=createPopup();const handler=e=>{if(popup.contains(e.target))return;e.preventDefault();e.stopPropagation();const el=e.target;const matched=[];for(const sheet of document.styleSheets){try{if(!sheet.href||sheet.href.startsWith(location.origin)){const rules=sheet.cssRules||sheet.rules;for(const rule of rules){if(rule.selectorText&&el.matches(rule.selectorText)){matched.push(rule.cssText);}}}}catch(err){console.warn("Cannot access stylesheet:",err);}}codeBox.textContent=matched.join("\n")||"No matching CSS found.";};document.addEventListener("click",handler,true);})();

```
3- Open any website you want to inspect.

4- Click the bookmark — live CSS injection will be activated.

5- You can now edit style.css locally and see live updates on the page 🎉🎉

6- You can also click on any element on the page to open a CSS inspector popup showing the matching CSS rules.

7- Use the **"Copy"** button in the popup to quickly copy the CSS for that element.

8- After closing the popup you need to click again the bookmark to get it back.

## File Structure

- server.js: Contains the server setup, CSS injection logic, and WebSocket connection.

- style.css: The CSS file that you modify to see live updates on the page.

- package.json: Contains project dependencies and scripts.

## Dependencies

express: Web server framework for handling requests.

ws: WebSocket for real-time communication.

chokidar: File watcher for detecting CSS changes.

cors: Middleware to handle cross-origin requests.

## License

MIT License.

### ⚠️ Important Warning:
This library injects CSS into a web page for styling and debugging purposes.  
It should only be used on web pages you own or have explicit permission to modify.  
**Unauthorized use of this tool on websites you do not own or have permission to modify could lead to legal consequences.**

By using this tool, you agree that you are solely responsible for how it is used and the impact it may have on the target website.  
The author of this project does not accept any responsibility for misuse, unauthorized access, or any damage caused by the injection of CSS.

Use at your own risk.


#### This README provides all the necessary information about how to use the Remote CSS Inspector tool, its benefits compared to DevTools, and all of its key features.

Let me know if you need further adjustments!
