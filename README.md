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
javascript:(function(){const e="http://localhost:1981/style.css",t=document.querySelector("link[data-live]");t&&t.remove();const n=document.createElement("link");n.rel="stylesheet",n.href=e+"?t="+Date.now(),n.setAttribute("data-live","true"),document.head.appendChild(n);const o=new WebSocket("ws://localhost:1981");o.onmessage=t=>{"css-updated"===t.data&&(n.href=e+"?t="+Date.now(),console.log("Live CSS updated"))};const a=document.getElementById("css-popup");a&&a.remove();const i=document.createElement("div");i.id="css-popup",i.setAttribute("style","position:fixed;top:10%;left:50%;transform:translateX(-50%);width:60%;max-height:70vh;overflow:auto;background:#1e1e1e;color:#f1f1f1;font-family:monospace;z-index:999999;border-radius:8px;padding-top:2.5rem;box-shadow:0 0 15px rgba(0,0,0,0.6);user-select:text;");const l=document.createElement("div");l.setAttribute("style","position:fixed;top:0;left:0;right:0;background:#111;display:flex;justify-content:space-between;padding:0.5rem;border-bottom:1px solid #444;z-index:9999999;");const d=document.createElement("button");d.textContent="Copy",d.setAttribute("style","background:green;color:white;border:none;padding:4px 8px;cursor:pointer;");const c=document.createElement("button");c.textContent="X",c.setAttribute("style","background:red;color:white;border:none;padding:4px 8px;cursor:pointer;");const s=document.createElement("div");s.setAttribute("style","padding:1rem;margin:0;white-space:normal;display:flex;flex-direction:column;gap:1rem;");d.onclick=()=>{navigator.clipboard.writeText(s.textContent),d.textContent="Copied!",setTimeout(()=>d.textContent="Copy",1e3)},c.onclick=()=>{document.removeEventListener("click",r,!0),i.remove()},l.appendChild(d),l.appendChild(c),i.appendChild(l),i.appendChild(s),document.body.appendChild(i);const m=(e,t,n)=>{const o=document.createElement("div"),a=document.createElement("div");a.textContent=e,a.setAttribute("style",`background:${t};color:black;font-weight:bold;padding:4px 8px;border-radius:4px 4px 0 0;`);const i=document.createElement("pre");return i.textContent=n,i.setAttribute("style","background:#2a2a2a;margin:0;padding:0.5rem;border-radius:0 0 4px 4px;white-space:pre-wrap;overflow-x:auto;"),o.appendChild(a),o.appendChild(i),o},u=e=>e.split(",").every(e=>["*","::before","::after","html","body"].includes(e.trim())||/^\W*$/.test(e.trim()));let r=function(e){if(i.contains(e.target))return;e.preventDefault(),e.stopPropagation();const t=e.target,a=t.getAttribute("style")?t.getAttribute("style").split(";").map(e=>e.trim()).filter(Boolean).join(";\n")+";":"",l=[],d=[],c=window.getComputedStyle(t),r=document.createElement(t.tagName);t.classList.forEach(e=>r.classList.add(e));r.style.all="initial",document.body.appendChild(r);const g=window.getComputedStyle(r),f=[];for(const e of c)g.getPropertyValue(e)!==c.getPropertyValue(e)&&f.push(`${e}: ${c.getPropertyValue(e)};`);document.body.removeChild(r);for(const a of document.styleSheets)try{const r=a.cssRules||a.rules;if(r)for(const n of r)n.selectorText&&t.matches(n.selectorText)&&!u(n.selectorText)&&((a.href||"").includes("style.css")||(a.href||"").startsWith(location.origin)?l.push(n.cssText):d.push(n.cssText))}catch{}s.innerHTML="";const p=t.tagName.toLowerCase()+(t.id?"#"+t.id:"")+(t.className?"."+[...t.classList].join("."):"");s.appendChild(m("Selected Element","#00bcd4",p)),a&&s.appendChild(m("Inline Styles","#007acc",a)),l.length&&s.appendChild(m("Your CSS","#28a745",l.join("\n\n"))),d.length&&s.appendChild(m("External Library","#ff9800",d.join("\n\n"))),f.length&&s.appendChild(m("Overridden Default Styles","#ffc107",f.filter(e=>e!=="").join("\n\n")));i.scrollTop=0;};document.addEventListener("click",r,!0);})();

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
