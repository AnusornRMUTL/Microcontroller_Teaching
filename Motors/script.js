/**
 * Motor Control Module - Interactive Simulation & Quiz Engine
 * Module 8: DC Motor (L298N), Stepper Motor (ULN2003), Servo Motor
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initDCMotorSimulator();
    initStepperSimulator();
    initServoSimulator();
    renderQuizHTML(document.getElementById('quiz-container'));
});

/* ==========================================================================
   1. Navigation & Scroll-Spy
   ========================================================================== */
function initNavigation() {
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 140;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                link.classList.remove('active');
                if (href === '#' + current) {
                    link.classList.add('active');
                }
            }
        });
    });

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            link.addEventListener('click', () => {
                navLinks.forEach(l => {
                    if (l.getAttribute('href') && l.getAttribute('href').startsWith('#')) {
                        l.classList.remove('active');
                    }
                });
                link.classList.add('active');
            });
        }
    });
}

/* ==========================================================================
   2. DC Motor & L298N Simulator
   ========================================================================== */
function initDCMotorSimulator() {
    let dcDirection = 'STOP'; // 'CW', 'CCW', 'STOP'
    let dcSpeed = 200; // 0 - 255
    let currentAngle = 0;
    let dcAnimFrame = null;

    const btnCW = document.getElementById('dc-btn-cw');
    const btnCCW = document.getElementById('dc-btn-ccw');
    const btnStop = document.getElementById('dc-btn-stop');
    const speedSlider = document.getElementById('dc-speed-slider');
    const speedDisplay = document.getElementById('dc-speed-display');
    const rpmDisplay = document.getElementById('dc-rpm-display');
    const dirBadge = document.getElementById('dc-dir-badge');
    const rotorPropeller = document.getElementById('dc-propeller');
    const in1Led = document.getElementById('dc-in1-led');
    const in2Led = document.getElementById('dc-in2-led');
    const enaLed = document.getElementById('dc-ena-led');
    const serialOut = document.getElementById('dc-serial-out');

    function updateDC() {
        // Calculate estimated RPM
        const maxRPM = 1200;
        let rpm = 0;
        if (dcDirection !== 'STOP' && dcSpeed > 20) {
            rpm = Math.round((dcSpeed / 255) * maxRPM);
        }

        speedDisplay.textContent = dcSpeed + ' (' + Math.round((dcSpeed / 255) * 100) + '%)';
        rpmDisplay.textContent = rpm + ' RPM';

        // Update direction badge & control button states
        btnCW.classList.toggle('active', dcDirection === 'CW');
        btnCCW.classList.toggle('active', dcDirection === 'CCW');
        btnStop.classList.toggle('active', dcDirection === 'STOP');

        if (dcDirection === 'CW') {
            dirBadge.textContent = 'หมุนตามเข็ม (CW / เดินหน้า)';
            dirBadge.style.color = '#4ade80';
            if (in1Led) in1Led.setAttribute('fill', '#22c55e');
            if (in2Led) in2Led.setAttribute('fill', '#475569');
            if (enaLed) enaLed.setAttribute('fill', dcSpeed > 0 ? '#facc15' : '#475569');
            logDCSerial('IN1: 1 (HIGH) | IN2: 0 (LOW) | ENA(PWM): ' + dcSpeed + ' -> CW (' + rpm + ' RPM)');
        } else if (dcDirection === 'CCW') {
            dirBadge.textContent = 'หมุนทวนเข็ม (CCW / ถอยหลัง)';
            dirBadge.style.color = '#38bdf8';
            if (in1Led) in1Led.setAttribute('fill', '#475569');
            if (in2Led) in2Led.setAttribute('fill', '#22c55e');
            if (enaLed) enaLed.setAttribute('fill', dcSpeed > 0 ? '#facc15' : '#475569');
            logDCSerial('IN1: 0 (LOW) | IN2: 1 (HIGH) | ENA(PWM): ' + dcSpeed + ' -> CCW (' + rpm + ' RPM)');
        } else {
            dirBadge.textContent = 'หยุด / เบรก (STOP / BRAKE)';
            dirBadge.style.color = '#f87171';
            if (in1Led) in1Led.setAttribute('fill', '#ef4444');
            if (in2Led) in2Led.setAttribute('fill', '#ef4444');
            if (enaLed) enaLed.setAttribute('fill', '#475569');
            logDCSerial('IN1: 1 (HIGH) | IN2: 1 (HIGH) | ENA: 0 -> BRAKE (0 RPM)');
        }
    }

    function animateDCRotor() {
        if (dcDirection !== 'STOP' && dcSpeed > 20) {
            const step = (dcSpeed / 255) * 18;
            if (dcDirection === 'CW') {
                currentAngle = (currentAngle + step) % 360;
            } else {
                currentAngle = (currentAngle - step + 360) % 360;
            }
            if (rotorPropeller) {
                rotorPropeller.setAttribute('transform', 'rotate(' + currentAngle + ' 515 135)');
            }
        }
        dcAnimFrame = requestAnimationFrame(animateDCRotor);
    }
    animateDCRotor();

    function logDCSerial(text) {
        if (!serialOut) return;
        const line = document.createElement('div');
        line.className = 'serial-line';
        line.textContent = '> ' + text;
        serialOut.appendChild(line);
        if (serialOut.childNodes.length > 30) {
            serialOut.removeChild(serialOut.firstChild);
        }
        serialOut.scrollTop = serialOut.scrollHeight;
    }

    btnCW.addEventListener('click', () => { dcDirection = 'CW'; updateDC(); });
    btnCCW.addEventListener('click', () => { dcDirection = 'CCW'; updateDC(); });
    btnStop.addEventListener('click', () => { dcDirection = 'STOP'; updateDC(); });

    speedSlider.addEventListener('input', () => {
        dcSpeed = parseInt(speedSlider.value, 10);
        updateDC();
    });

    updateDC();
}

/* ==========================================================================
   3. Stepper Motor & ULN2003 Simulator
   ========================================================================== */
