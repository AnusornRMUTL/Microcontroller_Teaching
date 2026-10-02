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
            const targetId = link.getAttribute('data-target');
            if (!targetId) return; // Let default navigation happen for external links (like Back to Home)
            
            e.preventDefault();
            links.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            link.classList.add('active');
            const targetElem = document.getElementById(targetId);
            if (targetElem) {
                targetElem.classList.add('active');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
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
const fallbackQuestions = [
  {
    "id": 1,
    "question": "ADC ย่อมาจากคำว่าอะไร?",
    "options": [
      "Analog Data Converter",
      "Automatic Digital Control",
      "Analog to Digital Converter",
      "Advanced Digital Core"
    ],
    "answer": 2,
    "reason": "ADC (Analog to Digital Converter) คือวงจรที่ทำหน้าที่แปลงสัญญาณแอนะล็อกที่มีความต่อเนื่อง ให้กลายเป็นค่าดิจิทัลที่ไมโครคอนโทรลเลอร์ประมวลผลได้"
  },
  {
    "id": 2,
    "question": "ขาสำหรับอ่านสัญญาณแอนะล็อกบนบอร์ด Arduino Uno คือขาใด?",
    "options": [
      "D0 ถึง D13",
      "A0 ถึง A5",
      "TX และ RX",
      "GND และ 5V"
    ],
    "answer": 1,
    "reason": "บนบอร์ด Arduino Uno ขาที่มีคุณสมบัติรองรับ ADC จะถูกตั้งชื่อว่า A0 ถึง A5"
  },
  {
    "id": 3,
    "question": "ความละเอียด (Resolution) ของ ADC บนชิป ATmega328P (Arduino Uno) คือเท่าใด?",
    "options": [
      "8 บิต",
      "10 บิต",
      "12 บิต",
      "16 บิต"
    ],
    "answer": 1,
    "reason": "Arduino Uno มี ADC ขนาด 10 บิต ทำให้แปลงค่าสัญญาณได้ 1024 ระดับ (0 ถึง 1023)"
  },
  {
    "id": 4,
    "question": "หากใช้แรงดันอ้างอิง (Vref) เป็น 5V ค่าดิจิทัลสูงสุด 1023 จะหมายถึงแรงดันกี่โวลต์?",
    "options": [
      "0V",
      "3.3V",
      "5V",
      "10V"
    ],
    "answer": 2,
    "reason": "ในระบบ ADC 10 บิต ค่า 1023 หมายถึงแรงดันเทียบเท่ากับไฟอ้างอิงสูงสุด ซึ่งก็คือ 5V"
  },
  {
    "id": 5,
    "question": "ฟังก์ชันใดใช้สำหรับอ่านค่าจากขาแอนะล็อก?",
    "options": [
      "digitalRead()",
      "analogWrite()",
      "analogRead()",
      "readADC()"
    ],
    "answer": 2,
    "reason": "analogRead(pin) ใช้สั่งให้ ADC ทำการแปลงสัญญาณจากพินที่กำหนดแล้วคืนค่าตัวเลขจำนวนเต็มออกมา"
  },
  {
    "id": 6,
    "question": "การแปลงสัญญาณแอนะล็อกเป็นดิจิทัล ประกอบด้วยขั้นตอนสำคัญ 2 ขั้นตอนคืออะไร?",
    "options": [
      "Sampling และ Quantization",
      "Modulation และ Demodulation",
      "Filtering และ Amplifying",
      "Encoding และ Decoding"
    ],
    "answer": 0,
    "reason": "Sampling คือการสุ่มตัวอย่างสัญญาณตามเวลา Quantization คือการปัดเศษแรงดันให้ตรงกับระดับบิตดิจิทัล"
  },
  {
    "id": 7,
    "question": "ถ้าความละเอียด 10 บิต มีจำนวนระดับ 1024 ระดับ (0-1023) หาก ESP32 มีความละเอียด 12 บิต จะมีกี่ระดับ?",
    "options": [
      "2048 ระดับ (0-2047)",
      "4096 ระดับ (0-4095)",
      "1024 ระดับเท่ากัน",
      "8192 ระดับ"
    ],
    "answer": 1,
    "reason": "คำนวณจาก 2^12 = 4096 ระดับ จึงได้ค่าที่ส่งกลับมาเป็น 0 ถึง 4095"
  },
  {
    "id": 8,
    "question": "ในการใช้เซนเซอร์ LDR (Light Dependent Resistor) วัดแสง นิยมต่อวงจรแบบใดเข้ากับบอร์ดไมโครคอนโทรลเลอร์?",
    "options": [
      "ต่ออนุกรมกับ LED",
      "ต่อแบบ Voltage Divider (วงจรแบ่งแรงดัน) ร่วมกับตัวต้านทานคงที่",
      "ต่อตรงเข้าขา 5V และ GND",
      "ต่อผ่านรีเลย์"
    ],
    "answer": 1,
    "reason": "ADC วัดแรงดันไฟฟ้า (Voltage) ไม่ใช่ความต้านทาน จึงต้องต่อ Voltage Divider เปลี่ยนการแปรผันของความต้านทานให้เป็นแรงดันไฟฟ้า"
  },
  {
    "id": 9,
    "question": "สูตรในการแปลงค่า 0-1023 ให้กลับมาเป็นแรงดันไฟฟ้า (โวลต์) คือข้อใด? (สมมติ Vref = 5V)",
    "options": [
      "Voltage = value * 5.0 / 1023.0",
      "Voltage = value * 1023.0 / 5.0",
      "Voltage = value - 5.0",
      "Voltage = value + 5.0"
    ],
    "answer": 0,
    "reason": "การเทียบบัญญัติไตรยางศ์: (value / 1023) * 5.0 เพื่อคำนวณหาแรงดันไฟฟ้าที่ตกคร่อมขา ADC"
  },
  {
    "id": 10,
    "question": "คำสั่ง map(val, 0, 1023, 0, 255) ทำหน้าที่อะไร?",
    "options": [
      "เปลี่ยนค่าตัวแปรจาก float เป็น int",
      "สุ่มตัวเลขระหว่าง 0 ถึง 255",
      "สเกลค่าจากช่วง 0-1023 ให้เป็นสัดส่วนในช่วง 0-255",
      "อ่านค่าจากพิน 255"
    ],
    "answer": 2,
    "reason": "ฟังก์ชัน map() ใช้สำหรับปรับเทียบ (Scale/Map) ตัวเลขจากช่วงหนึ่ง ไปยังอีกช่วงหนึ่งเชิงเส้นตรง นิยมใช้แปลงค่า ADC เป็น PWM"
  },
  {
    "id": 11,
    "question": "เซนเซอร์วัดอุณหภูมิ LM35 ให้เอาต์พุตแรงดันเพิ่มขึ้น 10mV ทุกๆ 1 องศาเซลเซียส ที่อุณหภูมิ 25 °C จะได้แรงดันเท่าใด?",
    "options": [
      "0.25 V (250 mV)",
      "2.5 V",
      "5 V",
      "25 V"
    ],
    "answer": 0,
    "reason": "10mV * 25 = 250mV ซึ่งเท่ากับ 0.25 โวลต์"
  },
  {
    "id": 12,
    "question": "ข้อเสียของ ADC บน ESP32 ที่วิศวกรต้องระวังที่สุดคืออะไร?",
    "options": [
      "ความเร็วในการอ่านช้ามาก",
      "แรงดันอ้างอิงต่ำเพียง 1V",
      "ความไม่เป็นเชิงเส้น (Non-linearity) โดยเฉพาะที่ค่าใกล้ 0V และ 3.3V",
      "อ่านค่าได้เฉพาะขาเดียว"
    ],
    "answer": 2,
    "reason": "ADC ของ ESP32 มีปัญหา Non-linear ค่อนข้างสูง ทำให้การวัดค่าแรงดันตํ่ามากๆ (ใกล้ 0V) และสูงมากๆ (ใกล้ 3.3V) จะเพี้ยน จำเป็นต้องทำ Calibration"
  },
  {
    "id": 13,
    "question": "หากใช้เซนเซอร์อุตสาหกรรมมาตรฐาน 4-20mA จะนำมาต่อกับ ADC ที่รับแรงดัน 0-5V ได้อย่างไร?",
    "options": [
      "ต่อเข้า ADC โดยตรงได้เลย",
      "ใช้ตัวต้านทาน 250 โอห์ม ต่อคร่อมเข้ากับกราวด์ เพื่อแปลงกระแสเป็นแรงดัน 1-5V",
      "ใช้ Relay แยกกระแส",
      "ใช้ตัวต้านทาน 10 kΩ ต่อ Pull-up"
    ],
    "answer": 1,
    "reason": "ตามกฎของโอห์ม V = I*R ดังนั้น 4mA * 250Ω = 1V และ 20mA * 250Ω = 5V พอดีกับสเกล 1V-5V"
  },
  {
    "id": 14,
    "question": "ขา AREF (Analog Reference) บนบอร์ด Arduino มีไว้เพื่ออะไร?",
    "options": [
      "สำหรับจ่ายไฟเลี้ยงบอร์ด",
      "สำหรับจ่ายไฟเลี้ยงให้เซนเซอร์แอนะล็อก",
      "ป้อนแรงดันอ้างอิงภายนอก เพื่อเปลี่ยนเพดานการวัดของ ADC",
      "ต่อลงกราวด์เพื่อลดสัญญาณรบกวน"
    ],
    "answer": 2,
    "reason": "การป้อนแรงดันที่มั่นคงและเฉพาะเจาะจง (เช่น 3.3V) เข้าไปที่ขา AREF จะทำให้การแปลงค่า ADC ละเอียดหรือถูกต้องขึ้นสำหรับเซนเซอร์แรงดันต่ำ"
  },
  {
    "id": 15,
    "question": "ตัวต้านทานปรับค่าได้ (Potentiometer) 3 ขา ควรต่อวงจรเข้ากับไมโครคอนโทรลเลอร์อย่างไร?",
    "options": [
      "ขากลางต่อ 5V, ขาซ้ายขวาต่อกราว",
      "ขาซ้าย 5V, ขาขวา GND, ขากลางต่อกับขา ADC (เช่น A0)",
      "ขาซ้ายต่อ A0, ขาขวาต่อ A1",
      "ใช้แค่ 2 ขาต่ออนุกรมกับ A0"
    ],
    "answer": 1,
    "reason": "ตัวต้านทานปรับค่าได้ทำงานเป็นวงจรแบ่งแรงดัน (Voltage Divider) ที่แปรผันได้ ขากลางจะเป็นจุดที่แรงดันแปรผันจาก 0 ถึง 5V"
  },
  {
    "id": 16,
    "question": "ปัญหาของสัญญาณรบกวน (Noise) ในการอ่านค่า ADC สามารถแก้ไขด้วยวิธีใดทางซอฟต์แวร์?",
    "options": [
      "เปลี่ยนไปใช้เซนเซอร์แบบดิจิทัล",
      "เพิ่ม delay() ให้มากขึ้น",
      "อ่านค่าหลายๆ ครั้งแล้วนำมาหาค่าเฉลี่ย (Moving Average Filter)",
      "ใช้ฟังก์ชัน map()"
    ],
    "answer": 2,
    "reason": "การอ่านค่าหลายๆ ครั้ง (เช่น 10-100 ครั้ง) แล้วหารเพื่อหาค่าเฉลี่ย ช่วยกรองสัญญาณรบกวนที่แกว่งไปมาได้ดีมาก (Low-pass Filter แบบพื้นฐาน)"
  },
  {
    "id": 17,
    "question": "ทำไมการอ่านค่า LDR เพื่อวัดแสงจึงไม่ให้ผลลัพธ์เป็นเชิงเส้น (Linear)?",
    "options": [
      "LDR พังง่าย",
      "LDR ตอบสนองต่อแสงเป็นแบบล็อกการิทึม (Logarithmic)",
      "ADC ของ Arduino มีปัญหา",
      "แรงดันของบอร์ดไม่เสถียร"
    ],
    "answer": 1,
    "reason": "คุณสมบัติทางฟิสิกส์ของ LDR นั้น ค่าความต้านทานจะเปลี่ยนแปลงในลักษณะ Logarithmic ตามระดับความเข้มแสง (Lux)"
  },
  {
    "id": 18,
    "question": "ฟังก์ชัน analogReference(INTERNAL) บน Arduino Uno จะตั้งค่าแรงดันอ้างอิงไว้ที่เท่าใด?",
    "options": [
      "5.0 V",
      "3.3 V",
      "2.56 V",
      "1.1 V"
    ],
    "answer": 3,
    "reason": "ชิป ATmega328P มีแรงดันอ้างอิงภายใน (Internal Vref) แบบ Bandgap ที่แม่นยำประมาณ 1.1V เหมาะสำหรับวัดแรงดันตํ่าๆ"
  },
  {
    "id": 19,
    "question": "เวลาที่ใช้แปลงสัญญาณจาก Analog เป็น Digital ของชิป ATmega328P (Conversion Time) อยู่ที่ประมาณเท่าใด?",
    "options": [
      "1 ไมโครวินาที",
      "100 ไมโครวินาที",
      "10 มิลลิวินาที",
      "1 วินาที"
    ],
    "answer": 1,
    "reason": "ในความเร็วสัญญาณนาฬิกามาตรฐาน 16MHz ของ Arduino การสั่ง analogRead() จะใช้เวลาประมาณ 100 µs ในการประมวลผล"
  },
  {
    "id": 20,
    "question": "สัญญาณประเภท 0-10V อุตสาหกรรม จะนำมาต่อเข้าบอร์ด Arduino 5V อย่างไรอย่างปลอดภัย?",
    "options": [
      "ใช้ Voltage Divider หักแรงดันลงครึ่งหนึ่ง (เช่น R 10k และ 10k)",
      "ต่อเข้า AREF",
      "ใช้คาปาซิเตอร์คั่น",
      "ต่อเข้าได้เลยเพราะบอร์ดทนได้"
    ],
    "answer": 0,
    "reason": "ถ้าจ่ายแรงดันเกิน 5V เข้าขาพอร์ต ชิปจะพัง การใช้วงจรความต้านทานแบ่งแรงดันสัดส่วน 1:2 (10k กับ 10k) จะแปลง 0-10V เป็น 0-5V พอดี"
  },
  {
    "id": 21,
    "question": "บอร์ด ESP32 มีพอร์ต ADC กี่ชุดหลัก?",
    "options": [
      "1 ชุด (ADC1)",
      "2 ชุด (ADC1 และ ADC2)",
      "3 ชุด",
      "4 ชุด"
    ],
    "answer": 1,
    "reason": "ESP32 มี ADC สองชุดคือ ADC1 (ทำงานอิสระ) และ ADC2 (แชร์ร่วมกับโมดูล Wi-Fi ไม่แนะนำให้ใช้พร้อม Wi-Fi)"
  },
  {
    "id": 22,
    "question": "ข้อใดอธิบายหลักการของ ADC แบบ Successive Approximation Register (SAR) ได้ถูกต้องที่สุด?",
    "options": [
      "นับเวลาคลื่น",
      "เปรียบเทียบแรงดันทีละบิตจากบิตสูงสุดไปยังบิตต่ำสุด (คล้ายการชั่งน้ำหนักแบบแบ่งครึ่ง)",
      "แปลงความถี่เป็นแรงดัน",
      "ชาร์จตัวเก็บประจุจนเต็ม"
    ],
    "answer": 1,
    "reason": "SAR ADC เป็นสถาปัตยกรรมที่ใช้ในไมโครคอนโทรลเลอร์ส่วนใหญ่ ทำงานโดยใช้ DAC สร้างแรงดันเปรียบเทียบทีละบิตเพื่อหันหาค่าแรงดันจริง คล้ายหลักการ Binary Search"
  },
  {
    "id": 23,
    "question": "หากต่อตัวต้านทาน LDR ขาดออกจากวงจรแบ่งแรงดัน ขาแอนะล็อกของ Arduino จะอ่านค่าใด?",
    "options": [
      "0 ตลอด",
      "1023 ตลอด",
      "ค่าแกว่งไปมาไม่แน่นอน (Floating)",
      "512 ตลอด"
    ],
    "answer": 2,
    "reason": "หากวงจรขาด ขา A0 จะไม่มีแรงดันอ้างอิงตกคร่อม ทำให้สถานะพินลอย (Floating) และอ่านได้ค่า Noise จากสิ่งแวดล้อม"
  },
  {
    "id": 24,
    "question": "เซนเซอร์อุณหภูมิ NTC Thermistor เป็นอุปกรณ์แบบใด?",
    "options": [
      "แผ่รังสีอินฟราเรด",
      "เปลี่ยนความต้านทานตามอุณหภูมิ โดยอุณหภูมิสูงความต้านทานจะลดลง",
      "สร้างแรงดันไฟฟ้าได้เองเมื่อโดนความร้อน",
      "สื่อสารผ่านบัส I2C"
    ],
    "answer": 1,
    "reason": "NTC (Negative Temperature Coefficient) คือเมื่ออุณหภูมิสูงขึ้น ค่าความต้านทานจะต่ำลง"
  },
  {
    "id": 25,
    "question": "คำสั่ง float voltage = analogRead(A0) * (5.0 / 1023.0); ข้อมูลใดเป็นชนิด float?",
    "options": [
      "analogRead()",
      "voltage และ (5.0 / 1023.0)",
      "A0",
      "1023.0 อย่างเดียว"
    ],
    "answer": 1,
    "reason": "ตัวแปร voltage ประกาศเป็น float และ 5.0, 1023.0 เป็นค่าคงที่ทศนิยม (float literal) ทำให้สมการคำนวณแบบทศนิยม"
  },
  {
    "id": 26,
    "question": "ข้อใดไม่ใช่เซนเซอร์แอนะล็อก?",
    "options": [
      "LDR",
      "Potentiometer",
      "DHT11",
      "LM35"
    ],
    "answer": 2,
    "reason": "DHT11 เป็นเซนเซอร์วัดอุณหภูมิและความชื้นแบบ *ดิจิทัล* ซึ่งสื่อสารด้วยรูปแบบ One-wire protocol ไม่ได้ป้อนระดับแรงดันเชิงเส้น"
  },
  {
    "id": 27,
    "question": "ถ้าใช้ ESP32 (3.3V, 12-bit) หากวัดได้ค่า 2048 หมายถึงแรงดันประมาณเท่าใด?",
    "options": [
      "0V",
      "1.65V (ครึ่งหนึ่งของ 3.3V)",
      "3.3V",
      "5V"
    ],
    "answer": 1,
    "reason": "ค่าสูงสุดของ 12 บิตคือ 4095 เทียบเท่า 3.3V ดังนั้นค่า 2048 (เกือบครึ่ง) จะเทียบเท่ากับ 1.65V"
  },
  {
    "id": 28,
    "question": "ในการกรองสัญญาณ Noise ทางฮาร์ดแวร์สำหรับ ADC วิธีที่ประหยัดที่สุดคืออะไร?",
    "options": [
      "ซื้อเซนเซอร์ราคาแพง",
      "ต่อคาปาซิเตอร์ (Capacitor) ค่าต่ำๆ (เช่น 0.1uF) คั่นระหว่างขาสัญญาณกับกราวด์ เพื่อสร้าง RC Filter",
      "ใช้แหล่งจ่ายไฟแยกต่างหาก",
      "พันสายไฟให้หนาขึ้น"
    ],
    "answer": 1,
    "reason": "การคร่อมตัวเก็บประจุแบบ Ceramic (0.1µF) เป็นการทำ Low-pass filter แบบเบสิก เพื่อบายพาสคลื่นความถี่สูง(Noise) ทิ้งลงกราวด์"
  },
  {
    "id": 29,
    "question": "เซนเซอร์ชนิดใดที่สามารถวัดระดับความชื้นในดิน (Soil Moisture Sensor) ส่วนใหญ่ปล่อยสัญญาณรูปแบบใดออกมา?",
    "options": [
      "I2C",
      "RS485",
      "Analog Voltage",
      "PWM"
    ],
    "answer": 2,
    "reason": "โมดูลวัดความชื้นในดินทั่วไปใช้หลักการวัดความนำไฟฟ้า(Conductivity) ของดิน แล้วส่งค่าออกมาเป็นระดับแรงดันแอนะล็อก (Analog Voltage)"
  },
  {
    "id": 30,
    "question": "ถ้าเราไม่ต้องการให้ค่าการวัดส่ายไปส่ายมา (เช่น จาก 24.1 ไป 24.5 อย่างรวดเร็ว) ในหน้าจอแสดงผล ควรใช้วิธีใด?",
    "options": [
      "ปัดเศษให้เป็นจำนวนเต็ม",
      "ใช้ Moving Average Filter และหน่วงเวลาอัปเดตหน้าจอ (เช่น ทุก 500ms)",
      "ปิดและเปิดบอร์ดใหม่เรื่อยๆ",
      "ลดไฟเลี้ยงลง"
    ],
    "answer": 1,
    "reason": "การทำค่าเฉลี่ยและไม่ปรับปรุงหน้าจอแบบ Real-time ตามเสี้ยววินาที จะช่วยให้ผู้ใช้งานมองเห็นค่าได้นิ่งและอ่านง่ายขึ้น"
  }
];

let quizQuestions = [];
let currentQuizSession = [];
let userScore = 0;
let userAnswers = {};

async function fetchQuizData() {
    try {
        const response = await fetch('questions.json');
        if (response.ok) {
            quizQuestions = await response.json();
            return;
        }
    } catch (e) {
        console.warn('fetch questions.json failed, using embedded fallback questions:', e);
    }
    quizQuestions = [...fallbackQuestions];
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
    if (!container) return;
    container.innerHTML = '<div style="text-align:center; padding:50px; color: #64748b; font-size: 1.1rem;">⏳ กำลังโหลดข้อสอบ...</div>';
    
    if (!quizQuestions || quizQuestions.length === 0) {
        await fetchQuizData();
    }
    if (!quizQuestions || quizQuestions.length === 0) {
        quizQuestions = [...fallbackQuestions];
    }
    
    currentQuizSession = shuffleArray(quizQuestions).slice(0, 10);
    userScore = 0;
    userAnswers = {};

    let html = '<div>' +
        '<div style="background: #f1f5f9; padding: 15px 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #00979C;">' +
            '<p style="margin: 0; color: #334155; font-size: 1.05rem;">' +
                '📌 ระบบสุ่มข้อสอบ <strong>10 ข้อ</strong> จากคลังข้อสอบทั้งหมด 30 ข้อ เพื่อวัดความเข้าใจในเนื้อหา ADC เกณฑ์การผ่านคือ <strong>8/10 คะแนน (80%)</strong> ขึ้นไปเพื่อรับใบประกาศนียบัตร' +
            '</p>' +
        '</div>' +
        '<div id="quiz-list">';

    currentQuizSession.forEach((q, i) => {
        html += '<div class="quiz-question" id="q-block-' + i + '">' +
            '<p style="font-weight: 600; font-size: 1.1rem; margin-bottom: 15px; color: #1e293b;">' +
                '<span style="display: inline-block; background: #00979C; color: white; border-radius: 50%; width: 28px; height: 28px; text-align: center; line-height: 28px; font-size: 0.9rem; margin-right: 8px;">' + (i + 1) + '</span>' +
                q.question +
            '</p>' +
            '<div class="quiz-options">';
        q.options.forEach((opt, j) => {
            const letter = String.fromCharCode(65 + j);
            html += '<div class="quiz-option" id="opt-div-' + i + '-' + j + '" onclick="selectAnswer(' + i + ', ' + j + ')">' +
                    '<span style="display: inline-block; width: 24px; font-weight: bold; color: #64748b;">' + letter + '.</span>' +
                    '<span>' + opt + '</span>' +
                '</div>';
        });
        html += '</div>' +
            '<div id="reason-' + i + '" style="display: none; margin-top: 15px; padding: 15px; border-radius: 8px; font-size: 0.95rem; line-height: 1.6;"></div>' +
        '</div>';
    });

    html += '</div>' +
        '<div id="quiz-final-result" style="text-align: center; margin-top: 30px; display: none;"></div>' +
    '</div>';
    
    container.innerHTML = html;
}

window.selectAnswer = function(qIndex, selectedOptIndex) {
    if (userAnswers[qIndex] !== undefined) return;
    
    userAnswers[qIndex] = selectedOptIndex;
    const q = currentQuizSession[qIndex];
    const isCorrect = selectedOptIndex === q.answer;
    
    if (isCorrect) userScore++;

    q.options.forEach((_, j) => {
        const optDiv = document.getElementById('opt-div-' + qIndex + '-' + j);
        if (!optDiv) return;
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

    const reasonDiv = document.getElementById('reason-' + qIndex);
    if (reasonDiv) {
        reasonDiv.style.display = 'block';
        if (isCorrect) {
            reasonDiv.style.backgroundColor = '#f0fdf4';
            reasonDiv.style.border = '1px solid #bbf7d0';
            reasonDiv.style.borderLeft = '4px solid #22c55e';
            reasonDiv.innerHTML = '<span style="color: #15803d; font-weight: bold; font-size: 1.05rem;">✅ ถูกต้อง!</span><div style="margin-top: 6px; color: #334155;"><strong>เหตุผล:</strong> ' + q.reason + '</div>';
        } else {
            reasonDiv.style.backgroundColor = '#fef2f2';
            reasonDiv.style.border = '1px solid #fecaca';
            reasonDiv.style.borderLeft = '4px solid #ef4444';
            reasonDiv.innerHTML = '<span style="color: #b91c1c; font-weight: bold; font-size: 1.05rem;">❌ ผิดครับ!</span><div style="margin-top: 6px; color: #334155;"><strong>เหตุผล:</strong> ' + q.reason + '</div>';
        }
    }

    if (Object.keys(userAnswers).length === currentQuizSession.length) {
        showFinalResult();
    }
};

function showFinalResult() {
    const resDiv = document.getElementById('quiz-final-result');
    if (!resDiv) return;
    resDiv.style.display = 'block';
    const passThreshold = 8;
    
    if (userScore >= passThreshold) {
        let retryBtn = '';
        if (userScore < 10) {
            retryBtn = '<button class="action-btn secondary-btn" onclick="renderQuizHTML(document.getElementById(\'quiz-container\'))">🔄 ทดสอบใหม่อีกครั้ง</button>';
        }
        resDiv.innerHTML = '<div style="background: #f0fdf4; padding: 30px; border-radius: 12px; border: 2px solid #22c55e; box-shadow: 0 4px 15px rgba(34,197,94,0.15);">' +
                '<h2 style="color: #15803d; margin-top: 0; font-size: 1.8rem;">🎉 ยินดีด้วย! คุณสอบผ่านเกณฑ์</h2>' +
                '<p style="font-size: 1.25rem; color: #334155; margin: 10px 0;">ได้คะแนน <strong>' + userScore + ' / 10</strong> (' + (userScore * 10) + '%)</p>' +
                '<div style="margin-top: 25px; padding-top: 20px; border-top: 1px dashed #cbd5e1;">' +
                    '<label style="display: block; margin-bottom: 10px; font-weight: bold; color: #1e293b; font-size: 1.05rem;">กรุณากรอก ชื่อ-นามสกุล เพื่อรับใบประกาศนียบัตร:</label>' +
                    '<input type="text" id="cert-name" placeholder="นายวิศวกร ยอดเยี่ยม" style="padding: 12px; width: 100%; max-width: 380px; border: 2px solid #cbd5e1; border-radius: 8px; font-size: 1.05rem; font-family: Sarabun, sans-serif; text-align: center;">' +
                    '<br>' +
                    '<div style="margin-top: 20px; display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">' +
                        '<button class="action-btn" onclick="generateCertificate()">🎓 พิมพ์ใบประกาศนียบัตร</button>' +
                        retryBtn +
                    '</div>' +
                '</div>' +
                '<div id="cert-container" style="margin-top: 30px; display: none;">' +
                    '<canvas id="cert-canvas" width="800" height="566" style="max-width: 100%; height: auto; border: 1px solid #cbd5e1; border-radius: 8px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.15);"></canvas>' +
                    '<br>' +
                    '<a id="cert-download" class="action-btn" style="display: inline-flex; margin-top: 20px; text-decoration: none; background: #0ea5e9;">⬇️ ดาวน์โหลดใบประกาศ (PNG)</a>' +
                '</div>' +
            '</div>';

        setTimeout(() => {
            const certInput = document.getElementById('cert-name');
            if (certInput) {
                certInput.focus();
                certInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') generateCertificate();
                });
            }
        }, 100);
    } else {
        resDiv.innerHTML = '<div style="background: #fef2f2; padding: 30px; border-radius: 12px; border: 2px solid #ef4444; box-shadow: 0 4px 15px rgba(239,68,68,0.15);">' +
                '<h2 style="color: #b91c1c; margin-top: 0; font-size: 1.8rem;">คุณยังไม่ผ่านเกณฑ์ 80%</h2>' +
                '<p style="font-size: 1.25rem; color: #334155; margin: 10px 0;">ได้คะแนน <strong>' + userScore + ' / 10</strong> (' + (userScore * 10) + '%) <br><span style="font-size: 1rem; color: #64748b;">(ต้องได้ 8 คะแนนขึ้นไป จึงจะได้รับใบประกาศนียบัตร)</span></p>' +
                '<button class="action-btn secondary-btn" style="margin-top: 20px; font-size: 1.1rem; padding: 12px 24px;" onclick="renderQuizHTML(document.getElementById(\'quiz-container\'))">🔄 กลับไปทำแบบทดสอบใหม่ (สุ่มข้อสอบใหม่)</button>' +
            '</div>';
    }
    
    setTimeout(() => {
        resDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 150);
}

window.generateCertificate = function() {
    const nameInput = (document.getElementById('cert-name').value || '').trim();
    if (!nameInput) {
        alert('กรุณากรอกชื่อ-นามสกุลก่อนพิมพ์ใบประกาศฯ');
        const el = document.getElementById('cert-name');
        if (el) el.focus();
        return;
    }

    const canvas = document.getElementById('cert-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Background
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Outer & Inner Borders
    ctx.lineWidth = 15;
    ctx.strokeStyle = '#00979C'; 
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#cbd5e1';
    ctx.strokeRect(32, 32, canvas.width - 64, canvas.height - 64);

    // Decorative corners
    ctx.fillStyle = '#00979C';
    ctx.beginPath(); ctx.arc(40, 40, 10, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(canvas.width - 40, 40, 10, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(40, canvas.height - 40, 10, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(canvas.width - 40, canvas.height - 40, 10, 0, Math.PI * 2); ctx.fill();

    // Texts
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 40px "Sarabun", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('ใบประกาศนียบัตร', canvas.width / 2, 120);

    ctx.font = '22px "Sarabun", sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.fillText('ขอมอบประกาศนียบัตรฉบับนี้เพื่อแสดงว่า', canvas.width / 2, 180);

    // Student Name
    ctx.font = 'bold 46px "Sarabun", sans-serif';
    ctx.fillStyle = '#00979C';
    ctx.fillText(nameInput, canvas.width / 2, 250);

    // Module info
    ctx.font = '22px "Sarabun", sans-serif';
    ctx.fillStyle = '#1e293b';
    ctx.fillText('ได้ผ่านการทดสอบความรู้ โมดูล 3: การแปลงสัญญาณแอนะล็อกเป็นดิจิทัล (ADC)', canvas.width / 2, 320);
    ctx.fillText('หลักสูตรไมโครคอนโทรลเลอร์ (ระดับ ปวส.)', canvas.width / 2, 360);

    // Score
    ctx.font = 'bold 28px "Sarabun", sans-serif';
    ctx.fillStyle = '#ef4444'; 
    ctx.fillText('ด้วยคะแนน ' + userScore + '/10 (' + (userScore * 10) + '%)', canvas.width / 2, 420);

    // Date
    const today = new Date();
    const dateStr = today.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' });
    ctx.font = '18px "Sarabun", sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.fillText('วันที่ผ่านการทดสอบ: ' + dateStr, canvas.width / 2, 480);

    // Signature line
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 120, 520);
    ctx.lineTo(canvas.width / 2 + 120, 520);
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    const certContainer = document.getElementById('cert-container');
    certContainer.style.display = 'block';

    const link = document.getElementById('cert-download');
    link.download = 'Certificate_ADC_' + nameInput.replace(/\s+/g, '_') + '.png';
    link.href = canvas.toDataURL('image/png');

    setTimeout(() => {
        certContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
};
