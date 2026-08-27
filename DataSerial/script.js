// SVG Definitions for Intro Diagrams
const i2cIntroSvg = `
<svg viewBox="0 0 600 300" width="100%" height="100%">
    <!-- Nodes -->
    <rect x="20" y="20" width="90" height="70" rx="8" fill="#00979C"/>
    <text x="65" y="60" fill="#fff" font-family="monospace" font-size="14" text-anchor="middle">Master</text>

    <rect x="250" y="20" width="90" height="70" rx="8" fill="#475569"/>
    <text x="295" y="60" fill="#fff" font-family="monospace" font-size="14" text-anchor="middle">Slave 1</text>

    <rect x="450" y="20" width="90" height="70" rx="8" fill="#475569"/>
    <text x="495" y="60" fill="#fff" font-family="monospace" font-size="14" text-anchor="middle">Slave 2</text>

    <!-- VCC & Resistors -->
    <text x="180" y="15" fill="#ef4444" font-family="monospace" font-size="12" text-anchor="middle">VCC</text>
    <path d="M 170 20 L 190 20" stroke="#ef4444" stroke-width="2"/>
    <!-- R1 -->
    <path d="M 175 20 L 175 30 L 170 35 L 180 40 L 170 45 L 180 50 L 175 55 L 175 80" stroke="#ef4444" stroke-width="2" fill="none"/>
    <!-- R2 -->
    <path d="M 185 20 L 185 30 L 180 35 L 190 40 L 180 45 L 190 50 L 185 55 L 185 60" stroke="#ef4444" stroke-width="2" fill="none"/>

    <!-- I2C Lines -->
    <path d="M 110 80 L 500 80" stroke="#facc15" stroke-width="3" fill="none"/>
    <text x="130" y="75" fill="#facc15" font-family="monospace" font-size="14" font-weight="bold">SCL</text>
    <path d="M 295 80 L 295 90" stroke="#facc15" stroke-width="2"/>
    <path d="M 495 80 L 495 90" stroke="#facc15" stroke-width="2"/>

    <path d="M 110 60 L 500 60" stroke="#3b82f6" stroke-width="3" fill="none"/>
    <text x="130" y="55" fill="#3b82f6" font-family="monospace" font-size="14" font-weight="bold">SDA</text>
    <path d="M 295 60 L 295 20" stroke="#3b82f6" stroke-width="2"/>
    <path d="M 495 60 L 495 20" stroke="#3b82f6" stroke-width="2"/>

    <!-- Logic Timing Section -->
    <text x="20" y="140" fill="#f8fafc" font-family="Sarabun" font-size="16" font-weight="bold">Logic Timing (อนิเมชันลำดับสัญญาณ)</text>
    
    <text x="20" y="180" fill="#facc15" font-family="monospace" font-size="14">SCL</text>
    <path d="M 60 180 L 90 180 L 90 200 L 120 200 L 120 180 L 150 180 L 150 200 L 180 200 L 180 180 L 210 180 L 210 200 L 240 200 L 240 180 L 270 180 L 270 200 L 300 200 L 300 180 L 350 180" stroke="#facc15" stroke-width="2" fill="none"/>
    
    <text x="20" y="230" fill="#3b82f6" font-family="monospace" font-size="14">SDA</text>
    <path d="M 60 210 L 80 210 L 80 230 L 140 230 L 140 210 L 170 210 L 170 230 L 230 230 L 230 210 L 260 210 L 260 230 L 320 230 L 320 210 L 350 210" stroke="#3b82f6" stroke-width="2" fill="none"/>

    <!-- Grid Lines / States -->
    <line x1="80" y1="160" x2="80" y2="250" stroke="#475569" stroke-width="1" stroke-dasharray="4"/>
    <text x="75" y="265" fill="#ef4444" font-size="10" font-family="monospace">START</text>
    
    <line x1="170" y1="160" x2="170" y2="250" stroke="#475569" stroke-width="1" stroke-dasharray="4"/>
    <text x="125" y="265" fill="#4ade80" font-size="10" font-family="monospace">ADDR</text>
    
    <line x1="230" y1="160" x2="230" y2="250" stroke="#475569" stroke-width="1" stroke-dasharray="4"/>
    <text x="200" y="265" fill="#facc15" font-size="10" font-family="monospace">ACK</text>
    
    <line x1="320" y1="160" x2="320" y2="250" stroke="#475569" stroke-width="1" stroke-dasharray="4"/>
    <text x="275" y="265" fill="#4ade80" font-size="10" font-family="monospace">DATA</text>

    <text x="335" y="265" fill="#ef4444" font-size="10" font-family="monospace">STOP</text>

    <!-- Scanner Animation -->
    <rect x="60" y="160" width="15" height="90" fill="rgba(255,255,255,0.2)" rx="4">
        <animate attributeName="x" values="60;350;60" dur="4s" repeatCount="indefinite" />
    </rect>
</svg>
`;

