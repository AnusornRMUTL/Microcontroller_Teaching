const uartRs232Svg = `
<svg viewBox="0 0 800 400" width="100%" height="100%">
    <!-- TTL / UART -->
    <text x="20" y="30" fill="#f43f5e" font-family="Sarabun" font-size="20" font-weight="bold">1. UART (TTL 0-5V)</text>
    <rect x="20" y="50" width="120" height="80" rx="8" fill="#1e293b"/>
    <text x="80" y="95" fill="#fff" font-family="monospace" font-size="16" text-anchor="middle">MCU A</text>
    <path d="M 140 70 L 300 70" stroke="#f43f5e" stroke-width="3" fill="none"/>
    <path d="M 140 110 L 300 110" stroke="#0ea5e9" stroke-width="3" fill="none"/>
    <text x="160" y="60" fill="#f43f5e" font-family="monospace" font-size="14">Tx</text>
    <text x="260" y="60" fill="#f43f5e" font-family="monospace" font-size="14">Rx</text>
    <text x="160" y="100" fill="#0ea5e9" font-family="monospace" font-size="14">Rx</text>
    <text x="260" y="100" fill="#0ea5e9" font-family="monospace" font-size="14">Tx</text>
    <rect x="300" y="50" width="120" height="80" rx="8" fill="#1e293b"/>
    <text x="360" y="95" fill="#fff" font-family="monospace" font-size="16" text-anchor="middle">MCU B</text>

    <!-- RS232 -->
    <text x="20" y="180" fill="#0ea5e9" font-family="Sarabun" font-size="20" font-weight="bold">2. RS232 (+12V / -12V)</text>
    <rect x="20" y="200" width="80" height="60" rx="8" fill="#1e293b"/>
    <text x="60" y="235" fill="#fff" font-family="monospace" font-size="14" text-anchor="middle">MCU</text>
    <path d="M 100 230 L 140 230" stroke="#f43f5e" stroke-width="2"/>
    
    <rect x="140" y="200" width="80" height="60" rx="8" fill="#0ea5e9"/>
    <text x="180" y="225" fill="#fff" font-family="monospace" font-size="12" text-anchor="middle">MAX232</text>
    <text x="180" y="245" fill="#fff" font-family="monospace" font-size="10" text-anchor="middle">(TTL->RS232)</text>

    <path d="M 220 230 L 400 230" stroke="#0ea5e9" stroke-width="4" stroke-dasharray="8 4"/>
    <text x="310" y="220" fill="#0ea5e9" font-family="monospace" font-size="14" text-anchor="middle">ยาวสุด 15 เมตร</text>
    
    <rect x="400" y="200" width="80" height="60" rx="8" fill="#0ea5e9"/>
    <text x="440" y="235" fill="#fff" font-family="monospace" font-size="12" text-anchor="middle">MAX232</text>
    
    <path d="M 480 230 L 520 230" stroke="#f43f5e" stroke-width="2"/>
    <rect x="520" y="200" width="80" height="60" rx="8" fill="#1e293b"/>
    <text x="560" y="235" fill="#fff" font-family="monospace" font-size="14" text-anchor="middle">MCU</text>

    <!-- Logic Voltage Graphs -->
    <text x="500" y="30" fill="#fff" font-family="Sarabun" font-size="16" font-weight="bold">เปรียบเทียบระดับแรงดัน</text>
    
    <!-- TTL Graph -->
    <text x="450" y="75" fill="#f43f5e" font-family="monospace" font-size="12">TTL</text>
    <path d="M 480 90 L 520 90 L 520 60 L 560 60 L 560 90 L 600 90" stroke="#f43f5e" stroke-width="2" fill="none"/>
    <text x="610" y="65" fill="#fff" font-size="10">5V (ลอจิก 1)</text>
    <text x="610" y="95" fill="#fff" font-size="10">0V (ลอจิก 0)</text>

    <!-- RS232 Graph -->
    <text x="450" y="145" fill="#0ea5e9" font-family="monospace" font-size="12">RS232</text>
    <path d="M 480 160 L 520 160 L 520 130 L 560 130 L 560 160 L 600 160" stroke="#0ea5e9" stroke-width="2" fill="none"/>
    <text x="610" y="135" fill="#fff" font-size="10">-12V (ลอจิก 1)</text>
    <text x="610" y="165" fill="#fff" font-size="10">+12V (ลอจิก 0)</text>

    <!-- Data Animation -->
    <circle cx="140" cy="70" r="5" fill="#fff">
        <animate attributeName="cx" values="140;300;140" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="300" cy="110" r="5" fill="#fff">
        <animate attributeName="cx" values="300;140;300" dur="2s" repeatCount="indefinite" />
    </circle>
</svg>
`;

