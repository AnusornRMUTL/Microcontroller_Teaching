// =============================================
// SVG Diagrams for Intro Section
// =============================================

// UART Data Frame Format SVG
const uartFrameSvg = `
<svg viewBox="0 0 800 280" width="100%" height="100%">
    <defs>
        <filter id="glowGreen"><feGaussianBlur stdDeviation="3" result="g"/><feMerge><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <filter id="glowRed"><feGaussianBlur stdDeviation="3" result="g"/><feMerge><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>

    <text x="400" y="25" fill="#f8fafc" font-family="Sarabun" font-size="18" font-weight="bold" text-anchor="middle">โครงสร้าง UART Data Frame (รูปแบบการส่งข้อมูล)</text>

    <!-- Idle HIGH line -->
    <text x="15" y="80" fill="#94a3b8" font-family="monospace" font-size="11">Idle</text>
    <path d="M 50 70 L 90 70" stroke="#94a3b8" stroke-width="2" fill="none"/>

    <!-- Start Bit (1 bit) - LOW -->
    <path d="M 90 70 L 90 130 L 150 130" stroke="#ef4444" stroke-width="2.5" fill="none"/>
    <rect x="90" y="100" width="60" height="35" rx="4" fill="rgba(239,68,68,0.15)" stroke="#ef4444" stroke-width="1"/>
    <text x="120" y="122" fill="#ef4444" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">START</text>
    <text x="120" y="155" fill="#ef4444" font-family="monospace" font-size="10" text-anchor="middle">1 bit (LOW)</text>

    <!-- Data Bits (5-9 bits) -->
    <path d="M 150 130 L 150 70 L 190 70 L 190 130 L 230 130 L 230 70 L 270 70 L 270 130 L 310 130 L 310 70 L 350 70 L 350 130 L 390 130 L 390 70 L 430 70 L 430 130 L 470 130" stroke="#4ade80" stroke-width="2.5" fill="none"/>
    <rect x="150" y="45" width="320" height="20" rx="4" fill="rgba(74,222,128,0.15)" stroke="#4ade80" stroke-width="1"/>
    <text x="310" y="59" fill="#4ade80" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">DATA BITS (D0 - D7)</text>
    <text x="170" y="155" fill="#4ade80" font-family="monospace" font-size="10" text-anchor="middle">D0</text>
    <text x="210" y="155" fill="#4ade80" font-family="monospace" font-size="10" text-anchor="middle">D1</text>
    <text x="250" y="155" fill="#4ade80" font-family="monospace" font-size="10" text-anchor="middle">D2</text>
    <text x="290" y="155" fill="#4ade80" font-family="monospace" font-size="10" text-anchor="middle">D3</text>
    <text x="330" y="155" fill="#4ade80" font-family="monospace" font-size="10" text-anchor="middle">D4</text>
    <text x="370" y="155" fill="#4ade80" font-family="monospace" font-size="10" text-anchor="middle">D5</text>
    <text x="410" y="155" fill="#4ade80" font-family="monospace" font-size="10" text-anchor="middle">D6</text>
    <text x="450" y="155" fill="#4ade80" font-family="monospace" font-size="10" text-anchor="middle">D7</text>

    <!-- Parity Bit (optional) -->
    <path d="M 470 130 L 470 70 L 530 70" stroke="#facc15" stroke-width="2.5" fill="none"/>
    <rect x="470" y="100" width="60" height="35" rx="4" fill="rgba(250,204,21,0.15)" stroke="#facc15" stroke-width="1"/>
    <text x="500" y="122" fill="#facc15" font-family="monospace" font-size="11" font-weight="bold" text-anchor="middle">PARITY</text>
    <text x="500" y="155" fill="#facc15" font-family="monospace" font-size="10" text-anchor="middle">0-1 bit</text>

    <!-- Stop Bit(s) (1 or 2 bits) - HIGH -->
    <path d="M 530 70 L 620 70" stroke="#38bdf8" stroke-width="2.5" fill="none"/>
    <rect x="530" y="45" width="90" height="30" rx="4" fill="rgba(56,189,248,0.15)" stroke="#38bdf8" stroke-width="1"/>
    <text x="575" y="64" fill="#38bdf8" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">STOP</text>
    <text x="575" y="90" fill="#38bdf8" font-family="monospace" font-size="10" text-anchor="middle">1-2 bit (HIGH)</text>

    <!-- Idle HIGH -->
    <path d="M 620 70 L 700 70" stroke="#94a3b8" stroke-width="2" fill="none"/>
    <text x="660" y="90" fill="#94a3b8" font-family="monospace" font-size="11">Idle</text>

    <!-- Voltage Labels -->
    <text x="745" y="75" fill="#4ade80" font-family="monospace" font-size="11">HIGH (5V)</text>
    <text x="745" y="135" fill="#ef4444" font-family="monospace" font-size="11">LOW (0V)</text>
    <line x1="735" y1="65" x2="735" y2="135" stroke="#64748b" stroke-width="1" stroke-dasharray="4"/>

    <!-- Timing Descriptions -->
    <text x="50" y="200" fill="#f8fafc" font-family="Sarabun" font-size="14" font-weight="bold">ลำดับการส่ง:</text>
    <text x="50" y="220" fill="#ef4444" font-family="Sarabun" font-size="13">1. Start bit (LOW) → บอกว่าเริ่มส่งข้อมูลแล้ว</text>
    <text x="50" y="240" fill="#4ade80" font-family="Sarabun" font-size="13">2. Data bits (D0-D7) → ข้อมูลจริง ส่งจาก LSB ไป MSB</text>
    <text x="50" y="260" fill="#facc15" font-family="Sarabun" font-size="13">3. Parity bit (ถ้ามี) → ตรวจสอบความผิดพลาด (Even/Odd)</text>
    <text x="50" y="280" fill="#38bdf8" font-family="Sarabun" font-size="13">4. Stop bit (HIGH) → บอกว่าจบการส่ง 1 ชุดข้อมูลแล้ว</text>

    <!-- Scanner Animation -->
    <rect x="90" y="40" width="8" height="130" fill="rgba(255,255,255,0.15)" rx="3">
        <animate attributeName="x" values="90;620;90" dur="5s" repeatCount="indefinite" />
    </rect>
</svg>
`;