const spiIntroSvg = `
<svg viewBox="0 0 600 300" width="100%" height="100%">
    <!-- Nodes -->
    <rect x="20" y="20" width="90" height="90" rx="8" fill="#00979C"/>
    <text x="65" y="70" fill="#fff" font-family="monospace" font-size="14" text-anchor="middle">Master</text>

    <rect x="300" y="20" width="90" height="90" rx="8" fill="#475569"/>
    <text x="345" y="70" fill="#fff" font-family="monospace" font-size="14" text-anchor="middle">Slave</text>

    <!-- SPI Lines -->
    <path d="M 110 35 L 300 35" stroke="#facc15" stroke-width="2" fill="none"/>
    <text x="205" y="30" fill="#facc15" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">SCK</text>

    <path d="M 110 55 L 300 55" stroke="#8b5cf6" stroke-width="2" fill="none"/>
    <text x="205" y="50" fill="#8b5cf6" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">MOSI</text>

    <path d="M 110 75 L 300 75" stroke="#3b82f6" stroke-width="2" fill="none"/>
    <text x="205" y="70" fill="#3b82f6" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">MISO</text>

    <path d="M 110 95 L 300 95" stroke="#ef4444" stroke-width="2" fill="none"/>
    <text x="205" y="90" fill="#ef4444" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">CS / SS</text>

    <!-- Logic Timing Section -->
    <text x="20" y="150" fill="#f8fafc" font-family="Sarabun" font-size="16" font-weight="bold">Logic Timing (อนิเมชันลำดับสัญญาณ)</text>
    
    <text x="20" y="180" fill="#ef4444" font-family="monospace" font-size="12">CS</text>
    <path d="M 60 170 L 80 170 L 80 190 L 320 190 L 320 170 L 350 170" stroke="#ef4444" stroke-width="2" fill="none"/>
    
    <text x="20" y="210" fill="#facc15" font-family="monospace" font-size="12">SCK</text>
    <path d="M 60 210 L 90 210 L 90 195 L 110 195 L 110 210 L 130 210 L 130 195 L 150 195 L 150 210 L 170 210 L 170 195 L 190 195 L 190 210 L 210 210 L 210 195 L 230 195 L 230 210 L 250 210 L 250 195 L 270 195 L 270 210 L 350 210" stroke="#facc15" stroke-width="2" fill="none"/>
    
    <text x="20" y="240" fill="#8b5cf6" font-family="monospace" font-size="12">MOSI</text>
    <path d="M 60 240 L 90 240 L 100 225 L 140 225 L 150 240 L 190 240 L 200 225 L 240 225 L 250 240 L 290 240 L 300 225 L 350 225" stroke="#8b5cf6" stroke-width="2" fill="none"/>

    <text x="20" y="270" fill="#3b82f6" font-family="monospace" font-size="12">MISO</text>
    <path d="M 60 270 L 90 270 L 100 255 L 120 255 L 130 270 L 170 270 L 180 255 L 220 255 L 230 270 L 270 270 L 280 255 L 350 255" stroke="#3b82f6" stroke-width="2" fill="none"/>

    <!-- Grid Lines / States -->
    <line x1="80" y1="160" x2="80" y2="280" stroke="#475569" stroke-width="1" stroke-dasharray="4"/>
    <text x="70" y="295" fill="#ef4444" font-size="10" font-family="monospace">ACTIVE</text>

    <line x1="320" y1="160" x2="320" y2="280" stroke="#475569" stroke-width="1" stroke-dasharray="4"/>
    <text x="310" y="295" fill="#ef4444" font-size="10" font-family="monospace">IDLE</text>

    <!-- Scanner Animation -->
    <rect x="60" y="165" width="15" height="120" fill="rgba(255,255,255,0.2)" rx="4">
        <animate attributeName="x" values="60;350;60" dur="4s" repeatCount="indefinite" />
    </rect>
</svg>
`;