function initStepperSimulator() {
    let mode = 'half'; // 'wave', 'full', 'half'
    let stepIndex = 0;
    let rotorAngle = 0;
    let isRunning = false;
    let runInterval = null;
    let stepSpeedMs = 80;

    const sequences = {
        wave: [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ],
        full: [
            [1, 1, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 1, 1],
            [1, 0, 0, 1]
        ],
        half: [
            [1, 0, 0, 0],
            [1, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 1],
            [0, 0, 0, 1],
            [1, 0, 0, 1]
        ]
    };

    const btnWave = document.getElementById('step-btn-wave');
    const btnFull = document.getElementById('step-btn-full');
    const btnHalf = document.getElementById('step-btn-half');
    const btnStepCW = document.getElementById('step-btn-cw');
    const btnStepCCW = document.getElementById('step-btn-ccw');
    const btnRun = document.getElementById('step-btn-run');
    const speedSlider = document.getElementById('step-speed-slider');
    const speedVal = document.getElementById('step-speed-display');
    const angleDisplay = document.getElementById('step-angle-display');
    const stepCountDisplay = document.getElementById('step-count-display');
    const stepRotor = document.getElementById('stepper-rotor');
    const serialOut = document.getElementById('step-serial-out');

    const ledElements = [
        document.getElementById('step-led-a'),
        document.getElementById('step-led-b'),
        document.getElementById('step-led-c'),
        document.getElementById('step-led-d')
    ];

    let totalStepsCount = 0;

    function applyStep(dir) {
        const seq = sequences[mode];
        if (dir === 'CW') {
            stepIndex = (stepIndex + 1) % seq.length;
            const delta = mode === 'half' ? 0.08789 : 0.17578; // Angle step scaled for display (~5.625° / 64)
            rotorAngle = (rotorAngle + delta * 20) % 360;
            totalStepsCount++;
        } else {
            stepIndex = (stepIndex - 1 + seq.length) % seq.length;
            const delta = mode === 'half' ? 0.08789 : 0.17578;
            rotorAngle = (rotorAngle - delta * 20 + 360) % 360;
            totalStepsCount--;
        }

        const currentSeq = seq[stepIndex];
        currentSeq.forEach((state, i) => {
            if (ledElements[i]) {
                ledElements[i].setAttribute('fill', state ? '#ef4444' : '#334155');
                ledElements[i].setAttribute('filter', state ? 'url(#glow-led)' : 'none');
            }
        });

        if (stepRotor) {
            stepRotor.setAttribute('transform', 'rotate(' + rotorAngle.toFixed(1) + ' 270 125)');
        }

        angleDisplay.textContent = Math.round(rotorAngle) + '°';
        stepCountDisplay.textContent = totalStepsCount;

        logStepSerial('Step [' + stepIndex + '] Phase: A=' + currentSeq[0] + ' B=' + currentSeq[1] + ' C=' + currentSeq[2] + ' D=' + currentSeq[3] + ' | Angle: ' + Math.round(rotorAngle) + '°');
    }

    function logStepSerial(text) {
        if (!serialOut) return;
        const line = document.createElement('div');
        line.className = 'serial-line';
        line.textContent = '> ' + text;
        serialOut.appendChild(line);
        if (serialOut.childNodes.length > 30) {
            serialOut.removeChild(serialOut.firstChild);
        }
        serialOut.scrollTop = serialOut.scrollHeight;
    }

    function setMode(m) {
        mode = m;
        stepIndex = 0;
        btnWave.classList.toggle('active', m === 'wave');
        btnFull.classList.toggle('active', m === 'full');
        btnHalf.classList.toggle('active', m === 'half');
        applyStep('CW');
    }

    btnWave.addEventListener('click', () => setMode('wave'));
    btnFull.addEventListener('click', () => setMode('full'));
    btnHalf.addEventListener('click', () => setMode('half'));

    btnStepCW.addEventListener('click', () => applyStep('CW'));
    btnStepCCW.addEventListener('click', () => applyStep('CCW'));

    btnRun.addEventListener('click', () => {
        isRunning = !isRunning;
        btnRun.textContent = isRunning ? '⏹️ หยุดหมุน (Stop)' : '▶️ หมุนต่อเนื่อง (Run CW)';
        btnRun.classList.toggle('btn-stop', isRunning);
        btnRun.classList.toggle('active', isRunning);

        if (isRunning) {
            runInterval = setInterval(() => applyStep('CW'), stepSpeedMs);
        } else {
            clearInterval(runInterval);
        }
    });

    speedSlider.addEventListener('input', () => {
        stepSpeedMs = 150 - parseInt(speedSlider.value, 10);
        speedVal.textContent = speedSlider.value;
        if (isRunning) {
            clearInterval(runInterval);
            runInterval = setInterval(() => applyStep('CW'), stepSpeedMs);
        }
    });

    setMode('half');
}

/* ==========================================================================
   4. Servo Motor (PWM) Simulator
   ========================================================================== */
