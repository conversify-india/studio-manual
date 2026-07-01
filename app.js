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
        activeRunningJob: null
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

    const browserFrame = document.createElement('div');
    browserFrame.className = 'browser-frame';
    
    // Check if file missing
    if (!state.downloadedFile) {
        browserFrame.innerHTML = `
            <div style="color: #ef4444; padding: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; height:100%; text-align:center;">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-bottom:12px;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                <h4 style="font-size: 0.95rem; font-weight:700;">Assets Missing</h4>
                <p style="font-size: 0.8rem; color: #94a3b8; margin-top:4px; max-width:320px;">You must complete <strong>Step 1</strong> to download the video file before you can trim it.</p>
                <button class="btn btn-sm btn-primary" style="margin-top:16px;" onclick="renderStep(1)">Go back to Step 1</button>
            </div>
        `;
        els.sandboxView.appendChild(browserFrame);
        return;
    }

    if (state.trimmedFile) {
        browserFrame.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height:100%; text-align:center; padding: 20px;">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" style="margin-bottom:12px;"><polyline points="20 6 9 17 4 12"/></svg>
                <h4 style="font-size: 1rem; color:#10b981; font-weight:700;">All segments trimmed!</h4>
                <p style="font-size:0.8rem; color:#94a3b8; margin-top:4px;">Trimmed file: <code>Persian_Tutorial_Session_Trimmed.mp4</code> is saved.</p>
                <button class="btn btn-sm btn-primary" style="margin-top:16px;" onclick="renderStep(3)">Proceed to Upload Step</button>
            </div>
        `;
        els.sandboxView.appendChild(browserFrame);
        return;
    }

    if (!state.simulations.trimmerLoaded) {
        browserFrame.innerHTML = `
            <div class="trimmer-window" style="display: flex; flex-direction: column; height: 100%; background-color: #0f172a; color: #e2e8f0; font-size: 0.85rem;">
                <div class="trimmer-titlebar" style="background-color: #1e293b; padding: 8px 16px; display: flex; align-items: center; gap: 12px; border-bottom: 1px solid #334155;">
                    <div class="trimmer-dots" style="display: flex; gap: 6px;">
                        <div class="trimmer-dot dot-red" style="width: 10px; height: 10px; border-radius: 50%; background-color: #ef4444;"></div>
                        <div class="trimmer-dot dot-yellow" style="width: 10px; height: 10px; border-radius: 50%; background-color: #f59e0b;"></div>
                        <div class="trimmer-dot dot-green" style="width: 10px; height: 10px; border-radius: 50%; background-color: #10b981;"></div>
                    </div>
                    <span class="trimmer-title" style="font-weight: 600; font-size: 0.75rem; color: #94a3b8; letter-spacing: 0.05em; text-transform: uppercase;">Video Trimmer - Desktop App</span>
                </div>
                
                <div style="flex-grow:1; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:30px; border: 2px dashed #334155; margin: 16px; border-radius:12px; background:#0b0f19; cursor:pointer;" id="trimmer-open-zone">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" style="margin-bottom:16px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
                    <h4 style="font-weight:600; font-size:0.95rem;">Load Video/Audio Asset</h4>
                    <p style="font-size:0.75rem; color:#64748b; margin-top:4px;">Click the "Open Video" button above or click here to load <code>Persian_Tutorial_Session.mp4</code></p>
                    <button class="trimmer-btn" style="margin-top:16px; background: #3b82f6; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.75rem;">Open Video</button>
                </div>
            </div>
        `;
        els.sandboxView.appendChild(browserFrame);

        const openZone = browserFrame.querySelector('#trimmer-open-zone');
        openZone.addEventListener('click', () => {
            state.simulations.trimmerLoaded = true;
            renderSandbox(2);
            showToast("Loaded: Persian_Tutorial_Session.mp4");
        });
        return;
    }

    // Editor UI state
    if (!state.simulations.trimQueue) {
        state.simulations.trimQueue = [];
    }

    let queueHtml = '';
    if (state.simulations.trimQueue.length === 0) {
        queueHtml = `<div class="trimmer-queue-empty" id="trimmer-queue-empty" style="font-size: 0.7rem; color: #475569; text-align: center; margin-top: 20px;">No clips in list.<br>Set start/end and click Add to List.</div>`;
    } else {
        state.simulations.trimQueue.forEach((itemText, idx) => {
            queueHtml += `
                <div class="trimmer-queue-item" style="font-size: 0.7rem; background: #1e293b; border-radius: 4px; padding: 6px; margin-bottom: 6px; border: 1px solid #334155; display: flex; justify-content: space-between; align-items: center;">
                    <span>${idx + 1}. ${itemText}</span>
                    <button style="background:none; border:none; color:#ef4444; cursor:pointer;" onclick="event.stopPropagation(); removeQueueItem(${idx});">✕</button>
                </div>
            `;
        });
    }

    window.removeQueueItem = (idx) => {
        state.simulations.trimQueue.splice(idx, 1);
        renderSandbox(2);
    };

    browserFrame.innerHTML = `
        <style>
            .trimmer-window {
                display: flex;
                flex-direction: column;
                height: 100%;
                background-color: #0f172a;
                color: #e2e8f0;
                font-size: 0.8rem;
            }
            .trimmer-titlebar {
                background-color: #1e293b;
                padding: 8px 16px;
                display: flex;
                align-items: center;
                gap: 12px;
                border-bottom: 1px solid #334155;
            }
            .trimmer-dots {
                display: flex;
                gap: 6px;
            }
            .trimmer-dot {
                width: 10px;
                height: 10px;
                border-radius: 50%;
            }
            .trimmer-title {
                font-weight: 600;
                font-size: 0.75rem;
                color: #94a3b8;
                letter-spacing: 0.05em;
                text-transform: uppercase;
            }
            .trimmer-toolbar {
                background-color: #1e293b;
                padding: 8px 16px;
                display: flex;
                align-items: center;
                gap: 16px;
                border-bottom: 1px solid #334155;
            }
            .trimmer-btn {
                background: #3b82f6;
                color: white;
                border: none;
                padding: 6px 12px;
                border-radius: 6px;
                cursor: pointer;
                font-weight: 600;
                font-size: 0.75rem;
                transition: 0.2s;
            }
            .trimmer-btn:hover {
                background: #2563eb;
            }
            .trimmer-btn-outline {
                background: transparent;
                border: 1px solid #475569;
                color: #cbd5e1;
                padding: 6px 12px;
                border-radius: 6px;
                cursor: pointer;
                font-weight: 600;
                font-size: 0.75rem;
            }
            .trimmer-btn-outline:hover {
                background: #334155;
            }
            .trimmer-toggle-label {
                font-size: 0.75rem;
                color: #94a3b8;
            }
            .trimmer-body {
                flex-grow: 1;
                display: flex;
                overflow: hidden;
            }
            .trimmer-left {
                flex: 1;
                padding: 16px;
                display: flex;
                flex-direction: column;
                gap: 12px;
                border-right: 1px solid #334155;
            }
            .trimmer-right {
                width: 260px;
                padding: 16px;
                display: flex;
                flex-direction: column;
                gap: 16px;
                background-color: #111827;
            }
            .trimmer-player {
                flex-grow: 1;
                background-color: #020617;
                border: 1px solid #334155;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
            }
            .trimmer-player-text {
                font-size: 0.75rem;
                color: #64748b;
            }
            .trimmer-player-status {
                position: absolute;
                bottom: 8px;
                left: 8px;
                background: rgba(0,0,0,0.6);
                padding: 2px 6px;
                border-radius: 4px;
                font-size: 0.7rem;
            }
            .trimmer-slider-track {
                height: 6px;
                background: #334155;
                border-radius: 3px;
                position: relative;
                cursor: pointer;
            }
            .trimmer-slider-fill {
                position: absolute;
                left: 0;
                top: 0;
                height: 100%;
                background: #3b82f6;
                width: 25%;
                border-radius: 3px;
            }
            .trimmer-slider-handle {
                position: absolute;
                top: -4px;
                width: 14px;
                height: 14px;
                background: white;
                border-radius: 50%;
                box-shadow: 0 2px 4px rgba(0,0,0,0.5);
                cursor: pointer;
            }
            .trimmer-controls {
                display: flex;
                align-items: center;
                justify-content: space-between;
                background: #1e293b;
                padding: 8px 12px;
                border-radius: 8px;
            }
            .trimmer-input-group {
                display: flex;
                align-items: center;
                gap: 6px;
            }
            .trimmer-input {
                width: 60px;
                background: #0f172a;
                border: 1px solid #475569;
                color: white;
                padding: 4px;
                border-radius: 4px;
                font-size: 0.75rem;
                text-align: center;
            }
            .trimmer-section-title {
                font-weight: 700;
                font-size: 0.75rem;
                color: #3b82f6;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                margin-bottom: 8px;
            }
            .trimmer-split-inputs {
                display: flex;
                align-items: center;
                gap: 6px;
                margin-bottom: 8px;
            }
            .trimmer-queue-box {
                flex-grow: 1;
                border: 1px solid #334155;
                background: #0b0f19;
                border-radius: 6px;
                padding: 8px;
                overflow-y: auto;
            }
            .trimmer-queue-empty {
                font-size: 0.7rem;
                color: #475569;
                text-align: center;
                margin-top: 20px;
            }
            .trimmer-queue-item {
                font-size: 0.7rem;
                background: #1e293b;
                border-radius: 4px;
                padding: 6px;
                margin-bottom: 6px;
                border: 1px solid #334155;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .trimmer-footer {
                background-color: #1e293b;
                padding: 12px 16px;
                border-top: 1px solid #334155;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
        </style>

        <div class="trimmer-window" id="trimmer-window-editor">
            <!-- Title Bar -->
            <div class="trimmer-titlebar">
                <div class="trimmer-dots">
                    <div class="trimmer-dot dot-red"></div>
                    <div class="trimmer-dot dot-yellow"></div>
                    <div class="trimmer-dot dot-green"></div>
                </div>
                <span class="trimmer-title">Video Trimmer - Desktop App</span>
            </div>

            <!-- Toolbar -->
            <div class="trimmer-toolbar">
                <button class="trimmer-btn-outline" id="trimmer-reopen-btn">Open Video</button>
                <div style="display:flex; align-items:center; gap:6px;">
                    <span class="trimmer-toggle-label">Video / Audio only:</span>
                    <input type="checkbox" id="trimmer-audio-toggle" style="cursor:pointer;">
                </div>
                <div style="font-size: 0.75rem; color: #94a3b8; margin-left:auto;">Loaded: <strong>Persian_Tutorial_Session.mp4</strong></div>
            </div>

            <!-- Main Body -->
            <div class="trimmer-body">
                <!-- Left panel: Preview & Cut controls -->
                <div class="trimmer-left">
                    <div class="trimmer-player">
                        <span class="trimmer-player-text">▶ Click play to preview video</span>
                        <span class="trimmer-player-status">00:00 / 16:00</span>
                    </div>
                    <div class="trimmer-slider-track">
                        <div class="trimmer-slider-fill"></div>
                        <div class="trimmer-slider-handle" style="left: 25%;"></div>
                    </div>
                    <div class="trimmer-controls">
                        <div class="trimmer-input-group">
                            <button class="trimmer-btn-outline" id="trimmer-set-start">Set Start</button>
                            <input type="text" class="trimmer-input" id="trimmer-start-val" value="${state.simulations.cutterStart}">
                        </div>
                        <div class="trimmer-input-group">
                            <button class="trimmer-btn-outline" id="trimmer-set-end">Set End</button>
                            <input type="text" class="trimmer-input" id="trimmer-end-val" value="${state.simulations.cutterEnd}">
                        </div>
                        <button class="trimmer-btn" id="trimmer-add-list">Add to List</button>
                    </div>
                </div>

                <!-- Right panel: Auto-split & Queue -->
                <div class="trimmer-right">
                    <div>
                        <div class="trimmer-section-title">Auto-split Options</div>
                        <div style="display:flex; flex-direction:column; gap:6px;">
                            <div>
                                <label style="font-size:0.7rem; color:#94a3b8;">Into parts:</label>
                                <div class="trimmer-split-inputs">
                                    <input type="number" class="trimmer-input" id="trimmer-parts-input" value="2" style="width:50px;">
                                    <button class="trimmer-btn-outline" id="trimmer-btn-split-parts" style="padding:4px 8px;">Split</button>
                                </div>
                            </div>
                            <div>
                                <label style="font-size:0.7rem; color:#94a3b8;">Every interval (h:m:s):</label>
                                <div class="trimmer-split-inputs">
                                    <input type="text" class="trimmer-input" id="trimmer-split-time" value="00:08:00" style="width:70px;">
                                    <button class="trimmer-btn-outline" id="trimmer-btn-split-time" style="padding:4px 8px;">Split</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style="flex-grow:1; display:flex; flex-direction:column; min-height:0;">
                        <div class="trimmer-section-title">Trim Queue</div>
                        <div class="trimmer-queue-box" id="trimmer-queue-list">
                            ${queueHtml}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div class="trimmer-footer">
                <div style="display:flex; align-items:center; gap:8px;">
                    <span style="font-size:0.75rem; color:#94a3b8;">Save folder:</span>
                    <strong style="font-size:0.75rem; color:#f1f5f9;">trimmed video</strong>
                    <button class="trimmer-btn-outline" style="padding:2px 8px; font-size:0.7rem;">Choose...</button>
                </div>
                <div style="display:flex; align-items:center; gap:16px;">
                    <label style="display:flex; align-items:center; gap:6px; font-size:0.75rem; cursor:pointer;">
                        <input type="checkbox" id="trimmer-mp3-toggle"> Convert to MP3
                    </label>
                    <button class="trimmer-btn" id="trimmer-trim-all" style="background:#10b981;" ${state.simulations.trimQueue.length === 0 ? 'disabled' : ''}>Trim All</button>
                </div>
            </div>
        </div>

        <!-- Saving progress overlay -->
        <div class="trimmer-window" id="trimmer-saving-overlay" style="display:none; align-items:center; justify-content:center; height:100%;">
            <div class="spinner" style="border-top-color: #3b82f6; width:40px; height:40px; margin-bottom:12px;"></div>
            <h4 style="font-size: 0.95rem; font-weight:600;">Rendering and saving segments...</h4>
            <div class="progress-bar-bg" style="width: 200px; margin-top:10px;">
                <div class="progress-bar-fill" id="trimmer-bar-fill" style="width: 0%;"></div>
            </div>
        </div>
    `;

    els.sandboxView.appendChild(browserFrame);

    // Event hooks
    const startVal = browserFrame.querySelector('#trimmer-start-val');
    const endVal = browserFrame.querySelector('#trimmer-end-val');
    const setStartBtn = browserFrame.querySelector('#trimmer-set-start');
    const setEndBtn = browserFrame.querySelector('#trimmer-set-end');
    const addListBtn = browserFrame.querySelector('#trimmer-add-list');
    const trimAllBtn = browserFrame.querySelector('#trimmer-trim-all');
    const editorWindow = browserFrame.querySelector('#trimmer-window-editor');
    const savingOverlay = browserFrame.querySelector('#trimmer-saving-overlay');
    const progressBar = browserFrame.querySelector('#trimmer-bar-fill');
    
    const splitPartsBtn = browserFrame.querySelector('#trimmer-btn-split-parts');
    const partsInput = browserFrame.querySelector('#trimmer-parts-input');
    const splitTimeBtn = browserFrame.querySelector('#trimmer-btn-split-time');
    const timeInput = browserFrame.querySelector('#trimmer-split-time');
    const reopenBtn = browserFrame.querySelector('#trimmer-reopen-btn');

    reopenBtn.addEventListener('click', () => {
        state.simulations.trimmerLoaded = false;
        renderSandbox(2);
    });

    setStartBtn.addEventListener('click', () => {
        startVal.value = "00:00";
        state.simulations.cutterStart = "00:00";
        showToast("Start point set to 00:00");
    });

    setEndBtn.addEventListener('click', () => {
        endVal.value = "04:00";
        state.simulations.cutterEnd = "04:00";
        showToast("End point set to 04:00");
    });

    addListBtn.addEventListener('click', () => {
        const itemText = `Persian_Tutorial_Session.mp4 (${startVal.value} to ${endVal.value})`;
        state.simulations.trimQueue.push(itemText);
        showToast("Clip range added to list.");
        renderSandbox(2);
    });

    splitPartsBtn.addEventListener('click', () => {
        const parts = parseInt(partsInput.value) || 2;
        state.simulations.trimQueue = [];
        for (let i = 0; i < parts; i++) {
            state.simulations.trimQueue.push(`Persian_Tutorial_Session.mp4 Part ${i+1}`);
        }
        showToast(`Auto-split generated ${parts} parts.`);
        renderSandbox(2);
    });

    splitTimeBtn.addEventListener('click', () => {
        state.simulations.trimQueue = [
            `Persian_Tutorial_Session.mp4 Segment 1 (00:00:00 to 00:08:00)`,
            `Persian_Tutorial_Session.mp4 Segment 2 (00:08:00 to 00:16:00)`
        ];
        showToast(`Auto-split generated segments every ${timeInput.value}.`);
        renderSandbox(2);
    });

    trimAllBtn.addEventListener('click', () => {
        editorWindow.style.display = 'none';
        savingOverlay.style.display = 'flex';

        let p = 0;
        const interval = setInterval(() => {
            p += 20;
            progressBar.style.width = `${p}%`;
            if (p >= 100) {
                clearInterval(interval);
                state.trimmedFile = {
                    name: 'Persian_Tutorial_Session_Trimmed.mp4',
                    start: '00:00',
                    end: '04:00',
                    size: '32 MB'
                };
                showToast("All segments trimmed! Saved to Downloads folder.");
                renderSandbox(2);
            }
        }, 300);
    });
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