// Data Configuration
const contentData = {
    intro: `
        <div class="card">
            <h1>การสื่อสารข้อมูลแบบ I2C และ SPI</h1>
            <p>ในการสร้างโปรเจกต์ไมโครคอนโทรลเลอร์ที่มีเซนเซอร์หลายตัว หรือต้องการหน้าจอแสดงผล เรามักจะใช้การสื่อสารแบบอนุกรม (Serial Communication) เพื่อประหยัดขาใช้งานของไมโครคอนโทรลเลอร์ โปรโตคอลที่ได้รับความนิยมสูงคือ <strong>I2C</strong> และ <strong>SPI</strong></p>
        </div>
        <div class="grid-2">
            <div class="card">
                <h2 style="color: var(--i2c-color);">I2C (Inter-Integrated Circuit)</h2>
                <p>เป็นการสื่อสารแบบ Half-Duplex ใช้สายสัญญาณเพียง 2 เส้น คือ:</p>
                <ul class="feature-list">
                    <li><strong>SDA (Serial Data)</strong>: สายส่ง/รับข้อมูล</li>
                    <li><strong>SCL (Serial Clock)</strong>: สายสัญญาณนาฬิกา</li>
                </ul>
                <p><strong>จุดเด่น:</strong> ใช้ขาน้อยมาก (2 ขา) สามารถต่ออุปกรณ์ (Slave) ได้หลายตัวบนสายคู่เดียวกัน โดยอ้างอิงผ่าน Address (ที่อยู่) ของแต่ละอุปกรณ์</p>
                <p><strong>ข้อจำกัด:</strong> ความเร็วต่ำกว่า SPI และไม่สามารถรับ-ส่งข้อมูลพร้อมกันได้</p>
                
                <div class="intro-diagram">
                    ${i2cIntroSvg}
                </div>

                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; margin-top: 15px; border-left: 4px solid var(--i2c-color);">
                    <h4 style="color: var(--i2c-color); margin-bottom: 5px;">⚠️ จุดสำคัญช่างเทคนิค: ตัวต้านทาน Pull-Up บนบัส I2C</h4>
                    <p style="font-size: 0.85rem; margin-bottom: 6px;">สาย SDA และ SCL เป็นวงจรแบบ <strong>Open-Drain</strong> (ดึงลง 0V ได้อย่างเดียว) จึง<strong>จำเป็นต้องต่อตัวต้านทาน Pull-Up ขนาด 4.7kΩ - 10kΩ ดึงไว้ที่ VCC เสมอ</strong> หากลืมต่อ สัญญาณจะลอยและสื่อสารไม่ได้เลย (แต่โมดูลเซนเซอร์ส่วนใหญ่จะมี Pull-up ในตัวมาให้แล้ว)</p>
                </div>
            </div>

            <div class="card">
                <h2 style="color: var(--spi-color);">SPI (Serial Peripheral Interface)</h2>
                <p>เป็นการสื่อสารแบบ Full-Duplex ใช้สายสัญญาณหลัก 3 เส้น และสายเลือกอุปกรณ์ 1 เส้นต่อ 1 อุปกรณ์:</p>
                <ul class="feature-list">
                    <li><strong>MOSI (Master Out Slave In)</strong>: สายข้อมูลจาก Master ไป Slave</li>
                    <li><strong>MISO (Master In Slave Out)</strong>: สายข้อมูลจาก Slave กลับมา Master</li>
                    <li><strong>SCK (Serial Clock)</strong>: สายสัญญาณนาฬิกา</li>
                    <li><strong>CS / SS (Chip Select / Slave Select)</strong>: สายสำหรับเลือกอุปกรณ์ที่จะคุยด้วย (Active LOW)</li>
                </ul>
                <p><strong>จุดเด่น:</strong> ความเร็วสูงมาก (10-50+ MHz) รับ-ส่งข้อมูลได้พร้อมกัน เหมาะสำหรับงานที่ต้องการความเร็วสูง เช่น หน้าจอ TFT, SD Card, RFID</p>
                <p><strong>ข้อจำกัด:</strong> ใช้สายเยอะ ยิ่งมีอุปกรณ์มาก ยิ่งต้องใช้ขา CS มากขึ้น</p>

                <div class="intro-diagram">
                    ${spiIntroSvg}
                </div>

                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; margin-top: 15px; border-left: 4px solid var(--spi-color);">
                    <h4 style="color: var(--spi-color); margin-bottom: 5px;">⚙️ SPI Modes (CPOL & CPHA: Mode 0-3)</h4>
                    <p style="font-size: 0.85rem; margin-bottom: 6px;">อุปกรณ์ SPI แต่ละตัวอาจอ่านข้อมูลในจังหวะ Clock ต่างกัน นิยมใช้ <strong>SPI_MODE0</strong> (CPOL=0, CPHA=0) ใน Arduino กำหนดด้วย:</p>
                    <code style="font-size: 0.8rem; background: #e2e8f0; padding: 2px 4px; border-radius: 4px;">SPI.beginTransaction(SPISettings(4000000, MSBFIRST, SPI_MODE0));</code>
                </div>
            </div>
        </div>

        <!-- I2C Address Scanner Card -->
        <div class="card" style="margin-top: 20px;">
            <h2 style="color: var(--i2c-color);">🔍 เครื่องมือช่าง: โค้ดสแกนหา Address อุปกรณ์ I2C (I2C Scanner)</h2>
            <p>เมื่อต่อจอ LCD หรือเซนเซอร์ใหม่ แล้วไม่รู้ว่า Address คืออะไร (เช่น 0x27 หรือ 0x3F) ให้รันโค้ดสแกนนี้ใน Arduino IDE:</p>
            <div class="code-block" style="background: #1e1e1e; color: #d4d4d4; padding: 15px; border-radius: 8px; font-family: 'Fira Code', monospace; font-size: 0.88rem; overflow-x: auto;">
<span style="color: #569cd6;">#include</span> <span style="color: #ce9178;">&lt;Wire.h&gt;</span>

<span style="color: #569cd6;">void</span> <span style="color: #dcdcaa;">setup</span>() {
  <span style="color: #4ec9b0;">Wire</span>.<span style="color: #dcdcaa;">begin</span>();
  <span style="color: #4ec9b0;">Serial</span>.<span style="color: #dcdcaa;">begin</span>(<span style="color: #b5cea8;">9600</span>);
  <span style="color: #4ec9b0;">Serial</span>.<span style="color: #dcdcaa;">println</span>(<span style="color: #ce9178;">"Scanning I2C Bus..."</span>);
}

<span style="color: #569cd6;">void</span> <span style="color: #dcdcaa;">loop</span>() {
  <span style="color: #569cd6;">for</span> (<span style="color: #569cd6;">byte</span> address = <span style="color: #b5cea8;">1</span>; address &lt; <span style="color: #b5cea8;">127</span>; address++) {
    <span style="color: #4ec9b0;">Wire</span>.<span style="color: #dcdcaa;">beginTransmission</span>(address);
    <span style="color: #569cd6;">if</span> (<span style="color: #4ec9b0;">Wire</span>.<span style="color: #dcdcaa;">endTransmission</span>() == <span style="color: #b5cea8;">0</span>) {
      <span style="color: #4ec9b0;">Serial</span>.<span style="color: #dcdcaa;">print</span>(<span style="color: #ce9178;">"พบอุปกรณ์ที่ Address: 0x"</span>);
      <span style="color: #4ec9b0;">Serial</span>.<span style="color: #dcdcaa;">println</span>(address, <span style="color: #b5cea8;">HEX</span>);
    }
  }
  <span style="color: #dcdcaa;">delay</span>(<span style="color: #b5cea8;">5000</span>);
}
            </div>
        </div>
    `,
    quiz: [
        { q: "โปรโตคอล I2C ใช้สายสัญญาณกี่เส้นในการสื่อสารข้อมูลและสัญญาณนาฬิกา?", options: ["1 เส้น", "2 เส้น", "3 เส้น", "4 เส้น"], ans: 1 },
        { q: "ข้อใดคือชื่อขาที่ใช้ส่งข้อมูลในระบบ I2C?", options: ["MOSI", "MISO", "SDA", "SCK"], ans: 2 },
        { q: "ในระบบ SPI ขาใดทำหน้าที่ส่งข้อมูลจาก Master ไปยัง Slave?", options: ["MOSI", "MISO", "SDA", "SCL"], ans: 0 },
        { q: "ระบบการสื่อสารใดที่ใช้การระบุ 'Address' (ที่อยู่) ของอุปกรณ์เพื่อเลือกตัวที่จะสื่อสารด้วย?", options: ["SPI", "I2C", "UART", "ถูกทั้ง I2C และ SPI"], ans: 1 },
        { q: "หากต้องการเชื่อมต่ออุปกรณ์ Slave จำนวน 3 ตัว ระบบ SPI ต้องใช้สายสัญญาณทั้งหมดกี่เส้น?", options: ["2 เส้น", "4 เส้น", "6 เส้น", "3 เส้น (หลัก) + 3 เส้น (CS) = 6 เส้น"], ans: 3 },
        { q: "ข้อใดคือข้อดีของ SPI เมื่อเทียบกับ I2C?", options: ["ใช้สายสัญญาณน้อยกว่า", "มีความเร็วในการรับส่งข้อมูลสูงกว่า", "ต่อสายได้ระยะทางไกลกว่ามาก", "ใช้พลังงานน้อยกว่าเสมอ"], ans: 1 },
        { q: "การสื่อสารแบบใดที่เป็นแบบ Full-Duplex (รับและส่งข้อมูลพร้อมกันได้)?", options: ["I2C", "SPI", "1-Wire", "ถูกทั้ง I2C และ SPI"], ans: 1 },
        { q: "ใน Arduino ไลบรารีใดที่ใช้สำหรับการสื่อสาร I2C?", options: ["SPI.h", "Wire.h", "Serial.h", "I2C.h"], ans: 1 },
        { q: "ใน Arduino การเริ่มต้นส่งข้อมูลหาอุปกรณ์ I2C ต้องใช้คำสั่งใด?", options: ["SPI.beginTransaction()", "Wire.beginTransmission(address)", "Serial.begin()", "I2C.start()"], ans: 1 },
        { q: "ขา CS (Chip Select) หรือ SS (Slave Select) ในระบบ SPI ทำหน้าที่อะไร?", options: ["สร้างสัญญาณนาฬิกา", "กำหนดความเร็วในการส่งข้อมูล", "เลือกอุปกรณ์ Slave ที่ต้องการจะสื่อสารด้วยโดยดึงให้เป็น LOW", "ส่งข้อมูลหลัก"], ans: 2 }
    ]
};