// RS232 Voltage Level Comparison SVG
const rs232VoltageSvg = `
<svg viewBox="0 0 800 260" width="100%" height="100%">
    <text x="400" y="25" fill="#f8fafc" font-family="Sarabun" font-size="18" font-weight="bold" text-anchor="middle">เปรียบเทียบระดับแรงดัน TTL (UART) vs RS232</text>

    <!-- TTL Section -->
    <text x="30" y="60" fill="#f43f5e" font-family="Sarabun" font-size="16" font-weight="bold">TTL (UART)</text>
    <text x="30" y="80" fill="#94a3b8" font-family="monospace" font-size="11">5V ──</text>
    <text x="30" y="140" fill="#94a3b8" font-family="monospace" font-size="11">0V ──</text>
    
    <!-- TTL Waveform: sending 01010110 -->
    <path d="M 100 130 L 100 75 L 140 75 L 140 130 L 180 130 L 180 75 L 220 75 L 220 130 L 260 130 L 260 75 L 300 75 L 300 130 L 340 130 L 340 75 L 380 75" stroke="#f43f5e" stroke-width="3" fill="none"/>

    <!-- Labels above TTL -->
    <text x="120" y="165" fill="#4ade80" font-family="monospace" font-size="10" text-anchor="middle">1</text>
    <text x="160" y="165" fill="#ef4444" font-family="monospace" font-size="10" text-anchor="middle">0</text>
    <text x="200" y="165" fill="#4ade80" font-family="monospace" font-size="10" text-anchor="middle">1</text>
    <text x="240" y="165" fill="#ef4444" font-family="monospace" font-size="10" text-anchor="middle">0</text>
    <text x="280" y="165" fill="#4ade80" font-family="monospace" font-size="10" text-anchor="middle">1</text>
    <text x="320" y="165" fill="#ef4444" font-family="monospace" font-size="10" text-anchor="middle">0</text>
    <text x="360" y="165" fill="#4ade80" font-family="monospace" font-size="10" text-anchor="middle">1</text>

    <!-- Arrow -->
    <text x="410" y="110" fill="#fff" font-family="Sarabun" font-size="28">→</text>
    <text x="410" y="135" fill="#94a3b8" font-family="Sarabun" font-size="12">MAX232</text>

    <!-- RS232 Section -->
    <text x="460" y="60" fill="#0ea5e9" font-family="Sarabun" font-size="16" font-weight="bold">RS232</text>
    <text x="460" y="80" fill="#94a3b8" font-family="monospace" font-size="11">+12V ──</text>
    <text x="460" y="120" fill="#94a3b8" font-family="monospace" font-size="11">0V ──</text>
    <text x="460" y="160" fill="#94a3b8" font-family="monospace" font-size="11">-12V ──</text>

    <!-- RS232 Waveform: INVERTED -->
    <path d="M 530 75 L 530 150 L 570 150 L 570 75 L 610 75 L 610 150 L 650 150 L 650 75 L 690 75 L 690 150 L 730 150 L 730 75 L 770 75" stroke="#0ea5e9" stroke-width="3" fill="none"/>

    <text x="550" y="180" fill="#ef4444" font-family="monospace" font-size="10" text-anchor="middle">0</text>
    <text x="590" y="180" fill="#4ade80" font-family="monospace" font-size="10" text-anchor="middle">1</text>
    <text x="630" y="180" fill="#ef4444" font-family="monospace" font-size="10" text-anchor="middle">0</text>
    <text x="670" y="180" fill="#4ade80" font-family="monospace" font-size="10" text-anchor="middle">1</text>
    <text x="710" y="180" fill="#ef4444" font-family="monospace" font-size="10" text-anchor="middle">0</text>
    <text x="750" y="180" fill="#4ade80" font-family="monospace" font-size="10" text-anchor="middle">1</text>

    <!-- Explanation -->
    <text x="30" y="210" fill="#f8fafc" font-family="Sarabun" font-size="14" font-weight="bold">สิ่งสำคัญ:</text>
    <text x="30" y="230" fill="#f43f5e" font-family="Sarabun" font-size="13">• TTL: ลอจิก 1 = +5V, ลอจิก 0 = 0V (ห้ามต่อกับ RS232 โดยตรง!)</text>
    <text x="30" y="250" fill="#0ea5e9" font-family="Sarabun" font-size="13">• RS232: ลอจิก 1 = -3V ถึง -12V, ลอจิก 0 = +3V ถึง +12V (กลับกัน!)</text>
</svg>
`;

