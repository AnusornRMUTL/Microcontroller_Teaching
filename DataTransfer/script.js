document.addEventListener('DOMContentLoaded', () => {
    initSimulator();
    initQuiz();
});

// ==========================================
// Simulator Logic
// ==========================================
function initSimulator() {
    const btnSerial = document.getElementById('btn-mode-serial');
    const btnParallel = document.getElementById('btn-mode-parallel');
    const btnSend = document.getElementById('btn-send-data');
    
    const wireSerial = document.getElementById('wire-serial');
    const wiresParallel = document.getElementById('wires-parallel');
    const animationLayer = document.getElementById('animation-layer');
    const receivedDataText = document.getElementById('received-data');
    
    // Code elements
    const ideFilename = document.getElementById('ide-filename');
    const codeBlock = document.getElementById('code-block');

    let isSerialMode = true;
    let isAnimating = false;

    // Data to send: 'A' = 01000001 (ASCII 65)
    // For visual purposes, let's represent bits as colors: 1 = High (Green/Yellow), 0 = Low (Gray)
    const dataBits = [0, 1, 0, 0, 0, 0, 0, 1]; 

    // Toggle Modes
    btnSerial.addEventListener('click', () => setMode(true));
    btnParallel.addEventListener('click', () => setMode(false));

    function setMode(serial) {
        if (isAnimating) return; // Prevent switching during animation
        isSerialMode = serial;
        
        // Update Buttons
        btnSerial.classList.toggle('active', serial);
        btnParallel.classList.toggle('active', !serial);
        
        // Update SVG Wires
        wireSerial.style.display = serial ? 'block' : 'none';
        wiresParallel.style.display = serial ? 'none' : 'block';
        
        // Reset Monitor
        receivedDataText.textContent = '___';
        receivedDataText.style.color = '#4ade80';

        // Update Mock Code
        updateCodeView();
    }

    function updateCodeView() {
        if (isSerialMode) {
            ideFilename.textContent = 'sender_serial.ino';
            codeBlock.innerHTML = `
<span class="code-comment">// โหมด: Serial Communication</span>
<span class="code-keyword">void</span> <span class="code-function">setup</span>() {
  <span class="code-comment">// เปิดพอร์ตซีเรียล ความเร็ว 9600 bps</span>
  <span class="code-function">Serial</span>.<span class="code-function">begin</span>(<span class="code-number">9600</span>);
}

<span class="code-keyword">void</span> <span class="code-function">loop</span>() {
  <span class="code-comment">// รอรับคำสั่งให้ส่งข้อมูล</span>
  <span id="line-send" class="code-line"><span class="code-function">Serial</span>.<span class="code-function">print</span>(<span class="code-string">"A"</span>); <span class="code-comment">// ส่ง 'A' (01000001) ทีละบิต</span></span>
  
  <span class="code-function">delay</span>(<span class="code-number">1000</span>);
}`;
        } else {
            ideFilename.textContent = 'sender_parallel.ino';
            codeBlock.innerHTML = `
<span class="code-comment">// โหมด: Parallel Communication (8-bit)</span>
<span class="code-keyword">void</span> <span class="code-function">setup</span>() {
  <span class="code-comment">// ตั้งค่าขา D0-D7 เป็น OUTPUT ทั้งหมดพร้อมกัน</span>
  <span class="code-keyword">DDRD</span> = <span class="code-number">B11111111</span>;
}

<span class="code-keyword">void</span> <span class="code-function">loop</span>() {
  <span class="code-comment">// ส่งข้อมูล 'A' (01000001) ออกไปทั้ง 8 ขาพร้อมกัน</span>
  <span id="line-send" class="code-line"><span class="code-keyword">PORTD</span> = <span class="code-number">B01000001</span>;</span>
  
  <span class="code-function">delay</span>(<span class="code-number">1000</span>);
}`;
        }
    }

    // Send Data Action
    btnSend.addEventListener('click', () => {
        if (isAnimating) return;
        isAnimating = true;
        btnSend.disabled = true;
        animationLayer.innerHTML = ''; // Clear previous animations
        receivedDataText.textContent = 'กำลังรับข้อมูล...';
        receivedDataText.style.color = '#facc15';

        // Highlight code line
        const lineSend = document.getElementById('line-send');
        if (lineSend) lineSend.classList.add('active');

        if (isSerialMode) {
            animateSerial();
        } else {
            animateParallel();
        }
    });

    function animateSerial() {
        // Serial: Bits travel one by one along the curve
        // Path: M 230 80 C 350 80, 450 80, 570 80
        // We will approximate linear movement along X for simplicity, or use SVG animateMotion
        
        let bitIndex = 0;
        const totalBits = dataBits.length;
        const delayBetweenBits = 300; // ms

        function sendNextBit() {
            if (bitIndex >= totalBits) {
                finishAnimation();
                return;
            }

            const bitValue = dataBits[bitIndex];
            createBitElement(bitValue, 'serial', bitIndex, (bitIndex * delayBetweenBits));
            
            bitIndex++;
            setTimeout(sendNextBit, delayBetweenBits);
        }

        sendNextBit();
    }

    function animateParallel() {
        // Parallel: All 8 bits travel at the same time along straight lines
        // Y coordinates correspond to dataBits array (D7 to D0)
        // Note: D7 is at index 0 of our array [0,1,0,0,0,0,0,1]
        
        dataBits.forEach((bitValue, index) => {
            createBitElement(bitValue, 'parallel', index, 0);
        });

        // Parallel finishes much faster (all at once)
        setTimeout(() => {
            finishAnimation();
        }, 1500); // 1.5s total animation time
    }

    function createBitElement(bitValue, mode, index, delayOffset) {
        // Create an SVG group for the bit and label
        const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
        
        // Determine start Y position
        let startY = 80; // Default for serial
        if (mode === 'parallel') {
            // Mapping index (D7..D0) to Y coordinates: 110, 135, 160... 285
            startY = 110 + (index * 25);
        }

        group.setAttribute('transform', `translate(230, ${startY})`);
        
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute('cx', '0');
        circle.setAttribute('cy', '0');
        circle.setAttribute('r', '6');
        circle.setAttribute('fill', bitValue === 1 ? '#4ade80' : '#94a3b8');
        
        // Add glow if bit is 1
        if (bitValue === 1) {
            circle.setAttribute('filter', 'url(#glow-bit)');
        }

        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute('x', '0');
        text.setAttribute('y', '-10');
        text.setAttribute('fill', 'white');
        text.setAttribute('font-family', 'Fira Code');
        text.setAttribute('font-size', '10');
        text.setAttribute('text-anchor', 'middle');
        text.textContent = bitValue;

        group.appendChild(circle);
        group.appendChild(text);
        animationLayer.appendChild(group);

        // Animate using Web Animations API for smooth control
        // Move from X=230 to X=570 (Distance = 340)
        
        let keyframes = [
            { transform: `translate(230px, ${startY}px)` },
            { transform: `translate(570px, ${startY}px)` }
        ];

        // For serial, we can add a slight curve effect by adjusting Y if we wanted, but straight line looks fine for the dashed wire
        
        const anim = group.animate(keyframes, {
            duration: 1000,
            delay: delayOffset,
            easing: 'linear',
            fill: 'forwards'
        });

        anim.onfinish = () => {
            // Optional: fade out after reaching destination
            group.animate([{ opacity: 1 }, { opacity: 0 }], {
                duration: 200,
                fill: 'forwards'
            });
        };
    }

    function finishAnimation() {
        // Remove code highlight
        const lineSend = document.getElementById('line-send');
        if (lineSend) lineSend.classList.remove('active');
        
        // Wait for last bit to fade out before showing result
        setTimeout(() => {
            receivedDataText.textContent = "'A' (01000001)";
            receivedDataText.style.color = '#4ade80';
            btnSend.disabled = false;
            isAnimating = false;
        }, 500);
    }
}