function initServoSimulator() {
    let currentAngle = 90;
    let isSweeping = false;
    let sweepDir = 1;
    let sweepInterval = null;

    const angleSlider = document.getElementById('servo-slider');
    const angleDisplay = document.getElementById('servo-angle-display');
    const pulseDisplay = document.getElementById('servo-pulse-display');
    const dutyDisplay = document.getElementById('servo-duty-display');
    const servoHorn = document.getElementById('servo-horn');
    const btnSweep = document.getElementById('servo-btn-sweep');
    const quickBtns = document.querySelectorAll('[data-servo-angle]');
    const waveHighRect = document.getElementById('scope-wave-high');
    const serialOut = document.getElementById('servo-serial-out');

    function updateServo(angle) {
        currentAngle = parseInt(angle, 10);
        angleSlider.value = currentAngle;
        angleDisplay.textContent = currentAngle + '°';

        // Pulse width: 1.0ms (0°) to 2.0ms (180°)
        const pulseWidthMs = 1.0 + (currentAngle / 180.0) * 1.0;
        const pulseWidthUs = Math.round(pulseWidthMs * 1000);
        // Duty cycle: (pulseWidthMs / 20.0ms) * 100
        const dutyPercent = ((pulseWidthMs / 20.0) * 100).toFixed(1);

        pulseDisplay.textContent = pulseWidthMs.toFixed(2) + ' ms (' + pulseWidthUs + ' µs)';
        dutyDisplay.textContent = dutyPercent + '%';

        // Update SVG horn rotation (-90° to +90° relative to center 90°)
        const rotateDeg = currentAngle - 90;
        if (servoHorn) {
            servoHorn.setAttribute('transform', 'rotate(' + rotateDeg + ' 180 140)');
        }

        // Update simulated oscilloscope wave (HIGH pulse width scaled on 200px width for 20ms)
        // 20ms = 240px width -> 1ms = 12px
        if (waveHighRect) {
            const highWidth = Math.round(pulseWidthMs * 14);
            waveHighRect.setAttribute('width', highWidth);
        }

        // Update active class on quick buttons
        quickBtns.forEach(btn => {
            const btnAngle = parseInt(btn.getAttribute('data-servo-angle'), 10);
            btn.classList.toggle('active', btnAngle === currentAngle);
        });

        logServoSerial('myservo.write(' + currentAngle + '); // พัลส์ ' + pulseWidthMs.toFixed(2) + 'ms (Duty ' + dutyPercent + '%)');
    }

    function logServoSerial(text) {
        if (!serialOut) return;
        const line = document.createElement('div');
        line.className = 'serial-line';
        line.textContent = '> ' + text;
        serialOut.appendChild(line);
        if (serialOut.childNodes.length > 30) {
            serialOut.removeChild(serialOut.firstChild);
        }
        serialOut.scrollTop = serialOut.scrollHeight;
    }

    angleSlider.addEventListener('input', (e) => {
        if (isSweeping) stopSweep();
        updateServo(e.target.value);
    });

    quickBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (isSweeping) stopSweep();
            const targetAngle = btn.getAttribute('data-servo-angle');
            updateServo(targetAngle);
        });
    });

    function stopSweep() {
        isSweeping = false;
        clearInterval(sweepInterval);
        btnSweep.textContent = '🔄 กวาดมุมอัตโนมัติ (Sweep 0-180°)';
        btnSweep.classList.remove('btn-stop', 'active');
    }

    btnSweep.addEventListener('click', () => {
        isSweeping = !isSweeping;
        btnSweep.textContent = isSweeping ? '⏹️ หยุดกวาดมุม (Stop Sweep)' : '🔄 กวาดมุมอัตโนมัติ (Sweep 0-180°)';
        btnSweep.classList.toggle('btn-stop', isSweeping);
        btnSweep.classList.toggle('active', isSweeping);

        if (isSweeping) {
            sweepInterval = setInterval(() => {
                let nextAngle = currentAngle + sweepDir * 3;
                if (nextAngle >= 180) {
                    nextAngle = 180;
                    sweepDir = -1;
                } else if (nextAngle <= 0) {
                    nextAngle = 0;
                    sweepDir = 1;
                }
                updateServo(nextAngle);
            }, 30);
        } else {
            clearInterval(sweepInterval);
        }
    });

    updateServo(90);
}

/* ==========================================================================
   5. Quiz & Certificate Engine
   ========================================================================== */