// RS485 Protocol (Modbus RTU) SVG
const rs485ProtocolSvg = `
<svg viewBox="0 0 800 350" width="100%" height="100%">
    <text x="400" y="25" fill="#f8fafc" font-family="Sarabun" font-size="18" font-weight="bold" text-anchor="middle">โครงสร้างโปรโตคอล Modbus RTU บน RS485</text>

    <!-- Frame Structure -->
    <text x="30" y="60" fill="#f59e0b" font-family="Sarabun" font-size="15" font-weight="bold">โครงสร้าง Modbus RTU Frame (Master → Slave)</text>

    <!-- Silence -->
    <rect x="30" y="75" width="60" height="50" rx="6" fill="rgba(148,163,184,0.2)" stroke="#94a3b8" stroke-width="1.5"/>
    <text x="60" y="97" fill="#94a3b8" font-family="monospace" font-size="10" text-anchor="middle">Silence</text>
    <text x="60" y="110" fill="#94a3b8" font-family="monospace" font-size="9" text-anchor="middle">≥3.5 char</text>

    <!-- Slave Address -->
    <rect x="100" y="75" width="120" height="50" rx="6" fill="rgba(244,63,94,0.2)" stroke="#f43f5e" stroke-width="2"/>
    <text x="160" y="95" fill="#f43f5e" font-family="monospace" font-size="13" font-weight="bold" text-anchor="middle">Slave Address</text>
    <text x="160" y="112" fill="#f43f5e" font-family="monospace" font-size="10" text-anchor="middle">1 Byte (0x01-0xF7)</text>

    <!-- Function Code -->
    <rect x="230" y="75" width="130" height="50" rx="6" fill="rgba(14,165,233,0.2)" stroke="#0ea5e9" stroke-width="2"/>
    <text x="295" y="95" fill="#0ea5e9" font-family="monospace" font-size="13" font-weight="bold" text-anchor="middle">Function Code</text>
    <text x="295" y="112" fill="#0ea5e9" font-family="monospace" font-size="10" text-anchor="middle">1 Byte (คำสั่ง)</text>

    <!-- Data -->
    <rect x="370" y="75" width="200" height="50" rx="6" fill="rgba(74,222,128,0.2)" stroke="#4ade80" stroke-width="2"/>
    <text x="470" y="95" fill="#4ade80" font-family="monospace" font-size="13" font-weight="bold" text-anchor="middle">Data (Register/Value)</text>
    <text x="470" y="112" fill="#4ade80" font-family="monospace" font-size="10" text-anchor="middle">N Bytes (ข้อมูล)</text>

    <!-- CRC -->
    <rect x="580" y="75" width="110" height="50" rx="6" fill="rgba(250,204,21,0.2)" stroke="#facc15" stroke-width="2"/>
    <text x="635" y="95" fill="#facc15" font-family="monospace" font-size="13" font-weight="bold" text-anchor="middle">CRC-16</text>
    <text x="635" y="112" fill="#facc15" font-family="monospace" font-size="10" text-anchor="middle">2 Bytes (ตรวจสอบ)</text>

    <!-- Silence end -->
    <rect x="700" y="75" width="60" height="50" rx="6" fill="rgba(148,163,184,0.2)" stroke="#94a3b8" stroke-width="1.5"/>
    <text x="730" y="97" fill="#94a3b8" font-family="monospace" font-size="10" text-anchor="middle">Silence</text>
    <text x="730" y="110" fill="#94a3b8" font-family="monospace" font-size="9" text-anchor="middle">≥3.5 char</text>

    <!-- Scanning animation over the frame -->
    <rect x="100" y="72" width="12" height="56" fill="rgba(255,255,255,0.2)" rx="3">
        <animate attributeName="x" values="100;700;100" dur="4s" repeatCount="indefinite" />
    </rect>

    <!-- Function Code Table -->
    <text x="30" y="155" fill="#0ea5e9" font-family="Sarabun" font-size="15" font-weight="bold">Function Code ที่สำคัญ (คำสั่งที่ใช้บ่อย)</text>

    <rect x="30" y="165" width="740" height="28" rx="4" fill="#1e293b"/>
    <text x="100" y="184" fill="#94a3b8" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">Code</text>
    <text x="300" y="184" fill="#94a3b8" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">Function Name</text>
    <text x="580" y="184" fill="#94a3b8" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">คำอธิบาย</text>

    <rect x="30" y="195" width="740" height="25" rx="0" fill="rgba(74,222,128,0.08)"/>
    <text x="100" y="212" fill="#4ade80" font-family="monospace" font-size="12" text-anchor="middle">0x01</text>
    <text x="300" y="212" fill="#f8fafc" font-family="monospace" font-size="12" text-anchor="middle">Read Coils</text>
    <text x="580" y="212" fill="#94a3b8" font-family="Sarabun" font-size="12" text-anchor="middle">อ่านสถานะ Coil (DO) - On/Off</text>

    <rect x="30" y="222" width="740" height="25" rx="0" fill="rgba(14,165,233,0.08)"/>
    <text x="100" y="239" fill="#38bdf8" font-family="monospace" font-size="12" text-anchor="middle">0x03</text>
    <text x="300" y="239" fill="#f8fafc" font-family="monospace" font-size="12" text-anchor="middle">Read Holding Registers</text>
    <text x="580" y="239" fill="#94a3b8" font-family="Sarabun" font-size="12" text-anchor="middle">อ่านค่า Register (เช่น อุณหภูมิ)</text>

    <rect x="30" y="249" width="740" height="25" rx="0" fill="rgba(250,204,21,0.08)"/>
    <text x="100" y="266" fill="#facc15" font-family="monospace" font-size="12" text-anchor="middle">0x05</text>
    <text x="300" y="266" fill="#f8fafc" font-family="monospace" font-size="12" text-anchor="middle">Write Single Coil</text>
    <text x="580" y="266" fill="#94a3b8" font-family="Sarabun" font-size="12" text-anchor="middle">สั่งเปิด/ปิด Coil 1 ตัว</text>

    <rect x="30" y="276" width="740" height="25" rx="0" fill="rgba(244,63,94,0.08)"/>
    <text x="100" y="293" fill="#f43f5e" font-family="monospace" font-size="12" text-anchor="middle">0x06</text>
    <text x="300" y="293" fill="#f8fafc" font-family="monospace" font-size="12" text-anchor="middle">Write Single Register</text>
    <text x="580" y="293" fill="#94a3b8" font-family="Sarabun" font-size="12" text-anchor="middle">เขียนค่าลง Register 1 ตัว</text>

    <rect x="30" y="303" width="740" height="25" rx="0" fill="rgba(139,92,246,0.08)"/>
    <text x="100" y="320" fill="#a78bfa" font-family="monospace" font-size="12" text-anchor="middle">0x10</text>
    <text x="300" y="320" fill="#f8fafc" font-family="monospace" font-size="12" text-anchor="middle">Write Multiple Registers</text>
    <text x="580" y="320" fill="#94a3b8" font-family="Sarabun" font-size="12" text-anchor="middle">เขียนค่าลง Register หลายตัวพร้อมกัน</text>

    <!-- Example -->
    <text x="30" y="348" fill="#f59e0b" font-family="Sarabun" font-size="13" font-weight="bold">ตัวอย่าง: อ่านค่า Register ของ Slave #1 → [0x01] [0x03] [0x00 0x00] [0x00 0x01] [CRC_Lo] [CRC_Hi]</text>
</svg>
`;

