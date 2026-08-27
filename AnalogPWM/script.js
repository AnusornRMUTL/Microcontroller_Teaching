document.addEventListener('DOMContentLoaded', () => {
    initSimulator();
    renderQuizHTML(document.getElementById('quiz-container'));
});

/* =========================================
   1. Simulator Logic
========================================= */
function initSimulator() {
    const potSlider = document.getElementById('pot-slider');
    const adcDisplay = document.getElementById('adc-value-display');
    const pwmDisplay = document.getElementById('pwm-value-display');
    const ledBulb = document.getElementById('led-bulb');
    const serialOutput = document.getElementById('serial-output');
    const clearTerminalBtn = document.getElementById('clear-terminal-btn');

    function updateSimulation() {
        // 1. Get raw ADC value from slider (0 - 1023)
        const adcValue = parseInt(potSlider.value, 10);
        
        // 2. Map to PWM (0 - 255)
        // Equivalent to map(adcValue, 0, 1023, 0, 255)
        const pwmValue = Math.floor((adcValue / 1023) * 255);
        
        // 3. Update Displays
        adcDisplay.textContent = adcValue;
        pwmDisplay.textContent = pwmValue;
        
        // Log to Serial Terminal
        const logLine = document.createElement('div');
        logLine.textContent = `ADC: ${adcValue} \t | \t PWM: ${pwmValue}`;
        serialOutput.appendChild(logLine);
        
        // Auto-scroll and limit lines to 50 to prevent DOM overload
        if (serialOutput.childNodes.length > 50) {
            serialOutput.removeChild(serialOutput.firstChild);
        }
        serialOutput.scrollTop = serialOutput.scrollHeight;
        
        // 4. Visual LED Update (using opacity / box-shadow)
        // Convert PWM to a ratio (0.0 to 1.0)
        const intensity = pwmValue / 255;
        
        if (intensity > 0) {
            // LED is ON (Yellow/PWM color)
            ledBulb.style.backgroundColor = `rgba(250, 204, 21, ${intensity})`;
            ledBulb.style.boxShadow = `0 0 ${10 + (intensity * 20)}px rgba(250, 204, 21, ${intensity})`;
        } else {
            // LED is OFF
            ledBulb.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            ledBulb.style.boxShadow = 'inset 0 0 10px rgba(0,0,0,0.5)';
        }
    }

    // Attach event listener
    potSlider.addEventListener('input', updateSimulation);
    
    // Initial run
    updateSimulation();
}

/* =========================================
   2. Quiz Logic
========================================= */
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
    ctx.fillText('ได้ผ่านการทดสอบความรู้ โมดูล 4: แอนะล็อกเอาต์พุต (PWM)', canvas.width/2, 320);
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