// ==========================================
// Quiz Logic
// ==========================================
const quizData = [
    {
        question: "การสื่อสารแบบใดที่ส่งข้อมูลทีละ 1 บิต เรียงต่อกันไปบนสายไฟเส้นเดียว?",
        options: [
            "Parallel (ขนาน)",
            "Serial (อนุกรม)",
            "Analog",
            "PWM"
        ],
        answer: 1
    },
    {
        question: "ข้อใดคือข้อได้เปรียบที่สำคัญที่สุดของการสื่อสารแบบ อนุกรม (Serial)?",
        options: [
            "ส่งข้อมูลได้เร็วกว่าแบบขนานในระยะทางสั้นๆ",
            "ใช้จำนวนสายไฟน้อยและเหมาะกับการส่งข้อมูลระยะไกล",
            "ไม่ต้องใช้สายกราวด์ (GND)",
            "ป้องกันไวรัสคอมพิวเตอร์ได้ดีกว่า"
        ],
        answer: 1
    },
    {
        question: "การสื่อสารแบบ Parallel (ขนาน) 8-bit ต้องใช้สายสัญญาณข้อมูลอย่างน้อยกี่เส้น?",
        options: [
            "1 เส้น",
            "2 เส้น",
            "4 เส้น",
            "8 เส้น"
        ],
        answer: 3
    },
    {
        question: "สัญลักษณ์ TX และ RX ย่อมาจากอะไร?",
        options: [
            "Transmit (ส่ง) และ Receive (รับ)",
            "Transfer (ย้าย) และ Reset (เริ่มใหม่)",
            "Text (ข้อความ) และ Read (อ่าน)",
            "Time (เวลา) และ Rate (อัตรา)"
        ],
        answer: 0
    },
    {
        question: "ในการต่อบอร์ด Arduino สองตัวเพื่อสื่อสารกันแบบ Serial จะต้องต่อสายไฟอย่างไร?",
        options: [
            "TX ต่อกับ TX, RX ต่อกับ RX",
            "TX ต่อกับ RX, RX ต่อกับ TX (สลับสายกัน)",
            "TX ต่อกับ GND, RX ต่อกับ 5V",
            "ใช้สายไฟเส้นเดียวต่อ TX เข้าด้วยกัน"
        ],
        answer: 1
    },
    {
        question: "คำสั่ง Serial.begin(9600); ตัวเลข 9600 หมายถึงอะไร?",
        options: [
            "ระยะทางสูงสุดในการส่งข้อมูล (เซนติเมตร)",
            "ขนาดความจุของข้อมูล (ไบต์)",
            "ความเร็วในการรับส่งข้อมูล (Baud rate : บิตต่อวินาที)",
            "หมายเลขของขาพอร์ต (Pin number)"
        ],
        answer: 2
    },
    {
        question: "หากต้องการส่งข้อความ 'Hello' ออกทางพอร์ต Serial ควรใช้คำสั่งใด?",
        options: [
            "Serial.read('Hello');",
            "Serial.begin('Hello');",
            "Serial.print('Hello');",
            "digitalWrite(1, 'Hello');"
        ],
        answer: 2
    },
    {
        question: "ข้อใดคือสาเหตุที่การสื่อสารแบบขนาน (Parallel) ไม่เหมาะกับการใช้งานระยะไกล?",
        options: [
            "สายไฟมีราคาแพงเกินไป",
            "สัญญาณไฟฟ้าอาจเกิดการรบกวนกันเอง (Crosstalk) และข้อมูลเดินทางถึงไม่พร้อมกัน",
            "ไมโครคอนโทรลเลอร์ไม่รองรับการส่งข้อมูลระยะไกล",
            "ถูกทุกข้อ"
        ],
        answer: 1
    },
    {
        question: "การส่งข้อมูลตัวอักษร 'A' (ขนาด 8-bit) ผ่านสาย Serial ต้องส่งสัญญาณกี่จังหวะ?",
        options: [
            "1 จังหวะ (ส่งทั้งหมดพร้อมกัน)",
            "4 จังหวะ",
            "8 จังหวะ (ทยอยส่งทีละบิต)",
            "ขึ้นอยู่กับความยาวของตัวอักษร"
        ],
        answer: 2
    },
    {
        question: "ขา Hardware Serial มาตรฐานของ Arduino UNO คือขาใด?",
        options: [
            "ขา A0 และ A1",
            "ขา D2 และ D3",
            "ขา D0 (RX) และ D1 (TX)",
            "ขา D13"
        ],
        answer: 2
    }
];