const appState = {
    mode: 'i2c', // 'i2c' or 'spi'
    simAnimating: false,
    quizScore: 0
};

// SVG Definitions
const i2cSvg = `
<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
    <!-- Master -->
    <rect x="50" y="150" width="160" height="200" rx="10" fill="#00979C"/>
    <text x="130" y="250" fill="white" font-size="16" font-family="monospace" text-anchor="middle">Arduino (Master)</text>
    
    <!-- Slave 1 -->
    <rect id="i2c-slave1" x="550" y="50" width="120" height="100" rx="10" fill="#475569" class="slave-board"/>
    <text x="610" y="100" fill="white" font-size="14" font-family="monospace" text-anchor="middle">Slave (0x27)</text>
    
    <!-- Slave 2 -->
    <rect id="i2c-slave2" x="550" y="350" width="120" height="100" rx="10" fill="#475569" class="slave-board"/>
    <text x="610" y="400" fill="white" font-size="14" font-family="monospace" text-anchor="middle">Slave (0x3F)</text>

    <!-- SDA Wire -->
    <path id="sda-path1" d="M 210 200 L 450 200 L 450 100 L 550 100" class="wire wire-i2c" />
    <path id="sda-path2" d="M 450 200 L 450 400 L 550 400" class="wire wire-i2c" />
    <text x="300" y="190" fill="#3b82f6" font-family="monospace" font-weight="bold">SDA (Data)</text>

    <!-- SCL Wire -->
    <path id="scl-path1" d="M 210 280 L 400 280 L 400 80 L 550 80" class="wire wire-vcc" />
    <path id="scl-path2" d="M 400 280 L 400 380 L 550 380" class="wire wire-vcc" />
    <text x="300" y="270" fill="#facc15" font-family="monospace" font-weight="bold">SCL (Clock)</text>
    
    <!-- Animation Packets -->
    <circle id="i2c-packet" class="data-packet" fill="#fff" r="8"/>
</svg>`;