const rs485Svg = `
<svg viewBox="0 0 800 300" width="100%" height="100%">
    <text x="20" y="30" fill="#f59e0b" font-family="Sarabun" font-size="20" font-weight="bold">3. RS485 (Differential Signaling)</text>
    
    <!-- Master -->
    <rect x="20" y="100" width="80" height="60" rx="8" fill="#1e293b"/>
    <text x="60" y="135" fill="#fff" font-family="monospace" font-size="14" text-anchor="middle">Master</text>
    <path d="M 100 120 L 140 120" stroke="#f43f5e" stroke-width="2"/>
    <rect x="140" y="100" width="60" height="60" rx="8" fill="#f59e0b"/>
    <text x="170" y="135" fill="#fff" font-family="monospace" font-size="12" text-anchor="middle">MAX485</text>
    
    <!-- RS485 Bus -->
    <path d="M 200 115 L 600 115" stroke="#f59e0b" stroke-width="3"/>
    <path d="M 200 145 L 600 145" stroke="#0ea5e9" stroke-width="3"/>
    <text x="400" y="105" fill="#f59e0b" font-family="monospace" font-size="14" font-weight="bold" text-anchor="middle">A (+)</text>
    <text x="400" y="165" fill="#0ea5e9" font-family="monospace" font-size="14" font-weight="bold" text-anchor="middle">B (-)</text>
    <text x="400" y="195" fill="#fff" font-family="Sarabun" font-size="14" text-anchor="middle">ลากสายได้ไกลถึง 1,200 เมตร!</text>
    
    <!-- Terminating Resistors -->
    <path d="M 210 115 L 210 120 L 215 125 L 205 130 L 215 135 L 210 140 L 210 145" stroke="#fff" stroke-width="2" fill="none"/>
    <text x="225" y="135" fill="#fff" font-size="10">120Ω</text>

    <!-- Slaves -->
    <path d="M 350 115 L 350 200" stroke="#f59e0b" stroke-width="2"/>
    <path d="M 370 145 L 370 200" stroke="#0ea5e9" stroke-width="2"/>
    <rect x="330" y="200" width="60" height="40" rx="8" fill="#f59e0b"/>
    <text x="360" y="225" fill="#fff" font-family="monospace" font-size="10" text-anchor="middle">MAX485</text>
    <rect x="330" y="240" width="60" height="40" rx="8" fill="#1e293b"/>
    <text x="360" y="265" fill="#fff" font-family="monospace" font-size="12" text-anchor="middle">Slave 1</text>

    <path d="M 500 115 L 500 200" stroke="#f59e0b" stroke-width="2"/>
    <path d="M 520 145 L 520 200" stroke="#0ea5e9" stroke-width="2"/>
    <rect x="480" y="200" width="60" height="40" rx="8" fill="#f59e0b"/>
    <text x="510" y="225" fill="#fff" font-family="monospace" font-size="10" text-anchor="middle">MAX485</text>
    <rect x="480" y="240" width="60" height="40" rx="8" fill="#1e293b"/>
    <text x="510" y="265" fill="#fff" font-family="monospace" font-size="12" text-anchor="middle">Slave 2</text>

    <path d="M 580 115 L 580 120 L 585 125 L 575 130 L 585 135 L 580 140 L 580 145" stroke="#fff" stroke-width="2" fill="none"/>
    <text x="550" y="135" fill="#fff" font-size="10">120Ω</text>

    <!-- Noise Animation -->
    <path d="M 250 130 Q 280 80, 310 130 T 370 130" stroke="rgba(255,255,255,0.3)" stroke-width="2" fill="none">
        <animate attributeName="d" values="M 250 130 Q 280 80, 310 130 T 370 130; M 250 130 Q 280 180, 310 130 T 370 130; M 250 130 Q 280 80, 310 130 T 370 130" dur="1s" repeatCount="indefinite"/>
    </path>
    <text x="310" y="80" fill="rgba(255,255,255,0.7)" font-family="Sarabun" font-size="12" text-anchor="middle">Noise (สัญญาณรบกวน)</text>
    <text x="680" y="135" fill="#fff" font-family="Sarabun" font-size="12">V_Diff = V_A - V_B</text>
</svg>
`;

