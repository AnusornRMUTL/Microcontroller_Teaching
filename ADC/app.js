document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initCodeEditors();
    initSimulators();
    renderQuizHTML(document.getElementById('quiz-container'));
});

function initNavigation() {
    const links = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            links.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            link.classList.add('active');
            const targetId = link.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });
}

// ---- CODE EDITORS ----
const codeSnippets = {
    ex1: [
        { text: "<span class='cmt'>// ตัวอย่างที่ 1: อ่านค่าแอนะล็อกและแสดงเป็น 8-bit บน LED</span>", id: "l1" },
        { text: "<span class='kw'>const int</span> <span class='func'>potPin</span> = <span class='num'>34</span>; <span class='cmt'>// ขาที่ต่อ Potentiometer (ADC1_CH6)</span>", id: "l2" },
        { text: "<span class='kw'>const int</span> <span class='func'>ledPins</span>[] = {<span class='num'>12</span>, <span class='num'>13</span>, <span class='num'>14</span>, <span class='num'>15</span>, <span class='num'>16</span>, <span class='num'>17</span>, <span class='num'>18</span>, <span class='num'>19</span>};", id: "l3" },
        { text: "", id: "l4" },
        { text: "<span class='kw'>void</span> <span class='func'>setup</span>() {", id: "l5" },
        { text: "  <span class='kw'>for</span> (<span class='kw'>int</span> i = <span class='num'>0</span>; i < <span class='num'>8</span>; i++) {", id: "l6" },
        { text: "    <span class='func'>pinMode</span>(ledPins[i], <span class='kw'>OUTPUT</span>);", id: "l7" },
        { text: "  }", id: "l8" },
        { text: "}", id: "l9" },
        { text: "", id: "l10" },
        { text: "<span class='kw'>void</span> <span class='func'>loop</span>() {", id: "l11" },
        { text: "  <span class='kw'>int</span> adcValue = <span class='func'>analogRead</span>(potPin); <span class='cmt'>// ค่า 0-4095</span>", id: "l12" },
        { text: "  <span class='kw'>int</span> mappedValue = <span class='func'>map</span>(adcValue, <span class='num'>0</span>, <span class='num'>4095</span>, <span class='num'>0</span>, <span class='num'>255</span>); <span class='cmt'>// แปลงเป็น 8-bit</span>", id: "l13" },
        { text: "", id: "l14" },
        { text: "  <span class='kw'>for</span> (<span class='kw'>int</span> i = <span class='num'>0</span>; i < <span class='num'>8</span>; i++) {", id: "l15" },
        { text: "    <span class='kw'>int</span> bitValue = (mappedValue >> i) & <span class='num'>0x01</span>;", id: "l16" },
        { text: "    <span class='func'>digitalWrite</span>(ledPins[i], bitValue);", id: "l17" },
        { text: "  }", id: "l18" },
        { text: "  <span class='func'>delay</span>(<span class='num'>100</span>);", id: "l19" },
        { text: "}", id: "l20" }
    ],
    ex2: [
        { text: "<span class='cmt'>// ตัวอย่างที่ 2: อ่านค่าแอนะล็อก ส่งผลลัพธ์ไปที่ Serial Monitor</span>", id: "m1" },
        { text: "<span class='kw'>const int</span> <span class='func'>potPin</span> = <span class='num'>34</span>; <span class='cmt'>// ขาที่ต่อ Potentiometer</span>", id: "m2" },
        { text: "", id: "m3" },
        { text: "<span class='kw'>void</span> <span class='func'>setup</span>() {", id: "m4" },
        { text: "  <span class='func'>Serial</span>.<span class='func'>begin</span>(<span class='num'>115200</span>);", id: "m5" },
        { text: "}", id: "m6" },
        { text: "", id: "m7" },
        { text: "<span class='kw'>void</span> <span class='func'>loop</span>() {", id: "m8" },
        { text: "  <span class='kw'>int</span> adcValue = <span class='func'>analogRead</span>(potPin); <span class='cmt'>// ค่า 0-4095</span>", id: "m9" },
        { text: "  <span class='kw'>float</span> voltage = (adcValue / <span class='num'>4095.0</span>) * <span class='num'>3.3</span>;", id: "m10" },
        { text: "", id: "m11" },
        { text: "  <span class='func'>Serial</span>.<span class='func'>print</span>(<span class='str'>\"ค่า ADC: \"</span>);", id: "m12" },
        { text: "  <span class='func'>Serial</span>.<span class='func'>print</span>(adcValue);", id: "m13" },
        { text: "  <span class='func'>Serial</span>.<span class='func'>print</span>(<span class='str'>\", แรงดัน: \"</span>);", id: "m14" },
        { text: "  <span class='func'>Serial</span>.<span class='func'>print</span>(voltage);", id: "m15" },
        { text: "  <span class='func'>Serial</span>.<span class='func'>println</span>(<span class='str'>\" V\"</span>);", id: "m16" },
        { text: "", id: "m17" },
        { text: "  <span class='func'>delay</span>(<span class='num'>500</span>);", id: "m18" },
        { text: "}", id: "m19" }
    ]
};

