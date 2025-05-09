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
  Styles are grouped into: 📝

1. Element Path
1. Selected Element
2. Inline Styles
3. Your CSS
4. External Libraries
5. Overridden Defaults  
   Giving you clear insight into how styles interact and override one another.

- Effective Rule Highlighting  
  Only active and effective CSS properties are shown, reducing clutter and helping you focus on what truly affects the design.

- Draggable Popup Interface  
  Move the popup anywhere on the screen to keep it accessible without interfering with your layout or inspection area.

- Custom Color Controls  
  Change the background and text color of the CSS preview boxes using color pickers — helpful for accessibility testing or personal preference 🎨

- Resizable Inspector Window  
  Easily resize the popup window to accommodate more code or reduce screen usage — perfect for multitasking and custom layouts 🔛

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
javascript:(function(){const e="http://localhost:1981/style.css",t=document.querySelector("link[data-live]");t&&t.remove();const o=document.createElement("link");o.rel="stylesheet",o.href=e+"?t="+Date.now(),o.setAttribute("data-live","true"),document.head.appendChild(o);const n=new WebSocket("ws://localhost:1981");n.onmessage=r=>{"css-updated"===r.data&&(o.href=e+"?t="+Date.now())};const l=document.getElementById("css-popup");l&&l.remove();const a=document.createElement("div"),s=JSON.parse(localStorage.getItem("css-popup-position")||"{}"),d=s.top||"10%",c=s.left||"50%",i=s.left?"":"translateX(-50%)";a.id="css-popup",a.style=`position:fixed;top:${d};left:${c};transform:${i};width:40%;background:#1e1e1e;color:#f1f1f1;font-family:sans-serif;z-index:999999;border-radius:8px;padding-top:2.5rem;box-shadow:0 0 15px rgba(0,0,0,.6);user-select:text;resize:both;overflow:auto;`;const r=document.createElement("div");r.style="cursor:move;position:absolute;top:0;left:0;right:0;background: #d9d9d9;display:flex;justify-content:space-between;align-items:center;padding:0.5rem;border-bottom:1px solid #444;z-index:9999999;gap:0.5rem;font-family:sans-serif;max-height:60vh;";const p=document.createElement("div"),m=document.createElement("button");m.textContent="Copy",m.style="background:#2d5466;color:white;border:none;padding:4px 8px;cursor:pointer;font-weight: bold;border-radius: 10%;";const u=document.createElement("input"),y=document.createElement("input");u.type="color",y.type="color",u.title="Background",y.title="Text Color",u.value="#2a2a2a",y.value="#f1f1f1",u.oninput=()=>{document.querySelectorAll("#css-popup pre").forEach(e=>e.style.background=u.value)},y.oninput=()=>{document.querySelectorAll("#css-popup pre").forEach(e=>e.style.color=y.value)},p.append(u,y,m),p.style="display:flex;align-items:center;column-gap:4%;";const f=document.createElement("button");f.textContent="X",f.style="background:#ba0404;color:white;border:none;padding:4px 8px;cursor:pointer;font-weight: bold;border-radius: 25%;",f.onclick=()=>{document.removeEventListener("click",b,!0),a.remove()},m.onclick=()=>{navigator.clipboard.writeText(g.textContent),m.textContent="Copied!",setTimeout(()=>m.textContent="Copy",1e3)},r.append(f,p);const g=document.createElement("div");g.style="padding:1rem;margin:0;white-space:normal;display:flex;flex-direction:column;gap:1rem;font-family:sans-serif;word-wrap: break-word;max-height: 50vh;overflow-y:scroll;",a.append(r,g),document.body.appendChild(a),function(e,t){let o=0,n=0,l=!1;t.addEventListener("mousedown",t=>{l=!0;const a=e.getBoundingClientRect();o=t.clientX-a.left,n=t.clientY-a.top,e.style.transform="none",document.body.style.userSelect="none"}),document.addEventListener("mousemove",t=>{if(l){const l=t.clientX-o,a=t.clientY-n;e.style.left=`${l}px`,e.style.top=`${a}px`,localStorage.setItem("css-popup-position",JSON.stringify({left:`${l}px`,top:`${a}px`}))}}),document.addEventListener("mouseup",()=>{l=!1,document.body.style.userSelect="auto"})}(a,r);const h=(e,t,o)=>{const n=document.createElement("div"),l=document.createElement("div");l.textContent=e,l.style=`background:${t};color:black;padding:4px 8px;border-radius:4px 4px 0 0;font-family:sans-serif;font-weight: bold;`;const a=document.createElement("pre");return a.textContent=o,a.style="background:#2a2a2a;margin:0;padding:0.5rem;border-radius:0 0 4px 4px;white-space:pre-wrap;overflow-x:auto;font-weight:bold;",n.append(l,a),n},v=e=>e.split(",").every(e=>["*","::before","::after","html","body"].includes(e.trim())||/^\W*$/.test(e.trim()));let b=function(e){if(a.contains(e.target))return;e.preventDefault(),e.stopPropagation();const t=e.target,o=t.getAttribute("style")?t.getAttribute("style").split(";").map(e=>e.trim()).filter(Boolean).join(";\n")+";":"",n=[],l=[],s=window.getComputedStyle(t),d=document.createElement(t.tagName);t.classList.forEach(e=>d.classList.add(e)),d.style.all="initial",document.body.appendChild(d);const c=window.getComputedStyle(d),i=[];for(const e of s)c.getPropertyValue(e)!==s.getPropertyValue(e)&&!e.startsWith("-webkit")&&i.push(`${e}: ${s.getPropertyValue(e)};`);document.body.removeChild(d);for(const e of document.styleSheets)try{const t=e.cssRules||e.rules;if(!t)continue;for(const o of t)o.selectorText&&target.matches(o.selectorText)&&!v(o.selectorText)&&((e.href||"").includes("style.css")||(e.href||"").startsWith(location.origin)?n.push(o.cssText):l.push(o.cssText))}catch{}g.innerHTML="";const r=t.tagName.toLowerCase()+(t.id?"#"+t.id:"")+(t.className?"."+[...t.classList].join("."):""),x=[];let E=t;while(E&&E!==document.body){let e=E.tagName.toLowerCase();E.id&&(e+="#"+E.id),E.classList.length&&(e+="."+[...E.classList].join(".")),x.unshift(e),E=E.parentElement}const w=x.join(" > ");g.appendChild(h("Element Path","#38bdf8",w)),g.appendChild(h("Selected Element","#00bcd4",r)),o&&g.appendChild(h("Inline Styles","#a777fd",o)),n.length&&g.appendChild(h("Your CSS","#94dd3e",n.join("\n\n"))),l.length&&g.appendChild(h("External Library","#ff7c00",l.join("\n\n"))),i.length&&g.appendChild(h("Overridden Default Styles","#ffc107",i.join("\n\n"))),a.scrollTop=0};document.addEventListener("click",b,!0)})();

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

#### This README provides all the necessary information about how to use the Remote CSS Inspector tool.

Let me know if you need further adjustments!
