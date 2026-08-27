document.addEventListener('DOMContentLoaded', () => {
    initSimulator();
    initQuiz();
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
const quizQuestions = [
    {
        question: "1. ขาใดบน Arduino Uno ที่ใช้สำหรับอ่านค่าสัญญาณ Analog โดยเฉพาะ?",
        options: ["ขา 0 ถึง 13", "ขา A0 ถึง A5", "ขาที่มีเครื่องหมาย ~", "ขา 5V และ GND"],
        correctIndex: 1
    },
    {
        question: "2. ฟังก์ชันใดที่ใช้สำหรับอ่านค่าแรงดันไฟฟ้าแบบต่อเนื่อง (Analog)?",
        options: ["digitalRead()", "analogWrite()", "analogRead()", "pinMode()"],
        correctIndex: 2
    },
    {
        question: "3. ระบบแปลงสัญญาณอนาล็อกเป็นดิจิทัล (ADC) ของ Arduino Uno มีความละเอียดกี่บิต?",
        options: ["8-bit", "10-bit", "12-bit", "16-bit"],
        correctIndex: 1
    },
    {
        question: "4. ค่าที่ได้จากการอ่านด้วย analogRead() บน Arduino Uno จะอยู่ในช่วงใด?",
        options: ["0 ถึง 100", "0 ถึง 255", "0 ถึง 1023", "0 ถึง 4095"],
        correctIndex: 2
    },
    {
        question: "5. หากป้อนแรงดันไฟฟ้า 2.5V เข้าที่ขา Analog จะอ่านค่าได้ประมาณเท่าใด? (สมมติไฟเลี้ยง 5V)",
        options: ["0", "255", "512", "1023"],
        correctIndex: 2
    },
    {
        question: "6. ตัวย่อ PWM ย่อมาจากคำว่าอะไร?",
        options: ["Pulse Width Modulation", "Power With Microcontroller", "Pin Wave Mapping", "Phase Wire Mode"],
        correctIndex: 0
    },
    {
        question: "7. สัญลักษณ์ใดที่บอกว่าขา Digital นั้นๆ สามารถสร้างสัญญาณ PWM ได้?",
        options: ["เครื่องหมาย +", "เครื่องหมาย -", "เครื่องหมาย ~", "ตัวอักษร A"],
        correctIndex: 2
    },
    {
        question: "8. ฟังก์ชันใดใช้สำหรับส่งสัญญาณ PWM (เช่น ใช้หรี่ไฟ LED)?",
        options: ["digitalWrite()", "analogWrite()", "analogRead()", "delay()"],
        correctIndex: 1
    },
    {
        question: "9. หากต้องการส่งสัญญาณ PWM เพื่อให้ LED สว่างครึ่งหนึ่ง (50%) ควรใช้ค่าประมาณเท่าใด?",
        options: ["50", "127", "255", "512"],
        correctIndex: 1
    },
    {
        question: "10. ฟังก์ชัน map(val, 0, 1023, 0, 255) มีหน้าที่อะไรในวงจรนี้?",
        options: ["หน่วงเวลาการทำงาน", "สุ่มตัวเลข", "แปลงค่าความละเอียดจาก 10-bit ให้เป็น 8-bit เพื่อส่ง PWM", "เปิดการเชื่อมต่อ Serial"],
        correctIndex: 2
    }
];

function initQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    const submitBtn = document.getElementById('submit-quiz-btn');
    const retryBtn = document.getElementById('retry-quiz-btn');
    const resultDiv = document.getElementById('quiz-result');

    function renderQuiz() {
        quizContainer.innerHTML = '';
        quizQuestions.forEach((q, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'quiz-item';
            
            const questionP = document.createElement('p');
            questionP.className = 'quiz-question';
            questionP.textContent = q.question;
            itemDiv.appendChild(questionP);

            const optionsDiv = document.createElement('div');
            optionsDiv.className = 'quiz-options';

            q.options.forEach((opt, optIndex) => {
                const label = document.createElement('label');
                label.className = 'quiz-option';
                
                const radio = document.createElement('input');
                radio.type = 'radio';
                radio.name = `question-${index}`;
                radio.value = optIndex;
                
                label.appendChild(radio);
                label.appendChild(document.createTextNode(opt));
                optionsDiv.appendChild(label);
            });

            itemDiv.appendChild(optionsDiv);
            quizContainer.appendChild(itemDiv);
        });
    }

    function calculateScore() {
        let score = 0;
        let allAnswered = true;

        quizQuestions.forEach((q, index) => {
            const selectedRadio = document.querySelector(`input[name="question-${index}"]:checked`);
            const options = document.querySelectorAll(`input[name="question-${index}"]`);
            
            if (!selectedRadio) {
                allAnswered = false;
            } else {
                const selectedVal = parseInt(selectedRadio.value, 10);
                
                // Highlight answers
                options.forEach(radio => {
                    radio.disabled = true; // lock options
                    const label = radio.parentElement;
                    if (parseInt(radio.value, 10) === q.correctIndex) {
                        label.classList.add('correct');
                    } else if (radio.checked && selectedVal !== q.correctIndex) {
                        label.classList.add('incorrect');
                    }
                });

                if (selectedVal === q.correctIndex) {
                    score++;
                }
            }
        });

        if (!allAnswered) {
            alert('กรุณาตอบคำถามให้ครบทุกข้อก่อนส่งคำตอบครับ');
            // Re-enable for them to finish
            const radios = document.querySelectorAll('input[type="radio"]');
            radios.forEach(r => r.disabled = false);
            return;
        }

        // Display results
        resultDiv.classList.remove('hidden');
        if (score === quizQuestions.length) {
            resultDiv.textContent = `🎉 ยินดีด้วย! คุณได้คะแนนเต็ม ${score}/${quizQuestions.length}`;
            resultDiv.className = 'quiz-result success';
            submitBtn.classList.add('hidden');
            retryBtn.classList.add('hidden'); // Perfect score, no need to retry
        } else {
            resultDiv.textContent = `คุณได้คะแนน ${score}/${quizQuestions.length} ลองพยายามใหม่อีกครั้งนะครับ!`;
            resultDiv.className = 'quiz-result failure';
            submitBtn.classList.add('hidden');
            retryBtn.classList.remove('hidden');
        }
    }

    function resetQuiz() {
        resultDiv.classList.add('hidden');
        submitBtn.classList.remove('hidden');
        retryBtn.classList.add('hidden');
        renderQuiz();
    }

    // Attach events
    submitBtn.addEventListener('click', calculateScore);
    retryBtn.addEventListener('click', resetQuiz);

    // Initial render
    renderQuiz();
}