function initCodeEditors() {
    renderCode('code-ex1', codeSnippets.ex1);
    renderCode('code-ex2', codeSnippets.ex2);
}

function renderCode(containerId, lines) {
    const container = document.getElementById(containerId);
    let html = '';
    lines.forEach(line => {
        html += `<span class="code-line" id="${line.id}">${line.text || '&nbsp;'}</span><br>`;
    });
    container.innerHTML = html;
}

// ---- SIMULATORS ----
function drawESP32(x, y, scale=1) {
    return `
    <g transform="translate(${x}, ${y}) scale(${scale})">
        <rect x="0" y="0" width="120" height="240" rx="8" fill="#333" stroke="#111" stroke-width="2"/>
        <text x="60" y="120" fill="white" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle" transform="rotate(-90 60,120)">ESP32</text>
        <!-- Pins Right (Ex1 LEDs) -->
        ${[12,13,14,15,16,17,18,19].map((pin, i) => `
            <rect x="115" y="${30 + i*20}" width="10" height="10" fill="#bbb"/>
            <text x="90" y="${40 + i*20}" fill="#aaa" font-size="10">G${pin}</text>
        `).join('')}
        <!-- Pins Left (Potentiometer) -->
        <rect x="-5" y="50" width="10" height="10" fill="#bbb"/>
        <text x="15" y="60" fill="#aaa" font-size="10">3V3</text>
        
        <rect x="-5" y="70" width="10" height="10" fill="#bbb"/>
        <text x="15" y="80" fill="#aaa" font-size="10">GND</text>

        <rect x="-5" y="90" width="10" height="10" fill="#bbb"/>
        <text x="15" y="100" fill="#aaa" font-size="10">G34</text>
    </g>
    `;
}

function drawPotentiometer(x, y) {
    return `
    <g transform="translate(${x}, ${y})">
        <rect x="0" y="0" width="40" height="60" rx="4" fill="#0284c7" stroke="#0369a1" stroke-width="2"/>
        <circle cx="20" cy="30" r="15" fill="#f1f5f9" stroke="#94a3b8" stroke-width="2"/>
        <line class="pot-dial" x1="20" y1="30" x2="20" y2="15" stroke="#334155" stroke-width="3" transform="rotate(-135 20 30)"/>
        <!-- Wires -->
        <!-- VCC -->
        <path d="M 40 10 L 80 10 L 80 80" fill="none" stroke="#ef4444" stroke-width="3"/>
        <text x="45" y="8" fill="#ef4444" font-size="12">VCC</text>
        <!-- GND -->
        <path d="M 40 30 L 70 30 L 70 100" fill="none" stroke="#1e293b" stroke-width="3"/>
        <text x="45" y="28" fill="#1e293b" font-size="12">GND</text>
        <!-- SIGNAL -->
        <path d="M 40 50 L 60 50 L 60 120" fill="none" stroke="#eab308" stroke-width="3"/>
        <text x="45" y="48" fill="#eab308" font-size="12">SIG</text>
    </g>
    `;
}

