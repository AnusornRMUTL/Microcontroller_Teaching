document.addEventListener('DOMContentLoaded', () => {
    initSimulator();
    renderQuizHTML(document.getElementById('quiz-container'));
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
    ctx.fillText('ได้ผ่านการทดสอบความรู้ โมดูล 5: การสื่อสารข้อมูลเบื้องต้น', canvas.width/2, 320);
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