const spiSvg = `
<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
    <!-- Master -->
    <rect x="50" y="150" width="160" height="200" rx="10" fill="#00979C"/>
    <text x="130" y="250" fill="white" font-size="16" font-family="monospace" text-anchor="middle">Arduino (Master)</text>
    
    <!-- Slave 1 -->
    <rect id="spi-slave1" x="550" y="50" width="120" height="100" rx="10" fill="#475569" class="slave-board"/>
    <text x="610" y="100" fill="white" font-size="14" font-family="monospace" text-anchor="middle">Slave 1 (CS 10)</text>
    
    <!-- Slave 2 -->
    <rect id="spi-slave2" x="550" y="350" width="120" height="100" rx="10" fill="#475569" class="slave-board"/>
    <text x="610" y="400" fill="white" font-size="14" font-family="monospace" text-anchor="middle">Slave 2 (CS 9)</text>

    <!-- SCK -->
    <path id="sck-path1" d="M 210 260 L 480 260 L 480 80 L 550 80" class="wire wire-vcc" />
    <path id="sck-path2" d="M 480 260 L 480 380 L 550 380" class="wire wire-vcc" />
    <text x="300" y="250" fill="#facc15" font-family="monospace" font-weight="bold">SCK</text>

    <!-- MOSI -->
    <path id="mosi-path1" d="M 210 220 L 420 220 L 420 100 L 550 100" class="wire wire-spi" />
    <path id="mosi-path2" d="M 420 220 L 420 400 L 550 400" class="wire wire-spi" />
    <text x="300" y="210" fill="#8b5cf6" font-family="monospace" font-weight="bold">MOSI</text>

    <!-- MISO -->
    <path id="miso-path1" d="M 210 180 L 380 180 L 380 120 L 550 120" class="wire wire-i2c" />
    <path id="miso-path2" d="M 380 180 L 380 420 L 550 420" class="wire wire-i2c" />
    <text x="300" y="170" fill="#3b82f6" font-family="monospace" font-weight="bold">MISO</text>

    <!-- CS1 -->
    <path id="cs1-path" d="M 210 140 L 330 140 L 330 60 L 550 60" class="wire wire-cs1" stroke="#ef4444" />
    <text x="260" y="130" fill="#ef4444" font-family="monospace" font-weight="bold">CS (10)</text>

    <!-- CS2 -->
    <path id="cs2-path" d="M 210 300 L 330 300 L 330 440 L 550 440" class="wire wire-cs2" stroke="#f97316" />
    <text x="260" y="295" fill="#f97316" font-family="monospace" font-weight="bold">CS (9)</text>
    
    <!-- Packets -->
    <circle id="spi-packet-mosi" class="data-packet" fill="#fff" r="6"/>
    <circle id="spi-packet-miso" class="data-packet" fill="#fff" r="6"/>
</svg>`;

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    renderSection('intro');
});

