# remote-css-injector

 A real-time CSS injector and live inspector for web pages.
Perfect for inspecting and modifying live online projects without requiring local setup.

Whether you're working on a deployed project or collaborating remotely, this tool enables you to inject custom CSS into web pages and see immediate updates — all in real time.

✅ Use cases:
You can't install or run the project locally due to technical issues (missing dependencies, broken builds, permission issues).

You're working with a third-party site you don’t fully control but have access to style.

## Features

- Real-time CSS Injection
Instantly inject local custom CSS into any live webpage and see the changes immediately — no refresh needed.

- Remote Project Styling
Apply and test your CSS locally on any online or local project simply by entering its URL — no need to clone or run it locally.

- Editable Pseudo-elements and Keyframes
Modify ::before, ::after, and @keyframes styles directly, making dynamic visual experimentation easier than ever.

- Interactive CSS Inspector Popup
Click on any element to view a draggable popup showing its full CSS cascade — including inline styles, your rules, library styles, and overridden browser defaults.

- Categorized CSS View
Styles are grouped into:

 1-Selected Element

2-Inline Styles

3-Your CSS

4-External Libraries

5-Overridden Defaults

6-giving you clear insight into how styles interact and override one another.

- Effective Rule Highlighting
Only active and effective CSS properties are shown, reducing clutter and helping you focus on what truly affects the design.

- Draggable Popup Interface
Move the popup anywhere on the screen to keep it accessible without interfering with your layout or inspection area.

- Flexible Copying Options
Use the "Copy" button to grab all visible rules at once, or manually select and copy just the parts you need — your choice.

- Minimal UI Interference
The popup appears inline on the page, not in a separate panel, so it won’t disrupt layout flow or reduce working space.

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
javascript:(function(){const e="http://localhost:1981/style.css",t=document.querySelector("link[data-live]");t&&t.remove();const o=document.createElement("link");o.rel="stylesheet",o.href=e+"?t="+Date.now(),o.setAttribute("data-live","true"),document.head.appendChild(o);const a=new WebSocket("ws://localhost:1981");a.onmessage=r=>{"css-updated"===r.data&&(o.href=e+"?t="+Date.now(),console.log("Live CSS updated"))};const n=document.getElementById("css-popup");n&&n.remove();const i=document.createElement("div"),s=JSON.parse(localStorage.getItem("css-popup-position")||"{}"),l=s.top||"10%",d=s.left||"50%",c=s.left?"":"translateX(-50%)";i.id="css-popup",i.setAttribute("style",`position:fixed;top:${l};left:${d};transform:${c};width:60%;max-height:70vh;overflow:auto;background:#1e1e1e;color:#f1f1f1;font-family:monospace;z-index:999999;border-radius:8px;padding-top:2.5rem;box-shadow:0 0 15px rgba(0,0,0,0.6);user-select:text;`);const p=document.createElement("div");p.setAttribute("style","cursor:move;position:absolute;top:0;left:0;right:0;background:#111;display:flex;justify-content:space-between;padding:0.5rem;border-bottom:1px solid #444;z-index:9999999;");const m=document.createElement("button");m.textContent="Copy",m.setAttribute("style","background:green;color:white;border:none;padding:4px 8px;cursor:pointer;");const u=document.createElement("button");u.textContent="X",u.setAttribute("style","background:red;color:white;border:none;padding:4px 8px;cursor:pointer;");const h=document.createElement("div");h.setAttribute("style","padding:1rem;margin:0;white-space:normal;display:flex;flex-direction:column;gap:1rem;");m.onclick=()=>{navigator.clipboard.writeText(h.textContent),m.textContent="Copied!",setTimeout(()=>m.textContent="Copy",1e3)},u.onclick=()=>{document.removeEventListener("click",y,!0),i.remove()},p.appendChild(m),p.appendChild(u),i.appendChild(p),i.appendChild(h),document.body.appendChild(i),function(e,t){let o=0,a=0,n=!1;t.addEventListener("mousedown",t=>{n=!0;const r=e.getBoundingClientRect();o=t.clientX-r.left,a=t.clientY-r.top,e.style.transform="none",document.body.style.userSelect="none"}),document.addEventListener("mousemove",t=>{if(n){const r=t.clientX-o,l=t.clientY-a;e.style.left=`${r}px`,e.style.top=`${l}px`,localStorage.setItem("css-popup-position",JSON.stringify({left:`${r}px`,top:`${l}px`}))}}),document.addEventListener("mouseup",()=>{n=!1,document.body.style.userSelect="auto"})}(i,p);const f=(e,t,o)=>{const a=document.createElement("div"),n=document.createElement("div");n.textContent=e,n.setAttribute("style",`background:${t};color:black;font-weight:bold;padding:4px 8px;border-radius:4px 4px 0 0;`);const i=document.createElement("pre");return i.textContent=o,i.setAttribute("style","background:#2a2a2a;margin:0;padding:0.5rem;border-radius:0 0 4px 4px;white-space:pre-wrap;overflow-x:auto;"),a.appendChild(n),a.appendChild(i),a},g=e=>e.split(",").every(e=>["*","::before","::after","html","body"].includes(e.trim())||/^\W*$/.test(e.trim()));let y=function(e){if(i.contains(e.target))return;e.preventDefault(),e.stopPropagation();const t=e.target,o=t.getAttribute("style")?t.getAttribute("style").split(";").map(e=>e.trim()).filter(Boolean).join(";\n")+";":"",a=[],n=[],r=window.getComputedStyle(t),l=document.createElement(t.tagName);t.classList.forEach(e=>l.classList.add(e)),l.style.all="initial",document.body.appendChild(l);const d=window.getComputedStyle(l),c=[];for(const e of r)d.getPropertyValue(e)!==r.getPropertyValue(e)&&!e.startsWith("-webkit")&&c.push(`${e}: ${r.getPropertyValue(e)};`);document.body.removeChild(l);for(const o of document.styleSheets)try{const r=o.cssRules||o.rules;if(r)for(const l of r)l.selectorText&&t.matches(l.selectorText)&&!g(l.selectorText)&&((o.href||"").includes("style.css")||(o.href||"").startsWith(location.origin)?a.push(l.cssText):n.push(l.cssText))}catch{}h.innerHTML="";const p=t.tagName.toLowerCase()+(t.id?"#"+t.id:"")+(t.className?"."+[...t.classList].join("."):"");h.appendChild(f("Selected Element","#00bcd4",p)),o&&h.appendChild(f("Inline Styles","#007acc",o)),a.length&&h.appendChild(f("Your CSS","#28a745",a.join("\n\n"))),n.length&&h.appendChild(f("External Library","#ff9800",n.join("\n\n"))),c.length&&h.appendChild(f("Overridden Default Styles","#ffc107",c.join("\n\n"))),i.scrollTop=0};document.addEventListener("click",y,!0)})();

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