function drawLEDs(x, y) {
    let svg = `<g transform="translate(${x}, ${y})">`;
    for(let i=0; i<8; i++) {
        svg += `
            <circle id="led-${i}" cx="0" cy="${i*20}" r="6" fill="#ef4444" opacity="0.3" stroke="#991b1b" stroke-width="1"/>
            <path d="M -6 ${i*20} L -30 ${i*20}" fill="none" stroke="#64748b" stroke-width="2"/>
        `;
    }
    svg += `</g>`;
    return svg;
}

function initSimulators() {
    const canvas1 = document.getElementById('sim1-canvas');
    if (canvas1) {
        canvas1.innerHTML = `
            <svg class="svg-container" viewBox="0 0 400 300">
                ${drawESP32(150, 30)}
                ${drawPotentiometer(20, 20)}
                ${drawLEDs(320, 70)}
            </svg>
        `;
    }

    const canvas2 = document.getElementById('sim2-canvas');
    if (canvas2) {
        canvas2.innerHTML = `
            <svg class="svg-container" viewBox="0 0 400 300">
                ${drawESP32(150, 30)}
                ${drawPotentiometer(20, 20)}
            </svg>
        `;
    }

    // Event Listeners
    const pot1 = document.getElementById('pot1');
    if (pot1) pot1.addEventListener('input', () => updateSim1(pot1.value));
    
    const pot2 = document.getElementById('pot2');
    if (pot2) pot2.addEventListener('input', () => updateSim2(pot2.value));

    // Animation Listeners
    const run1 = document.getElementById('run-ex1');
    if (run1) run1.addEventListener('click', runAnimation1);
    
    const run2 = document.getElementById('run-ex2');
    if (run2) run2.addEventListener('click', runAnimation2);

    // Initial state
    if (pot1) updateSim1(pot1.value);
    if (pot2) updateSim2(pot2.value);
}

function updateSim1(adcValue) {
    adcValue = parseInt(adcValue);
    const voltage = (adcValue / 4095.0) * 3.3;
    document.getElementById('pot1-val').innerText = `ค่า ADC: ${adcValue} (${voltage.toFixed(2)} V)`;
    
    // update dial angle (-135 to +135 deg)
    const angle = -135 + (adcValue / 4095) * 270;
    const dial = document.querySelector('#sim1-canvas .pot-dial');
    if(dial) dial.setAttribute('transform', `rotate(${angle} 20 30)`);

    // update LEDs
    const mappedValue = Math.floor((adcValue / 4095) * 255); // 4095 -> 255
    for(let i=0; i<8; i++) {
        const bit = (mappedValue >> i) & 1;
        const led = document.getElementById(`led-${i}`);
        if(led) {
            led.setAttribute('opacity', bit ? '1' : '0.3');
            if (bit) {
                led.style.filter = "drop-shadow(0px 0px 4px #ef4444)";
            } else {
                led.style.filter = "none";
            }
        }
    }
}

function updateSim2(adcValue) {
    adcValue = parseInt(adcValue);
    const voltage = (adcValue / 4095.0) * 3.3;
    document.getElementById('pot2-val').innerText = `ค่า ADC: ${adcValue} (${voltage.toFixed(2)} V)`;
    
    // update dial angle (-135 to +135 deg)
    const angle = -135 + (adcValue / 4095) * 270;
    const dial = document.querySelector('#sim2-canvas .pot-dial');
    if(dial) dial.setAttribute('transform', `rotate(${angle} 20 30)`);
}