function setupNavigation() {
    const navItems = document.querySelectorAll('#nav-menu li');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            document.querySelector('#nav-menu li.active').classList.remove('active');
            item.classList.add('active');
            renderSection(item.dataset.section);
        });
    });
}

function renderSection(sectionId) {
    const contentArea = document.getElementById('content-area');
    contentArea.innerHTML = ''; // Clear current

    if (sectionId === 'intro') {
        contentArea.innerHTML = `<div class="section active">${contentData.intro}</div>`;
    } else if (sectionId === 'simulator') {
        renderSimulator(contentArea);
    } else if (sectionId === 'quiz') {
        renderQuiz(contentArea);
    }
}

function renderSimulator(container) {
    const html = `
        <div class="section active">
            <div class="sim-controls">
                <button id="btn-i2c" class="${appState.mode === 'i2c' ? 'active-tab' : 'secondary-btn'}">I2C Simulator</button>
                <button id="btn-spi" class="${appState.mode === 'spi' ? 'active-tab' : 'secondary-btn'}">SPI Simulator</button>
            </div>
            <div class="grid-sim">
                <div class="card" style="padding: 10px;">
                    <div class="simulator-canvas" id="canvas-container">
                        ${appState.mode === 'i2c' ? i2cSvg : spiSvg}
                    </div>
                    <div class="action-controls">
                        ${getSimulatorButtons()}
                    </div>
                </div>
                <div class="card code-editor">
                    <div class="code-header">
                        <span>Arduino IDE (mock)</span>
                    </div>
                    <pre><code id="code-block">${getCodeSnippet()}</code></pre>
                </div>
            </div>
        </div>
    `;
    container.innerHTML = html;

    // Attach Tab Listeners
    document.getElementById('btn-i2c').addEventListener('click', () => {
        if(appState.simAnimating) return;
        appState.mode = 'i2c';
        renderSimulator(container);
    });
    document.getElementById('btn-spi').addEventListener('click', () => {
        if(appState.simAnimating) return;
        appState.mode = 'spi';
        renderSimulator(container);
    });

    // Attach Action Listeners
    if (appState.mode === 'i2c') {
        document.getElementById('act-i2c-1').addEventListener('click', () => animateI2C(1));
        document.getElementById('act-i2c-2').addEventListener('click', () => animateI2C(2));
    } else {
        document.getElementById('act-spi-1').addEventListener('click', () => animateSPI(1));
        document.getElementById('act-spi-2').addEventListener('click', () => animateSPI(2));
    }
}

