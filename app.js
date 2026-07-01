// LingoChaps Operations Manual - Application Logic

// Application State
const state = {
    currentStep: 0,
    downloadedFile: null,  // { name, duration, size, youtubeUrl }
    trimmedFile: null,     // { name, start, end, size }
    recentJobs: [
        {
            id: 'job-1',
            name: 'Persian 16 minutes for OST.mp4',
            date: '11/06/2026, 06:29:58',
            status: 'DONE',
            progress: 100,
            type: 'Full',
            transcript: [
                { time: '00:05', text: 'Good morning everyone, today we cover on-screen texts.', translation: 'صبح بخیر همگی، امروز متون روی صفحه را پوشش می‌دهیم.' },
                { time: '00:12', type: 'ost', text: 'Chapter 2: Subtitle Systems', translation: 'فصل ۲: سیستم‌های زیرنویس' }
            ]
        },
        {
            id: 'job-2',
            name: 'persian 16 min.mp4',
            date: '11/06/2026, 06:23:57',
            status: 'DONE',
            progress: 100,
            type: 'Transcript only',
            transcript: [
                { time: '00:02', text: 'Let us start with audio transcription details.', translation: 'بیایید با جزئیات پیاده‌سازی صوتی شروع کنیم.' }
            ]
        },
        {
            id: 'job-3',
            name: 'persian 1.36.mp4',
            date: '11/06/2026, 06:12:17',
            status: 'DONE',
            progress: 100,
            type: 'Full',
            transcript: [
                { time: '00:01', text: 'Testing file 1.36.', translation: 'آزمایش فایل ۱.۳۶' }
            ]
        },
        {
            id: 'job-4',
            name: 'Persian 16 minutes.mp4',
            date: '11/06/2026, 05:54:47',
            status: 'DONE',
            progress: 100,
            type: 'On-screen text only',
            transcript: [
                { time: '00:10', type: 'ost', text: 'LingoChaps Workspace', translation: 'فضای کاری لینگوچپس' }
            ]
        },
        {
            id: 'job-5',
            name: 'Arabic [0-4].mp4',
            date: '11/06/2026, 05:48:32',
            status: 'DONE',
            progress: 100,
            type: 'Full',
            transcript: [
                { time: '00:05', text: 'Welcome Arabic translation team.', translation: 'به تیم ترجمه عربی خوش آمدید.' }
            ]
        }
    ],
    // Tracks active user inputs in simulators
    simulations: {
        youtubeUrl: '',
        cutterStart: '00:00',
        cutterEnd: '04:00',
        lingochapsUploaded: false,
        lingochapsSelectedOutput: 'full',
        lingochapsProcessPartial: false,
        lingochapsLanguages: 'auto-detect',
        lingochapsInstructions: '',
        isJobRunning: false,
        activeRunningJob: null,
        trimmerLoaded: false,
        trimmerBypassed: false,
        trimQueue: [],
        playerSliderVal: 0,
        cutterStartSec: null,
        cutterEndSec: null,
        isPlaying: false,
        selectedQueueIdx: null
    }
};

// Steps Content Database
const stepsContent = [
    // Step 0: Welcome & Overview
    {
        title: "Welcome to LingoChaps Operations Manual",
        html: `
            <h3>Overview of the Workflow</h3>
            <p>Welcome! This training manual will teach you how to prepare and translate video and audio files using the <b>Video Trimmer</b> and the <b>LingoChaps Transcription Tool</b>.</p>
            
            <div class="alert alert-info">
                <strong>Important Note:</strong><br>
                The LingoChaps Transcription Tool is our AI tool used to transcribe and translate files. However, we must always **trim** our video or audio files **first** using the **Video Trimmer** before uploading them to the LingoChaps Transcription Tool. This makes uploads faster and keeps reports clean!
            </div>

            <div class="alert alert-info">
                <strong>Workflow Pipeline:</strong><br>
                1. <strong>Download</strong> the client's video from YouTube.<br>
                2. <strong>Trim</strong> the file so it only has the parts we need.<br>
                3. <strong>Upload & Transcribe</strong> the trimmed file in the LingoChaps Transcription Tool.
            </div>

            <p>On the right side of the screen is your <b>Sandbox Simulator</b>. You can use it to practice with the actual tools we use in our work.</p>
            <p>Click <b>Continue</b> below to start Step 1.</p>
        `
    },
    // Step 1: ssyou.online Youtube Downloader
    {
        title: "1. Download Video (ssyou.online)",
        html: `
            <h3>Downloading Client Videos</h3>
            <p>Clients often send us YouTube links instead of video files. We must download the video file before we can work on it.</p>
            
            <div class="alert alert-warning">
                <strong>Website to use:</strong> Use <a href="https://ssyou.online/en1401Yd/" target="_blank" style="color: #fef3c7; text-decoration: underline;">ssyou.online/en1401Yd/</a> to download videos. Do not use other websites.
            </div>

            <h4>Instructions:</h4>
            <ol>
                <li>Copy the client's YouTube link (for example: <code>https://www.youtube.com/watch?v=prsh16m</code>).</li>
                <li>Paste the link into the URL box of the ssyou.online website on the right.</li>
                <li>Click <strong>Fetch Options</strong> to load the video sizes.</li>
                <li>Find the <strong>MP4 720p (Recommended)</strong> option and click <strong>Download</strong>.</li>
            </ol>

            <div class="alert alert-tip">
                <strong>Simulated Task:</strong> In the Sandbox on the right, click the <strong>"Fill Sample Client URL"</strong> button. Then click <strong>"Fetch Options"</strong>. Finally, click the green <strong>"Download"</strong> button for the 720p version.
            </div>
        `
    },
    // Step 2: Video Trimmer
    {
        title: "2. Trim File",
        html: `
            <h3>Stage 01: Video Trimmer (Local Preparation)</h3>
            <p>Start by trimming your video or audio file on your computer using the Video Trimmer tool.</p>
            
            <h4>Instructions:</h4>
            <ol>
                <li>
                    <strong>Open the source file</strong><br>
                    Click the <strong>Open Video</strong> button and choose your file from your computer. We support both video and audio files. Toggle the <strong>Video / Audio only</strong> switch at the top to match your file type.
                    <span class="hint brand" style="display:block; margin: 4px 0;"><i class="fas fa-info-circle"></i> Formats: MP4, MKV, MOV, MP3, M4A, AMR, WAV, etc.</span>
                </li>
                <li style="margin-top: 10px;">
                    <strong>Mark the range you need</strong><br>
                    Drag the slider to find where your clip starts and ends. Click <strong>Set Start</strong> and <strong>Set End</strong>. Then click <strong>Add to List</strong> to put it in the queue. You can repeat this to cut multiple clips from the same file.
                </li>
                <li style="margin-top: 10px;">
                    <strong>Or use Auto-split instead</strong><br>
                    If you want to split the file into equal parts, use the Auto-split section. Type a number in <strong>Into ___ parts</strong> and click <strong>Generate</strong>. Or set a time length under <strong>Every ___ h ___ m ___ s</strong> and click <strong>Generate</strong>. This is the fastest way to break a long recording into smaller pieces.
                    <div style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;">&bull; Practical Example: Equal Splits</div>
                </li>
                <li style="margin-top: 10px;">
                    <strong>Pick a save folder</strong><br>
                    Click <strong>Choose...</strong> next to Save folder to pick where you want to save the trimmed files. It defaults to a folder named <code>trimmed video</code> in your Downloads folder.
                </li>
                <li style="margin-top: 10px;">
                    <strong>Convert to MP3 if you only need audio</strong><br>
                    Tick the <strong>Convert to MP3</strong> box before exporting if you don't need the video. This keeps the file size small for the next stage.
                    <span class="hint good" style="display:block; margin: 4px 0;"><i class="fas fa-check-circle"></i> Recommended for call recordings like AMR/MP3 files</span>
                </li>
                <li style="margin-top: 10px;">
                    <strong>Export</strong><br>
                    Click <strong>Trim All</strong> to render all the clips in your list. Then click <strong>Download</strong> or <strong>Open Folder</strong> to get your finished files. These are the files you will upload in Stage 02.
                </li>
            </ol>

            <div class="alert alert-tip">
                <strong>Simulated Task:</strong> In the sandbox simulator on the right:
                1. Click the open zone or the "Open Video" button to load the video.
                2. Click "Set Start" and "Set End", then click "Add to List".
                3. Click the green "Trim All" button to export.
            </div>
        `
    },
    // Step 3: Submit to LingoChaps Transcription Tool
    {
        title: "3. Upload to LingoChaps Transcription Tool",
        html: `
            <h3>Uploading to LingoChaps Transcription Tool</h3>
            <p>Now that your clip is trimmed, upload it to the LingoChaps Transcription Tool at <code>studio.lingochaps.com</code> to transcribe and translate it.</p>
            
            <h4>Instructions:</h4>
            <ol>
                <li>Click the upload box on the right and select the trimmed file (<code>Persian_Tutorial_Session_Trimmed.mp4</code>).</li>
                <li>Configure the settings:
                    <ul>
                        <li><strong>Languages:</strong> Keep as <code>auto-detect</code> (or type specific languages like "fa, en").</li>
                        <li><strong>Output options:</strong> Choose what the client wants:
                            <br>&bull; <em>Full:</em> Speech translation + on-screen text.
                            <br>&bull; <em>Transcript only:</em> Audio transcription and translation only (faster).
                            <br>&bull; <em>On-screen text only:</em> Video screen text only.
                        </li>
                    </ul>
                </li>
                <li>Click the purple <strong>Start transcription</strong> button to start.</li>
            </ol>

            <div class="alert alert-tip">
                <strong>Simulated Task:</strong>
                1. Click the upload zone on the right to load the trimmed video.
                2. Select <strong>Full — transcription + on-screen text</strong>.
                3. Click <strong>Start transcription</strong>. You will see the job start running in the Recent jobs list!
            </div>
        `
    },
    // Step 4: Download Report
    {
        title: "4. Download Report",
        html: `
            <h3>Checking Outputs & Downloading Reports</h3>
            <p>When the LingoChaps Transcription Tool finishes processing your file, the job status will change to <span class="status-badge done" style="display:inline-block;">DONE</span> (100%).</p>

            <h4>Instructions:</h4>
            <ol>
                <li>Find your completed job at the top of the **Recent jobs** list.</li>
                <li>Click on the job to open the **Job Details** panel on the right.</li>
                <li>Check the transcription text and translations to make sure they look correct.</li>
                <li>Click the <strong>Download Word Report</strong> button to save the final report file to your computer.</li>
            </ol>

            <div class="alert alert-tip">
                <strong>Simulated Task:</strong> Click on your completed job in the "Recent jobs" list to open the side panel. Then, click the blue <strong>"Download Word Report"</strong> button.
            </div>
        `
    },
    // Step 5: Training Complete
    {
        title: "Training Complete!",
        html: `
            <h3>Congratulations!</h3>
            <p>You have finished the training simulation for downloading, trimming, and transcribing video assets using the Video Trimmer and LingoChaps Transcription Tool.</p>

            <div class="alert alert-tip">
                <strong>Important Rules to Remember:</strong><br>
                &bull; Always trim files before uploading to the LingoChaps Transcription Tool. Do not upload large raw video files.<br>
                &bull; Make sure you select the correct <strong>Output</strong> mode (Full vs. Transcript vs. On-Screen text).<br>
                &bull; Always open and check the downloaded Word report before sending it to clients.
            </div>

            <p>You can restart this training guide anytime to practice again.</p>
        `
    }
];