function initQuiz() {
    const container = document.getElementById('quiz-container');
    const submitBtn = document.getElementById('btn-submit-quiz');
    const retryBtn = document.getElementById('btn-retry-quiz');
    const resultDiv = document.getElementById('quiz-result');

    renderQuiz(container);

    submitBtn.addEventListener('click', () => {
        const score = calculateScore();
        showResult(score, quizData.length, resultDiv, submitBtn, retryBtn);
    });

    retryBtn.addEventListener('click', () => {
        resetQuiz(container, resultDiv, submitBtn, retryBtn);
    });
}

function renderQuiz(container) {
    container.innerHTML = ''; 
    quizData.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'quiz-question';
        
        const h4 = document.createElement('h4');
        h4.textContent = `ข้อ ${index + 1}: ${q.question}`;
        questionDiv.appendChild(h4);

        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'quiz-options';

        q.options.forEach((opt, optIndex) => {
            const label = document.createElement('label');
            label.className = 'quiz-option';
            label.setAttribute('data-question', index);
            label.setAttribute('data-option', optIndex);

            const input = document.createElement('input');
            input.type = 'radio';
            input.name = `question_${index}`;
            input.value = optIndex;

            const span = document.createElement('span');
            span.textContent = opt;

            label.appendChild(input);
            label.appendChild(span);
            optionsDiv.appendChild(label);
        });

        questionDiv.appendChild(optionsDiv);
        container.appendChild(questionDiv);
    });
}