// RS485 Multi-drop Network Topology SVG
const rs485NetworkSvg = `
<svg viewBox="0 0 800 300" width="100%" height="100%">
    <text x="400" y="25" fill="#f8fafc" font-family="Sarabun" font-size="18" font-weight="bold" text-anchor="middle">โครงสร้างเครือข่าย RS485 (Multi-drop Bus)</text>

    <!-- Bus Lines -->
    <path d="M 50 120 L 750 120" stroke="#f59e0b" stroke-width="4"/>
    <path d="M 50 150 L 750 150" stroke="#0ea5e9" stroke-width="4"/>
    <text x="400" y="110" fill="#f59e0b" font-family="monospace" font-size="14" font-weight="bold" text-anchor="middle">A (+)</text>
    <text x="400" y="175" fill="#0ea5e9" font-family="monospace" font-size="14" font-weight="bold" text-anchor="middle">B (-)</text>

    <!-- Terminating Resistor Left -->
    <path d="M 60 120 L 60 125 L 55 128 L 65 132 L 55 136 L 65 140 L 55 144 L 60 147 L 60 150" stroke="#fff" stroke-width="2" fill="none"/>
    <text x="75" y="140" fill="#fff" font-family="monospace" font-size="10">120Ω</text>

    <!-- Master Node -->
    <path d="M 150 120 L 150 200" stroke="#f59e0b" stroke-width="2"/>
    <path d="M 160 150 L 160 200" stroke="#0ea5e9" stroke-width="2"/>
    <rect x="120" y="200" width="80" height="35" rx="6" fill="#f59e0b"/>
    <text x="160" y="222" fill="#fff" font-family="monospace" font-size="10" text-anchor="middle">Transceiver</text>
    <rect x="120" y="240" width="80" height="45" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="2"/>
    <text x="160" y="262" fill="#f43f5e" font-family="monospace" font-size="13" font-weight="bold" text-anchor="middle">MASTER</text>
    <text x="160" y="278" fill="#94a3b8" font-family="monospace" font-size="9" text-anchor="middle">Addr: 0x00</text>

    <!-- Slave 1 -->
    <path d="M 320" y="120 L 320 200" stroke="#f59e0b" stroke-width="2"/>
    <path d="M 330 150 L 330 200" stroke="#0ea5e9" stroke-width="2"/>
    <rect x="290" y="200" width="80" height="35" rx="6" fill="#f59e0b"/>
    <text x="330" y="222" fill="#fff" font-family="monospace" font-size="10" text-anchor="middle">Transceiver</text>
    <rect x="290" y="240" width="80" height="45" rx="6" fill="#1e293b" stroke="#4ade80" stroke-width="2"/>
    <text x="330" y="262" fill="#4ade80" font-family="monospace" font-size="13" font-weight="bold" text-anchor="middle">SLAVE 1</text>
    <text x="330" y="278" fill="#94a3b8" font-family="monospace" font-size="9" text-anchor="middle">Addr: 0x01</text>

    <!-- Slave 2 -->
    <path d="M 490 120 L 490 200" stroke="#f59e0b" stroke-width="2"/>
    <path d="M 500 150 L 500 200" stroke="#0ea5e9" stroke-width="2"/>
    <rect x="460" y="200" width="80" height="35" rx="6" fill="#f59e0b"/>
    <text x="500" y="222" fill="#fff" font-family="monospace" font-size="10" text-anchor="middle">Transceiver</text>
    <rect x="460" y="240" width="80" height="45" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
    <text x="500" y="262" fill="#38bdf8" font-family="monospace" font-size="13" font-weight="bold" text-anchor="middle">SLAVE 2</text>
    <text x="500" y="278" fill="#94a3b8" font-family="monospace" font-size="9" text-anchor="middle">Addr: 0x02</text>

    <!-- Slave N -->
    <path d="M 660 120 L 660 200" stroke="#f59e0b" stroke-width="2"/>
    <path d="M 670 150 L 670 200" stroke="#0ea5e9" stroke-width="2"/>
    <rect x="630" y="200" width="80" height="35" rx="6" fill="#f59e0b"/>
    <text x="670" y="222" fill="#fff" font-family="monospace" font-size="10" text-anchor="middle">Transceiver</text>
    <rect x="630" y="240" width="80" height="45" rx="6" fill="#1e293b" stroke="#a78bfa" stroke-width="2"/>
    <text x="670" y="262" fill="#a78bfa" font-family="monospace" font-size="13" font-weight="bold" text-anchor="middle">SLAVE N</text>
    <text x="670" y="278" fill="#94a3b8" font-family="monospace" font-size="9" text-anchor="middle">Addr: 0x1F</text>

    <!-- Dots -->
    <text x="575" y="268" fill="#94a3b8" font-size="24" text-anchor="middle">···</text>

    <!-- Terminating Resistor Right -->
    <path d="M 740 120 L 740 125 L 735 128 L 745 132 L 735 136 L 745 140 L 735 144 L 740 147 L 740 150" stroke="#fff" stroke-width="2" fill="none"/>
    <text x="720" y="140" fill="#fff" font-family="monospace" font-size="10">120Ω</text>

    <!-- Animated Data Packet -->
    <rect x="150" y="115" width="30" height="40" rx="4" fill="rgba(244,63,94,0.6)" stroke="#f43f5e" stroke-width="1">
        <animate attributeName="x" values="150;660;150" dur="3s" repeatCount="indefinite"/>
    </rect>
    <text x="165" y="140" fill="#fff" font-family="monospace" font-size="9" text-anchor="middle">PKT
        <animate attributeName="x" values="165;675;165" dur="3s" repeatCount="indefinite"/>
    </text>
</svg>
`;


// =============================================
// Intro Diagrams for Simulator Section
// =============================================

const uartConnectionSvg = `
<svg viewBox="0 0 800 350" width="100%" height="100%">
    <text x="400" y="30" fill="#f8fafc" font-family="Sarabun" font-size="18" font-weight="bold" text-anchor="middle">วงจรเชื่อมต่อ UART (TTL) ระหว่าง 2 อุปกรณ์</text>

    <!-- MCU A -->
    <rect x="50" y="80" width="160" height="140" rx="10" fill="#1e293b" stroke="#f43f5e" stroke-width="2"/>
    <text x="130" y="110" fill="#fff" font-family="monospace" font-size="16" text-anchor="middle">MCU A</text>
    <text x="130" y="135" fill="#94a3b8" font-family="Sarabun" font-size="12" text-anchor="middle">(Arduino Uno)</text>
    <text x="210" y="165" fill="#f43f5e" font-family="monospace" font-size="13">Tx (Pin 1)</text>
    <text x="210" y="200" fill="#0ea5e9" font-family="monospace" font-size="13">Rx (Pin 0)</text>

    <!-- MCU B -->
    <rect x="550" y="80" width="160" height="140" rx="10" fill="#1e293b" stroke="#4ade80" stroke-width="2"/>
    <text x="630" y="110" fill="#fff" font-family="monospace" font-size="16" text-anchor="middle">MCU B</text>
    <text x="630" y="135" fill="#94a3b8" font-family="Sarabun" font-size="12" text-anchor="middle">(Arduino Uno)</text>
    <text x="540" y="165" fill="#0ea5e9" font-family="monospace" font-size="13" text-anchor="end">Rx (Pin 0)</text>
    <text x="540" y="200" fill="#f43f5e" font-family="monospace" font-size="13" text-anchor="end">Tx (Pin 1)</text>

    <!-- Cross Wiring -->
    <path d="M 300 160 L 550 195" stroke="#f43f5e" stroke-width="3" fill="none"/>
    <path d="M 300 195 L 550 160" stroke="#0ea5e9" stroke-width="3" fill="none"/>
    
    <!-- GND -->
    <path d="M 130 220 L 130 270 L 630 270 L 630 220" stroke="#94a3b8" stroke-width="2" stroke-dasharray="6 3" fill="none"/>
    <text x="380" y="290" fill="#94a3b8" font-family="monospace" font-size="13" text-anchor="middle">GND (สายกราวด์ร่วม)</text>

    <!-- Labels -->
    <text x="420" y="155" fill="#f43f5e" font-family="Sarabun" font-size="13" text-anchor="middle">Tx → Rx (ต่อไขว้)</text>
    <text x="420" y="210" fill="#0ea5e9" font-family="Sarabun" font-size="13" text-anchor="middle">Rx ← Tx (ต่อไขว้)</text>

    <!-- Animated data -->
    <circle cx="300" cy="160" r="5" fill="#f43f5e">
        <animate attributeName="cx" values="300;550;300" dur="1.5s" repeatCount="indefinite"/>
        <animate attributeName="cy" values="160;195;160" dur="1.5s" repeatCount="indefinite"/>
    </circle>
    <circle cx="550" cy="160" r="5" fill="#0ea5e9">
        <animate attributeName="cx" values="550;300;550" dur="1.5s" repeatCount="indefinite"/>
        <animate attributeName="cy" values="160;195;160" dur="1.5s" repeatCount="indefinite"/>
    </circle>

    <!-- Info -->
    <text x="50" y="330" fill="#f8fafc" font-family="Sarabun" font-size="13">⚡ สำคัญ: ต้องตั้ง Baud rate ให้ตรงกันทั้ง 2 ฝั่ง  |  สาย Tx-Rx ต้องต่อไขว้กัน  |  GND ต้องต่อร่วมกัน</text>
</svg>
`;