// ---- ANIMATIONS ----
async function runAnimation1() {
    const btn = document.getElementById('run-ex1');
    btn.disabled = true;
    
    // Highlight lines sequence
    const sequence = ['l12', 'l13', 'l15', 'l16', 'l17', 'l15', 'l19'];
    
    for(let lineId of sequence) {
        document.querySelectorAll('#code-ex1 .code-line').forEach(l => l.classList.remove('active'));
        document.getElementById(lineId).classList.add('active');
        await new Promise(r => setTimeout(r, 800));
    }
    
    document.querySelectorAll('#code-ex1 .code-line').forEach(l => l.classList.remove('active'));
    btn.disabled = false;
}

async function runAnimation2() {
    const btn = document.getElementById('run-ex2');
    btn.disabled = true;
    
    const sequence = ['m9', 'm10', 'm12', 'm13', 'm14', 'm15', 'm16'];
    const adcValue = document.getElementById('pot2').value;
    const voltage = (adcValue / 4095.0) * 3.3;
    
    for(let lineId of sequence) {
        document.querySelectorAll('#code-ex2 .code-line').forEach(l => l.classList.remove('active'));
        document.getElementById(lineId).classList.add('active');
        await new Promise(r => setTimeout(r, 600));
        
        if (lineId === 'm16') {
            const out = document.getElementById('serial-output');
            const div = document.createElement('div');
            div.innerText = `ค่า ADC: ${adcValue}, แรงดัน: ${voltage.toFixed(2)} V`;
            out.appendChild(div);
            out.scrollTop = out.scrollHeight;
        }
    }
    
    document.querySelectorAll('#code-ex2 .code-line').forEach(l => l.classList.remove('active'));
    btn.disabled = false;
}

// ---- QUIZ ----
// ==========================================
// Quiz Logic (Advanced Engine)
// ==========================================
let quizQuestions = [];
let currentQuizSession = [];
let userScore = 0;
let userAnswers = {};

async function fetchQuizData() {
    try {
        const response = await fetch('questions.json');
        quizQuestions = await response.json();
    } catch (e) {
        console.error("Error loading questions:", e);
    }
}