// Document Elements
const els = {
    navSteps: document.querySelectorAll('.nav-step'),
    progressBar: document.getElementById('progress-bar'),
    progressPercent: document.getElementById('progress-percent'),
    pageTitle: document.getElementById('page-title'),
    instructionText: document.getElementById('instruction-text'),
    prevBtn: document.getElementById('prev-btn'),
    nextBtn: document.getElementById('next-btn'),
    sandboxView: document.getElementById('sandbox-view'),
    sandboxTitle: document.getElementById('sandbox-title'),
    resetSandboxBtn: document.getElementById('reset-sandbox-btn'),
    toast: document.getElementById('toast')
};

// Initial Setup
function init() {
    setupEventListeners();
    renderStep(0);
}

// Global Event Listeners
function setupEventListeners() {
    els.navSteps.forEach(btn => {
        btn.addEventListener('click', () => {
            const step = parseInt(btn.dataset.step);
            renderStep(step);
        });
    });

    els.prevBtn.addEventListener('click', () => {
        if (state.currentStep > 0) {
            renderStep(state.currentStep - 1);
        }
    });

    els.nextBtn.addEventListener('click', () => {
        if (state.currentStep < stepsContent.length - 1) {
            renderStep(state.currentStep + 1);
        }
    });

    els.resetSandboxBtn.addEventListener('click', () => {
        resetStepSandbox();
    });
}

// Show Toast Alert
function showToast(message) {
    els.toast.textContent = message;
    els.toast.classList.add('show');
    setTimeout(() => {
        els.toast.classList.remove('show');
    }, 3500);
}

// Progress Calculator
function updateProgress(step) {
    const totalSteps = stepsContent.length - 1;
    const pct = Math.round((step / totalSteps) * 100);
    els.progressBar.style.width = `${pct}%`;
    els.progressPercent.textContent = `${pct}%`;
    
    // Update navigation sidebar highlights
    els.navSteps.forEach((btn, idx) => {
        btn.classList.remove('active');
        if (idx === step) {
            btn.classList.add('active');
        }
        if (idx < step) {
            btn.classList.add('completed');
        } else {
            btn.classList.remove('completed');
        }
    });
}

// Render Step Details
function renderStep(stepIndex) {
    state.currentStep = stepIndex;
    
    // Update Title and Text
    els.pageTitle.textContent = stepsContent[stepIndex].title;
    els.instructionText.innerHTML = stepsContent[stepIndex].html;
    
    // Navigation Buttons State
    els.prevBtn.disabled = stepIndex === 0;
    
    if (stepIndex === stepsContent.length - 1) {
        els.nextBtn.textContent = 'Restart';
    } else {
        els.nextBtn.textContent = 'Continue';
    }
    
    updateProgress(stepIndex);
    renderSandbox(stepIndex);
}

// Reset Sandbox state for current step
function resetStepSandbox() {
    if (state.currentStep === 1) {
        state.downloadedFile = null;
        state.simulations.youtubeUrl = '';
    } else if (state.currentStep === 2) {
        state.trimmedFile = null;
        state.simulations.cutterStart = '00:00';
        state.simulations.cutterEnd = '04:00';
    } else if (state.currentStep === 3 || state.currentStep === 4) {
        state.simulations.lingochapsUploaded = false;
        state.simulations.isJobRunning = false;
        // Clean out any simulated job we ran
        state.recentJobs = state.recentJobs.filter(j => j.id !== 'job-simulated');
    }
    renderSandbox(state.currentStep);
    showToast("Sandbox state reset for this step.");
}

// --- SANDBOX VIEWS GENERATION ---

function renderSandbox(stepIndex) {
    els.sandboxView.innerHTML = '';
    els.sandboxView.style.overflowX = ''; // Reset horizontal scrollbar style
    
    switch (stepIndex) {
        case 0:
            renderWelcomeSandbox();
            break;
        case 1:
            renderSSYouSandbox();
            break;
        case 2:
            renderCutterSandbox();
            break;
        case 3:
            renderLingochapsSandbox(false); // upload and configuration state
            break;
        case 4:
            renderLingochapsSandbox(true);  // verification state, clickable jobs
            break;
        case 5:
            renderCompletedSandbox();
            break;
    }
}

// Welcome Sandbox View
function renderWelcomeSandbox() {
    els.sandboxTitle.textContent = "Interactive Workflow Overview";
    const div = document.createElement('div');
    div.className = 'welcome-screen';
    div.innerHTML = `
        <div class="welcome-graphic">
            <div class="graphic-node highlighted">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                <span>Download</span>
            </div>
            <div class="graphic-arrow"></div>
            <div class="graphic-node">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="2" width="12" height="20" rx="2"/><path d="M12 18H12.01M12 6H12.01"/></svg>
                <span>Trim</span>
            </div>
            <div class="graphic-arrow"></div>
            <div class="graphic-node">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
                <span>LingoChaps</span>
            </div>
        </div>
        <h3>LingoChaps Interactive Training Workspace</h3>
        <p>This sandbox responds directly to your progress. You will download, trim, and process a simulated video file.</p>
        <button class="btn btn-primary" onclick="renderStep(1)">Get Started with Step 1</button>
    `;
    els.sandboxView.appendChild(div);
}