const contentData = {
    intro: `
        <div class="card">
            <h1>มาตรฐานรับส่งข้อมูลแบบอนุกรม (UART, RS232, RS485)</h1>
            <p>การสื่อสารแบบอนุกรม (Serial Communication) คือการส่งข้อมูลไปทีละบิตผ่านสายสัญญาณเพียง 1 หรือ 2 เส้น โปรโตคอลที่เป็นพื้นฐานที่สุดคือ <strong>UART</strong> แต่เนื่องจากมีข้อจำกัดด้านระยะทาง จึงมีการพัฒนามาตรฐานระดับแรงดันไฟฟ้า (Voltage Level) ขึ้นมาเพื่อแก้ปัญหา ได้แก่ <strong>RS232</strong> และ <strong>RS485</strong> ซึ่งใช้กันอย่างแพร่หลายในวงการอุตสาหกรรม</p>
        </div>
        <div class="grid-3">
            <div class="card">
                <h2 style="color: var(--uart-color);">1. UART (TTL)</h2>
                <p><strong>Universal Asynchronous Receiver-Transmitter</strong></p>
                <ul class="feature-list">
                    <li>สื่อสารผ่านสาย Tx (ส่ง) และ Rx (รับ)</li>
                    <li>ระดับแรงดัน TTL: 0V (ลอจิก 0) และ 5V หรือ 3.3V (ลอจิก 1)</li>
                    <li>ต้องตั้งค่า Baud rate, Parity, Data bits, Stop bits ให้ตรงกัน</li>
                    <li><strong>ข้อจำกัด:</strong> ระยะทางสั้น (ไม่เกิน 1-2 เมตร) นิยมใช้สื่อสารระหว่างไอซีบนบอร์ดเดียวกัน</li>
                </ul>
            </div>
            <div class="card">
                <h2 style="color: var(--rs232-color);">2. RS232</h2>
                <p><strong>สำหรับเพิ่มระยะทาง</strong></p>
                <ul class="feature-list">
                    <li>แปลงลอจิก UART เป็นแรงดันสูง: +12V ถึง +3V (ลอจิก 0) และ -3V ถึง -12V (ลอจิก 1)</li>
                    <li>รองรับระยะทางประมาณ 15 เมตร (50 ฟุต)</li>
                    <li>การเชื่อมต่อแบบ Point-to-Point (ตัวต่อตัว)</li>
                    <li><strong>ข้อจำกัด:</strong> ใช้งานสายแบบ Single-ended (เทียบกราวด์) ทำให้เกิดสัญญาณรบกวนได้ง่ายหากสายยาวเกินไป</li>
                </ul>
            </div>
            <div class="card">
                <h2 style="color: var(--rs485-color);">3. RS485</h2>
                <p><strong>สำหรับอุตสาหกรรม (Industrial)</strong></p>
                <ul class="feature-list">
                    <li>ส่งสัญญาณแบบ Differential (สาย A และ B) ผลต่างแรงดันช่วยหักล้างสัญญาณรบกวน</li>
                    <li>รองรับระยะทางไกลสูงสุดถึง 1,200 เมตร!</li>
                    <li>การเชื่อมต่อแบบ Multi-drop (ต่อพ่วงได้ 32 ตัวบนสายเดียวกัน)</li>
                    <li>สื่อสารแบบ Half-Duplex (สลับกันส่ง/รับ บนสาย 2 เส้น)</li>
                </ul>
            </div>
        </div>
    `,
    simulator: `
        <div class="card">
            <h2>วงจรจำลอง (Simulator): การทำงานของ UART, RS232, RS485</h2>
            <p>ภาพจำลองแสดงลักษณะการเชื่อมต่อและระดับแรงดันของแต่ละมาตรฐาน</p>
            
            <div class="simulator-canvas">
                ${uartRs232Svg}
            </div>

            <div class="simulator-canvas" style="margin-top: 20px;">
                ${rs485Svg}
            </div>

            <div class="code-editor" style="margin-top: 20px;">
                <span class="comment">// ตัวอย่างโค้ด Arduino สำหรับการตั้งค่า UART (และใช้งานผ่านโมดูล RS232/RS485)</span><br>
                <span class="keyword">void</span> <span class="function">setup</span>() {<br>
                &nbsp;&nbsp;<span class="comment">// ตั้งค่าความเร็ว (Baud rate) ที่ 9600 bps</span><br>
                &nbsp;&nbsp;Serial.<span class="function">begin</span>(<span class="number">9600</span>);<br>
                }<br><br>
                <span class="keyword">void</span> <span class="function">loop</span>() {<br>
                &nbsp;&nbsp;Serial.<span class="function">println</span>(<span class="string">"Hello RS485!"</span>);<br>
                &nbsp;&nbsp;<span class="function">delay</span>(<span class="number">1000</span>);<br>
                }
            </div>
        </div>
    `,
    quiz: `
        <div class="card quiz-container" id="quiz-container">
            <!-- Quiz UI will be injected here -->
        </div>
    `
};