const fallbackQuestions = [
  {
    "id": 1,
    "question": "เหตุใดเราจึงไม่สามารถต่อมอเตอร์ DC เข้ากับขา I/O ของไมโครคอนโทรลเลอร์ (เช่น Arduino Uno) โดยตรงได้?",
    "options": [
      "ขาไมโครคอนโทรลเลอร์จ่ายแรงดันไฟฟ้าสลับ (AC) แต่มอเตอร์ใช้ไฟกระแสตรง (DC)",
      "ขาไมโครคอนโทรลเลอร์จ่ายกระแสได้จำกัด (~20-40mA) ซึ่งน้อยเกินไปสำหรับมอเตอร์ และมี Back EMF ทำลายชิปได้",
      "ไมโครคอนโทรลเลอร์ไม่สามารถส่งสัญญาณ PWM ได้",
      "มอเตอร์จะหมุนด้วยความเร็วสูงเกินไปจนวงจรเสียหาย"
    ],
    "answer": 1,
    "reason": "ขาพอร์ตของ Arduino จ่ายกระแสได้สูงสุดเพียง 40mA (แนะนำไม่เกิน 20mA) ในขณะที่มอเตอร์ DC ต้องการกระแสหลักร้อยมิลลิแอมป์ถึงหลายแอมป์ นอกจากนี้ ขดลวดเหนี่ยวนำของมอเตอร์ยังสร้างแรงดันย้อนกลับ (Back EMF) ที่อาจทำลายไมโครคอนโทรลเลอร์ได้ จึงจำเป็นต้องใช้บอร์ดไดรเวอร์มอเตอร์"
  },
  {
    "id": 2,
    "question": "วงจร 'H-Bridge' ในโมดูลขับมอเตอร์ L298N มีหน้าที่สำคัญอะไร?",
    "options": [
      "เพิ่มแรงดันไฟฟ้าจาก 5V เป็น 12V อัตโนมัติ",
      "แปลงสัญญาณกระแสสลับเป็นกระแสตรง",
      "ควบคุมทิศทางการไหลของกระแสผ่านมอเตอร์ ทำให้สามารถสั่งหมุนตามเข็ม (CW) หรือทวนเข็ม (CCW) ได้",
      "ทำหน้าที่เป็นเซนเซอร์วัดความเร็วรอบมอเตอร์"
    ],
    "answer": 2,
    "reason": "วงจร H-Bridge ประกอบด้วยสวิตช์อิเล็กทรอนิกส์ 4 ตัว จัดเรียงคล้ายรูปตัว 'H' ทำหน้าที่สลับขั้วไฟฟ้าบวกและลบที่จ่ายให้มอเตอร์ ทำให้มอเตอร์สามารถหมุนเดินหน้า ถอยหลัง หรือหยุดเบรกได้"
  },
  {
    "id": 3,
    "question": "ในการควบคุมมอเตอร์ DC ด้วยโมดูล L298N ขาใดใช้สำหรับควบคุม 'ความเร็วรอบ' ด้วยสัญญาณ PWM?",
    "options": [
      "ขา IN1",
      "ขา IN2",
      "ขา ENA (Enable A)",
      "ขา OUT1"
    ],
    "answer": 2,
    "reason": "ขา ENA (Enable A) ใช้เปิด/ปิดการทำงานของวงจรขับช่อง A หากป้อนสัญญาณ PWM ผ่านคำสั่ง analogWrite() จะทำให้สามารถควบคุมค่าเฉลี่ยของแรงดันที่จ่ายให้มอเตอร์ ซึ่งส่งผลให้ความเร็วรอบเปลี่ยนแปลงได้"
  },
  {
    "id": 4,
    "question": "หากต้องการให้มอเตอร์ DC ที่ต่อกับช่อง A ของ L298N 'หยุดหมุนแบบเบรก (Brake/Stop)' ต้องกำหนดสถานะขา IN1 และ IN2 อย่างไร?",
    "options": [
      "IN1 = HIGH, IN2 = LOW",
      "IN1 = LOW, IN2 = HIGH",
      "IN1 = HIGH, IN2 = HIGH (หรือ LOW ทั้งคู่)",
      "IN1 = PWM, IN2 = 5V"
    ],
    "answer": 2,
    "reason": "เมื่อป้อนสัญญาณลอจิกเดียวกันให้ทั้ง IN1 และ IN2 (HIGH ทั้งคู่ หรือ LOW ทั้งคู่) ขั้วทั้งสองของมอเตอร์จะมีความต่างศักย์เป็น 0 โวลต์ ทำให้เกิดการลัดวงจรขั้วมอเตอร์ผ่านทรานซิสเตอร์ (Dynamic Braking) มอเตอร์จะหยุดอย่างรวดเร็ว"
  },
  {
    "id": 5,
    "question": "ไดโอด (Flyback Diode) ที่ติดตั้งอยู่รอบชิป L298N มีบทบาทสำคัญอย่างไร?",
    "options": [
      "แสดงสถานะไฟเลี้ยงว่ามอเตอร์กำลังทำงาน",
      "ป้องกันแรงดันเหนี่ยวนำย้อนกลับ (Back EMF / Inductive Kickback) ไม่ให้ทำลายทรานซิสเตอร์ภายในชิป",
      "ช่วยประหยัดพลังงานแบตเตอรี่",
      "เพิ่มแรงบิดของมอเตอร์ในรอบต่ำ"
    ],
    "answer": 1,
    "reason": "เมื่อมอเตอร์หยุดหมุนหรือเปลี่ยนทิศทาง สนามแม่เหล็กในขดลวดจะยุบตัวลงอย่างรวดเร็วและสร้างแรงดันไฟฟ้าย้อนกลับสูงมาก (Back EMF) ไดโอดป้องกัน (Flyback / Freewheeling Diodes) จะช่วยระบายกระแสเหนี่ยวนำนี้ลงกราวด์ เพื่อปกป้องชิปไดรเวอร์"
  },
  {
    "id": 6,
    "question": "ไอซี ULN2003 ที่นิยมใช้ขับสเต็ปเปอร์มอเตอร์ 28BYJ-48 มีโครงสร้างภายในเป็นวงจรแบบใด?",
    "options": [
      "วงจร Operational Amplifier (Op-Amp)",
      "วงจรดาร์ลิงตัน ทรานซิสเตอร์ (Darlington Transistor Array) จำนวน 7 ช่อง",
      "วงจรไมโครคอนโทรลเลอร์ 8 บิต",
      "วงจรแปลงสัญญาณแอนะล็อกเป็นดิจิทัล (ADC)"
    ],
    "answer": 1,
    "reason": "ULN2003 คือไอซี Darlington Transistor Array 7 ช่อง แต่ละช่องใช้ทรานซิสเตอร์ต่อร่วมกัน 2 ตัวเพื่อให้อัตราขยายกระแสสูงมาก เหมาะกับการใช้สัญญาณระดับมิลลิแอมป์จาก Arduino ไปสั่งเปิด/ปิดกระแสระดับร้อยมิลลิแอมป์ของขดลวดสเต็ปเปอร์มอเตอร์"
  },
  {
    "id": 7,
    "question": "สเต็ปเปอร์มอเตอร์รุ่น 28BYJ-48 เป็นมอเตอร์ประเภทใด และมีสายไฟกี่เส้น?",
    "options": [
      "Bipolar Stepper Motor มีสายไฟ 4 เส้น",
      "Unipolar Stepper Motor มีสายไฟ 5 เส้น (4 ขดลวด + 1 ขั้วไฟร่วม VCC)",
      "Brushless DC Motor มีสายไฟ 3 เส้น",
      "Coreless DC Motor มีสายไฟ 2 เส้น"
    ],
    "answer": 1,
    "reason": "28BYJ-48 เป็น Unipolar Stepper Motor มีสาย 5 เส้น ได้แก่ สายไฟเลี้ยงร่วม (Common VCC สีแดง) และสายควบคุมขดลวดเฟส A, B, C, D (สีส้ม, เหลือง, ชมพู, น้ำเงิน)"
  },
  {
    "id": 8,
    "question": "การขับสเต็ปเปอร์มอเตอร์แบบ 'Half-Step Drive (1-2 Phase Excitation)' มีข้อดีเด่นอย่างไรเมื่อเทียบกับ Full-Step?",
    "options": [
      "ใช้พลังงานไฟฟ้าน้อยกว่าครึ่งหนึ่ง",
      "เพิ่มความละเอียดในการหมุนเป็น 2 เท่า (จำนวนสเต็ปต่อรอบเพิ่มขึ้นเป็น 4096 สเต็ป) และเคลื่อนที่นุ่มนวลขึ้น",
      "หมุนได้เร็วกว่ามอเตอร์ DC 10 เท่า",
      "ไม่ต้องใช้สายไฟเลี้ยงร่วม (Common Wire)"
    ],
    "answer": 1,
    "reason": "Half-Step จะสลับการจ่ายไฟระหว่าง 1 เฟส และ 2 เฟส (เช่น A -> AB -> B -> BC -> C ...) ทำให้เกิดจุดหยุดย่อยกึ่งกลางระหว่างขั้วแม่เหล็ก ความละเอียดจึงเพิ่มเป็น 2 เท่า (จาก 2048 ก้าวต่อรอบเกียร์ กลายเป็น 4096 ก้าว) ส่งผลให้การหมุนนุ่มนวลและลดการสั่นกระตุก"
  },
  {
    "id": 9,
    "question": "สเต็ปเปอร์มอเตอร์ 28BYJ-48 มีอัตราทดเกียร์ภายใน (Gear Reduction Ratio) ประมาณเท่าใด?",
    "options": [
      "1:1 (ไม่มีเกียร์ทด)",
      "10:1",
      "64:1",
      "1000:1"
    ],
    "answer": 2,
    "reason": "28BYJ-48 มีชุดเฟืองทดภายในอัตราส่วนประมาณ 64:1 (ทางทฤษฎีคือ 63.68395:1) ทำให้มอเตอร์มีแรงบิด (Torque) สูงขึ้นมาก แม้ตัวมอเตอร์จะมีขนาดเล็ก เหมาะสำหรับงานปรับทิศทาง เช่น บานสวิงเครื่องปรับอากาศหรือกล้องวงจรปิด"
  },
  {
    "id": 10,
    "question": "ข้อใดคือคุณสมบัติเด่นของ 'สเต็ปเปอร์มอเตอร์ (Stepper Motor)' ที่เหนือกว่ามอเตอร์ DC ธรรมดา?",
    "options": [
      "หมุนด้วยความเร็วรอบสูงกว่ามาก (หลายหมื่นรอบต่อนาที)",
      "ควบคุมตำแหน่งและมุมการหมุนได้อย่างแม่นยำในระบบวงเปิด (Open-loop Control) โดยไม่ต้องใช้เซนเซอร์ป้อนกลับ",
      "ราคาถูกกว่ามอเตอร์ DC ทุกประเภท",
      "ใช้สายไฟเพียง 2 เส้นเหมือนกัน"
    ],
    "answer": 1,
    "reason": "สเต็ปเปอร์มอเตอร์สามารถควบคุมตำแหน่ง องศา และจำนวนรอบได้อย่างแม่นยำตามจำนวนพัลส์สัญญาณที่ป้อนเข้าไป โดยไม่ต้องอาศัยเอ็นโค้ดเดอร์หรือเซนเซอร์วัดมุมป้อนกลับ (Open-loop Positioning)"
  },
  {
    "id": 11,
    "question": "เซอร์โวมอเตอร์มาตรฐาน (RC Servo เช่น SG90) ควบคุมมุมการหมุนด้วยสัญญาณประเภทใด?",
    "options": [
      "สัญญาณแรงดันไฟตรงปรับค่าได้ 0 ถึง 5V (Analog Voltage)",
      "สัญญาณพัลส์ PWM ความถี่ 50Hz (คาบเวลา 20ms) โดยความกว้างของพัลส์ (Pulse Width) ระบุตำแหน่งมุม",
      "สัญญาณดิจิทัลแบบ I2C ผ่านสาย SDA/SCL",
      "สัญญาณความถี่สูงระดับเมกะเฮิรตซ์ (MHz)"
    ],
    "answer": 1,
    "reason": "RC Servo ทั่วไปใช้สัญญาณ PWM ความถี่มาตรฐาน 50Hz (คาบเวลา 20 ms) โดยความกว้างพัลส์ช่วง HIGH จะเป็นตัวกำหนดองศา เช่น 1.0ms = 0°, 1.5ms = 90°, และ 2.0ms = 180°"
  },
  {
    "id": 12,
    "question": "สัญญาณพัลส์ความกว้างเท่าใดที่สั่งให้เซอร์โวมอเตอร์เคลื่อนที่ไปยัง 'ตำแหน่งกึ่งกลาง (90 องศา)'?",
    "options": [
      "0.5 ms",
      "1.0 ms",
      "1.5 ms",
      "2.5 ms"
    ],
    "answer": 2,
    "reason": "พัลส์ช่วงกว้าง 1.5 มิลลิวินาที (1.5 ms) เป็นค่ามาตรฐานที่สั่งให้เซอร์โวมอเตอร์หมุนมาอยู่ตำแหน่งกึ่งกลาง (Neutral Position หรือ 90 องศา)"
  },
  {
    "id": 13,
    "question": "โครงสร้างภายในของเซอร์โวมอเตอร์ RC ประกอบด้วยส่วนประกอบสำคัญใดบ้าง?",
    "options": [
      "มอเตอร์ DC ขนาดเล็ก, ชุดเกียร์ทดรอบ, โพเทนชิโอมิเตอร์ตรวจจับมุม, และวงจรควบคุมเปรียบเทียบ",
      "ขดลวดแม่เหล็ก 4 เฟสและแม่เหล็กถาวรเท่านั้น",
      "ทรานซิสเตอร์ L298N และตัวเก็บประจุ",
      "ลูกสูบและวาล์วไฮดรอลิก"
    ],
    "answer": 0,
    "reason": "เซอร์โวมอเตอร์เป็นระบบ Closed-loop ภายในประกอบด้วย มอเตอร์ DC จิ๋ว, เฟืองเกียร์ทดเพื่อเพิ่มแรงบิด, โพเทนชิโอมิเตอร์ต่อแกนหมุนเพื่อวัดตำแหน่งจริง และวงจรคอนโทรลเลอร์ที่เปรียบเทียบสัญญาณคำสั่งกับตำแหน่งจริงเพื่อขับมอเตอร์ให้ไปหยุดที่มุมเป้าหมาย"
  },
  {
    "id": 14,
    "question": "ในภาษา C/C++ สำหรับ Arduino ฟังก์ชันใดในไลบรารี <Servo.h> ใช้สำหรับสั่งให้เซอร์โวมอเตอร์หมุนไปยังมุมที่ต้องการ?",
    "options": [
      "myservo.attach(pin);",
      "myservo.write(angle);",
      "analogWrite(pin, angle);",
      "digitalWrite(pin, HIGH);"
    ],
    "answer": 1,
    "reason": "ฟังก์ชัน myservo.write(angle); ใช้กำหนดมุมของเซอร์โวมอเตอร์โดยรับค่าเป็นจำนวนเต็มตั้งแต่ 0 ถึง 180 องศา ไลบรารีจะคำนวณและสร้างพัลส์ความกว้าง 1-2 ms ส่งออกทางขาที่กำหนดโดยอัตโนมัติ"
  },
  {
    "id": 15,
    "question": "สายไฟ 3 เส้นของเซอร์โวมอเตอร์มาตรฐาน (เช่น SG90) ประกอบด้วยสายอะไรบ้าง?",
    "options": [
      "สายสัญญาณ (ส้ม/เหลือง), ไฟเลี้ยงบวก VCC (แดง), และกราวด์ GND (น้ำตาล/ดำ)",
      "สายไฟบ้าน L, N, และ G",
      "สายบัส I2C SDA, SCL, และ VCC",
      "สายไฟบวก 12V, 5V, และ 3.3V"
    ],
    "answer": 0,
    "reason": "เซอร์โวมอเตอร์ RC มาตรฐานมีสาย 3 เส้น: สีน้ำตาลหรือสีดำคือ GND, สีแดงคือ VCC (4.8V - 6V), และสีส้มหรือสีเหลืองคือสายสัญญาณ PWM (Signal)"
  },
  {
    "id": 16,
    "question": "หากสั่งงานเซอร์โวมอเตอร์หลายตัวพร้อมกัน หรือเซอร์โวรับน้ำหนักมาก ทำไมบอร์ด Arduino อาจเกิดอาการ Reset ตัวเอง (บราวเอาต์)?",
    "options": [
      "เพราะความถี่ PWM ของ Arduino ต่ำเกินไป",
      "มอเตอร์ดึงกระแสไฟสูงขณะเคลื่อนที่ ทำให้แรงดันไฟเลี้ยง 5V ของบอร์ดตกชั่วขณะ (Voltage Drop)",
      "เพราะไลบรารี Servo.h ขัดแย้งกับหน่วยความจำ RAM",
      "มอเตอร์ส่งสัญญาณ Bluetooth มารบกวน CPU"
    ],
    "answer": 1,
    "reason": "เซอร์โวมอเตอร์ขณะสตาร์ทหรือรับแรงต้านจะดึงกระแสกระชาก (Stall Current) สูงถึง 500mA - 1A ขึ้นไป หากใช้ไฟ 5V จากบอร์ด Arduino โดยตรง แรงดันจะตกจนไมโครคอนโทรลเลอร์รีเซ็ต วิธีแก้คือต้องใช้แหล่งจ่ายไฟภายนอก (External Power) และต่อกราวด์ร่วมกัน (Common Ground)"
  },
  {
    "id": 17,
    "question": "ในการต่อแหล่งจ่ายไฟภายนอก (External Power) ให้กับมอเตอร์หรือเซอร์โว สิ่งที่ 'ต้องทำเสมอ' เพื่อให้ระบบทำงานถูกต้องคือข้อใด?",
    "options": [
      "ต่อขั้วบวก (+) ของแบตเตอรี่เข้าขา 5V ของ Arduino",
      "ต่อกราวด์ (GND) ของแหล่งจ่ายไฟภายนอกเข้ากับกราวด์ (GND) ของ Arduino เพื่อให้มีระดับแรงดันอ้างอิงเดียวกัน",
      "ถอดสาย USB ออกขณะใช้งาน",
      "ใช้ตัวต้านทาน 10k โอห์ม ต่อคร่อมขั้วแบตเตอรี่"
    ],
    "answer": 1,
    "reason": "การต่อกราวด์ร่วม (Common Ground) ระหว่างแหล่งจ่ายไฟมอเตอร์และบอร์ดไมโครคอนโทรลเลอร์เป็นสิ่งจำเป็น เพื่อให้สัญญาณลอจิก (Signal/PWM) มีจุดอ้างอิงแรงดันศูนย์โวลต์เดียวกัน วงจรจึงจะส่งผ่านสัญญาณคำสั่งได้อย่างถูกต้อง"
  },
  {
    "id": 18,
    "question": "หากต้องการประยุกต์ใช้มอเตอร์ใน 'เครื่องพิมพ์ 3 มิติ (3D Printer)' หรือ 'เครื่องแกะสลัก CNC' ควรเลือกใช้มอเตอร์ชนิดใดเป็นหลัก?",
    "options": [
      "DC Motor ธรรมดา",
      "Stepper Motor",
      "Servo Motor 180 องศา",
      "Vibration Motor"
    ],
    "answer": 1,
    "reason": "3D Printer และ CNC ต้องเคลื่อนที่แกน X, Y, Z ด้วยความละเอียดสูงในระดับไมโครมิเตอร์ และต้องหยุดค้างตำแหน่ง (Holding Torque) ได้อย่างแม่นยำ สเต็ปเปอร์มอเตอร์จึงเป็นตัวเลือกที่เหมาะสมที่สุด"
  },
  {
    "id": 19,
    "question": "หากต้องการสร้าง 'ระบบเปิด-ปิดไม้กั้นลานจอดรถ' หรือ 'แขนกลจับชิ้นงานมุม 0-180 องศา' มอเตอร์ชนิดใดเหมาะสมที่สุด?",
    "options": [
      "DC Motor",
      "Stepper Motor",
      "Servo Motor",
      "Brushless Motor"
    ],
    "answer": 2,
    "reason": "เซอร์โวมอเตอร์ถูกออกแบบมาเพื่อควบคุมตำแหน่งเชิงมุม (0-180 องศา) โดยเฉพาะ มีชุดเกียร์ทดแรงบิดสูงในตัว และสั่งงานง่ายด้วยคำสั่งระบุมุมเพียงคำสั่งเดียว เหมาะกับไม้กั้น แขนกล หรือปีกเครื่องบินบังคับ"
  },
  {
    "id": 20,
    "question": "หากต้องการสร้าง 'พัดลมระบายความร้อน' หรือ 'รถของเล่นที่วิ่งเร็วต่อเนื่อง' มอเตอร์ชนิดใดเหมาะสมและคุ้มค่าที่สุด?",
    "options": [
      "DC Motor",
      "Stepper Motor",
      "Servo Motor",
      "Linear Actuator"
    ],
    "answer": 0,
    "reason": "มอเตอร์ไฟฟ้ากระแสตรง (DC Motor) เหมาะกับงานที่ต้องการการหมุนต่อเนื่องด้วยความเร็วรอบสูง มีโครงสร้างเรียบง่าย ราคาประหยัด และปรับความเร็วได้ง่ายด้วยการปรับแรงดันหรือ PWM"
  },
  {
    "id": 21,
    "question": "ในโมดูล L298N หากต้องการจ่ายไฟให้มอเตอร์ขนาด 12V ควรต่อไฟเข้าที่ช่องใดของเทอร์มินอลบล็อก?",
    "options": [
      "ช่อง 5V",
      "ช่อง 12V (Power Input) และ GND",
      "ช่อง ENA",
      "ช่อง OUT1"
    ],
    "answer": 1,
    "reason": "เทอร์มินอล 3 ช่องของ L298N ได้แก่ ช่อง 12V (สำหรับต่อไฟเลี้ยงมอเตอร์ 7-35V), ช่อง GND (กราวด์), และช่อง 5V (ไฟเลี้ยงวงจรลอจิก หรือไฟออก 5V หากใส่จัมเปอร์ 5V-EN)"
  },
  {
    "id": 22,
    "question": "คำสั่ง analogWrite(ENA, 127); บน Arduino Uno สั่งให้มอเตอร์ทำงานด้วย Duty Cycle ประมาณเท่าใด?",
    "options": [
      "0%",
      "25%",
      "50%",
      "100%"
    ],
    "answer": 2,
    "reason": "ฟังก์ชัน analogWrite() ของ Arduino รับค่าความละเอียด 8 บิต คือ 0 ถึง 255 ดังนั้นค่า 127 จึงคิดเป็น (127 / 255) x 100 ≈ 50% ของ Duty Cycle"
  },
  {
    "id": 23,
    "question": "การทำงานของสเต็ปเปอร์มอเตอร์แบบ 'Wave Drive' (1-Phase On) มีลำดับการกระตุ้นขดลวดอย่างไร?",
    "options": [
      "เปิดขดลวด A -> B -> C -> D ทีละขดลวดตามลำดับ",
      "เปิดขดลวด AB -> BC -> CD -> DA พร้อมกันทีละสองขด",
      "เปิดขดลวดทุกขดพร้อมกัน",
      "เปิดขดลวดแบบสุ่ม"
    ],
    "answer": 0,
    "reason": "Wave Drive คือการจ่ายไฟให้ขดลวดแม่เหล็กทีละ 1 เฟสเรียงลำดับ เช่น เฟส 1 ON -> เฟส 2 ON -> เฟส 3 ON -> เฟส 4 ON ซึ่งกินกระแสน้อยที่สุด แต่ให้แรงบิดต่ำกว่าแบบ Full-step"
  },
  {
    "id": 24,
    "question": "คำว่า 'Holding Torque' ของสเต็ปเปอร์มอเตอร์หมายถึงอะไร?",
    "options": [
      "แรงบิดสูงสุดขณะมอเตอร์หมุนด้วยความเร็วสูง",
      "แรงบิดในการตรึงหรือล็อคแกนมอเตอร์ให้อยู่กับที่เมื่อจ่ายไฟเลี้ยงค้างไว้ที่ขดลวด",
      "แรงบิดเมื่อถอดปลั๊กไฟออก",
      "แรงเสียดทานของลูกปืนมอเตอร์"
    ],
    "answer": 1,
    "reason": "Holding Torque คือแรงบิดที่มอเตอร์สามารถต้านทานแรงภายนอกเพื่อล็อคตำแหน่งเดิมไว้ได้เมื่อจ่ายไฟค้างไว้ที่ขดลวด ถือเป็นจุดเด่นสำคัญของสเต็ปเปอร์มอเตอร์ที่ทำให้แกนชิ้นงานไม่เลื่อนหลุดตำแหน่ง"
  },
  {
    "id": 25,
    "question": "เหตุใดการใช้ไลบรารี <Servo.h> บน Arduino Uno จึงทำให้ฟังก์ชัน analogWrite() ที่ขา 9 และ 10 ไม่สามารถใช้งาน PWM ได้?",
    "options": [
      "เพราะขา 9 และ 10 ชำรุดเมื่อเสียบเซอร์โว",
      "เพราะไลบรารี Servo.h ยึดการใช้งานฮาร์ดแวร์ Timer1 ภายในไมโครคอนโทรลเลอร์เพื่อสร้างสัญญาณพัลส์ที่มีความแม่นยำสูง",
      "เพราะเซอร์โวมอเตอร์กินกระแสมากเกินไป",
      "เพราะความถี่สัญญาณ Servo ชนกับความถี่คริสตัล 16MHz"
    ],
    "answer": 1,
    "reason": "ไลบรารี Servo.h บนบอร์ดที่ใช้ชิป ATmega328P (เช่น Arduino Uno) จำเป็นต้องใช้ฮาร์ดแวร์ไทเมอร์ Timer1 ในการนับเวลาพัลส์ระดับไมโครวินาที ซึ่ง Timer1 นี้ควบคุม PWM ขา 9 และ 10 ส่งผลให้ขา 9 และ 10 สูญเสียความสามารถในการทำ analogWrite() ตามปกติ"
  },
  {
    "id": 26,
    "question": "เซอร์โวมอเตอร์แบบหมุนต่อเนื่อง (Continuous Rotation Servo 360°) แตกต่างจากเซอร์โว 180° อย่างไร?",
    "options": [
      "ใช้สายไฟ 4 เส้นแทน 3 เส้น",
      "ถูกดัดแปลงถอดเขี้ยวล็อคทางกลและตัดต่อโพเทนชิโอมิเตอร์ ทำให้สัญญาณ PWM ควบคุม 'ความเร็วและทิศทาง' แทนการควบคุมมุม",
      "สามารถปรับแรงดันไฟเลี้ยงได้ถึง 220V",
      "ไม่มีมอเตอร์อยู่ภายใน"
    ],
    "answer": 1,
    "reason": "เซอร์โวแบบหมุนต่อเนื่อง (360 องศา) ถูกตัดเขี้ยวล็อคเฟืองออก สัญญาณพัลส์ 1.5ms จะทำให้มอเตอร์หยุดหมุน, พัลส์ < 1.5ms จะหมุนทวนเข็มตามความเร็ว, และพัลส์ > 1.5ms จะหมุนตามเข็มตามความเร็ว นิยมใช้ทำล้อหุ่นยนต์ขนาดเล็ก"
  },
  {
    "id": 27,
    "question": "หากมอเตอร์ DC หมุนผิดทิศทาง (สั่งเดินหน้าแต่กลับหมุนถอยหลัง) วิธีแก้ไขที่ง่ายและถูกต้องทางฮาร์ดแวร์คือข้อใด?",
    "options": [
      "เปลี่ยนชิป L298N ตัวใหม่",
      "สลับสายไฟ 2 เส้นที่ต่อเข้าขั้วมอเตอร์ (+ และ -) ที่ช่อง OUT1 และ OUT2",
      "เพิ่มแรงดันไฟฟ้าเป็น 2 เท่า",
      "ต่อสายกราวด์เข้ากับขาไฟบวก"
    ],
    "answer": 1,
    "reason": "ทิศทางการหมุนของมอเตอร์ DC กำหนดตามทิศทางการไหลของกระแสไฟฟ้า การสลับสายไฟขั้วบวกและขั้วลบที่เข้ามอเตอร์จะกลับทิศทางการหมุนทันที หรือสามารถแก้ไขในซอฟต์แวร์โดยสลับลอจิก IN1 และ IN2"
  },
  {
    "id": 28,
    "question": "ไฟ LED 4 ดวง (A, B, C, D) บนบอร์ดโมดูล ULN2003 มีไว้เพื่อวัตถุประสงค์ใด?",
    "options": [
      "ส่องสว่างเพื่อความสวยงาม",
      "แสดงสถานะการจ่ายสัญญาณลอจิก HIGH ไปกระตุ้นขดลวดแต่ละเฟสของสเต็ปเปอร์มอเตอร์",
      "แสดงปริมาณแบตเตอรี่คงเหลือ",
      "เตือนเมื่ออุณหภูมิไอซีสูงเกินไป"
    ],
    "answer": 1,
    "reason": "LED บนบอร์ดโมดูล ULN2003 ต่ออยู่กับเอาต์พุตของแต่ละแชนเนล เมื่อไมโครคอนโทรลเลอร์ส่งสัญญาณไปกระตุ้นขดลวดเฟสใด LED ดวงนั้นจะสว่างขึ้น ช่วยให้ผู้เรียนมองเห็นลำดับขั้นตอน (Stepping Sequence) ได้อย่างชัดเจน"
  },
  {
    "id": 29,
    "question": "ในการทดลองหมุนกวาดมุมของเซอร์โวมอเตอร์ (Servo Sweep) จาก 0 ถึง 180 องศา เหตุใดจึงต้องใส่คำสั่ง delay(15); ในแต่ละก้าวของลูป for?",
    "options": [
      "เพื่อให้ CPU ได้พักระบายความร้อน",
      "เพื่อให้เวลาแกนและเฟืองเกียร์ของเซอร์โวมอเตอร์เคลื่อนที่ไปยังตำแหน่งองศาใหม่ได้ทัน",
      "เพื่อป้องกันไม่ให้บัฟเฟอร์หน่วยความจำล้น",
      "เป็นข้อบังคับของไวยากรณ์ภาษา C"
    ],
    "answer": 1,
    "reason": "เซอร์โวมอเตอร์เป็นอุปกรณ์เชิงกล (Mechanical Device) มีความเร็วในการหมุนจำกัด (ประมาณ 0.1 วินาที / 60 องศา) การใส่ delay เล็กน้อยจะเปิดโอกาสให้ชุดเกียร์และแกนหมุนเคลื่อนที่ไปถึงตำแหน่งเป้าหมายก่อนส่งคำสั่งมุมถัดไป"
  },
  {
    "id": 30,
    "question": "สรุปเปรียบเทียบการเลือกใช้งานมอเตอร์ ข้อใดจับคู่การใช้งานได้เหมาะสมที่สุด?",
    "options": [
      "มอเตอร์ DC = ขับล้อรถของเล่นความเร็วสูง, สเต็ปเปอร์ = แกนขับหัวพิมพ์ 3D, เซอร์โว = ปีกบังคับเลี้ยวโดรน",
      "มอเตอร์ DC = แกนขับ 3D Printer, สเต็ปเปอร์ = พัดลมเพดาน, เซอร์โว = รถไฟความเร็วสูง",
      "มอเตอร์ DC = หุ่นยนต์ข้อต่อแขนกล, สเต็ปเปอร์ = รถของเล่น, เซอร์โว = เครื่องปั่นน้ำผลไม้",
      "มอเตอร์ทุกชนิดทำงานเหมือนกัน สามารถสลับใช้แทนกันได้โดยไม่มีผลกระทบ"
    ],
    "answer": 0,
    "reason": "มอเตอร์ DC เหมาะกับงานที่ต้องการความเร็วรอบสูงต่อเนื่อง (เช่น ล้อรถ, พัดลม), สเต็ปเปอร์เหมาะกับงานกำหนดตำแหน่งแม่นยำสูง (เช่น 3D Printer, CNC), ส่วนเซอร์โวมอเตอร์เหมาะกับการควบคุมมุมองศาแบบปิดที่มีแรงบิดสูง (เช่น ปีกบังคับ, แขนกล, บานพับ)"
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
                '📌 ระบบสุ่มข้อสอบ <strong>10 ข้อ</strong> จากคลังข้อสอบ 30 ข้อ เพื่อวัดความเข้าใจเรื่อง DC Motor (L298N), Stepper (ULN2003) และ Servo Motor เกณฑ์การผ่านคือ <strong>8/10 คะแนน (80%)</strong> เพื่อรับใบประกาศนียบัตร' +
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
    ctx.fillText('ได้ผ่านการทดสอบความรู้ โมดูล 8: การควบคุมมอเตอร์ (DC, Stepper & Servo)', canvas.width / 2, 320);
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
    link.download = 'Certificate_Motors_' + nameInput.replace(/\s+/g, '_') + '.png';
    link.href = canvas.toDataURL('image/png');

    setTimeout(() => {
        certContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
};
