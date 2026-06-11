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
            <p>Welcome! This interactive manual guides you through our translation prep workflow. We process audio and video files for translation and captioning.</p>
            <p>In this training, you will simulate a standard order request where we extract specific translation reports from a client's video.</p>
            
            <div class="alert alert-info">
                <strong>Workflow Pipeline:</strong><br>
                1. <strong>Download</strong> the client's YouTube link.<br>
                2. <strong>Trim</strong> the video to the specific timestamps.<br>
                3. <strong>Upload & Run</strong> transcription via the LingoChaps Internal Tool.
            </div>

            <p>On the right side of the screen is your <strong>Sandbox Simulator</strong>. It replicates the exact tools and portals you will use in production.</p>
            <p>Click <strong>Continue</strong> below to begin step 1.</p>
        `
    },
    // Step 1: ssyou.online Youtube Downloader
    {
        title: "1. Download Video (ssyou.online)",
        html: `
            <h3>Downloading Video Assets</h3>
            <p>Clients frequently send orders with YouTube links rather than raw video files. Before transcribing, we must acquire the file.</p>
            
            <div class="alert alert-warning">
                <strong>Reference Link:</strong> Use <a href="https://ssyou.online/en1401Yd/" target="_blank" style="color: #fef3c7; text-decoration: underline;">ssyou.online/en1401Yd/</a> to download client assets. Do not use unverified third-party converters.
            </div>

            <h4>Instructions:</h4>
            <ol>
                <li>Copy the client-supplied YouTube link (e.g. <code>https://www.youtube.com/watch?v=prsh16m</code>).</li>
                <li>Paste the link into the URL bar of <strong>ssyou.online</strong> on the right.</li>
                <li>Click <strong>Fetch</strong> to load video download options.</li>
                <li>Select the recommended <strong>720p or 1080p MP4 format</strong> option and click <strong>Download</strong>.</li>
            </ol>

            <div class="alert alert-tip">
                <strong>Simulated Task:</strong> In the Sandbox on the right, click <strong>"Fill Sample URL"</strong> then click <strong>"Fetch Options"</strong>. Next, click the green <strong>"Download"</strong> button for the 720p version.
            </div>
        `
    },
    // Step 2: online-video-cutter.com
    {
        title: "2. Trim to Specific Timestamp",
        html: `
            <h3>Trimming Video Segments</h3>
            <p>Rarely do we need to translate a full 2-hour recording. Clients usually order translations for a specific duration or scene (e.g. "Minutes 0:00 to 4:00").</p>
            
            <div class="alert alert-warning">
                <strong>Reference Link:</strong> Navigate to <a href="https://online-video-cutter.com/" target="_blank" style="color: #fef3c7; text-decoration: underline;">online-video-cutter.com</a> to crop, cut, or rotate video files easily without complex tools.
            </div>

            <h4>Instructions:</h4>
            <ol>
                <li>Open the Online Video Cutter tool.</li>
                <li>Upload the video file downloaded in Step 1 (<code>Persian_Tutorial_Session.mp4</code>).</li>
                <li>Input the precise start and end times requested by the client (e.g. Start: <strong>00:00</strong>, End: <strong>04:00</strong>).</li>
                <li>Click <strong>Save</strong> to trim the file. Once processed, save the resulting file to your local computer.</li>
            </ol>

            <div class="alert alert-tip">
                <strong>Simulated Task:</strong> In the sandbox, drag the timeline slider or input <strong>00:00</strong> to <strong>04:00</strong>. Then click the blue <strong>"Cut & Save"</strong> button.
            </div>
        `
    },
    // Step 3: LingoChaps Tool Upload
    {
        title: "3. Submit to LingoChaps Tool",
        html: `
            <h3>Processing Video in LingoChaps</h3>
            <p>Now that the clip is trimmed, we upload it to our internal tool at <code>studio.lingochaps.com</code> to run transcription, translation, and text extraction.</p>
            
            <h4>Configuration Instructions:</h4>
            <ol>
                <li>Drag and drop the trimmed file (<code>Persian_Tutorial_Session_Trimmed.mp4</code>) into the upload area.</li>
                <li>Configure the options based on the client order sheet:
                    <ul>
                        <li><strong>Languages:</strong> Set to <code>auto-detect</code> (or insert hints like "fa, en").</li>
                        <li><strong>Output Options:</strong> Choose from the 3 processing modes:
                            <br>&bull; <em>Full:</em> Speech transcript + OCR screen text.
                            <br>&bull; <em>Transcript only:</em> Audio narration transcription only.
                            <br>&bull; <em>On-screen text only:</em> Video frame text extraction only.
                        </li>
                    </ul>
                </li>
                <li>Click the purple <strong>Start transcription</strong> button to launch the task.</li>
            </ol>

            <div class="alert alert-tip">
                <strong>Simulated Task:</strong>
                1. Click the upload zone on the right to load the trimmed video.
                2. Select <strong>Full — transcription + on-screen text</strong>.
                3. Click <strong>Start transcription</strong>. Watch the job run in the Recent Jobs list!
            </div>
        `
    },
    // Step 4: Access Reports
    {
        title: "4. Retrieve & Download Word Reports",
        html: `
            <h3>Reviewing Outputs and Reports</h3>
            <p>Once LingoChaps finishes processing the transcription, the task's state in the <strong>Recent jobs</strong> panel updates to <span class="status-badge done" style="display:inline-block;">DONE</span> (100%).</p>

            <h4>Instructions:</h4>
            <ol>
                <li>Find your processed job at the top of the **Recent jobs** list.</li>
                <li>Click on the job item to slide open the **Detailed Results** panel on the right.</li>
                <li>Verify that the dialog transcript and on-screen text entries are populated.</li>
                <li>Click the blue <strong>Download Word Report</strong> button to save the completed DOCX deliverable.</li>
            </ol>

            <div class="alert alert-tip">
                <strong>Simulated Task:</strong> In the sandbox, click on the top job in the "Recent jobs" list to open the drawer. Then, click <strong>"Download Word Report"</strong> inside the drawer.
            </div>
        `
    },
    // Step 5: Training Complete
    {
        title: "Training Complete!",
        html: `
            <h3>Congratulations!</h3>
            <p>You have completed the core training simulation for preparing and submitting video assets at LingoChaps.</p>

            <div class="alert alert-tip">
                <strong>Key Quality Checks Before Submitting:</strong><br>
                &bull; Ensure video trims are precise to avoid transcribing unrequested footage.<br>
                &bull; Always double check the <strong>Output</strong> mode: Full vs. Transcript vs. On-Screen text.<br>
                &bull; Download and inspect Word Reports for alignment issues before delivering to clients.
            </div>

            <p>You can restart this training guide anytime to review specific portal tools.</p>
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

// Online Video Cutter Sandbox View
function renderCutterSandbox() {
    els.sandboxTitle.textContent = "Online Video Cutter Simulator (online-video-cutter.com)";

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
                <span class="address-lock">🔒</span> https://online-video-cutter.com/
            </div>
        </div>
        <div class="browser-viewport">
            <div class="cutter-container">
                <div class="cutter-header">
                    <h2 class="cutter-logo">123apps <span>Video Cutter</span></h2>
                    <p style="font-size: 0.75rem; color: #94a3b8; margin-top:4px;">Crop, rotate, cut and trim videos online</p>
                </div>

                <div class="cutter-workspace">
                    <div class="cutter-upload-box" id="cutter-dropzone">
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" style="margin-bottom:12px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
                        <h4 style="font-size: 0.9rem; font-weight:600;">Open File</h4>
                        <p style="font-size: 0.75rem; color: #64748b; margin-top:4px;">Select the downloaded Persian_Tutorial_Session.mp4 file</p>
                    </div>

                    <div class="cutter-editor" id="cutter-workspace-editor">
                        <div class="cutter-video-preview">
                            <div class="preview-overlay-info">Preview File: Persian_Tutorial_Session.mp4</div>
                            <div class="mock-video-player">
                                <span class="video-status-indicator">00:00 / 16:00</span>
                                <div class="play-button-large">
                                    <div class="play-icon"></div>
                                </div>
                                <div class="video-bottom-controls">
                                    <div class="video-progress-track">
                                        <div class="video-progress-fill"></div>
                                    </div>
                                    <div class="video-controls-row">
                                        <span>▶ Play</span>
                                        <span>⚙ 1080p</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="cutter-timeline-container">
                            <div style="font-size:0.75rem; color:#94a3b8; margin-bottom:8px;">Timeline Range Selection</div>
                            <div class="cutter-timeline-track">
                                <div class="timeline-handles"></div>
                            </div>
                            <div class="cutter-controls">
                                <div class="control-group">
                                    <label>Start:</label>
                                    <input type="text" class="cutter-input" id="cutter-start-input" value="${state.simulations.cutterStart}">
                                </div>
                                <div class="control-group">
                                    <label>End:</label>
                                    <input type="text" class="cutter-input" id="cutter-end-input" value="${state.simulations.cutterEnd}">
                                </div>
                                <button class="btn-cutter-save" id="cutter-save-btn">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M12 15V3"/></svg>
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="cutter-saving" id="cutter-saving-screen">
                        <div class="spinner" style="border-top-color: #3b82f6; width:40px; height:40px;"></div>
                        <h4 style="font-size: 0.9rem; margin-top:12px;">Trimming and packaging file...</h4>
                        <div class="progress-bar-bg" style="width: 200px; margin-top:10px;">
                            <div class="progress-bar-fill" id="cutter-bar-fill" style="width: 0%;"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    els.sandboxView.appendChild(browserFrame);

    const dropzone = browserFrame.querySelector('#cutter-dropzone');
    const editor = browserFrame.querySelector('#cutter-workspace-editor');
    const savingScreen = browserFrame.querySelector('#cutter-saving-screen');
    const saveBtn = browserFrame.querySelector('#cutter-save-btn');
    const startInput = browserFrame.querySelector('#cutter-start-input');
    const endInput = browserFrame.querySelector('#cutter-end-input');
    const cutterBarFill = browserFrame.querySelector('#cutter-bar-fill');

    // Verify step order check
    if (!state.downloadedFile) {
        dropzone.innerHTML = `
            <div style="color: #ef4444; padding: 20px;">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-bottom:8px;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                <h4 style="font-size: 0.9rem; font-weight:600;">Assets Missing</h4>
                <p style="font-size: 0.75rem; color: #94a3b8; margin-top:4px;">You must complete <strong>Step 1</strong> to download the video before you can trim it.</p>
                <button class="btn btn-sm btn-primary" style="margin-top:12px;" onclick="renderStep(1)">Go back to Step 1</button>
            </div>
        `;
        return;
    }

    if (state.trimmedFile) {
        dropzone.style.display = 'none';
        editor.style.display = 'none';
        savingScreen.style.display = 'flex';
        savingScreen.innerHTML = `
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            <h4 style="font-size: 0.9rem; margin-top:12px; color:#10b981;">File Trimmed & Saved!</h4>
            <p style="font-size:0.75rem; color:#94a3b8; margin-top:4px;"><code>Persian_Tutorial_Session_Trimmed.mp4</code> (0:00 - 4:00) is saved.</p>
            <button class="btn btn-sm btn-primary" style="margin-top:12px;" onclick="renderStep(3)">Submit to LingoChaps</button>
        `;
        return;
    }

    dropzone.addEventListener('click', () => {
        dropzone.style.display = 'none';
        editor.style.display = 'block';
        showToast("Mock uploaded: Persian_Tutorial_Session.mp4");
    });

    saveBtn.addEventListener('click', () => {
        state.simulations.cutterStart = startInput.value;
        state.simulations.cutterEnd = endInput.value;
        
        editor.style.display = 'none';
        savingScreen.style.display = 'flex';
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += 25;
            cutterBarFill.style.width = `${progress}%`;
            if (progress >= 100) {
                clearInterval(interval);
                state.trimmedFile = {
                    name: 'Persian_Tutorial_Session_Trimmed.mp4',
                    start: state.simulations.cutterStart,
                    end: state.simulations.cutterEnd,
                    size: '32 MB'
                };
                savingScreen.innerHTML = `
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" style="margin-bottom:8px;"><polyline points="20 6 9 17 4 12"/></svg>
                    <h4 style="font-size: 0.9rem; color:#10b981;">Trimmed successfully!</h4>
                    <p style="font-size:0.75rem; color:#94a3b8; margin-top:4px;">Saved as: <code>Persian_Tutorial_Session_Trimmed.mp4</code></p>
                    <button class="btn btn-sm btn-primary" style="margin-top:12px;" onclick="renderStep(3)">Proceed to LingoChaps upload</button>
                `;
                showToast("Trimmed video saved successfully. Move to Step 3.");
            }
        }, 400);
    });
}