const quizQuestions = [
    // --- UART Questions (1-10) ---
    { q: "1. UART ย่อมาจากอะไร?", options: ["Universal Asynchronous Receiver/Transmitter", "Universal Analog Receiver/Transmitter", "Unified Asynchronous Router/Transmitter", "Universal Automatic Receiver/Transmitter"], answer: 0 },
    { q: "2. UART เป็นการสื่อสารแบบใด?", options: ["Synchronous (ใช้สายนาฬิกา)", "Asynchronous (ไม่ใช้สายนาฬิกา)", "Parallel (แบบขนาน)", "Wireless (ไร้สาย)"], answer: 1 },
    { q: "3. ขาใดใช้สำหรับส่งข้อมูลใน UART?", options: ["Rx (Receive)", "SCL (Clock)", "Tx (Transmit)", "SDA (Data)"], answer: 2 },
    { q: "4. ขาใดใช้สำหรับรับข้อมูลใน UART?", options: ["Tx (Transmit)", "Rx (Receive)", "MOSI", "MISO"], answer: 1 },
    { q: "5. การเชื่อมต่อ UART ระหว่างสองอุปกรณ์ต้องต่อสายอย่างไร?", options: ["Tx ต่อ Tx, Rx ต่อ Rx", "Tx ต่อ Rx, Rx ต่อ Tx", "Tx ต่อ VCC, Rx ต่อ GND", "ใช้เพียงเส้นเดียว"], answer: 1 },
    { q: "6. Baud rate ใน UART คืออะไร?", options: ["ความจุของหน่วยความจำ", "ความเร็วในการรับส่งข้อมูล (bps)", "ระดับแรงดันไฟฟ้าของสัญญาณ", "ระยะทางสูงสุดที่ส่งได้"], answer: 1 },
    { q: "7. สิ่งใดที่ 'จำเป็น' ต้องตั้งให้ตรงกันทั้งสองฝั่งในการส่ง UART?", options: ["ความจุของแบตเตอรี่", "รุ่นของไมโครคอนโทรลเลอร์", "สีของสายไฟ", "Baud rate (ความเร็ว)"], answer: 3 },
    { q: "8. รูปแบบของ Data packet ใน UART มักเริ่มต้นด้วยบิตใด?", options: ["Start bit (ลอจิก 0)", "Start bit (ลอจิก 1)", "Stop bit", "Parity bit"], answer: 0 },
    { q: "9. รูปแบบของ Data packet ใน UART มักสิ้นสุดด้วยบิตใด?", options: ["Start bit", "Parity bit", "Stop bit (ลอจิก 1)", "Data bit"], answer: 2 },
    { q: "10. ข้อจำกัดของการสื่อสารแบบ UART คืออะไร?", options: ["ใช้สายจำนวนมาก", "รับส่งข้อมูลได้ไกลมาก", "ระยะทางสั้น นิยมใช้สื่อสารระหว่างชิปบนบอร์ดเดียวกัน", "ต้องใช้ไฟเลี้ยงสูง"], answer: 2 },

    // --- RS232 Questions (11-20) ---
    { q: "11. มาตรฐาน RS232 สร้างขึ้นเพื่อแก้ปัญหาใดของ UART?", options: ["ลดจำนวนสายไฟ", "เพิ่มระดับแรงดันไฟฟ้าเพื่อให้ส่งข้อมูลได้ไกลขึ้น", "เปลี่ยนให้เป็นแบบไร้สาย", "เพิ่มความเร็ว Clock"], answer: 1 },
    { q: "12. ระดับแรงดันไฟฟ้าของ RS232 สำหรับลอจิก '1' (Mark) คือเท่าใด?", options: ["0V ถึง 5V", "3.3V", "-3V ถึง -15V", "+3V ถึง +15V"], answer: 2 },
    { q: "13. ระดับแรงดันไฟฟ้าของ RS232 สำหรับลอจิก '0' (Space) คือเท่าใด?", options: ["0V ถึง 5V", "3.3V", "-3V ถึง -15V", "+3V ถึง +15V"], answer: 3 },
    { q: "14. พอร์ตมาตรฐานที่นิยมใช้กับ RS232 สมัยก่อนบนคอมพิวเตอร์คือพอร์ตใด?", options: ["USB", "HDMI", "DB9", "VGA"], answer: 2 },
    { q: "15. การสื่อสารผ่าน RS232 สามารถต่ออุปกรณ์ได้สูงสุดกี่ตัวบนสายเดียวกัน?", options: ["2 ตัว (Point-to-Point)", "10 ตัว", "32 ตัว", "128 ตัว"], answer: 0 },
    { q: "16. ระยะทางสูงสุดที่ RS232 สามารถทำงานได้ดีอยู่ที่ประมาณเท่าใด?", options: ["1 เมตร", "15 เมตร (50 ฟุต)", "1,000 เมตร", "10 กิโลเมตร"], answer: 1 },
    { q: "17. ไอซีที่ทำหน้าที่แปลงระดับแรงดันจาก UART (TTL) เป็น RS232 ที่นิยมใช้คือเบอร์ใด?", options: ["L298N", "NE555", "MAX232", "MAX485"], answer: 2 },
    { q: "18. หากใช้ RS232 แล้วเกิดปัญหาสัญญาณรบกวน สาเหตุหลักมักมาจากอะไร?", options: ["ใช้สัญญาณแบบ Single-ended (อ้างอิง GND เส้นเดียว)", "แรงดันไฟฟ้าสูงเกินไป", "ส่งข้อมูลเร็วเกินไป", "สายไฟสั้นเกินไป"], answer: 0 },
    { q: "19. สายสัญญาณหลักของ RS232 อย่างน้อยประกอบด้วยอะไรบ้าง?", options: ["SDA, SCL, GND", "Tx, Rx, GND", "A, B, GND", "MOSI, MISO, SCK"], answer: 1 },
    { q: "20. RS232 สามารถสื่อสารแบบ Full-Duplex (รับและส่งพร้อมกัน) ได้หรือไม่?", options: ["ไม่ได้เลย", "ได้ ส่งและรับพร้อมกันได้", "ได้ แต่ต้องใช้ 4 สาย", "ได้เฉพาะตอนกลางวัน"], answer: 1 },

    // --- RS485 Questions (21-30) ---
    { q: "21. คุณสมบัติเด่นของสัญญาณแบบ RS485 คืออะไร?", options: ["ไร้สาย", "ใช้สายสัญญาณแบบ Differential คู่ตีเกลียว A และ B", "ใช้แสงในการส่งข้อมูล", "อ้างอิงไฟ 220V"], answer: 1 },
    { q: "22. RS485 สามารถส่งข้อมูลได้ไกลสูงสุดประมาณเท่าใด?", options: ["15 เมตร", "100 เมตร", "1,200 เมตร (4,000 ฟุต)", "10 กิโลเมตร"], answer: 2 },
    { q: "23. โครงสร้างเครือข่ายของ RS485 เป็นรูปแบบใด?", options: ["Point-to-Point (ตัวต่อตัว)", "Ring (วงแหวน)", "Multi-drop (เชื่อมหลายตัวบนบัสเดียวกัน)", "Star (ดาว)"], answer: 2 },
    { q: "24. จำนวนอุปกรณ์ (Node) สูงสุดบนบัส RS485 มาตรฐานคือเท่าใด?", options: ["2 ตัว", "10 ตัว", "32 ตัว", "256 ตัว"], answer: 2 },
    { q: "25. การสื่อสารของ RS485 (ระบบ 2 สาย) เป็นแบบใด?", options: ["Simplex (ส่งทางเดียว)", "Half-Duplex (สลับกันส่งและรับ)", "Full-Duplex (ส่งรับพร้อมกัน)", "No-Duplex"], answer: 1 },
    { q: "26. สายสัญญาณ A และ B ของ RS485 ทำงานอย่างไรเพื่อลดสัญญาณรบกวน?", options: ["ส่งสัญญาณแสง", "ส่งแรงดันตรงข้ามกัน (หักล้าง Noise ด้วยความต่างศักย์)", "ส่งแรงดันเท่ากัน", "เปลี่ยนความถี่ต่อเนื่อง"], answer: 1 },
    { q: "27. ไอซีที่นิยมใช้แปลง UART เป็น RS485 คือเบอร์ใด?", options: ["MAX232", "L293D", "MAX485", "LM358"], answer: 2 },
    { q: "28. อุปกรณ์ใดจำเป็นต้องมีที่ปลายสายทั้งสองด้านของบัส RS485 เพื่อลดการสะท้อนกลับของสัญญาณ?", options: ["Capacitor", "Terminating Resistor (120 โอห์ม)", "Inductor", "Diode"], answer: 1 },
    { q: "29. ในระบบ RS485 แบบพื้นฐาน จะต้องใช้สายสัญญาณอย่างน้อยกี่เส้น?", options: ["1 เส้น", "2 เส้น (A และ B)", "4 เส้น", "8 เส้น"], answer: 1 },
    { q: "30. ข้อใดคือเหตุผลหลักที่โรงงานอุตสาหกรรมนิยมใช้ RS485?", options: ["ราคาแพงที่สุด", "ทนทานต่อสัญญาณรบกวนได้ดีเยี่ยมและลากสายได้ไกล", "ความเร็วสูงกว่า USB 3.0", "ไม่ต้องเขียนโปรแกรม"], answer: 1 }
];