function shuffleArray(array) {
    let arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

async function renderQuizHTML(container) {
    container.innerHTML = `<div class="card"><div style="text-align:center; padding:50px;">กำลังโหลดข้อสอบ...</div></div>`;
    
    if (quizQuestions.length === 0) {
        await fetchQuizData();
    }
    
    currentQuizSession = shuffleArray(quizQuestions).slice(0, 10);
    userScore = 0;
    userAnswers = {};

    let html = `<div>
        <p style="color: #64748b;">ระบบจะสุ่มข้อสอบ 10 ข้อ จากฐานข้อมูล ต้องได้คะแนน <strong>8/10 ขึ้นไป</strong> จึงจะได้รับใบประกาศนียบัตร</p>
        <div id="quiz-list" style="margin-top: 25px;">`;

    currentQuizSession.forEach((q, i) => {
        html += `<div class="quiz-question" id="q-block-${i}" style="margin-bottom: 25px; border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px; background: #fff;">
            <p style="font-weight: 600; font-size: 1.1rem; margin-bottom: 15px; color: #1e293b;">ข้อ ${i + 1}: ${q.question}</p>
            <div class="quiz-options">`;
        q.options.forEach((opt, j) => {
            html += `
                <div class="quiz-option" id="opt-div-${i}-${j}" style="padding: 12px 15px; border: 2px solid #e2e8f0; margin-bottom: 10px; border-radius: 6px; cursor: pointer; transition: all 0.2s;" onclick="selectAnswer(${i}, ${j})">
                    ${opt}
                </div>
            `;
        });
        html += `</div>
            <div id="reason-${i}" style="display: none; margin-top: 15px; padding: 15px; border-radius: 6px; font-size: 0.95rem; line-height: 1.5;"></div>
        </div>`;
    });

    html += `</div>
        <div id="quiz-final-result" style="text-align: center; margin-top: 30px; display: none;"></div>
    </div>`;
    
    container.innerHTML = html;
}

window.selectAnswer = function(qIndex, selectedOptIndex) {
    if (userAnswers[qIndex] !== undefined) return;
    
    userAnswers[qIndex] = selectedOptIndex;
    const q = currentQuizSession[qIndex];
    const isCorrect = selectedOptIndex === q.answer;
    
    if (isCorrect) userScore++;

    q.options.forEach((_, j) => {
        const optDiv = document.getElementById(`opt-div-${qIndex}-${j}`);
        optDiv.style.cursor = 'default';
        if (j === q.answer) {
            optDiv.style.backgroundColor = '#dcfce7'; 
            optDiv.style.borderColor = '#22c55e';
            optDiv.style.color = '#14532d';
            optDiv.style.fontWeight = 'bold';
        } else if (j === selectedOptIndex && !isCorrect) {
            optDiv.style.backgroundColor = '#fee2e2'; 
            optDiv.style.borderColor = '#ef4444';
            optDiv.style.color = '#7f1d1d';
        } else {
            optDiv.style.opacity = '0.6';
        }
    });

    const reasonDiv = document.getElementById(`reason-${qIndex}`);
    reasonDiv.style.display = 'block';
    if (isCorrect) {
        reasonDiv.style.backgroundColor = '#f0fdf4';
        reasonDiv.style.borderLeft = '4px solid #22c55e';
        reasonDiv.innerHTML = `<span style="color: #15803d; font-weight: bold; font-size: 1.05rem;">✅ ถูกต้อง!</span><br><div style="margin-top: 5px; color: #334155;"><strong>เหตุผล:</strong> ${q.reason}</div>`;
    } else {
        reasonDiv.style.backgroundColor = '#fef2f2';
        reasonDiv.style.borderLeft = '4px solid #ef4444';
        reasonDiv.innerHTML = `<span style="color: #b91c1c; font-weight: bold; font-size: 1.05rem;">❌ ผิดครับ!</span><br><div style="margin-top: 5px; color: #334155;"><strong>เหตุผล:</strong> ${q.reason}</div>`;
    }

    if (Object.keys(userAnswers).length === currentQuizSession.length) {
        showFinalResult();
    }
};

function showFinalResult() {
    const resDiv = document.getElementById('quiz-final-result');
    resDiv.style.display = 'block';
    const passThreshold = 8;
    
    if (userScore >= passThreshold) {
        resDiv.innerHTML = `
            <div style="background: #f0fdf4; padding: 30px; border-radius: 12px; border: 2px solid #22c55e; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                <h2 style="color: #15803d; margin-top: 0; font-size: 1.8rem;">🎉 ยินดีด้วย! คุณสอบผ่าน</h2>
                <p style="font-size: 1.2rem; color: #334155;">ได้คะแนน <strong>${userScore} / 10</strong></p>
                <div style="margin-top: 25px; padding-top: 20px; border-top: 1px dashed #cbd5e1;">
                    <label style="display: block; margin-bottom: 10px; font-weight: bold; color: #1e293b;">กรุณากรอก ชื่อ-นามสกุล เพื่อรับใบประกาศนียบัตร:</label>
                    <input type="text" id="cert-name" placeholder="นายวิศวกร ยอดเยี่ยม" style="padding: 12px; width: 100%; max-width: 350px; border: 1px solid #94a3b8; border-radius: 6px; font-size: 1.05rem; font-family: 'Sarabun', sans-serif;">
                    <br>
                    <button class="action-btn" style="margin-top: 20px; font-size: 1.1rem; padding: 12px 24px;" onclick="generateCertificate()">พิมพ์ใบประกาศนียบัตร</button>
                </div>
                <div id="cert-container" style="margin-top: 30px; display: none;">
                    <canvas id="cert-canvas" width="800" height="566" style="max-width: 100%; border: 1px solid #cbd5e1; border-radius: 4px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);"></canvas>
                    <br>
                    <a id="cert-download" class="action-btn" style="display: inline-block; margin-top: 20px; text-decoration: none; background: #0ea5e9;">⬇️ ดาวน์โหลดใบประกาศ (PNG)</a>
                </div>
            </div>
        `;
    } else {
        resDiv.innerHTML = `
            <div style="background: #fef2f2; padding: 30px; border-radius: 12px; border: 2px solid #ef4444; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                <h2 style="color: #b91c1c; margin-top: 0; font-size: 1.8rem;">คุณยังไม่ผ่านเกณฑ์ 75%</h2>
                <p style="font-size: 1.2rem; color: #334155;">ได้คะแนน <strong>${userScore} / 10</strong> (ต้องได้ 8 คะแนนขึ้นไป)</p>
                <button class="action-btn secondary-btn" style="margin-top: 20px; font-size: 1.1rem; padding: 12px 24px;" onclick="renderQuizHTML(document.getElementById('quiz-container'))">ทดสอบใหม่ (สุ่มข้อสอบใหม่)</button>
            </div>
        `;
    }
    
    setTimeout(() => {
        resDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
}

window.generateCertificate = function() {
    const nameInput = document.getElementById('cert-name').value.trim();
    if (!nameInput) {
        alert("กรุณากรอกชื่อ-นามสกุลก่อนพิมพ์ใบประกาศฯ");
        return;
    }

    const canvas = document.getElementById('cert-canvas');
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.lineWidth = 15;
    ctx.strokeStyle = '#00979C'; 
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#cbd5e1';
    ctx.strokeRect(32, 32, canvas.width - 64, canvas.height - 64);

    ctx.fillStyle = '#00979C';
    ctx.beginPath(); ctx.arc(40, 40, 10, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(canvas.width-40, 40, 10, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(40, canvas.height-40, 10, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(canvas.width-40, canvas.height-40, 10, 0, Math.PI*2); ctx.fill();

    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 40px "Sarabun", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('ใบประกาศนียบัตร', canvas.width/2, 120);

    ctx.font = '22px "Sarabun", sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.fillText('ขอมอบประกาศนียบัตรฉบับนี้เพื่อแสดงว่า', canvas.width/2, 180);

    ctx.font = 'bold 46px "Sarabun", sans-serif';
    ctx.fillStyle = '#00979C';
    ctx.fillText(nameInput, canvas.width/2, 250);

    ctx.font = '22px "Sarabun", sans-serif';
    ctx.fillStyle = '#1e293b';
    ctx.fillText('ได้ผ่านการทดสอบความรู้ โมดูล 3: แอนะล็อกอินพุต (ADC)', canvas.width/2, 320);
    ctx.fillText('หลักสูตรไมโครคอนโทรลเลอร์ (ระดับ ปวส.)', canvas.width/2, 360);

    ctx.font = 'bold 28px "Sarabun", sans-serif';
    ctx.fillStyle = '#ef4444'; 
    ctx.fillText(`ด้วยคะแนน ${userScore}/10 (${userScore*10}%)`, canvas.width/2, 420);

    const today = new Date();
    const dateStr = today.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' });
    ctx.font = '18px "Sarabun", sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.fillText(`วันที่ผ่านการทดสอบ: ${dateStr}`, canvas.width/2, 480);

    ctx.beginPath();
    ctx.moveTo(canvas.width/2 - 120, 520);
    ctx.lineTo(canvas.width/2 + 120, 520);
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    document.getElementById('cert-container').style.display = 'block';

    const link = document.getElementById('cert-download');
    link.download = `Certificate_${nameInput.replace(/\s+/g, '_')}.png`;
    link.href = canvas.toDataURL('image/png');
};
