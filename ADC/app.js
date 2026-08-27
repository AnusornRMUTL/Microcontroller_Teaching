document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initCodeEditors();
    initSimulators();
    initQuiz();
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
const quizData = [
    { q: "1. สัญญาณชนิดใดที่มีการเปลี่ยนแปลงอย่างต่อเนื่อง?", options: ["Digital Signal", "Analog Signal", "Discrete Signal", "Binary Signal"], ans: 1 },
    { q: "2. วงจรที่ใช้แปลงสัญญาณแอนะล็อกเป็นดิจิทัลเรียกว่าอะไร?", options: ["DAC", "ADC", "PWM", "UART"], ans: 1 },
    { q: "3. ขั้นตอนใดใน ADC ที่ทำหน้าที่ค้างค่าแรงดันไว้ให้คงที่ชั่วขณะ?", options: ["Sampling", "Holding", "Quantizing", "Encoding"], ans: 1 },
    { q: "4. ความละเอียด (Resolution) ของ ADC บนชิป ESP32 คือกี่บิต?", options: ["8-bit", "10-bit", "12-bit", "16-bit"], ans: 2 },
    { q: "5. ค่าดิจิทัลสูงสุดที่อ่านได้จาก ADC 12-bit คือเท่าใด?", options: ["255", "1023", "4095", "65535"], ans: 2 },
    { q: "6. ช่วงแรงดันสูงสุดของขา Analog Input ของ ESP32 โดยทั่วไปคือเท่าใด?", options: ["1.8V", "3.3V", "5.0V", "12V"], ans: 1 },
    { q: "7. ฟังก์ชันใดใน Arduino IDE ที่ใช้สำหรับอ่านค่าจากขาแอนะล็อก?", options: ["digitalRead()", "analogWrite()", "analogRead()", "readADC()"], ans: 2 },
    { q: "8. ในตัวอย่างที่ 1 หากต้องการแปลงค่า 0-4095 ให้อยู่ในช่วง 0-255 ควรใช้คำสั่งใด?", options: ["map()", "constrain()", "shiftOut()", "analogWrite()"], ans: 0 },
    { q: "9. หากค่า ADC เท่ากับ 2048 คิดเป็นแรงดันไฟฟ้าประมาณเท่าใด (บน ESP32 ที่รับ 3.3V ได้เต็ม)?", options: ["1.65V", "3.3V", "5V", "0V"], ans: 0 },
    { q: "10. หากต้องการส่งค่าจากไมโครคอนโทรลเลอร์แสดงผลบนหน้าจอคอมพิวเตอร์ผ่านสาย USB ใช้ฟังก์ชันใด?", options: ["analogWrite()", "Serial.print()", "SPI.transfer()", "Wire.write()"], ans: 1 }
];

let userAnswers = new Array(quizData.length).fill(null);

function initQuiz() {
    const container = document.getElementById('quiz-container');
    let html = '';
    
    quizData.forEach((q, index) => {
        html += `
            <div class="quiz-question" id="q${index}">
                <p><strong>${q.q}</strong></p>
                <div class="quiz-options">
                    ${q.options.map((opt, optIndex) => `
                        <label>
                            <input type="radio" name="question${index}" value="${optIndex}" onchange="selectAnswer(${index}, ${optIndex})">
                            ${opt}
                        </label>
                    `).join('')}
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    
    const submitBtn = document.getElementById('submit-quiz');
    if (submitBtn) submitBtn.addEventListener('click', gradeQuiz);
    
    const retryBtn = document.getElementById('retry-quiz');
    if (retryBtn) retryBtn.addEventListener('click', resetQuiz);
}

window.selectAnswer = function(qIndex, optIndex) {
    userAnswers[qIndex] = optIndex;
};

function gradeQuiz() {
    if(userAnswers.includes(null)) {
        alert("กรุณาตอบคำถามให้ครบทุกข้อก่อนส่งคำตอบ");
        return;
    }
    
    let score = 0;
    
    quizData.forEach((q, index) => {
        const questionDiv = document.getElementById(`q${index}`);
        const labels = questionDiv.querySelectorAll('label');
        
        labels.forEach(l => {
            l.classList.remove('correct', 'incorrect');
            const input = l.querySelector('input');
            input.disabled = true;
        });
        
        const userAns = userAnswers[index];
        if (userAns === q.ans) {
            score++;
            labels[userAns].classList.add('correct');
        } else {
            labels[userAns].classList.add('incorrect');
            labels[q.ans].classList.add('correct');
        }
    });
    
    const resultDiv = document.getElementById('quiz-result');
    resultDiv.innerText = `คะแนนของคุณ: ${score} / 10`;
    resultDiv.style.color = score === 10 ? 'var(--quiz-correct)' : 'var(--quiz-incorrect)';
    
    document.getElementById('submit-quiz').style.display = 'none';
    if (score < 10) {
        document.getElementById('retry-quiz').style.display = 'block';
    }
}

function resetQuiz() {
    userAnswers = new Array(quizData.length).fill(null);
    
    quizData.forEach((q, index) => {
        const questionDiv = document.getElementById(`q${index}`);
        const labels = questionDiv.querySelectorAll('label');
        const inputs = questionDiv.querySelectorAll('input');
        
        labels.forEach(l => l.classList.remove('correct', 'incorrect'));
        inputs.forEach(i => {
            i.checked = false;
            i.disabled = false;
        });
    });
    
    document.getElementById('quiz-result').innerText = '';
    document.getElementById('submit-quiz').style.display = 'block';
    document.getElementById('retry-quiz').style.display = 'none';
    
    document.getElementById('quiz').scrollIntoView({ behavior: 'smooth' });
}
