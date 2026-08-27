document.addEventListener('DOMContentLoaded', () => {
    initSimulator();
    initQuiz();
});

// ==========================================
// Simulator Logic
// ==========================================
function initSimulator() {
    const physicalBtn = document.getElementById('physical-btn');
    
    // SVG Elements
    const pushBtnTop = document.getElementById('push-btn-top');
    const ledBulb = document.getElementById('led-bulb');
    const wireLed = document.getElementById('wire-led');
    const wireBtn = document.getElementById('wire-btn');
    
    // Code Line Elements
    const lineRead = document.getElementById('line-read');
    const lineHigh = document.getElementById('line-high');
    const lineLow = document.getElementById('line-low');

    // Default State (LOW)
    let isPressed = false;
    updateState();

    // Mouse Events for the hidden HTML button overlaid on the SVG button
    physicalBtn.addEventListener('mousedown', () => {
        isPressed = true;
        updateState();
    });

    physicalBtn.addEventListener('mouseup', () => {
        isPressed = false;
        updateState();
    });

    // Touch support for mobile
    physicalBtn.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent scrolling
        isPressed = true;
        updateState();
    });

    physicalBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        isPressed = false;
        updateState();
    });

    function updateState() {
        // 1. Update Code Highlight (digitalRead)
        // Briefly flash the read line to show it's constantly looping, but for UI sake, keep it active
        lineRead.classList.add('active');

        if (isPressed) {
            // -- HIGH STATE --
            
            // SVG UI Update
            pushBtnTop.setAttribute('transform', 'translate(0, 5)'); // Press down visually
            pushBtnTop.setAttribute('fill', '#991b1b'); // Darker red when pressed
            
            wireBtn.setAttribute('stroke', '#4ade80'); // Wire turns green (HIGH)
            wireLed.setAttribute('stroke', '#4ade80'); // Wire to LED turns green
            
            ledBulb.setAttribute('fill', '#4ade80'); // LED turns green
            ledBulb.setAttribute('opacity', '1');
            ledBulb.setAttribute('filter', 'url(#glow-green)');

            // Code UI Update
            lineHigh.classList.add('active');
            lineLow.classList.remove('active');

        } else {
            // -- LOW STATE --
            
            // SVG UI Update
            pushBtnTop.setAttribute('transform', 'translate(0, 0)'); // Release up
            pushBtnTop.setAttribute('fill', '#ef4444'); // Normal red
            
            wireBtn.setAttribute('stroke', '#475569'); // Wire turns gray (LOW)
            wireLed.setAttribute('stroke', '#475569'); 
            
            ledBulb.setAttribute('fill', '#ef4444'); // LED turns red/off state
            ledBulb.setAttribute('opacity', '0.6');
            ledBulb.removeAttribute('filter');

            // Code UI Update
            lineHigh.classList.remove('active');
            lineLow.classList.add('active');
        }
    }
}