const rs232ConnectionSvg = `
<svg viewBox="0 0 800 320" width="100%" height="100%">
    <text x="400" y="30" fill="#f8fafc" font-family="Sarabun" font-size="18" font-weight="bold" text-anchor="middle">วงจรเชื่อมต่อ RS232 ผ่าน MAX232</text>

    <!-- MCU -->
    <rect x="30" y="80" width="100" height="100" rx="8" fill="#1e293b" stroke="#f43f5e" stroke-width="2"/>
    <text x="80" y="120" fill="#fff" font-family="monospace" font-size="14" text-anchor="middle">MCU</text>
    <text x="80" y="140" fill="#94a3b8" font-family="Sarabun" font-size="11" text-anchor="middle">(TTL 5V)</text>

    <!-- MAX232 A -->
    <rect x="180" y="70" width="100" height="120" rx="8" fill="#0ea5e9"/>
    <text x="230" y="115" fill="#fff" font-family="monospace" font-size="14" font-weight="bold" text-anchor="middle">MAX232</text>
    <text x="230" y="135" fill="#fff" font-family="Sarabun" font-size="11" text-anchor="middle">TTL ⇄ RS232</text>

    <!-- DB9 Connector -->
    <path d="M 380 90 Q 420 70 460 90 L 460 170 Q 420 190 380 170 Z" fill="#334155" stroke="#94a3b8" stroke-width="2"/>
    <text x="420" y="135" fill="#fff" font-family="monospace" font-size="14" text-anchor="middle">DB-9</text>

    <!-- Cable -->
    <path d="M 460 130 L 540 130" stroke="#94a3b8" stroke-width="4" stroke-dasharray="8 4"/>
    <text x="500" y="120" fill="#94a3b8" font-family="Sarabun" font-size="12" text-anchor="middle">≤15m</text>

    <!-- DB9 Connector 2 -->
    <path d="M 540 90 Q 580 70 620 90 L 620 170 Q 580 190 540 170 Z" fill="#334155" stroke="#94a3b8" stroke-width="2"/>
    <text x="580" y="135" fill="#fff" font-family="monospace" font-size="14" text-anchor="middle">DB-9</text>

    <!-- MAX232 B -->
    <rect x="660" y="70" width="100" height="120" rx="8" fill="#0ea5e9"/>
    <text x="710" y="115" fill="#fff" font-family="monospace" font-size="14" font-weight="bold" text-anchor="middle">MAX232</text>
    <text x="710" y="135" fill="#fff" font-family="Sarabun" font-size="11" text-anchor="middle">RS232 ⇄ TTL</text>

    <!-- Wires -->
    <path d="M 130 110 L 180 110" stroke="#f43f5e" stroke-width="2"/>
    <path d="M 130 150 L 180 150" stroke="#0ea5e9" stroke-width="2"/>
    <path d="M 280 130 L 380 130" stroke="#0ea5e9" stroke-width="2"/>

    <!-- MCU 2 -->
    <rect x="770" y="80" width="0" height="0" rx="8"/>

    <!-- Voltage Annotations -->
    <text x="155" y="105" fill="#f43f5e" font-family="monospace" font-size="10">Tx</text>
    <text x="155" y="160" fill="#0ea5e9" font-family="monospace" font-size="10">Rx</text>
    <text x="340" y="95" fill="#94a3b8" font-family="monospace" font-size="10">±12V</text>

    <!-- Animated data -->
    <circle cx="130" cy="110" r="4" fill="#fff">
        <animate attributeName="cx" values="130;380;130" dur="2s" repeatCount="indefinite"/>
    </circle>

    <!-- Explanation -->
    <text x="30" y="230" fill="#f8fafc" font-family="Sarabun" font-size="14" font-weight="bold">ขั้นตอนการทำงาน:</text>
    <text x="30" y="250" fill="#f43f5e" font-family="Sarabun" font-size="13">1. MCU ส่งสัญญาณ UART (TTL 0-5V) ผ่าน Tx</text>
    <text x="30" y="270" fill="#0ea5e9" font-family="Sarabun" font-size="13">2. MAX232 แปลงระดับแรงดันเป็น RS232 (+12V/-12V)</text>
    <text x="30" y="290" fill="#94a3b8" font-family="Sarabun" font-size="13">3. สัญญาณวิ่งผ่านสาย DB-9 ได้ไกลถึง 15 เมตร</text>
    <text x="30" y="310" fill="#4ade80" font-family="Sarabun" font-size="13">4. MAX232 ฝั่งรับ แปลงกลับเป็น TTL ส่งให้ MCU ปลายทาง</text>
</svg>
`;


// =============================================
// Content Data (Injected into HTML sections)
// =============================================

