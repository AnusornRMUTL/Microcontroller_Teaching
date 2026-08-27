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

    <!-- Scanner Animation (right-only) -->
    <rect x="90" y="40" width="8" height="130" fill="rgba(255,255,255,0.15)" rx="3">
        <animate attributeName="x" values="50;700" dur="5s" repeatCount="indefinite" />
    </rect>
</svg>
`;

// RS232 Voltage Level Comparison SVG — Stacked vertically with synced time axis
const rs232VoltageSvg = `
<svg viewBox="0 0 800 380" width="100%" height="100%">
    <text x="400" y="25" fill="#f8fafc" font-family="Sarabun" font-size="18" font-weight="bold" text-anchor="middle">เปรียบเทียบระดับแรงดัน TTL (UART) vs RS232 (แกนเวลาเดียวกัน)</text>

    <!-- ===== TTL (UART) Section — TOP ===== -->
    <text x="30" y="55" fill="#f43f5e" font-family="Sarabun" font-size="16" font-weight="bold">TTL (UART)</text>
    <text x="30" y="80" fill="#94a3b8" font-family="monospace" font-size="11">5V ──</text>
    <text x="30" y="140" fill="#94a3b8" font-family="monospace" font-size="11">0V ──</text>
    <line x1="80" y1="75" x2="80" y2="140" stroke="#475569" stroke-width="1"/>

    <!-- TTL Waveform -->
    <path d="M 80 130 L 80 75 L 160 75 L 160 130 L 240 130 L 240 75 L 320 75 L 320 130 L 400 130 L 400 75 L 480 75 L 480 130 L 560 130 L 560 75 L 640 75 L 640 130 L 720 130" stroke="#f43f5e" stroke-width="3" fill="none"/>

    <!-- TTL Logic Labels -->
    <text x="120" y="160" fill="#4ade80" font-family="monospace" font-size="11" text-anchor="middle">1</text>
    <text x="200" y="160" fill="#ef4444" font-family="monospace" font-size="11" text-anchor="middle">0</text>
    <text x="280" y="160" fill="#4ade80" font-family="monospace" font-size="11" text-anchor="middle">1</text>
    <text x="360" y="160" fill="#ef4444" font-family="monospace" font-size="11" text-anchor="middle">0</text>
    <text x="440" y="160" fill="#4ade80" font-family="monospace" font-size="11" text-anchor="middle">1</text>
    <text x="520" y="160" fill="#ef4444" font-family="monospace" font-size="11" text-anchor="middle">0</text>
    <text x="600" y="160" fill="#4ade80" font-family="monospace" font-size="11" text-anchor="middle">1</text>
    <text x="680" y="160" fill="#ef4444" font-family="monospace" font-size="11" text-anchor="middle">0</text>

    <!-- Separator + MAX232 label -->
    <line x1="30" y1="178" x2="770" y2="178" stroke="#475569" stroke-width="1" stroke-dasharray="6 3"/>
    <rect x="360" y="168" width="80" height="20" rx="4" fill="#0f172a"/>
    <text x="400" y="182" fill="#94a3b8" font-family="Sarabun" font-size="12" text-anchor="middle">▼ MAX232 ▼</text>

    <!-- ===== RS232 Section — BOTTOM ===== -->
    <text x="30" y="210" fill="#0ea5e9" font-family="Sarabun" font-size="16" font-weight="bold">RS232</text>
    <text x="22" y="235" fill="#94a3b8" font-family="monospace" font-size="11">+12V ──</text>
    <text x="30" y="270" fill="#94a3b8" font-family="monospace" font-size="11">0V ──</text>
    <text x="25" y="305" fill="#94a3b8" font-family="monospace" font-size="11">-12V ──</text>
    <line x1="80" y1="230" x2="80" y2="300" stroke="#475569" stroke-width="1"/>

    <!-- RS232 Waveform — INVERTED: logic 1 = -12V (bottom), logic 0 = +12V (top) -->
    <path d="M 80 300 L 80 235 L 160 235 L 160 300 L 240 300 L 240 235 L 320 235 L 320 300 L 400 300 L 400 235 L 480 235 L 480 300 L 560 300 L 560 235 L 640 235 L 640 300 L 720 300" stroke="#0ea5e9" stroke-width="3" fill="none"/>

    <!-- RS232 Logic Labels -->
    <text x="120" y="320" fill="#4ade80" font-family="monospace" font-size="11" text-anchor="middle">1</text>
    <text x="200" y="320" fill="#ef4444" font-family="monospace" font-size="11" text-anchor="middle">0</text>
    <text x="280" y="320" fill="#4ade80" font-family="monospace" font-size="11" text-anchor="middle">1</text>
    <text x="360" y="320" fill="#ef4444" font-family="monospace" font-size="11" text-anchor="middle">0</text>
    <text x="440" y="320" fill="#4ade80" font-family="monospace" font-size="11" text-anchor="middle">1</text>
    <text x="520" y="320" fill="#ef4444" font-family="monospace" font-size="11" text-anchor="middle">0</text>
    <text x="600" y="320" fill="#4ade80" font-family="monospace" font-size="11" text-anchor="middle">1</text>
    <text x="680" y="320" fill="#ef4444" font-family="monospace" font-size="11" text-anchor="middle">0</text>

    <!-- Vertical dashed grid lines (aligned time axis) -->
    <line x1="160" y1="70" x2="160" y2="310" stroke="#334155" stroke-width="1" stroke-dasharray="3 3"/>
    <line x1="240" y1="70" x2="240" y2="310" stroke="#334155" stroke-width="1" stroke-dasharray="3 3"/>
    <line x1="320" y1="70" x2="320" y2="310" stroke="#334155" stroke-width="1" stroke-dasharray="3 3"/>
    <line x1="400" y1="70" x2="400" y2="310" stroke="#334155" stroke-width="1" stroke-dasharray="3 3"/>
    <line x1="480" y1="70" x2="480" y2="310" stroke="#334155" stroke-width="1" stroke-dasharray="3 3"/>
    <line x1="560" y1="70" x2="560" y2="310" stroke="#334155" stroke-width="1" stroke-dasharray="3 3"/>
    <line x1="640" y1="70" x2="640" y2="310" stroke="#334155" stroke-width="1" stroke-dasharray="3 3"/>
    <line x1="720" y1="70" x2="720" y2="310" stroke="#334155" stroke-width="1" stroke-dasharray="3 3"/>

    <!-- Synchronized scanning line across BOTH graphs (right-only) -->
    <line x1="80" y1="65" x2="80" y2="310" stroke="rgba(255,255,255,0.4)" stroke-width="2">
        <animate attributeName="x1" values="80;720" dur="5s" repeatCount="indefinite"/>
        <animate attributeName="x2" values="80;720" dur="5s" repeatCount="indefinite"/>
    </line>

    <!-- Explanation -->
    <text x="30" y="345" fill="#f8fafc" font-family="Sarabun" font-size="14" font-weight="bold">สิ่งสำคัญ:</text>
    <text x="30" y="363" fill="#f43f5e" font-family="Sarabun" font-size="13">• TTL: ลอจิก 1 = +5V (สูง), ลอจิก 0 = 0V (ต่ำ)          • RS232: ลอจิก 1 = -12V (ต่ำ), ลอจิก 0 = +12V (สูง) → กลับกัน!</text>
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

    <!-- Scanning animation over the frame (right-only) -->
    <rect x="30" y="72" width="12" height="56" fill="rgba(255,255,255,0.2)" rx="3">
        <animate attributeName="x" values="30;760" dur="4s" repeatCount="indefinite" />
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
            <div class="intro-diagram" style="aspect-ratio: 2/1;">
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
                <p style="margin-bottom: 0;">4. <strong>3.5 Char Silence (Timeout):</strong> การเริ่มต้นและสิ้นสุด Frame ต้องมีช่วงเวลาเงียบอย่างน้อย 3.5 ตัวอักษร เช่น ที่ 9600 bps คือ ~4.01 ms</p>
            </div>

            <!-- MAX485 Direction Control Guide -->
            <div style="margin-top: 15px; padding: 15px; background: #f0fdf4; border-radius: 8px; border-left: 4px solid #10b981;">
                <h4 style="color: #15803d; margin-bottom: 5px;">🛠️ เคล็ดลับช่าง: การควบคุมทิศทางโมดูล MAX485 (ขา DE และ RE)</h4>
                <p style="font-size: 0.9rem; margin-bottom: 8px;">เนื่องจาก RS485 ทำงานแบบ Half-Duplex โมดูล MAX485 จึงมีขาควบคุมทิศทาง:</p>
                <ul style="font-size: 0.88rem; margin-left: 20px; line-height: 1.6;">
                    <li><strong>DE (Driver Enable) & RE (Receiver Enable):</strong> มักมัดรวมต่อเข้าขา Digital ขาเดียวกันของไมโครคอนโทรลเลอร์</li>
                    <li><strong>เมื่อต้องการส่ง (Transmit):</strong> สั่งขาเป็น <code>HIGH</code></li>
                    <li><strong>เมื่อส่งเสร็จ:</strong> <strong>ต้องสั่ง <code>Serial.flush();</code> ก่อน</strong> เพื่อรอให้ไบต์สุดท้ายออกจาก Hardware Buffer จนหมด แล้วจึงสั่งขากลับเป็น <code>LOW</code> เพื่อเข้าสู่โหมดรับ!</li>
                </ul>
            </div>
        </div>

        <!-- Master Comparison Summary Table -->
        <div class="card">
            <h2>📊 ตารางเปรียบเทียบมาตรฐานการสื่อสารยอดนิยม (Master Summary Table)</h2>
            <div style="overflow-x: auto; margin-top: 15px;">
                <table style="width: 100%; border-collapse: collapse; font-size: 0.88rem; text-align: left;">
                    <thead>
                        <tr style="background: #1e293b; color: white;">
                            <th style="padding: 10px;">มาตรฐาน</th>
                            <th style="padding: 10px;">ระดับแรงดัน</th>
                            <th style="padding: 10px;">ลักษณะสัญญาณ</th>
                            <th style="padding: 10px;">ระยะทางสูงสุด</th>
                            <th style="padding: 10px;">จำนวนอุปกรณ์</th>
                            <th style="padding: 10px;">โหมด Duplex</th>
                            <th style="padding: 10px;">สายสัญญาณหลัก</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom: 1px solid #e2e8f0; background: #fdf2f8;">
                            <td style="padding: 8px; font-weight: bold; color: var(--uart-color);">UART (TTL)</td>
                            <td>0V / 5V (หรือ 3.3V)</td>
                            <td>Single-ended</td>
                            <td>&lt; 1 - 2 เมตร</td>
                            <td>2 ตัว (Point-to-Point)</td>
                            <td>Full-Duplex</td>
                            <td>Tx, Rx, GND (3 เส้น)</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e2e8f0; background: #f0f9ff;">
                            <td style="padding: 8px; font-weight: bold; color: var(--rs232-color);">RS232</td>
                            <td>-12V (Logic 1) / +12V (Logic 0)</td>
                            <td>Single-ended (Invert)</td>
                            <td>~ 15 เมตร</td>
                            <td>2 ตัว (Point-to-Point)</td>
                            <td>Full-Duplex</td>
                            <td>Tx, Rx, GND (3 เส้น)</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e2e8f0; background: #fffbeb;">
                            <td style="padding: 8px; font-weight: bold; color: var(--rs485-color);">RS485</td>
                            <td>-7V ถึง +12V (ผลต่าง A-B)</td>
                            <td>Differential (+/-)</td>
                            <td><strong>1,200 เมตร</strong></td>
                            <td><strong>32 - 128 ตัว</strong></td>
                            <td>Half-Duplex</td>
                            <td>A, B (2 เส้น) + Shield</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e2e8f0;">
                            <td style="padding: 8px; font-weight: bold; color: #00979C;">I2C</td>
                            <td>0V / 3.3V หรือ 5V</td>
                            <td>Open-Drain (Pull-up)</td>
                            <td>&lt; 1 เมตร (บนบอร์ด)</td>
                            <td>127 ตัว (Address 7-bit)</td>
                            <td>Half-Duplex</td>
                            <td>SDA, SCL (2 เส้น)</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; font-weight: bold; color: #8b5cf6;">SPI</td>
                            <td>0V / 3.3V หรือ 5V</td>
                            <td>Single-ended (Push-pull)</td>
                            <td>&lt; 0.5 เมตร (ความเร็วสูง)</td>
                            <td>ขึ้นกับจำนวนขา CS</td>
                            <td>Full-Duplex</td>
                            <td>MOSI, MISO, SCK, CS (4+ เส้น)</td>
                        </tr>
                    </tbody>
                </table>
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
// Quiz Logic (Advanced Engine)
// =============================================
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
    ctx.fillText('ได้ผ่านการทดสอบความรู้ โมดูล 6: มาตรฐานรับส่งข้อมูล 2', canvas.width/2, 320);
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
                renderQuizHTML(document.getElementById('quiz-container'));
            }
        });
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderNavigation();
});