// SSYou Downloader Sandbox View
function renderSSYouSandbox() {
    els.sandboxTitle.textContent = "SSYou Downloader Simulator (ssyou.online)";
    
    const browserFrame = document.createElement('div');
    browserFrame.className = 'browser-frame';
    browserFrame.innerHTML = `
        <div class="browser-titlebar">
            <div class="browser-dots">
                <div class="browser-dot dot-red"></div>
                <div class="browser-dot dot-yellow"></div>
                <div class="browser-dot dot-green"></div>
            </div>
            <div class="browser-address-bar">
                <span class="address-lock">🔒</span> https://ssyou.online/en1401Yd/
            </div>
        </div>
        <div class="browser-viewport">
            <div class="ssyou-container">
                <div class="ssyou-header">
                    <h2 class="ssyou-logo">SS<span>You</span></h2>
                    <p style="font-size: 0.8rem; color: #4b5563;">Online High-Speed YouTube Video Downloader</p>
                </div>
                
                <div class="ssyou-input-group">
                    <input type="text" id="ssyou-url-input" class="ssyou-input" placeholder="Paste YouTube link here..." value="${state.simulations.youtubeUrl}">
                    <button class="ssyou-btn" id="ssyou-fetch-btn">Fetch Options</button>
                </div>
                <button class="btn btn-sm btn-secondary" style="margin-top:-16px; margin-bottom: 24px;" id="ssyou-autofill">Fill Sample Client URL</button>

                <div class="loader-container" id="ssyou-loader">
                    <div class="spinner"></div>
                    <div class="progress-text">Analyzing video metadata...</div>
                </div>

                <div class="ssyou-card ssyou-results" id="ssyou-results-panel">
                    <div class="video-meta">
                        <div class="video-thumb-mock" style="background-image: url('https://images.unsplash.com/photo-1460889687473-0b39b8b8f34d?auto=format&fit=crop&w=240&h=136&q=80')">
                            16:00
                        </div>
                        <div class="video-info-text">
                            <h4>Persian Tutorial Session.mp4</h4>
                            <p>Channel: Education Global</p>
                            <p>Duration: 16:00 • Size: 220 MB</p>
                        </div>
                    </div>
                    <div class="download-options">
                        <div class="download-option-row">
                            <div class="opt-details">MP4 1080p <span>(220 MB)</span></div>
                            <button class="btn-ssyou-dl" data-quality="1080p">Download</button>
                        </div>
                        <div class="download-option-row" style="border-color: #cbd5e1; background-color: #f0fdf4;">
                            <div class="opt-details" style="color:#15803d;">MP4 720p <span>(120 MB) • Recommended</span></div>
                            <button class="btn-ssyou-dl" style="background-color:#059669;" data-quality="720p">Download</button>
                        </div>
                        <div class="download-option-row">
                            <div class="opt-details">MP3 Audio <span>(15 MB)</span></div>
                            <button class="btn-ssyou-dl" data-quality="mp3">Download</button>
                        </div>
                    </div>
                </div>

                <div class="download-toast" id="ssyou-dl-toast">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    <div>
                        <strong>File Downloaded:</strong><br>
                        <code>Persian_Tutorial_Session.mp4</code> is now saved in your local Downloads directory.
                    </div>
                </div>
            </div>
        </div>
    `;
    els.sandboxView.appendChild(browserFrame);

    // Grab elements inside viewport
    const urlInput = browserFrame.querySelector('#ssyou-url-input');
    const fetchBtn = browserFrame.querySelector('#ssyou-fetch-btn');
    const fillBtn = browserFrame.querySelector('#ssyou-autofill');
    const loader = browserFrame.querySelector('#ssyou-loader');
    const resultsPanel = browserFrame.querySelector('#ssyou-results-panel');
    const dlToast = browserFrame.querySelector('#ssyou-dl-toast');

    // Pre-populate if already fetched or completed
    if (state.downloadedFile) {
        resultsPanel.style.display = 'block';
        dlToast.style.display = 'flex';
    }

    fillBtn.addEventListener('click', () => {
        state.simulations.youtubeUrl = 'https://www.youtube.com/watch?v=prsh16m';
        urlInput.value = state.simulations.youtubeUrl;
        showToast("Sample client YouTube URL autofilled.");
    });

    fetchBtn.addEventListener('click', () => {
        if (!urlInput.value.trim()) {
            alert("Please paste or fill a YouTube link first!");
            return;
        }
        state.simulations.youtubeUrl = urlInput.value;
        resultsPanel.style.display = 'none';
        dlToast.style.display = 'none';
        loader.style.display = 'flex';

        setTimeout(() => {
            loader.style.display = 'none';
            resultsPanel.style.display = 'block';
        }, 1200);
    });

    // Handle Downloads
    browserFrame.querySelectorAll('.btn-ssyou-dl').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const qual = e.target.dataset.quality;
            e.target.textContent = 'Downloading...';
            e.target.disabled = true;

            setTimeout(() => {
                state.downloadedFile = {
                    name: 'Persian_Tutorial_Session.mp4',
                    duration: '16:00',
                    size: qual === '1080p' ? '220 MB' : (qual === '720p' ? '120 MB' : '15 MB'),
                    youtubeUrl: state.simulations.youtubeUrl
                };
                e.target.textContent = 'Downloaded';
                dlToast.style.display = 'flex';
                showToast("Video downloaded successfully. Proceed to Step 2.");
            }, 1500);
        });
    });
}