const contentData = {
    intro: `
        <div class="card">
            <h1>มาตรฐานรับส่งข้อมูลแบบอนุกรม (UART, RS232, RS485)</h1>
            <p>การสื่อสารแบบอนุกรม (Serial Communication) คือการส่งข้อมูลไปทีละบิตผ่านสายสัญญาณเพียง 1 หรือ 2 เส้น โปรโตคอลที่เป็นพื้นฐานที่สุดคือ <strong>UART</strong> แต่เนื่องจากมีข้อจำกัดด้านระยะทาง จึงมีการพัฒนามาตรฐานระดับแรงดันไฟฟ้า (Voltage Level) ขึ้นมาเพื่อแก้ปัญหา ได้แก่ <strong>RS232</strong> และ <strong>RS485</strong> ซึ่งใช้กันอย่างแพร่หลายในวงการอุตสาหกรรม</p>
        </div>

        <!-- ========== UART Section ========== -->
        <div class="card">
            <h2 style="color: var(--uart-color);">1. UART (Universal Asynchronous Receiver-Transmitter)</h2>
            <p>UART เป็นโปรโตคอลพื้นฐานที่สุดของการสื่อสารอนุกรม สื่อสารผ่านสาย <strong>Tx</strong> (ส่ง) และ <strong>Rx</strong> (รับ) โดย<strong>ไม่ต้องใช้สัญญาณนาฬิกา (Clock)</strong> แต่ทั้ง 2 ฝั่งต้องตั้งค่า Baud rate, Parity, Data bits, Stop bits ให้ตรงกัน</p>
            <ul class="feature-list">
                <li>ระดับแรงดัน TTL: 0V (ลอจิก 0) และ 5V หรือ 3.3V (ลอจิก 1)</li>
                <li><strong>ข้อจำกัด:</strong> ระยะทางสั้น (ไม่เกิน 1-2 เมตร) เชื่อมต่อได้เพียง 2 อุปกรณ์</li>
            </ul>

            <h3 style="color: var(--uart-color);">📦 รูปแบบ Data Frame (โครงสร้างข้อมูล 1 ชุด)</h3>
            <p>ข้อมูล UART ถูกแบ่งเป็น "เฟรม" แต่ละเฟรมประกอบด้วยส่วนต่าง ๆ ดังนี้:</p>
            <div class="intro-diagram">
                ${uartFrameSvg}
            </div>

            <div style="margin-top: 15px; padding: 15px; background: #f1f5f9; border-radius: 8px; border-left: 4px solid var(--uart-color);">
                <p style="margin-bottom: 5px;"><strong>ค่าเริ่มต้นมาตรฐาน (Default):</strong></p>
                <p style="margin-bottom: 0;"><code style="background: #e2e8f0; padding: 2px 6px; border-radius: 4px;">9600 8N1</code> = Baud rate 9600 bps, Data 8 bits, No parity, Stop 1 bit</p>
            </div>
        </div>

        <!-- ========== RS232 Section ========== -->
        <div class="card">
            <h2 style="color: var(--rs232-color);">2. RS232 (Recommended Standard 232)</h2>
            <p>RS232 ถูกพัฒนาขึ้นเพื่อขยายระยะทางของ UART โดยการ<strong>แปลงระดับแรงดัน TTL</strong> ให้เป็นแรงดันที่สูงขึ้น ทำให้สัญญาณทนทานต่อสัญญาณรบกวนได้ดีกว่า</p>
            <ul class="feature-list">
                <li>แปลงลอจิก UART เป็นแรงดันสูง: <strong>+3V ถึง +12V</strong> (ลอจิก 0) และ <strong>-3V ถึง -12V</strong> (ลอจิก 1)</li>
                <li>รองรับระยะทางประมาณ <strong>15 เมตร</strong> (50 ฟุต)</li>
                <li>การเชื่อมต่อแบบ <strong>Point-to-Point</strong> (ตัวต่อตัว เท่านั้น)</li>
                <li><strong>ข้อจำกัด:</strong> ใช้สัญญาณแบบ Single-ended (อ้างอิง GND เส้นเดียว) ทำให้เกิดสัญญาณรบกวนได้ง่าย</li>
            </ul>

            <h3 style="color: var(--rs232-color);">⚡ โครงสร้าง Data Frame เหมือน UART (แต่แรงดันกลับกัน!)</h3>
            <p>RS232 ใช้โครงสร้าง Data Frame <strong>เดียวกันกับ UART</strong> ทุกประการ (Start bit → Data bits → Parity → Stop bit) แต่ระดับแรงดันไฟฟ้าจะถูก <strong>"กลับ (Inverted)"</strong> ผ่าน IC MAX232</p>
            <div class="intro-diagram">
                ${rs232VoltageSvg}
            </div>
        </div>

        <!-- ========== RS485 Section ========== -->
        <div class="card">
            <h2 style="color: var(--rs485-color);">3. RS485 (มาตรฐานอุตสาหกรรม)</h2>
            <p>RS485 เป็นมาตรฐานที่ออกแบบมาสำหรับ<strong>งานอุตสาหกรรม</strong>โดยเฉพาะ ส่งสัญญาณแบบ <strong>Differential</strong> (ผลต่างแรงดันระหว่างสาย A และ B) ทำให้ทนทานต่อสัญญาณรบกวนได้ดีเยี่ยม</p>
            <ul class="feature-list">
                <li>ระยะทางไกลสูงสุดถึง <strong>1,200 เมตร</strong></li>
                <li>เชื่อมต่อแบบ <strong>Multi-drop</strong> ได้สูงสุด 32 อุปกรณ์บนบัสเดียวกัน</li>
                <li>สื่อสารแบบ <strong>Half-Duplex</strong> (สลับกันส่ง/รับ บนสาย 2 เส้น)</li>
                <li>ปลายสายทั้ง 2 ด้านต้องมี <strong>Terminating Resistor 120Ω</strong></li>
            </ul>

            <h3 style="color: var(--rs485-color);">🌐 โครงสร้างเครือข่าย Multi-drop</h3>
            <p>อุปกรณ์ทุกตัวต่อพ่วงบนบัสเดียวกัน (สาย A, B) โดยแต่ละตัวมี <strong>Address</strong> ไม่ซ้ำกัน เมื่อ Master ส่งคำสั่ง เฉพาะ Slave ที่มี Address ตรงกันเท่านั้นจะตอบกลับ</p>
            <div class="intro-diagram">
                ${rs485NetworkSvg}
            </div>
        </div>

        <div class="card">
            <h3 style="color: var(--rs485-color);">📡 โปรโตคอล Modbus RTU (โปรโตคอลยอดนิยมบน RS485)</h3>
            <p>Modbus RTU เป็นโปรโตคอลระดับแอปพลิเคชันที่นิยมใช้มากที่สุดบน RS485 ทำงานแบบ <strong>Master-Slave</strong> โดย Master จะเป็นผู้เริ่มส่งคำสั่ง (Request) เสมอ และ Slave จะตอบกลับ (Response)</p>
            <ul class="feature-list">
                <li><strong>Slave Address:</strong> ระบุหมายเลขอุปกรณ์ปลายทาง (1-247)</li>
                <li><strong>Function Code:</strong> ระบุว่าจะ อ่าน (Read) หรือ เขียน (Write) ข้อมูลชนิดใด</li>
                <li><strong>Data:</strong> ระบุ Register Address และจำนวน/ค่าข้อมูลที่จะอ่านหรือเขียน</li>
                <li><strong>CRC-16:</strong> ค่าตรวจสอบความถูกต้องของข้อมูลทั้ง Frame</li>
            </ul>
            <div class="intro-diagram" style="aspect-ratio: 16/7;">
                ${rs485ProtocolSvg}
            </div>

            <div style="margin-top: 15px; padding: 15px; background: #fffbeb; border-radius: 8px; border-left: 4px solid var(--rs485-color);">
                <p style="margin-bottom: 5px;"><strong>💡 หลักการทำงาน Modbus RTU:</strong></p>
                <p style="margin-bottom: 5px;">1. <strong>Master</strong> ส่ง Request Frame → ระบุ Slave Address + Function Code + Data + CRC</p>
                <p style="margin-bottom: 5px;">2. <strong>Slave</strong> ที่มี Address ตรง จะประมวลผลและส่ง Response Frame กลับ</p>
                <p style="margin-bottom: 5px;">3. Slave ที่ Address ไม่ตรงจะ <strong>ไม่ทำอะไรเลย</strong> (เงียบ)</p>
                <p style="margin-bottom: 0;">4. หากไม่มี Slave ตอบกลับภายในเวลาที่กำหนด → Master จะถือว่าเกิด <strong>Timeout Error</strong></p>
            </div>
        </div>
    `,
    simulator: `
        <div class="card">
            <h2>วงจรจำลอง (1): การเชื่อมต่อ UART (TTL)</h2>
            <p>แสดงการเชื่อมต่อ UART ระหว่าง Arduino 2 ตัว สังเกตว่าสาย <strong>Tx-Rx ต้องต่อไขว้กัน</strong></p>
            <div class="simulator-canvas">
                ${uartConnectionSvg}
            </div>
        </div>

        <div class="card">
            <h2>วงจรจำลอง (2): การเชื่อมต่อ RS232 ผ่าน MAX232</h2>
            <p>แสดงขั้นตอนการแปลงสัญญาณ TTL → RS232 → TTL ผ่านไอซี MAX232 และสาย DB-9</p>
            <div class="simulator-canvas">
                ${rs232ConnectionSvg}
            </div>
        </div>

        <div class="card">
            <h2>วงจรจำลอง (3): เครือข่าย RS485 Multi-drop</h2>
            <p>แสดงโครงสร้าง Bus ของ RS485 ที่ต่อพ่วง Master กับ Slave หลายตัว</p>
            <div class="simulator-canvas">
                ${rs485NetworkSvg}
            </div>
        </div>

        <div class="card">
            <h2>ตัวอย่างโค้ด Arduino</h2>
            <div class="code-editor">
                <span class="comment">// ===== ตัวอย่าง 1: UART พื้นฐาน =====</span><br>
                <span class="keyword">void</span> <span class="function">setup</span>() {<br>
                &nbsp;&nbsp;Serial.<span class="function">begin</span>(<span class="number">9600</span>); <span class="comment">// ตั้งค่า Baud rate 9600 bps</span><br>
                }<br><br>
                <span class="keyword">void</span> <span class="function">loop</span>() {<br>
                &nbsp;&nbsp;Serial.<span class="function">println</span>(<span class="string">"Hello UART!"</span>);<br>
                &nbsp;&nbsp;<span class="function">delay</span>(<span class="number">1000</span>);<br>
                }<br><br>
                <span class="comment">// ===== ตัวอย่าง 2: RS485 Half-Duplex =====</span><br>
                <span class="keyword">#define</span> DE_RE_PIN <span class="number">2</span> <span class="comment">// ขาควบคุม Direction (DE/RE ของ MAX485)</span><br><br>
                <span class="keyword">void</span> <span class="function">setup</span>() {<br>
                &nbsp;&nbsp;Serial.<span class="function">begin</span>(<span class="number">9600</span>);<br>
                &nbsp;&nbsp;<span class="function">pinMode</span>(DE_RE_PIN, <span class="keyword">OUTPUT</span>);<br>
                }<br><br>
                <span class="keyword">void</span> <span class="function">sendRS485</span>(<span class="keyword">String</span> msg) {<br>
                &nbsp;&nbsp;<span class="function">digitalWrite</span>(DE_RE_PIN, <span class="keyword">HIGH</span>); <span class="comment">// เปิดโหมดส่ง</span><br>
                &nbsp;&nbsp;Serial.<span class="function">println</span>(msg);<br>
                &nbsp;&nbsp;Serial.<span class="function">flush</span>(); <span class="comment">// รอส่งจนเสร็จ</span><br>
                &nbsp;&nbsp;<span class="function">digitalWrite</span>(DE_RE_PIN, <span class="keyword">LOW</span>); <span class="comment">// กลับไปโหมดรับ</span><br>
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


// =============================================
// Quiz Questions (30 Questions)
// =============================================

const quizQuestions = [
    // --- UART Questions (1-10) ---
    { q: "1. UART ย่อมาจากอะไร?", options: ["Universal Asynchronous Receiver/Transmitter", "Universal Analog Receiver/Transmitter", "Unified Asynchronous Router/Transmitter", "Universal Automatic Receiver/Transmitter"], answer: 0 },
    { q: "2. UART เป็นการสื่อสารแบบใด?", options: ["Synchronous (ใช้สายนาฬิกา)", "Asynchronous (ไม่ใช้สายนาฬิกา)", "Parallel (แบบขนาน)", "Wireless (ไร้สาย)"], answer: 1 },
    { q: "3. ขาใดใช้สำหรับส่งข้อมูลใน UART?", options: ["Rx (Receive)", "SCL (Clock)", "Tx (Transmit)", "SDA (Data)"], answer: 2 },
    { q: "4. การเชื่อมต่อ UART ระหว่างสองอุปกรณ์ต้องต่อสายอย่างไร?", options: ["Tx ต่อ Tx, Rx ต่อ Rx", "Tx ต่อ Rx, Rx ต่อ Tx (ต่อไขว้)", "Tx ต่อ VCC, Rx ต่อ GND", "ใช้เพียงเส้นเดียว"], answer: 1 },
    { q: "5. Baud rate ใน UART คืออะไร?", options: ["ความจุของหน่วยความจำ", "ความเร็วในการรับส่งข้อมูล (bits per second)", "ระดับแรงดันไฟฟ้าของสัญญาณ", "ระยะทางสูงสุดที่ส่งได้"], answer: 1 },
    { q: "6. สิ่งใดที่ 'จำเป็น' ต้องตั้งให้ตรงกันทั้งสองฝั่งในการส่ง UART?", options: ["ความจุของแบตเตอรี่", "รุ่นของไมโครคอนโทรลเลอร์", "สีของสายไฟ", "Baud rate (ความเร็ว)"], answer: 3 },
    { q: "7. UART Data Frame เริ่มต้นด้วยบิตใด?", options: ["Start bit (ลอจิก 0 / LOW)", "Start bit (ลอจิก 1 / HIGH)", "Stop bit", "Parity bit"], answer: 0 },
    { q: "8. UART Data Frame สิ้นสุดด้วยบิตใด?", options: ["Start bit", "Parity bit", "Stop bit (ลอจิก 1 / HIGH)", "Data bit"], answer: 2 },
    { q: "9. Parity bit ใน UART มีหน้าที่อะไร?", options: ["เพิ่มความเร็วในการส่ง", "ตรวจสอบความผิดพลาดของข้อมูล (Error Detection)", "ลดเสียงรบกวน", "กำหนด Baud rate"], answer: 1 },
    { q: "10. ค่ามาตรฐาน '9600 8N1' หมายถึงอะไร?", options: ["ส่งได้ 9600 เมตร, 8 สาย, ไม่ใช้ Parity", "Baud 9600, Data 8 bits, No parity, Stop 1 bit", "9600 ไบต์, 8 ช่อง, 1 เฟรม", "ไม่มีข้อใดถูก"], answer: 1 },

    // --- RS232 Questions (11-20) ---
    { q: "11. มาตรฐาน RS232 สร้างขึ้นเพื่อแก้ปัญหาใดของ UART?", options: ["ลดจำนวนสายไฟ", "เพิ่มระดับแรงดันไฟฟ้าเพื่อให้ส่งข้อมูลได้ไกลขึ้น", "เปลี่ยนให้เป็นแบบไร้สาย", "เพิ่มความเร็ว Clock"], answer: 1 },
    { q: "12. ระดับแรงดันไฟฟ้าของ RS232 สำหรับลอจิก '1' (Mark) คือเท่าใด?", options: ["0V ถึง 5V", "3.3V", "-3V ถึง -15V", "+3V ถึง +15V"], answer: 2 },
    { q: "13. ระดับแรงดันไฟฟ้าของ RS232 สำหรับลอจิก '0' (Space) คือเท่าใด?", options: ["0V ถึง 5V", "3.3V", "-3V ถึง -15V", "+3V ถึง +15V"], answer: 3 },
    { q: "14. พอร์ตมาตรฐานที่นิยมใช้กับ RS232 คือพอร์ตใด?", options: ["USB", "HDMI", "DB9 (9 pin)", "VGA"], answer: 2 },
    { q: "15. RS232 สามารถต่ออุปกรณ์ได้สูงสุดกี่ตัวบนสายเดียวกัน?", options: ["2 ตัว (Point-to-Point)", "10 ตัว", "32 ตัว", "128 ตัว"], answer: 0 },
    { q: "16. ระยะทางสูงสุดที่ RS232 ทำงานได้ดีอยู่ที่ประมาณเท่าใด?", options: ["1 เมตร", "15 เมตร (50 ฟุต)", "1,000 เมตร", "10 กิโลเมตร"], answer: 1 },
    { q: "17. ไอซีที่แปลงระดับแรงดัน TTL เป็น RS232 ที่นิยมใช้คือเบอร์ใด?", options: ["L298N", "NE555", "MAX232", "MAX485"], answer: 2 },
    { q: "18. หากต่อ Tx ของ UART (5V) เข้ากับอุปกรณ์ RS232 โดยตรง จะเกิดอะไรขึ้น?", options: ["ทำงานปกติ", "อุปกรณ์อาจเสียหาย เพราะแรงดันไม่ตรงมาตรฐาน", "ส่งข้อมูลเร็วขึ้น", "ไม่มีผลใด ๆ"], answer: 1 },
    { q: "19. โครงสร้าง Data Frame ของ RS232 เป็นอย่างไร?", options: ["เหมือน UART ทุกประการ แต่แรงดันถูกกลับ (Inverted)", "แตกต่างจาก UART อย่างสิ้นเชิง", "ไม่มี Start bit", "ไม่มี Stop bit"], answer: 0 },
    { q: "20. RS232 สามารถสื่อสารแบบ Full-Duplex ได้หรือไม่?", options: ["ไม่ได้เลย", "ได้ เพราะมีสาย Tx และ Rx แยกกัน", "ได้เฉพาะ Baud rate ต่ำ", "ได้เฉพาะตอนกลางวัน"], answer: 1 },

    // --- RS485 Questions (21-30) ---
    { q: "21. คุณสมบัติเด่นของสัญญาณแบบ RS485 คืออะไร?", options: ["ไร้สาย", "ใช้สัญญาณแบบ Differential (สาย A และ B)", "ใช้แสงในการส่งข้อมูล", "อ้างอิงไฟ 220V"], answer: 1 },
    { q: "22. RS485 สามารถส่งข้อมูลได้ไกลสูงสุดประมาณเท่าใด?", options: ["15 เมตร", "100 เมตร", "1,200 เมตร (4,000 ฟุต)", "10 กิโลเมตร"], answer: 2 },
    { q: "23. จำนวนอุปกรณ์สูงสุดบนบัส RS485 มาตรฐานคือเท่าใด?", options: ["2 ตัว", "10 ตัว", "32 ตัว", "256 ตัว"], answer: 2 },
    { q: "24. การสื่อสาร RS485 (ระบบ 2 สาย) เป็นแบบใด?", options: ["Simplex (ส่งทางเดียว)", "Half-Duplex (สลับกันส่งและรับ)", "Full-Duplex", "No-Duplex"], answer: 1 },
    { q: "25. โปรโตคอลที่นิยมใช้บน RS485 มากที่สุดในงานอุตสาหกรรมคือโปรโตคอลใด?", options: ["HTTP", "Modbus RTU", "Bluetooth", "I2C"], answer: 1 },
    { q: "26. Modbus RTU Frame ประกอบด้วยส่วนใดบ้าง?", options: ["Header, Body, Footer", "Slave Address, Function Code, Data, CRC-16", "IP, Port, Payload", "Start, Data, Parity, Stop"], answer: 1 },
    { q: "27. Function Code 0x03 ใน Modbus RTU ใช้ทำอะไร?", options: ["Write Single Coil", "Read Holding Registers (อ่านค่า Register)", "Write Multiple Registers", "Read Coils"], answer: 1 },
    { q: "28. Terminating Resistor ที่ปลายสาย RS485 มีค่ากี่โอห์ม?", options: ["10 โอห์ม", "47 โอห์ม", "120 โอห์ม", "1000 โอห์ม"], answer: 2 },
    { q: "29. ในระบบ Modbus RTU ใครเป็นผู้เริ่มส่งคำสั่งเสมอ?", options: ["Slave ตัวใดก็ได้", "Master เท่านั้น", "ส่งพร้อมกันทุกตัว", "Router"], answer: 1 },
    { q: "30. ข้อใดคือเหตุผลหลักที่โรงงานอุตสาหกรรมนิยมใช้ RS485?", options: ["ราคาแพงที่สุด", "ทนทานต่อสัญญาณรบกวนดีเยี่ยมและลากสายได้ไกล", "ความเร็วสูงกว่า USB 3.0", "ไม่ต้องเขียนโปรแกรม"], answer: 1 }
];


// =============================================
// Navigation & Quiz Engine
// =============================================

let currentQuestion = 0;
let score = 0;

function renderNavigation() {
    const navItems = document.querySelectorAll('#nav-menu li[data-section]');
    const contentArea = document.getElementById('content-area');

    // Default load intro
    contentArea.innerHTML = contentData['intro'];

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            const section = item.getAttribute('data-section');
            contentArea.innerHTML = contentData[section];
            
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
        let resultMsg = score === quizQuestions.length 
            ? "สุดยอด! คุณมีความรู้เรื่อง Data Serial อย่างทะลุปรุโปร่ง 🎉" 
            : "พยายามอีกนิดนะ กลับไปทบทวนทฤษฎีแล้วลองใหม่! 💪";
        
        quizContainer.innerHTML = `
            <div id="quiz-result-card">
                <h2>ผลการทดสอบ</h2>
                <div class="score-display">${score} / ${quizQuestions.length}</div>
                <div class="result-message">${resultMsg}</div>
                ${score < quizQuestions.length ? `<button onclick="resetQuiz()">กลับไปทำแบบทดสอบใหม่</button>` : ''}
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