// ==========================================
// Quiz Logic
// ==========================================
const quizData = [
    {
        question: "คำสั่งใดใช้สำหรับกำหนดให้ขาพอร์ตทำงานเป็น อินพุต (Input)?",
        options: [
            "pinMode(pin, OUTPUT);",
            "pinMode(pin, INPUT);",
            "digitalWrite(pin, HIGH);",
            "digitalRead(pin);"
        ],
        answer: 1
    },
    {
        question: "หากต้องการสั่งให้หลอดไฟ LED ที่ต่อกับขา 13 สว่าง (จ่ายไฟ 5V) ต้องใช้คำสั่งใด?",
        options: [
            "digitalWrite(13, LOW);",
            "digitalRead(13);",
            "digitalWrite(13, HIGH);",
            "pinMode(13, HIGH);"
        ],
        answer: 2
    },
    {
        question: "คำสั่ง digitalRead() ทำหน้าที่อะไร?",
        options: [
            "ส่งกระแสไฟฟ้าออกไปยังอุปกรณ์",
            "อ่านค่าสถานะทางไฟฟ้าที่เข้ามาในขาพอร์ต (HIGH/LOW)",
            "กำหนดความเร็วในการสื่อสาร",
            "ล้างข้อมูลในหน่วยความจำ"
        ],
        answer: 1
    },
    {
        question: "เมื่อสถานะไฟฟ้าเป็น LOW หมายความว่าอย่างไร?",
        options: [
            "มีแรงดันไฟฟ้า 5V",
            "อุปกรณ์เกิดความเสียหาย",
            "ไม่มีแรงดันไฟฟ้า (0V)",
            "กำลังประมวลผล"
        ],
        answer: 2
    },
    {
        question: "ถ้าต้องการต่อสวิตช์ปุ่มกด (Push Button) เพื่อรับค่า ควรกำหนด pinMode เป็นอะไร?",
        options: [
            "OUTPUT",
            "HIGH",
            "LOW",
            "INPUT"
        ],
        answer: 3
    },
    {
        question: "ข้อใดคือการทำงานในส่วนของ void setup() ในโปรแกรม Arduino?",
        options: [
            "ทำงานวนลูปไปเรื่อยๆ จนกว่าจะถอดปลั๊ก",
            "ทำงานเพียงครั้งเดียวเมื่อเริ่มต้นโปรแกรม เพื่อตั้งค่าเริ่มต้น",
            "ใช้สำหรับประกาศตัวแปรเท่านั้น",
            "เป็นส่วนที่ใช้เก็บไลบรารี"
        ],
        answer: 1
    },
    {
        question: "จากวงจรจำลองด้านบน ขาใดถูกตั้งค่าให้เป็น OUTPUT?",
        options: [
            "ขา D2",
            "ขา D13",
            "ขา GND",
            "ขา 5V"
        ],
        answer: 1
    },
    {
        question: "หากไม่เขียนคำสั่ง pinMode() ก่อนใช้งาน digitalWrite() จะเกิดผลอย่างไร?",
        options: [
            "บอร์ด Arduino จะระเบิด",
            "โปรแกรมไม่สามารถคอมไพล์ผ่านได้",
            "อาจจ่ายกระแสไฟฟ้าได้ไม่เต็มที่หรือทำงานผิดพลาด (สถานะลอย)",
            "ไม่มีผลใดๆ ทำงานได้ปกติ 100%"
        ],
        answer: 2
    },
    {
        question: "GND บนบอร์ด Arduino ย่อมาจากอะไร และใช้ทำอะไร?",
        options: [
            "General - ใช้จ่ายไฟบวก",
            "Ground - ขั้วลบหรือสายดินเพื่อให้ครบวงจร",
            "Generator - ตัวผลิตกระแสไฟฟ้า",
            "Gate - ใช้เป็นสวิตช์"
        ],
        answer: 1
    },
    {
        question: "ตัวแปรประเภทใดที่เหมาะสำหรับการเก็บค่าสถานะของสวิตช์ (HIGH/LOW)?",
        options: [
            "int หรือ boolean",
            "String",
            "float",
            "char"
        ],
        answer: 0
    }
];

function initQuiz() {
    const container = document.getElementById('quiz-container');
    const submitBtn = document.getElementById('btn-submit-quiz');
    const retryBtn = document.getElementById('btn-retry-quiz');
    const resultDiv = document.getElementById('quiz-result');

    // Render Quiz
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
    container.innerHTML = ''; // Clear existing
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
        
        // Reset styles first in case of recalculation
        options.forEach(opt => {
            opt.classList.remove('correct', 'incorrect');
        });

        if (selected) {
            const selectedValue = parseInt(selected.value);
            const selectedLabel = document.querySelector(`label[data-question="${index}"][data-option="${selectedValue}"]`);
            const correctLabel = document.querySelector(`label[data-question="${index}"][data-option="${q.answer}"]`);

            if (selectedValue === q.answer) {
                score++;
                selectedLabel.classList.add('correct');
            } else {
                selectedLabel.classList.add('incorrect');
                // Optionally highlight the correct answer even if they got it wrong
                correctLabel.classList.add('correct');
            }
        } else {
             // If not answered, highlight the correct one to show them
             const correctLabel = document.querySelector(`label[data-question="${index}"][data-option="${q.answer}"]`);
             correctLabel.classList.add('correct');
        }
    });
    return score;
}

function showResult(score, total, resultDiv, submitBtn, retryBtn) {
    // Disable all inputs
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
    // Re-render fresh quiz
    renderQuiz(container);
    
    // Reset UI states
    resultDiv.classList.add('hidden');
    resultDiv.innerHTML = '';
    submitBtn.classList.remove('hidden');
    retryBtn.classList.add('hidden');
}