let currentQuestion = 0;
let score = 0;

function renderNavigation() {
    const navItems = document.querySelectorAll('#nav-menu li[data-section]');
    const contentArea = document.getElementById('content-area');

    // Default load intro
    contentArea.innerHTML = contentData['intro'];

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Remove active from all
            navItems.forEach(nav => nav.classList.remove('active'));
            // Add active to clicked
            item.classList.add('active');

            const section = item.getAttribute('data-section');
            contentArea.innerHTML = contentData[section];
            
            // Render quiz if quiz section is selected
            if(section === 'quiz') {
                currentQuestion = 0;
                score = 0;
                renderQuiz();
            }
        });
    });
}

function renderQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    if (!quizContainer) return;

    if (currentQuestion >= quizQuestions.length) {
        // Show result
        let resultMsg = score === quizQuestions.length 
            ? "สุดยอด! คุณมีความรู้เรื่อง Data Serial อย่างทะลุปรุโปร่ง 🎉" 
            : "พยายามอีกนิดนะ กลับไปทบทวนทฤษฎีแล้วลองใหม่! 💪";
        
        quizContainer.innerHTML = `
            <div id="quiz-result-card">
                <h2>ผลการทดสอบ</h2>
                <div class="score-display">${score} / ${quizQuestions.length}</div>
                <div class="result-message">${resultMsg}</div>
                ${score < quizQuestions.length ? `<button onclick="resetQuiz()">ทำแบบทดสอบใหม่</button>` : ''}
            </div>
        `;
        return;
    }

    const qData = quizQuestions[currentQuestion];
    let optionsHtml = '';
    
    qData.options.forEach((opt, index) => {
        optionsHtml += `<button class="option-btn" onclick="checkAnswer(${index}, this)">${opt}</button>`;
    });

    quizContainer.innerHTML = `
        <div class="quiz-header">
            <h3>แบบทดสอบ Data Serial (UART/RS232/RS485)</h3>
            <div class="quiz-progress">ข้อ ${currentQuestion + 1} จาก ${quizQuestions.length}</div>
        </div>
        <div class="question-box">${qData.q}</div>
        <div class="options-grid" id="options-grid">
            ${optionsHtml}
        </div>
        <div class="quiz-actions">
            <button id="next-btn" style="display:none;" onclick="nextQuestion()">ข้อถัดไป ➔</button>
        </div>
    `;
}

window.checkAnswer = function(selectedIndex, btnElement) {
    const qData = quizQuestions[currentQuestion];
    const grid = document.getElementById('options-grid');
    const buttons = grid.querySelectorAll('.option-btn');
    const nextBtn = document.getElementById('next-btn');
    
    // Disable all buttons
    buttons.forEach(btn => btn.disabled = true);
    
    if (selectedIndex === qData.answer) {
        score++;
        btnElement.classList.add('correct-show');
    } else {
        btnElement.classList.add('incorrect-show');
        buttons[qData.answer].classList.add('correct-show');
    }
    
    nextBtn.style.display = 'block';
};

window.nextQuestion = function() {
    currentQuestion++;
    renderQuiz();
};

window.resetQuiz = function() {
    currentQuestion = 0;
    score = 0;
    renderQuiz();
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderNavigation();
});