// Lingochaps Simulator (Replicating exact UI layout from screenshots)
function renderLingochapsSandbox(isVerificationMode) {
    els.sandboxTitle.textContent = "LingoChaps Internal Portal (studio.lingochaps.com)";

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
                
                <!-- Lingochaps Top Header -->
                <header class="lingochaps-header">
                    <div class="lingochaps-brand">
                        <div class="lingochaps-logo-graphic">LC</div>
                        <div class="lingochaps-logo-text">
                            <h3>Lingochaps tool</h3>
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
                            Add more tools by extending the module list—each tool gets its own route and card here.
                        </div>
                    </aside>

                    <!-- Main Portal Dashboard -->
                    <main class="lingochaps-main">
                        
                        <!-- Block 1: Upload (Hidden in Step 4 verification mode if already submitted) -->
                        <div class="lingochaps-form-container" id="lingochaps-upload-section" style="${isVerificationMode ? 'display:none;' : ''}">
                            <h2>New transcription</h2>
                            <p class="subtitle">Upload a video or audio file. We transcribe, translate, tag languages, extract on-screen text (video only), and build a Word report.</p>
                            
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
                                    <p style="font-size:0.7rem; color:#64748b; margin-top:-4px; margin-bottom:6px;">Choose what to run. Transcription uses Gemini on the audio; on-screen text uses video frames + OCR.</p>
                                    
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
                <strong>Missing Asset:</strong> You must complete <strong>Step 2</strong> (Trim to Timestamp) first to obtain the trimmed clip before uploading to Lingochaps.
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