function calculateScore() {
    let score = 0;
    quizData.forEach((q, index) => {
        const selected = document.querySelector(`input[name="question_${index}"]:checked`);
        const options = document.querySelectorAll(`label[data-question="${index}"]`);
        
        options.forEach(opt => opt.classList.remove('correct', 'incorrect'));

        if (selected) {
            const selectedValue = parseInt(selected.value);
            const selectedLabel = document.querySelector(`label[data-question="${index}"][data-option="${selectedValue}"]`);
            const correctLabel = document.querySelector(`label[data-question="${index}"][data-option="${q.answer}"]`);

            if (selectedValue === q.answer) {
                score++;
                selectedLabel.classList.add('correct');
            } else {
                selectedLabel.classList.add('incorrect');
                correctLabel.classList.add('correct');
            }
        } else {
             const correctLabel = document.querySelector(`label[data-question="${index}"][data-option="${q.answer}"]`);
             correctLabel.classList.add('correct');
        }
    });
    return score;
}

function showResult(score, total, resultDiv, submitBtn, retryBtn) {
    const inputs = document.querySelectorAll('input[type="radio"]');
    inputs.forEach(input => input.disabled = true);

    resultDiv.classList.remove('hidden');
    submitBtn.classList.add('hidden');

    if (score === total) {
        resultDiv.className = 'quiz-result success';
        resultDiv.innerHTML = `🎉 ยอดเยี่ยมมาก! คุณได้คะแนนเต็ม ${score} / ${total} คะแนน`;
        retryBtn.classList.add('hidden');
    } else {
        resultDiv.className = 'quiz-result fail';
        resultDiv.innerHTML = `คุณได้คะแนน ${score} / ${total} คะแนน<br>ลองทบทวนเนื้อหาแล้วทำใหม่อีกครั้งนะ!`;
        retryBtn.classList.remove('hidden');
    }
}

function resetQuiz(container, resultDiv, submitBtn, retryBtn) {
    renderQuiz(container);
    resultDiv.classList.add('hidden');
    resultDiv.innerHTML = '';
    submitBtn.classList.remove('hidden');
    retryBtn.classList.add('hidden');
}