function getSimulatorButtons() {
    if (appState.mode === 'i2c') {
        return `
            <button id="act-i2c-1">ส่งข้อมูลให้ Slave 0x27</button>
            <button id="act-i2c-2" class="secondary-btn">ส่งข้อมูลให้ Slave 0x3F</button>
        `;
    }
    return `
        <button id="act-spi-1">สื่อสารกับ CS10</button>
        <button id="act-spi-2" class="secondary-btn">สื่อสารกับ CS9</button>
    `;
}

function getCodeSnippet() {
    if (appState.mode === 'i2c') {
        return `#include &lt;Wire.h&gt;

void setup() {
  Wire.begin(); // เข้าร่วม I2C bus ในฐานะ Master
}

void loop() {
  // ส่งข้อมูลไปที่อุปกรณ์ Address 0x27
  Wire.beginTransmission(0x27);
  Wire.write("Hello"); 
  Wire.endTransmission();
  
  delay(1000);
}`;
    }
    return `#include &lt;SPI.h&gt;

const int CS_PIN = 10;

void setup() {
  pinMode(CS_PIN, OUTPUT);
  digitalWrite(CS_PIN, HIGH); // Inactive
  SPI.begin();
}

void loop() {
  // เลือกอุปกรณ์โดยดึง CS ให้เป็น LOW
  digitalWrite(CS_PIN, LOW); 
  
  SPI.beginTransaction(SPISettings(14000000, MSBFIRST, SPI_MODE0));
  SPI.transfer(0x55); // ส่งและรับข้อมูลพร้อมกัน
  SPI.endTransaction();
  
  // ยกเลิกการเลือกอุปกรณ์
  digitalWrite(CS_PIN, HIGH);
  
  delay(1000);
}`;
}

// Animations
function animateI2C(slaveNum) {
    if (appState.simAnimating) return;
    appState.simAnimating = true;

    const scl1 = document.getElementById('scl-path1');
    const scl2 = document.getElementById('scl-path2');
    const packet = document.getElementById('i2c-packet');
    const slave = document.getElementById('i2c-slave' + slaveNum);

    // Toggle SCL clock visualization
    scl1.classList.add('active-scl');
    scl2.classList.add('active-scl');

    // Setup motion path
    const pathId = slaveNum === 1 ? '#sda-path1' : '#sda-path2';
    packet.innerHTML = `<animateMotion dur="2s" repeatCount="1" fill="freeze">
                            <mpath href="${pathId}"/>
                        </animateMotion>`;
    packet.classList.add('animate-packet');

    // Highlight Slave on receive
    setTimeout(() => {
        slave.classList.add('active');
    }, 1500);

    setTimeout(() => {
        scl1.classList.remove('active-scl');
        scl2.classList.remove('active-scl');
        packet.classList.remove('animate-packet');
        packet.innerHTML = '';
        slave.classList.remove('active');
        appState.simAnimating = false;
    }, 2500);
}