// Desktop Video Trimmer Sandbox View
function renderCutterSandbox() {
    els.sandboxTitle.textContent = "Video Trimmer Desktop App";

    // Enable horizontal scrollbar dynamically on sandbox view
    els.sandboxView.style.overflowX = 'auto';

    // Clean up play interval if already active to avoid leaks
    if (state.simulations.playInterval) {
        clearInterval(state.simulations.playInterval);
        state.simulations.playInterval = null;
        state.simulations.isPlaying = false;
    }

    const browserFrame = document.createElement('div');
    browserFrame.className = 'browser-frame';
    
    // Check if file missing
    if (!state.downloadedFile && !state.simulations.trimmerBypassed) {
        browserFrame.innerHTML = `
            <div style="color: #ef4444; padding: 30px; display: flex; flex-direction: column; align-items: center; justify-content: center; height:100%; text-align:center; background:#0f1021;">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-bottom:12px;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                <h4 style="font-size: 1rem; font-weight:700; color:#cacada;">Assets Missing</h4>
                <p style="font-size: 0.8rem; color: #70739e; margin-top:6px; max-width:320px;">You must complete <strong>Step 1</strong> to download the video file before you can trim it.</p>
                <div style="display:flex; gap:12px; margin-top:20px;">
                    <button class="btn btn-sm btn-secondary" onclick="renderStep(1)">Go back to Step 1</button>
                    <button class="btn btn-sm btn-primary" id="trimmer-bypass-btn" style="background:#3b82f6;">Download inside Trimmer</button>
                </div>
            </div>
        `;
        els.sandboxView.appendChild(browserFrame);
        
        browserFrame.querySelector('#trimmer-bypass-btn').addEventListener('click', () => {
            state.simulations.trimmerBypassed = true;
            renderSandbox(2);
        });
        return;
    }

    if (state.trimmedFile) {
        browserFrame.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height:100%; text-align:center; padding: 30px; background:#0f1021; color:#cacada;">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" style="margin-bottom:12px;"><polyline points="20 6 9 17 4 12"/></svg>
                <h4 style="font-size: 1.1rem; color:#10b981; font-weight:700;">All segments trimmed!</h4>
                <p style="font-size:0.85rem; color:#70739e; margin-top:6px;">Trimmed file: <code>Persian_Tutorial_Session_Trimmed.mp4</code> is saved.</p>
                <button class="btn btn-sm btn-primary" style="margin-top:20px; background:#10b981;" onclick="renderStep(3)">Proceed to Upload Step</button>
            </div>
        `;
        els.sandboxView.appendChild(browserFrame);
        return;
    }

    // Time Formatter helpers
    function formatTimeFull(secs) {
        if (secs === null || isNaN(secs)) return '--:--:--.---';
        const h = Math.floor(secs / 3600);
        const m = Math.floor((secs % 3600) / 60);
        const s = Math.floor(secs % 60);
        const ms = Math.floor((secs % 1) * 1000);
        
        const pad = (n, size=2) => String(n).padStart(size, '0');
        return `${pad(h)}:${pad(m)}:${pad(s)}.${pad(ms, 3)}`;
    }

    function formatTimeShort(secs) {
        if (secs === null || isNaN(secs)) return '--:--';
        const m = Math.floor(secs / 60);
        const s = Math.floor(secs % 60);
        return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }

    // Segment List rendering
    let queueHtml = '';
    if (state.simulations.trimQueue.length === 0) {
        queueHtml = `<div style="font-size: 0.72rem; color: #53557e; text-align: center; padding: 24px 10px;">No segments in list. Set start/end and click Add to List, or use Auto-split.</div>`;
    } else {
        state.simulations.trimQueue.forEach((itemText, idx) => {
            const isSelected = state.simulations.selectedQueueIdx === idx;
            queueHtml += `
                <div class="trimmer-queue-item" data-idx="${idx}" style="font-size: 0.72rem; background: ${isSelected ? '#2d2f5a' : '#16172f'}; border-radius: 4px; padding: 6px 10px; margin-bottom: 6px; border: 1px solid ${isSelected ? '#3c4080' : '#212344'}; display: flex; justify-content: space-between; align-items: center; cursor: pointer; color: ${isSelected ? '#ffffff' : '#cacada'};">
                    <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 220px;">${idx + 1}. ${itemText}</span>
                </div>
            `;
        });
    }

    const isLoaded = state.simulations.trimmerLoaded;
    const saveLocationText = isLoaded ? `/Users/snigdha/Downloads/trimmed_video/` : `Open a video to set save location`;
    
    // Player Viewport rendering
    let playerHtml = '';
    if (!isLoaded) {
        playerHtml = `
            <div class="trimmer-player-content">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#53557e" stroke-width="1.5" style="margin-bottom:12px;"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg>
                <span style="color:#70739e;">Open a video or download from YouTube to start trimming</span>
            </div>
        `;
    } else {
        playerHtml = `
            <div style="width:100%; height:100%; display:flex; flex-direction:column; position:relative; background:#06070d; align-items:center; justify-content:center;">
                <div style="text-align:center; color:#53557e;">
                    <div style="font-size:1.8rem; margin-bottom:8px; color:#8384df;">🖥️</div>
                    <div style="font-size:0.75rem; font-weight:600; color:#cacada;">Persian_Tutorial_Session.mp4</div>
                    <div style="font-size:0.68rem; color:#70739e; margin-top:2px;">Simulated Video Stream (16:00)</div>
                </div>
                <div id="player-play-overlay" style="position:absolute; width:48px; height:48px; border-radius:50%; background:rgba(19,20,39,0.75); display:flex; align-items:center; justify-content:center; color:#ffffff; font-size:1.2rem; cursor:pointer; border: 1px solid #3c4080; transition:0.2s;">
                    ${state.simulations.isPlaying ? '❚❚' : '▶'}
                </div>
                <div style="position:absolute; top:8px; left:8px; background:rgba(0,0,0,0.6); padding:2px 6px; border-radius:4px; font-size:0.65rem; color:#cacada;">
                    720p HD
                </div>
            </div>
        `;
    }

    browserFrame.innerHTML = `
        <style>
            .trimmer-window {
                display: flex;
                flex-direction: column;
                height: 100%;
                background-color: #0f1021;
                color: #cacada;
                font-family: var(--font-family);
                font-size: 0.8rem;
                user-select: none;
                min-width: 900px;
            }
            .trimmer-titlebar {
                background-color: #131427;
                padding: 10px 16px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-bottom: 1px solid #232549;
            }
            .trimmer-title-left {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .trimmer-logo-box {
                width: 18px;
                height: 18px;
                background: linear-gradient(135deg, #8384df, #5051b5);
                border-radius: 4px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 0.65rem;
                font-weight: 800;
            }
            .trimmer-title-text {
                font-weight: 700;
                font-size: 0.8rem;
                color: #d5d6e2;
            }
            .trimmer-window-controls {
                display: flex;
                gap: 8px;
            }
            .trimmer-win-btn {
                color: #70739e;
                font-size: 0.75rem;
                cursor: pointer;
                transition: color 0.2s;
                padding: 0 4px;
            }
            .trimmer-win-btn:hover {
                color: #ffffff;
            }
            .trimmer-body {
                flex-grow: 1;
                display: flex;
                overflow: hidden;
            }
            .trimmer-col-left {
                width: 330px;
                padding: 16px;
                display: flex;
                flex-direction: column;
                gap: 14px;
                background-color: #121324;
                border-right: 1px solid #232549;
                overflow-y: auto;
                min-height: 0;
            }
            .trimmer-col-right {
                flex-grow: 1;
                padding: 16px;
                display: flex;
                flex-direction: column;
                gap: 14px;
                background-color: #0b0c16;
                overflow-y: auto;
                min-height: 0;
            }
            .trimmer-col-left::-webkit-scrollbar, .trimmer-col-right::-webkit-scrollbar, .trimmer-listbox::-webkit-scrollbar {
                width: 6px;
            }
            .trimmer-col-left::-webkit-scrollbar-track, .trimmer-col-right::-webkit-scrollbar-track, .trimmer-listbox::-webkit-scrollbar-track {
                background: transparent;
            }
            .trimmer-col-left::-webkit-scrollbar-thumb, .trimmer-col-right::-webkit-scrollbar-thumb, .trimmer-listbox::-webkit-scrollbar-thumb {
                background: #232549;
                border-radius: 3px;
            }
            .trimmer-fieldset {
                border: 1px solid #232549;
                border-radius: 6px;
                padding: 12px;
                margin-bottom: 2px;
                background-color: #16172f;
            }
            .trimmer-fieldset-right {
                border: 1px solid #232549;
                border-radius: 6px;
                padding: 12px;
                margin-bottom: 2px;
                background-color: #121324;
            }
            .trimmer-legend {
                font-size: 0.72rem;
                font-weight: 700;
                color: #8384df;
                padding: 0 6px;
                text-transform: uppercase;
                letter-spacing: 0.03em;
            }
            .trimmer-input-text {
                background-color: #0c0d1b;
                border: 1px solid #212344;
                border-radius: 4px;
                color: #ffffff;
                padding: 5px 8px;
                font-size: 0.76rem;
                outline: none;
                flex-grow: 1;
                transition: border-color 0.2s;
            }
            .trimmer-input-text:focus {
                border-color: #4a4d7c;
            }
            .trimmer-input-text::placeholder {
                color: #4b4d7c;
            }
            .trimmer-btn-dark {
                background-color: #252748;
                border: 1px solid #3b3e6d;
                border-radius: 4px;
                color: #ffffff;
                padding: 5px 12px;
                font-size: 0.76rem;
                cursor: pointer;
                transition: all 0.2s;
            }
            .trimmer-btn-dark:hover {
                background-color: #31345d;
                border-color: #4c508f;
            }
            .trimmer-btn-dark:disabled {
                opacity: 0.4;
                cursor: not-allowed;
            }
            .trimmer-btn-primary {
                background-color: #33385e;
                border: 1px solid #4a5087;
                border-radius: 4px;
                color: #ffffff;
                padding: 7px 18px;
                font-size: 0.78rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s;
            }
            .trimmer-btn-primary:hover {
                background-color: #404675;
                border-color: #5d64a6;
            }
            .trimmer-btn-primary:disabled {
                opacity: 0.4;
                cursor: not-allowed;
            }
            .trimmer-help-text {
                color: #70739e;
                font-size: 0.72rem;
                margin-top: 3px;
                margin-bottom: 6px;
            }
            .trimmer-radio-row {
                display: flex;
                gap: 12px;
                margin-bottom: 8px;
                font-size: 0.76rem;
            }
            .trimmer-radio-label {
                display: flex;
                align-items: center;
                gap: 5px;
                cursor: pointer;
            }
            .trimmer-select {
                background-color: #0c0d1b;
                border: 1px solid #212344;
                border-radius: 4px;
                color: #ffffff;
                padding: 4px 8px;
                font-size: 0.76rem;
                outline: none;
                cursor: pointer;
            }
            .trimmer-listbox {
                background-color: #0c0d1b;
                border: 1px solid #212344;
                border-radius: 4px;
                height: 110px;
                overflow-y: auto;
                padding: 6px;
            }
            .trimmer-viewport {
                height: 240px;
                background-color: #020308;
                border-radius: 8px;
                border: 1px solid #212344;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                position: relative;
                overflow: hidden;
            }
            .trimmer-player-content {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                text-align: center;
                padding: 20px;
                font-size: 0.76rem;
                color: #70739e;
            }
            .trimmer-player-controls-row {
                display: flex;
                align-items: center;
                justify-content: space-between;
                background-color: #121324;
                border: 1px solid #232549;
                padding: 8px 12px;
                border-radius: 8px;
                gap: 10px;
            }
            .trimmer-time-label {
                font-size: 0.75rem;
                color: #cacada;
                font-family: monospace;
            }
            .trimmer-range-slider {
                flex-grow: 1;
                -webkit-appearance: none;
                appearance: none;
                height: 4px;
                background: #1e203c;
                border-radius: 2px;
                outline: none;
                cursor: pointer;
            }
            .trimmer-range-slider::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: #3b82f6;
                cursor: pointer;
                transition: background 0.15s;
            }
            .trimmer-range-slider::-webkit-slider-thumb:hover {
                background: #60a5fa;
            }
            .trimmer-badge {
                background-color: #1e1f38;
                border: 1px solid #2d2f5a;
                border-radius: 4px;
                padding: 3px 6px;
                color: #cacada;
                font-family: monospace;
                font-size: 0.74rem;
            }
            .spinner {
                width: 24px;
                height: 24px;
                border: 3px solid #1e203c;
                border-top: 3px solid #3b82f6;
                border-radius: 50%;
                animation: spin 0.8s linear infinite;
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>

        <div class="trimmer-window" id="trimmer-window-editor">
            <!-- Title Bar -->
            <div class="trimmer-titlebar">
                <div class="trimmer-title-left">
                    <div class="trimmer-logo-box">✂</div>
                    <span class="trimmer-title-text">Video Trimmer</span>
                </div>
                <div class="trimmer-window-controls">
                    <span class="trimmer-win-btn">─</span>
                    <span class="trimmer-win-btn">⤢</span>
                    <span class="trimmer-win-btn">✕</span>
                </div>
            </div>

            <!-- Dashboard Content -->
            <div class="trimmer-body">
                <!-- Left Column -->
                <div class="trimmer-col-left">
                    <!-- Download from YouTube -->
                    <fieldset class="trimmer-fieldset">
                        <legend class="trimmer-legend">Download from YouTube</legend>
                        <div style="display:flex; gap:6px;">
                            <input type="text" class="trimmer-input-text" id="yt-url-input" placeholder="https://www.youtube.com/watch?..." value="${state.simulations.youtubeUrl || ''}">
                            <button class="trimmer-btn-dark" id="yt-fetch-btn">Fetch info</button>
                        </div>
                        <div class="trimmer-help-text" id="yt-status-text">Paste a URL and click Fetch info</div>
                        
                        <div class="trimmer-radio-row">
                            <label class="trimmer-radio-label">
                                <input type="radio" name="yt-type" value="video" checked> Video
                            </label>
                            <label class="trimmer-radio-label">
                                <input type="radio" name="yt-type" value="audio"> Audio only
                            </label>
                        </div>

                        <div class="trimmer-dropdown-row">
                            <label style="font-size: 0.76rem; color: #cacada; margin-right: 6px;">Format:</label>
                            <select class="trimmer-select" id="yt-format-select">
                                <option value="720p">720p</option>
                                <option value="1080p">1080p</option>
                                <option value="480p">480p</option>
                            </select>
                        </div>

                        <div style="display:flex; align-items:center; gap:6px; margin-bottom:12px;">
                            <span style="font-size:0.74rem; color:#cacada; width:70px; flex-shrink:0;">Save folder:</span>
                            <input type="text" class="trimmer-input-text" id="yt-save-folder" value="trimmed video" style="height:26px; padding:2px 6px;">
                            <button class="trimmer-btn-dark" style="padding:2px 6px; height:26px; font-size:0.7rem; flex-shrink:0;">Choose...</button>
                        </div>

                        <div style="display:flex; justify-content:center;">
                            <button class="trimmer-btn-primary" id="yt-download-btn" disabled>Download</button>
                        </div>
                    </fieldset>

                    <!-- Source -->
                    <fieldset class="trimmer-fieldset">
                        <legend class="trimmer-legend">Source</legend>
                        <button class="trimmer-btn-dark" id="trimmer-open-btn" style="width:100%;">Open Video</button>
                    </fieldset>

                    <!-- Segments -->
                    <fieldset class="trimmer-fieldset" style="display:flex; flex-direction:column;">
                        <legend class="trimmer-legend">Segments</legend>
                        <div style="display:flex; justify-content:flex-end; gap:6px; margin-bottom:8px;">
                            <button class="trimmer-btn-dark" id="segment-rename-btn" style="padding: 2px 8px; font-size: 0.68rem;">Rename</button>
                            <button class="trimmer-btn-dark" id="segment-remove-btn" style="padding: 2px 8px; font-size: 0.68rem;">Remove</button>
                        </div>
                        <div class="trimmer-listbox" id="trimmer-queue-list">
                            ${queueHtml}
                        </div>
                    </fieldset>

                    <!-- Export -->
                    <fieldset class="trimmer-fieldset">
                        <legend class="trimmer-legend">Export</legend>
                        <div style="font-size:0.74rem; color:#cacada; margin-bottom:8px; line-height:1.3;">
                            Save to:
                            <div style="background-color:#0c0d1b; border:1px solid #212344; border-radius:4px; padding:6px 10px; color:#cacada; font-size:0.76rem; margin-top:4px;" id="trimmer-export-location">
                                ${saveLocationText}
                            </div>
                        </div>
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px;">
                            <button class="trimmer-btn-dark" id="export-open-folder-btn" style="padding:5px 12px; font-size:0.76rem;" ${isLoaded ? '' : 'disabled'}>Open Folder</button>
                            <button class="trimmer-btn-primary" id="trimmer-trim-all" style="background:#10b981; border-color:#059669;" ${isLoaded && state.simulations.trimQueue.length > 0 ? '' : 'disabled'}>Trim All</button>
                        </div>
                    </fieldset>
                </div>

                <!-- Right Column -->
                <div class="trimmer-col-right">
                    <!-- Video Preview Viewport -->
                    <div class="trimmer-viewport" id="trimmer-video-viewport">
                        ${playerHtml}
                    </div>

                    <!-- Player Controls Row -->
                    <div class="trimmer-player-controls-row">
                        <span class="trimmer-time-label" id="trimmer-current-time">${formatTimeFull(state.simulations.playerSliderVal)}</span>
                        <input type="range" class="trimmer-range-slider" id="trimmer-time-slider" min="0" max="960" value="${state.simulations.playerSliderVal}" ${isLoaded ? '' : 'disabled'}>
                        <span class="trimmer-time-label" id="trimmer-duration">${isLoaded ? '00:16:00.000' : '00:00:00.000'}</span>
                        <button class="trimmer-btn-dark" id="trimmer-play-btn" style="padding:4px 10px; font-size:0.74rem;" ${isLoaded ? '' : 'disabled'}>
                            ${state.simulations.isPlaying ? 'Pause' : 'Play / Pause'}
                        </button>
                    </div>

                    <!-- Mark Range -->
                    <fieldset class="trimmer-fieldset-right">
                        <legend class="trimmer-legend">Mark range</legend>
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <div style="display:flex; gap:8px;">
                                <button class="trimmer-btn-dark" id="trimmer-set-start" ${isLoaded ? '' : 'disabled'}>Set Start</button>
                                <button class="trimmer-btn-dark" id="trimmer-set-end" ${isLoaded ? '' : 'disabled'}>Set End</button>
                                <button class="trimmer-btn-primary" id="trimmer-add-list" style="background:#3b82f6; border-color:#2563eb;" ${isLoaded ? '' : 'disabled'}>Add to List</button>
                            </div>
                            <div style="display:flex; gap:10px; align-items:center;">
                                <span class="trimmer-badge" id="start-badge">Start: ${formatTimeFull(state.simulations.cutterStartSec)}</span>
                                <span class="trimmer-badge" id="end-badge">End: ${formatTimeFull(state.simulations.cutterEndSec)}</span>
                            </div>
                        </div>
                    </fieldset>

                    <!-- Auto-split -->
                    <fieldset class="trimmer-fieldset-right">
                        <legend class="trimmer-legend">Auto-split</legend>
                        <div style="display:flex; flex-direction:column; gap:10px;">
                            <!-- Parts -->
                            <div style="display:flex; align-items:center; gap:8px;">
                                <span style="font-size:0.76rem; color:#cacada; width:45px;">Into</span>
                                <input type="number" class="trimmer-input-text" id="trimmer-parts-val" value="2" style="width:55px; text-align:center; height:26px; padding:2px;" ${isLoaded ? '' : 'disabled'}>
                                <span style="font-size:0.76rem; color:#cacada;">parts</span>
                                <button class="trimmer-btn-dark" id="trimmer-split-parts-btn" style="height:26px; padding:2px 12px; margin-left:8px;" ${isLoaded ? '' : 'disabled'}>Generate</button>
                            </div>
                            <!-- Interval -->
                            <div style="display:flex; align-items:center; gap:8px;">
                                <span style="font-size:0.76rem; color:#cacada; width:45px;">Every</span>
                                <input type="number" class="trimmer-input-text" id="trimmer-split-h" value="0" style="width:40px; text-align:center; height:26px; padding:2px;" ${isLoaded ? '' : 'disabled'}>
                                <span style="font-size:0.74rem; color:#70739e;">h</span>
                                <input type="number" class="trimmer-input-text" id="trimmer-split-m" value="15" style="width:40px; text-align:center; height:26px; padding:2px;" ${isLoaded ? '' : 'disabled'}>
                                <span style="font-size:0.74rem; color:#70739e;">m</span>
                                <input type="number" class="trimmer-input-text" id="trimmer-split-s" value="0" style="width:40px; text-align:center; height:26px; padding:2px;" ${isLoaded ? '' : 'disabled'}>
                                <span style="font-size:0.74rem; color:#70739e;">s</span>
                                <button class="trimmer-btn-dark" id="trimmer-split-time-btn" style="height:26px; padding:2px 12px; margin-left:8px;" ${isLoaded ? '' : 'disabled'}>Generate</button>
                            </div>
                        </div>
                    </fieldset>

                    <!-- Right Column Bottom Controls -->
                    <div style="display:flex; justify-content:flex-end; margin-top:4px;">
                        <button class="trimmer-btn-primary" id="trimmer-trim-all-right" style="background:#10b981; border-color:#059669; padding: 8px 24px; font-size: 0.8rem;" ${isLoaded && state.simulations.trimQueue.length > 0 ? '' : 'disabled'}>Trim All</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Saving progress overlay -->
        <div class="trimmer-window" id="trimmer-saving-overlay" style="display:none; align-items:center; justify-content:center; height:100%; background:#0f1021;">
            <div class="spinner" style="width:40px; height:40px; margin-bottom:12px;"></div>
            <h4 style="font-size: 0.95rem; font-weight:600; color:#cacada;">Rendering and saving segments...</h4>
            <div class="progress-bar-bg" style="width: 200px; margin-top:10px; background:#212344; height:6px; border-radius:3px; overflow:hidden;">
                <div class="progress-bar-fill" id="trimmer-bar-fill" style="width: 0%; background:#3b82f6; height:100%;"></div>
            </div>
        </div>
    `;

    els.sandboxView.appendChild(browserFrame);

    // YouTube Downloader Event Listeners
    const ytUrlInput = browserFrame.querySelector('#yt-url-input');
    const ytFetchBtn = browserFrame.querySelector('#yt-fetch-btn');
    const ytStatusText = browserFrame.querySelector('#yt-status-text');
    const ytDownloadBtn = browserFrame.querySelector('#yt-download-btn');
    const ytFormatSelect = browserFrame.querySelector('#yt-format-select');

    ytUrlInput.addEventListener('input', () => {
        state.simulations.youtubeUrl = ytUrlInput.value;
    });

    ytFetchBtn.addEventListener('click', () => {
        const urlVal = ytUrlInput.value.trim();
        if (!urlVal) {
            showToast("Please enter a YouTube link.");
            return;
        }
        ytFetchBtn.textContent = "Fetching...";
        ytFetchBtn.disabled = true;
        ytStatusText.textContent = "Connecting to YouTube service...";
        
        setTimeout(() => {
            ytFetchBtn.textContent = "Fetch info";
            ytFetchBtn.disabled = false;
            ytStatusText.innerHTML = `Found video: <strong style="color:#10b981;">Persian Tutorial Session (16:00)</strong>`;
            ytDownloadBtn.disabled = false;
            showToast("Video metadata fetched successfully!");
        }, 1000);
    });

    ytDownloadBtn.addEventListener('click', () => {
        ytDownloadBtn.textContent = "Downloading...";
        ytDownloadBtn.disabled = true;
        
        setTimeout(() => {
            ytDownloadBtn.textContent = "Downloaded";
            state.downloadedFile = {
                name: 'Persian_Tutorial_Session.mp4',
                duration: '16:00',
                size: ytFormatSelect.value === '1080p' ? '220 MB' : (ytFormatSelect.value === '720p' ? '120 MB' : '75 MB'),
                youtubeUrl: state.simulations.youtubeUrl
            };
            state.simulations.trimmerLoaded = true;
            state.simulations.playerSliderVal = 0;
            state.simulations.cutterStartSec = null;
            state.simulations.cutterEndSec = null;
            showToast("Video downloaded and loaded into workspace!");
            renderSandbox(2);
        }, 1500);
    });

    // Open Local Video Event Listener
    const openBtn = browserFrame.querySelector('#trimmer-open-btn');
    openBtn.addEventListener('click', () => {
        if (!state.downloadedFile) {
            state.downloadedFile = {
                name: 'Persian_Tutorial_Session.mp4',
                duration: '16:00',
                size: '120 MB',
                youtubeUrl: 'https://www.youtube.com/watch?v=mock'
            };
        }
        state.simulations.trimmerLoaded = true;
        state.simulations.playerSliderVal = 0;
        state.simulations.cutterStartSec = null;
        state.simulations.cutterEndSec = null;
        showToast("Loaded: Persian_Tutorial_Session.mp4");
        renderSandbox(2);
    });

    // Video Player Timeline
    if (isLoaded) {
        const timeSlider = browserFrame.querySelector('#trimmer-time-slider');
        const currentTimeLabel = browserFrame.querySelector('#trimmer-current-time');
        const playBtn = browserFrame.querySelector('#trimmer-play-btn');
        const setStartBtn = browserFrame.querySelector('#trimmer-set-start');
        const setEndBtn = browserFrame.querySelector('#trimmer-set-end');
        const addListBtn = browserFrame.querySelector('#trimmer-add-list');
        const startBadge = browserFrame.querySelector('#start-badge');
        const endBadge = browserFrame.querySelector('#end-badge');
        const playOverlay = browserFrame.querySelector('#player-play-overlay');

        timeSlider.addEventListener('input', () => {
            const val = parseFloat(timeSlider.value);
            state.simulations.playerSliderVal = val;
            currentTimeLabel.textContent = formatTimeFull(val);
        });

        const togglePlay = () => {
            if (state.simulations.isPlaying) {
                state.simulations.isPlaying = false;
                if (state.simulations.playInterval) {
                    clearInterval(state.simulations.playInterval);
                    state.simulations.playInterval = null;
                }
                playBtn.textContent = 'Play / Pause';
                if (playOverlay) playOverlay.textContent = '▶';
            } else {
                state.simulations.isPlaying = true;
                playBtn.textContent = 'Pause';
                if (playOverlay) playOverlay.textContent = '❚❚';
                
                state.simulations.playInterval = setInterval(() => {
                    let val = parseFloat(timeSlider.value) + 1;
                    if (val > 960) {
                        val = 0;
                    }
                    timeSlider.value = val;
                    state.simulations.playerSliderVal = val;
                    currentTimeLabel.textContent = formatTimeFull(val);
                }, 1000);
            }
        };

        playBtn.addEventListener('click', togglePlay);
        if (playOverlay) {
            playOverlay.addEventListener('click', togglePlay);
        }

        setStartBtn.addEventListener('click', () => {
            state.simulations.cutterStartSec = state.simulations.playerSliderVal;
            startBadge.textContent = `Start: ${formatTimeFull(state.simulations.cutterStartSec)}`;
            showToast(`Start point marked at ${formatTimeShort(state.simulations.cutterStartSec)}`);
        });

        setEndBtn.addEventListener('click', () => {
            state.simulations.cutterEndSec = state.simulations.playerSliderVal;
            endBadge.textContent = `End: ${formatTimeFull(state.simulations.cutterEndSec)}`;
            showToast(`End point marked at ${formatTimeShort(state.simulations.cutterEndSec)}`);
        });

        addListBtn.addEventListener('click', () => {
            const start = state.simulations.cutterStartSec;
            const end = state.simulations.cutterEndSec;
            
            if (start === null || end === null) {
                showToast("Please mark both start and end points first.");
                return;
            }
            if (start >= end) {
                showToast("End point must be after start point.");
                return;
            }
            
            const itemText = `Persian_Tutorial_Session.mp4 (${formatTimeShort(start)} to ${formatTimeShort(end)})`;
            state.simulations.trimQueue.push(itemText);
            state.simulations.selectedQueueIdx = state.simulations.trimQueue.length - 1;
            showToast("Clip range added to list.");
            renderSandbox(2);
        });
    }

    // Segments queue interactions
    const queueListDiv = browserFrame.querySelector('#trimmer-queue-list');
    const removeBtn = browserFrame.querySelector('#segment-remove-btn');
    const renameBtn = browserFrame.querySelector('#segment-rename-btn');

    if (queueListDiv) {
        queueListDiv.querySelectorAll('.trimmer-queue-item').forEach(item => {
            item.addEventListener('click', () => {
                const idx = parseInt(item.dataset.idx);
                state.simulations.selectedQueueIdx = idx;
                renderSandbox(2);
            });
        });
    }

    if (removeBtn) {
        removeBtn.addEventListener('click', () => {
            const selIdx = state.simulations.selectedQueueIdx;
            if (selIdx === null || selIdx === undefined || selIdx < 0 || selIdx >= state.simulations.trimQueue.length) {
                showToast("Please select a segment from the list first.");
                return;
            }
            state.simulations.trimQueue.splice(selIdx, 1);
            state.simulations.selectedQueueIdx = null;
            showToast("Segment removed.");
            renderSandbox(2);
        });
    }

    if (renameBtn) {
        renameBtn.addEventListener('click', () => {
            const selIdx = state.simulations.selectedQueueIdx;
            if (selIdx === null || selIdx === undefined || selIdx < 0 || selIdx >= state.simulations.trimQueue.length) {
                showToast("Please select a segment from the list first.");
                return;
            }
            const currentText = state.simulations.trimQueue[selIdx];
            const newName = prompt("Rename segment:", currentText);
            if (newName && newName.trim()) {
                state.simulations.trimQueue[selIdx] = newName.trim();
                showToast("Segment renamed.");
                renderSandbox(2);
            }
        });
    }

    // Auto-split options
    if (isLoaded) {
        const splitPartsBtn = browserFrame.querySelector('#trimmer-split-parts-btn');
        const partsValInput = browserFrame.querySelector('#trimmer-parts-val');
        const splitTimeBtn = browserFrame.querySelector('#trimmer-split-time-btn');
        const splitH = browserFrame.querySelector('#trimmer-split-h');
        const splitM = browserFrame.querySelector('#trimmer-split-m');
        const splitS = browserFrame.querySelector('#trimmer-split-s');

        splitPartsBtn.addEventListener('click', () => {
            const parts = parseInt(partsValInput.value) || 2;
            if (parts <= 1) {
                showToast("Must split into at least 2 parts.");
                return;
            }
            const totalSec = 960;
            const partDuration = totalSec / parts;
            state.simulations.trimQueue = [];
            
            for (let i = 0; i < parts; i++) {
                const start = i * partDuration;
                const end = (i + 1) * partDuration;
                state.simulations.trimQueue.push(`Persian_Tutorial_Session.mp4 Part ${i+1} (${formatTimeShort(start)} to ${formatTimeShort(end)})`);
            }
            state.simulations.selectedQueueIdx = 0;
            showToast(`Auto-split generated ${parts} parts.`);
            renderSandbox(2);
        });

        splitTimeBtn.addEventListener('click', () => {
            const h = parseInt(splitH.value) || 0;
            const m = parseInt(splitM.value) || 0;
            const s = parseInt(splitS.value) || 0;
            const intervalSec = h * 3600 + m * 60 + s;
            
            if (intervalSec <= 0) {
                showToast("Please enter a split interval greater than 0.");
                return;
            }
            
            const totalSec = 960;
            state.simulations.trimQueue = [];
            let start = 0;
            let count = 1;
            
            while (start < totalSec) {
                let end = start + intervalSec;
                if (end > totalSec) end = totalSec;
                state.simulations.trimQueue.push(`Persian_Tutorial_Session.mp4 Segment ${count} (${formatTimeShort(start)} to ${formatTimeShort(end)})`);
                start = end;
                count++;
            }
            state.simulations.selectedQueueIdx = 0;
            showToast(`Auto-split generated ${count-1} segments.`);
            renderSandbox(2);
        });
    }

    // Export / Open Folder / Trim All action
    const openFolderBtn = browserFrame.querySelector('#export-open-folder-btn');
    if (openFolderBtn) {
        openFolderBtn.addEventListener('click', () => {
            showToast("Opened folder: /Users/snigdha/Downloads/trimmed_video/");
        });
    }

    const runTrimAll = () => {
        if (state.simulations.isPlaying) {
            state.simulations.isPlaying = false;
            if (state.simulations.playInterval) {
                clearInterval(state.simulations.playInterval);
                state.simulations.playInterval = null;
            }
        }
        
        const editorWindow = browserFrame.querySelector('#trimmer-window-editor');
        const savingOverlay = browserFrame.querySelector('#trimmer-saving-overlay');
        const progressBar = browserFrame.querySelector('#trimmer-bar-fill');
        
        editorWindow.style.display = 'none';
        savingOverlay.style.display = 'flex';
        
        let progressVal = 0;
        const interval = setInterval(() => {
            progressVal += 10;
            progressBar.style.width = `${progressVal}%`;
            
            if (progressVal >= 100) {
                clearInterval(interval);
                state.trimmedFile = {
                    name: 'Persian_Tutorial_Session_Trimmed.mp4',
                    start: formatTimeShort(state.simulations.cutterStartSec || 0),
                    end: formatTimeShort(state.simulations.cutterEndSec || 240),
                    size: '32 MB'
                };
                showToast("All segments trimmed! Saved to Downloads folder.");
                renderSandbox(2);
            }
        }, 250);
    };

    const trimAllBtn = browserFrame.querySelector('#trimmer-trim-all');
    const trimAllRightBtn = browserFrame.querySelector('#trimmer-trim-all-right');

    if (trimAllBtn) trimAllBtn.addEventListener('click', runTrimAll);
    if (trimAllRightBtn) trimAllRightBtn.addEventListener('click', runTrimAll);
}

// Lingochaps Simulator (Replicating exact UI layout from screenshots)
function renderLingochapsSandbox(isVerificationMode) {
    els.sandboxTitle.textContent = "LingoChaps Transcription Tool (studio.lingochaps.com)";

    const browserFrame = document.createElement('div');
    browserFrame.className = 'browser-frame';
    
    // Address bar with studio URL
    browserFrame.innerHTML = `
        <div class="browser-titlebar">
            <div class="browser-dots">
                <div class="browser-dot dot-red"></div>
                <div class="browser-dot dot-yellow"></div>
                <div class="browser-dot dot-green"></div>
            </div>
            <div class="browser-address-bar">
                <span class="address-lock">🔒</span> studio.lingochaps.com
            </div>
        </div>
        <div class="browser-viewport" style="display:flex; flex-direction:column;">
            <div class="lingochaps-app">
                
                <!-- LingoChaps Top Header -->
                <header class="lingochaps-header">
                    <div class="lingochaps-brand">
                        <div class="lingochaps-logo-graphic">LC</div>
                        <div class="lingochaps-logo-text">
                            <h3>LingoChaps Tool</h3>
                            <span>INTERNAL WORKSPACE</span>
                        </div>
                    </div>
                    <div class="lingochaps-header-menu">
                        <span class="header-menu-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;margin-right:2px;"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg> Home</span>
                        <div class="lingochaps-profile">
                            <span class="lingochaps-avatar">V</span>
                            <span class="lingochaps-email">vm@lingochaps...</span>
                        </div>
                        <button class="btn-lingochaps-signout">Sign out</button>
                    </div>
                </header>

                <div class="lingochaps-body">
                    
                    <!-- Sidebar menu -->
                    <aside class="lingochaps-sidebar">
                        <div class="lingochaps-sidebar-title">Workspace</div>
                        <div class="lingochaps-sidebar-card">
                            <div class="sidebar-card-icon">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 7a2 2 0 0 0-2.45-1.45L16 7V5a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2l4.55 1.45A2 2 0 0 0 23 17V7z"/></svg>
                            </div>
                            <div class="sidebar-card-text">
                                <h4>Transcription</h4>
                                <p>Upload, trim, transcribe, reports</p>
                            </div>
                        </div>
                        <div class="lingochaps-sidebar-subtext">
                            LingoChaps Transcription Tool is our main tool to transcribe and translate files.
                        </div>
                    </aside>

                    <!-- Main Portal Dashboard -->
                    <main class="lingochaps-main">
                        
                        <!-- Block 1: Upload (Hidden in Step 4 verification mode if already submitted) -->
                        <div class="lingochaps-form-container" id="lingochaps-upload-section" style="${isVerificationMode ? 'display:none;' : ''}">
                            <h2>New transcription</h2>
                            <p class="subtitle">Upload a video or audio file. The LingoChaps Transcription Tool will transcribe, translate, tag languages, extract on-screen text (video only), and build a Word report.</p>
                            
                            <div class="step-label">Step 1 — File</div>
                            
                            <div class="upload-zone" id="lingochaps-zone">
                                <div class="upload-normal-state" id="lingochaps-upload-normal">
                                    <div class="upload-icon">☁️</div>
                                    <div class="upload-text">
                                        Click to choose a video or audio file
                                        <span>or drag and drop here (MP4, MKV, MOV... or MP3, M4A, WAV...)</span>
                                    </div>
                                </div>
                                <div class="upload-success-state" id="lingochaps-upload-success" style="display:none;">
                                    <div class="file-icon-block">MP4</div>
                                    <div class="file-meta" style="text-align:left;">
                                        <h4 id="lingochaps-file-name">file.mp4</h4>
                                        <p id="lingochaps-file-size">0 MB</p>
                                    </div>
                                    <button class="btn-remove-file" id="lingochaps-remove-btn">Remove</button>
                                </div>
                            </div>

                            <div class="options-step">
                                <div class="step-label">Step 2 — Options</div>
                                <div class="option-group">
                                    <label class="group-title">Languages</label>
                                    <p style="font-size:0.7rem; color:#64748b; margin-top:-4px; margin-bottom:4px;">Comma-separated hints for detection, or leave as auto-detect.</p>
                                    <input type="text" class="text-input-hint" id="lingochaps-lang-input" value="auto-detect">
                                </div>
                                <div class="option-group">
                                    <label class="group-title">Custom instructions (optional)</label>
                                    <textarea class="textarea-input" id="lingochaps-instr-input" placeholder="Any extra guidance for the model..."></textarea>
                                </div>
                                <div class="option-group">
                                    <label class="group-title">Output</label>
                                    <p style="font-size:0.7rem; color:#64748b; margin-top:-4px; margin-bottom:6px;">Choose how the LingoChaps Transcription Tool should process your file. Transcription handles spoken words; on-screen text extracts text from the video.</p>
                                    
                                    <div class="output-options">
                                        <div class="output-card selected" data-value="full">
                                            <input type="radio" name="lc-output" id="out-full" checked>
                                            <div class="output-card-info">
                                                <h4>Full — transcription + on-screen text</h4>
                                                <p>Word report includes dialogue, translation, notes, and OST with screenshots.</p>
                                            </div>
                                        </div>
                                        <div class="output-card" data-value="transcript">
                                            <input type="radio" name="lc-output" id="out-trans">
                                            <div class="output-card-info">
                                                <h4>Transcript only</h4>
                                                <p>Speech transcription and translation in the report; skips on-screen text extraction (faster).</p>
                                            </div>
                                        </div>
                                        <div class="output-card" data-value="ost">
                                            <input type="radio" name="lc-output" id="out-ost">
                                            <div class="output-card-info">
                                                <h4>On-screen text only</h4>
                                                <p>No audio transcription—only detected on-screen text and images in the report.</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="partial-process-box">
                                        <input type="checkbox" id="lc-partial">
                                        <span>Process only part of the video</span>
                                    </div>
                                </div>
                            </div>

                            <div class="run-step">
                                <div class="step-label">Step 3 — Run</div>
                                <button class="btn-lingochaps-run" id="lingochaps-submit-btn" disabled>Start transcription</button>
                                <div class="btn-lingochaps-run-subtext" id="lingochaps-submit-subtext">Choose a file above to enable this button.</div>
                            </div>
                        </div>

                        <!-- Block 2: Recent Jobs -->
                        <div class="recent-jobs-container">
                            <div class="jobs-header">
                                <h3>Recent jobs</h3>
                                <button class="btn-refresh">🔄 Refresh</button>
                            </div>
                            <div class="jobs-list" id="lingochaps-jobs-list">
                                <!-- Populated dynamically -->
                            </div>
                        </div>

                    </main>
                </div>
                
                <!-- Drawer Details Modal -->
                <div class="job-details-modal" id="details-modal">
                    <div class="modal-header">
                        <h3 id="modal-job-title">Job Details</h3>
                        <button class="btn-close-modal" id="details-close-btn">&times;</button>
                    </div>
                    <div class="modal-body" id="modal-job-body">
                        <!-- Filled on click -->
                    </div>
                    <div class="modal-footer">
                        <button class="btn-download-word" id="download-word-btn">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                            Download Word Report
                        </button>
                    </div>
                </div>

            </div>
        </div>
    `;
    els.sandboxView.appendChild(browserFrame);

    // Form selection variables
    const zone = browserFrame.querySelector('#lingochaps-zone');
    const uploadNormal = browserFrame.querySelector('#lingochaps-upload-normal');
    const uploadSuccess = browserFrame.querySelector('#lingochaps-upload-success');
    const fileNameText = browserFrame.querySelector('#lingochaps-file-name');
    const fileSizeText = browserFrame.querySelector('#lingochaps-file-size');
    const removeBtn = browserFrame.querySelector('#lingochaps-remove-btn');
    const submitBtn = browserFrame.querySelector('#lingochaps-submit-btn');
    const submitSubtext = browserFrame.querySelector('#lingochaps-submit-subtext');
    const jobsListContainer = browserFrame.querySelector('#lingochaps-jobs-list');
    
    // Details modal variables
    const detailsModal = browserFrame.querySelector('#details-modal');
    const modalCloseBtn = browserFrame.querySelector('#details-close-btn');
    const modalJobTitle = browserFrame.querySelector('#modal-job-title');
    const modalJobBody = browserFrame.querySelector('#modal-job-body');
    const dlWordBtn = browserFrame.querySelector('#download-word-btn');

    // Radios selection
    const outputCards = browserFrame.querySelectorAll('.output-card');
    
    outputCards.forEach(card => {
        card.addEventListener('click', () => {
            outputCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            const radio = card.querySelector('input[type="radio"]');
            radio.checked = true;
            state.simulations.lingochapsSelectedOutput = card.dataset.value;
        });
    });

    // Handle verification warnings in step 3
    if (stepIndex === 3 && !state.trimmedFile) {
        zone.outerHTML = `
            <div class="alert alert-warning" style="margin-bottom:20px;">
                <strong>Missing File:</strong> You must complete <strong>Step 2</strong> (Trim File) first to get the trimmed clip before you can upload to the LingoChaps Transcription Tool.
            </div>
        `;
        return;
    }

    // Refresh jobs listing
    function renderJobsList() {
        jobsListContainer.innerHTML = '';
        state.recentJobs.forEach(job => {
            const isSim = job.id === 'job-simulated';
            const item = document.createElement('div');
            item.className = `job-item ${job.status === 'RUNNING' ? 'running' : ''}`;
            item.dataset.id = job.id;
            
            item.innerHTML = `
                <div class="job-info-col">
                    <h4>${job.name}</h4>
                    <span>${job.date}</span>
                </div>
                <div class="job-status-col">
                    <span class="status-badge ${job.status.toLowerCase()}">${job.status}</span>
                    <span class="job-progress-pct">${job.progress}%</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:#64748b;"><polyline points="9 18 15 12 9 6"/></svg>
                    ${isSim ? '' : '<button class="btn-delete-job" style="margin-left:8px;">🗑</button>'}
                </div>
            `;
            
            // Clicking item opens modal details
            item.addEventListener('click', () => {
                if (job.status === 'RUNNING') {
                    showToast("Job is still running. Please wait for completion.");
                    return;
                }
                openJobDetails(job);
            });

            jobsListContainer.appendChild(item);
        });
    }

    // Modal view triggers
    function openJobDetails(job) {
        modalJobTitle.textContent = job.name;
        
        let linesHtml = '';
        job.transcript.forEach(line => {
            if (line.type === 'ost') {
                linesHtml += `
                    <div class="transcript-line" style="border-left: 2px solid #3b82f6; padding-left: 8px;">
                        <strong>[OST Text]</strong> <em>${line.text}</em><br>
                        <span style="color: #4b5563;">&bull; Translation: ${line.translation}</span>
                    </div>
                `;
            } else {
                linesHtml += `
                    <div class="transcript-line">
                        <strong>[${line.time}]</strong> ${line.text}<br>
                        <span style="color: #6d28d9;">&bull; Trans: ${line.translation}</span>
                    </div>
                `;
            }
        });

        modalJobBody.innerHTML = `
            <div style="font-size:0.75rem; color:#64748b; margin-bottom:12px;">Processed on: ${job.date} • Mode: ${job.type}</div>
            <div class="report-preview-box">
                <h5>Transcript & Text Review</h5>
                ${linesHtml}
            </div>
            <p style="font-size: 0.72rem; color:#94a3b8;">Word Report delivers detailed layout alignments including speaker mappings, timeline syncs, and screenshots of detected text overlays.</p>
        `;
        
        detailsModal.classList.add('open');
    }

    modalCloseBtn.addEventListener('click', () => {
        detailsModal.classList.remove('open');
    });

    dlWordBtn.addEventListener('click', () => {
        showToast("Deliverable Word Report downloaded successfully.");
        detailsModal.classList.remove('open');
        if (state.currentStep === 4) {
            setTimeout(() => {
                renderStep(5);
            }, 1000);
        }
    });

    // Restore state of mock uploads
    if (state.simulations.lingochapsUploaded) {
        uploadNormal.style.display = 'none';
        uploadSuccess.style.display = 'flex';
        fileNameText.textContent = state.trimmedFile.name;
        fileSizeText.textContent = state.trimmedFile.size;
        submitBtn.disabled = false;
        submitSubtext.textContent = "Ready to start process.";
    }

    // Mock Upload trigger
    zone.addEventListener('click', (e) => {
        if (state.simulations.lingochapsUploaded || e.target === removeBtn) return;
        
        uploadNormal.style.display = 'none';
        uploadSuccess.style.display = 'flex';
        fileNameText.textContent = state.trimmedFile.name;
        fileSizeText.textContent = state.trimmedFile.size;
        submitBtn.disabled = false;
        submitSubtext.textContent = "Ready to start process.";
        
        state.simulations.lingochapsUploaded = true;
        showToast(`Uploaded ${state.trimmedFile.name} successfully.`);
    });

    removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        uploadNormal.style.display = 'block';
        uploadSuccess.style.display = 'none';
        submitBtn.disabled = true;
        submitSubtext.textContent = "Choose a file above to enable this button.";
        state.simulations.lingochapsUploaded = false;
    });

    // Start transcription submit button
    submitBtn.addEventListener('click', () => {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Uploading file...';
        
        setTimeout(() => {
            submitBtn.textContent = 'Queuing task...';
            
            setTimeout(() => {
                submitBtn.textContent = 'Processing...';
                
                // Add running job to top
                const newJob = {
                    id: 'job-simulated',
                    name: state.trimmedFile.name,
                    date: new Date().toLocaleString(),
                    status: 'RUNNING',
                    progress: 0,
                    type: state.simulations.lingochapsSelectedOutput === 'full' ? 'Full' : 
                          (state.simulations.lingochapsSelectedOutput === 'ost' ? 'On-screen text only' : 'Transcript only'),
                    transcript: [
                        { time: '00:01', text: 'Hello and welcome to LingoChaps Persian review video.', translation: 'سلام و به ویدئوی بررسی فارسی لینگوچپس خوش آمدید.' },
                        { time: '00:08', type: 'ost', text: 'Farsi Translation Manual', translation: 'دفترچه راهنمای ترجمه فارسی' },
                        { time: '01:15', text: 'Please ensure reports are submitted before Friday.', translation: 'لطفاً اطمینان حاصل کنید که گزارش‌ها قبل از جمعه ارسال شوند.' },
                        { time: '02:30', type: 'ost', text: 'Step 3 - Final Review', translation: 'مرحله ۳ - بررسی نهایی' }
                    ]
                };
                
                state.recentJobs.unshift(newJob);
                renderJobsList();
                showToast("Transcription task initialized.");
                
                // Simulate progress load
                let p = 0;
                const progressInterval = setInterval(() => {
                    p += 25;
                    const job = state.recentJobs.find(j => j.id === 'job-simulated');
                    if (job) {
                        job.progress = p;
                        if (p >= 100) {
                            job.status = 'DONE';
                            clearInterval(progressInterval);
                            submitBtn.textContent = 'Start transcription';
                            submitBtn.disabled = false;
                            
                            // Re-render final done state
                            renderJobsList();
                            showToast("Transcription completed! Move to Step 4 to review reports.");
                            
                            // Guide highlight alert to user to continue
                            setTimeout(() => {
                                renderStep(4);
                            }, 1200);
                        } else {
                            renderJobsList();
                        }
                    } else {
                        clearInterval(progressInterval);
                    }
                }, 1000);
                
            }, 800);
        }, 800);
    });

    // Initial render
    renderJobsList();
}

// Completed Training Page Sandbox View
function renderCompletedSandbox() {
    els.sandboxTitle.textContent = "Operations Training Complete";
    const div = document.createElement('div');
    div.className = 'completed-screen';
    div.innerHTML = `
        <div class="completed-badge">✓</div>
        <h3>Manual Complete!</h3>
        <p>You have mastered the complete workflow. You now understand how to prepare video files and process them inside the LingoChaps ecosystem.</p>
        
        <div class="completed-actions">
            <button class="btn btn-secondary" onclick="renderStep(0)">Restart Tutorial</button>
            <button class="btn btn-primary" onclick="window.close();">Finish & Exit</button>
        </div>
    `;
    els.sandboxView.appendChild(div);
}

// Start operations manual
document.addEventListener('DOMContentLoaded', init);
