# Walkthrough: Interactive Operations Manual & Simulator

An interactive training manual and simulation workspace has been successfully created in the `/Users/snigdha/Desktop/Studio Manual/` directory. Internal team members can open this tool to learn and practice the video transcription pipeline.

## Deliverables Created
1. **[index.html](file:///Users/snigdha/Desktop/Studio%20Manual/index.html)**: Sets up the structural shell, featuring a sidebar tracking course progress and layout cards housing written steps and interactive portals.
2. **[style.css](file:///Users/snigdha/Desktop/Studio%20Manual/style.css)**: Applies a clean, modern light-theme slate layout with card drop-shadows and customized slate colors. Recreates look-and-feel specs of external tools and a high-fidelity white-and-purple skin of the internal Lingochaps workspace.
3. **[app.js](file:///Users/snigdha/Desktop/Studio%20Manual/app.js)**: Runs the application logic, holding simulation state coordinates (fetching URLs, trimming timelines, configuring output boxes, running mock jobs, and displaying report drawers).

---

## Key Features & Interactive Simulators

### 1. Unified Progress Sidebar
- Tracks progression status through steps (0 through 5).
- Displays a visual completion percentage indicator and checks off completed tasks dynamically.

### 2. YouTube Downloader Simulator (`ssyou.online`)
- Simulates entering a client link and retrieving details.
- Provides a recommended **MP4 720p** option, which triggers a download progress handler when clicked, saving a simulated local asset (`Persian_Tutorial_Session.mp4`).

### 3. Video Cutter Simulator (`online-video-cutter.com`)
- Prompts user to select the downloaded asset to load the workspace.
- Features standard timeline handles and input fields for Start and End values (presets default to **00:00** and **04:00**).
- Trims the file into `Persian_Tutorial_Session_Trimmed.mp4` when clicking **Save**.

### 4. High-Fidelity Lingochaps Tool Workspace Clone
- Replicates the exact style and options of the internal portal shown in the user screenshots.
- User can drop the trimmed file, set language hints, select output types (Full vs. Transcript vs. On-Screen), and hit **Start transcription**.
- Adds a **RUNNING** task to the **Recent jobs** ledger which ticks from 0% to 100% DONE.

### 5. Detailed Reports Inspector
- Clicking on completed jobs in the list slides open a detailed results drawer from the right.
- Renders transcription previews, speaker indices, and on-screen OCR text translation entries.
- Clicking **Download Word Report** mimics saving the final DOCX file and prompts the trainee to complete the tutorial.

---

## How to Run the Manual
Since all styling features use SVG vector paths and static HTML elements, no local server or dependency configuration is needed:
1. Locate `/Users/snigdha/Desktop/Studio Manual/index.html` in your file explorer.
2. Double-click **[index.html](file:///Users/snigdha/Desktop/Studio%20Manual/index.html)** to open it directly in Chrome, Safari, Firefox, or Edge.
3. Walk through the interactive training steps.

---

## Remote Deployment & Links
- **GitHub Repository**: [conversify-india/studio-manual](https://github.com/conversify-india/studio-manual)
- **Live Interactive Website**: [conversify-india.github.io/studio-manual](https://conversify-india.github.io/studio-manual/)