function animateSPI(slaveNum) {
    if (appState.simAnimating) return;
    appState.simAnimating = true;

    const sck1 = document.getElementById('sck-path1');
    const sck2 = document.getElementById('sck-path2');
    const cs = document.getElementById(slaveNum === 1 ? 'cs1-path' : 'cs2-path');
    const mosiP = document.getElementById('spi-packet-mosi');
    const misoP = document.getElementById('spi-packet-miso');
    const slave = document.getElementById('spi-slave' + slaveNum);

    // Pull CS Low (visualize)
    cs.classList.add('active-cs');

    setTimeout(() => {
        sck1.classList.add('active-scl');
        sck2.classList.add('active-scl');
        
        const mosiPath = slaveNum === 1 ? '#mosi-path1' : '#mosi-path2';
        const misoPath = slaveNum === 1 ? '#miso-path1' : '#miso-path2';

        mosiP.innerHTML = `<animateMotion dur="1.5s" repeatCount="1" fill="freeze"><mpath href="${mosiPath}"/></animateMotion>`;
        mosiP.classList.add('animate-packet');

        // MISO flows backward. We fake it by just drawing a path or we can use keyPoints in SVG.
        // For simplicity in this demo, MISO will also flow from Master to Slave visually unless we create reverse paths. 
        // Let's create a reverse motion using keyPoints.
        misoP.innerHTML = `<animateMotion dur="1.5s" repeatCount="1" fill="freeze" keyPoints="1;0" keyTimes="0;1" calcMode="linear"><mpath href="${misoPath}"/></animateMotion>`;
        misoP.classList.add('animate-packet');

        slave.classList.add('active');
    }, 500);

    setTimeout(() => {
        sck1.classList.remove('active-scl');
        sck2.classList.remove('active-scl');
        mosiP.classList.remove('animate-packet');
        misoP.classList.remove('animate-packet');
        mosiP.innerHTML = '';
        misoP.innerHTML = '';
        cs.classList.remove('active-cs');
        slave.classList.remove('active');
        appState.simAnimating = false;
    }, 2500);
}

// Quiz Rendering
function renderQuiz(container) {
    let html = `<div class="section active"><div class="card">
        <h1>แบบทดสอบท้ายบท (I2C & SPI)</h1>
        <form id="quiz-form">`;

    contentData.quiz.forEach((q, i) => {
        html += `<div class="quiz-question" id="q-block-${i}">
            <p><strong>ข้อ ${i + 1}:</strong> ${q.q}</p>
            <ul class="quiz-options">`;
        q.options.forEach((opt, j) => {
            html += `
                <li id="opt-li-${i}-${j}">
                    <label>
                        <input type="radio" name="q${i}" value="${j}" required>
                        ${opt}
                    </label>
                </li>
            `;
        });
        html += `</ul></div>`;
    });

    html += `
            <div style="text-align: center;">
                <button type="submit" id="submit-btn">ส่งคำตอบ</button>
            </div>
        </form>
        <div id="quiz-result" class="quiz-result-msg"></div>
    </div></div>`;
    
    container.innerHTML = html;

    document.getElementById('quiz-form').addEventListener('submit', function(e) {
        e.preventDefault();
        evaluateQuiz();
    });
}

function evaluateQuiz() {
    let score = 0;
    const total = contentData.quiz.length;

    contentData.quiz.forEach((q, i) => {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        const block = document.getElementById(`q-block-${i}`);
        
        // Reset styles
        q.options.forEach((_, j) => {
            const li = document.getElementById(`opt-li-${i}-${j}`);
            li.classList.remove('correct-bg', 'incorrect-bg');
        });

        if (selected) {
            const ansVal = parseInt(selected.value);
            if (ansVal === q.ans) {
                score++;
                document.getElementById(`opt-li-${i}-${ansVal}`).classList.add('correct-bg');
            } else {
                document.getElementById(`opt-li-${i}-${ansVal}`).classList.add('incorrect-bg');
                document.getElementById(`opt-li-${i}-${q.ans}`).classList.add('correct-bg');
            }
        }
    });

    const resDiv = document.getElementById('quiz-result');
    if (score === total) {
        resDiv.innerHTML = `<span class="correct-answer">🎉 ยินดีด้วย! คุณได้คะแนน ${score} / ${total}</span>`;
        document.getElementById('submit-btn').style.display = 'none';
    } else {
        resDiv.innerHTML = `<span class="incorrect-answer">คุณได้คะแนน ${score} / ${total}</span><br>
        <button id="retry-btn" class="secondary-btn" style="margin-top: 15px;">กลับไปทำแบบทดสอบใหม่</button>`;
        document.getElementById('submit-btn').style.display = 'none';
        
        document.getElementById('retry-btn').addEventListener('click', () => {
            renderSection('quiz'); // re-render to reset
        });
    }
}
