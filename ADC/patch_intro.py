new_intro = """\
            <!-- Section 1: Intro -->
            <section id="intro" class="active">

                <!-- Hero Banner -->
                <div class="intro-hero">
                    <svg width="120" height="120" viewBox="0 0 120 120" style="flex-shrink:0">
                        <circle cx="60" cy="60" r="55" fill="#e0f7f7" stroke="#00979C" stroke-width="3"/>
                        <path d="M10,70 C20,45 30,75 45,40 C58,10 70,65 85,35 C97,10 108,55 110,60"
                            fill="none" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/>
                        <rect x="15" y="82" width="8" height="20" rx="2" fill="#3b82f6" opacity="0.8"/>
                        <rect x="27" y="72" width="8" height="30" rx="2" fill="#3b82f6" opacity="0.8"/>
                        <rect x="39" y="88" width="8" height="14" rx="2" fill="#3b82f6" opacity="0.8"/>
                        <rect x="51" y="76" width="8" height="26" rx="2" fill="#3b82f6" opacity="0.8"/>
                        <rect x="63" y="82" width="8" height="20" rx="2" fill="#3b82f6" opacity="0.8"/>
                        <rect x="75" y="68" width="8" height="34" rx="2" fill="#3b82f6" opacity="0.8"/>
                        <rect x="87" y="85" width="8" height="17" rx="2" fill="#3b82f6" opacity="0.8"/>
                        <text x="60" y="24" font-size="13" font-weight="bold" fill="#00979C" text-anchor="middle">ADC</text>
                    </svg>
                    <div class="intro-hero-text">
                        <h1>Analog-to-Digital Converter (ADC)</h1>
                        <p>วงจรแปลงสัญญาณแอนะล็อกเป็นดิจิทัล สะพานเชื่อมระหว่างโลกธรรมชาติและไมโครคอนโทรลเลอร์</p>
                    </div>
                </div>

                <!-- Card 1: Analog vs Digital -->
                <div class="card">
                    <h2 class="section-title">สัญญาณแอนะล็อก vs สัญญาณดิจิทัล</h2>
                    <p>ก่อนเข้าใจ ADC เราต้องรู้จักความแตกต่างของสัญญาณสองประเภทก่อนครับ</p>
                    <div class="adc-compare-grid">
                        <div class="compare-box analog">
                            <h4>Analog Signal (สัญญาณแอนะล็อก)</h4>
                            <svg width="100%" height="90" viewBox="0 0 240 90">
                                <path d="M0,45 C20,5 40,5 60,45 C80,85 100,85 120,45 C140,5 160,5 180,45 C200,85 220,85 240,45"
                                    fill="none" stroke="#f59e0b" stroke-width="3"/>
                                <path d="M0,45 C20,5 40,5 60,45 C80,85 100,85 120,45 C140,5 160,5 180,45 C200,85 220,85 240,45 L240,90 L0,90 Z"
                                    fill="#f59e0b" opacity="0.12"/>
                                <text x="120" y="86" font-size="10" fill="#92400e" text-anchor="middle">เปลี่ยนแปลงต่อเนื่อง ทุกค่าเป็นไปได้</text>
                            </svg>
                            <p style="font-size:0.9rem;margin-top:0.5rem"><strong>เช่น:</strong> เสียงพูด, อุณหภูมิ, แสง, ความดัน</p>
                        </div>
                        <div class="compare-box digital">
                            <h4>Digital Signal (สัญญาณดิจิทัล)</h4>
                            <svg width="100%" height="90" viewBox="0 0 240 90">
                                <polyline points="0,75 0,15 50,15 50,75 100,75 100,15 150,15 150,75 200,75 200,15 240,15"
                                    fill="none" stroke="#3b82f6" stroke-width="3" stroke-linejoin="round"/>
                                <text x="25" y="12" font-size="12" fill="#1d4ed8" text-anchor="middle" font-weight="bold">1</text>
                                <text x="75" y="88" font-size="12" fill="#1d4ed8" text-anchor="middle" font-weight="bold">0</text>
                                <text x="125" y="12" font-size="12" fill="#1d4ed8" text-anchor="middle" font-weight="bold">1</text>
                                <text x="175" y="88" font-size="12" fill="#1d4ed8" text-anchor="middle" font-weight="bold">0</text>
                                <text x="220" y="12" font-size="12" fill="#1d4ed8" text-anchor="middle" font-weight="bold">1</text>
                            </svg>
                            <p style="font-size:0.9rem;margin-top:0.5rem"><strong>มีเพียง 2 ค่า:</strong> HIGH (1) หรือ LOW (0)</p>
                        </div>
                    </div>
                    <svg style="width:100%;margin-top:1.5rem;background:white;border-radius:12px;border:1px solid #e2e8f0;padding:1rem" viewBox="0 0 560 70">
                        <rect x="0" y="8" width="110" height="52" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
                        <text x="55" y="32" font-size="12" text-anchor="middle" fill="#92400e">โลกธรรมชาติ</text>
                        <text x="55" y="50" font-size="11" text-anchor="middle" fill="#92400e">Analog Signal</text>
                        <line x1="110" y1="35" x2="180" y2="35" stroke="#94a3b8" stroke-width="2" stroke-dasharray="5,3"/>
                        <polygon points="180,30 195,35 180,40" fill="#94a3b8"/>
                        <rect x="195" y="8" width="170" height="52" rx="8" fill="#e0f7f7" stroke="#00979C" stroke-width="2"/>
                        <text x="280" y="32" font-size="14" font-weight="bold" text-anchor="middle" fill="#00979C">ADC (Converter)</text>
                        <text x="280" y="50" font-size="11" text-anchor="middle" fill="#007a7e">Analog to Digital</text>
                        <line x1="365" y1="35" x2="435" y2="35" stroke="#94a3b8" stroke-width="2" stroke-dasharray="5,3"/>
                        <polygon points="435,30 450,35 435,40" fill="#94a3b8"/>
                        <rect x="450" y="8" width="110" height="52" rx="8" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
                        <text x="505" y="32" font-size="12" text-anchor="middle" fill="#1d4ed8">ESP32</text>
                        <text x="505" y="50" font-size="11" text-anchor="middle" fill="#1d4ed8">Digital Data</text>
                    </svg>
                    <p style="text-align:center;color:var(--text-muted);font-size:0.95rem;margin-top:0.5rem">ADC ทำหน้าที่เป็นสะพานเชื่อมสัญญาณธรรมชาติเข้ากับไมโครคอนโทรลเลอร์</p>
                </div>

                <!-- Card 2: 4 Step ADC Process -->
                <div class="card">
                    <h2 class="section-title">4 ขั้นตอนของกระบวนการ ADC</h2>
                    <p>กระบวนการแปลงสัญญาณของ ADC มี <strong>4 ขั้นตอน</strong> ที่ทำงานตามลำดับ:</p>
                    <svg style="width:100%;background:white;border-radius:12px;border:1px solid #e2e8f0;padding:0.5rem;margin:1rem 0" viewBox="0 0 680 80">
                        <rect x="5" y="15" width="140" height="50" rx="10" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
                        <text x="75" y="38" font-size="12" font-weight="bold" text-anchor="middle" fill="#1d4ed8">1. Sampling</text>
                        <text x="75" y="56" font-size="11" text-anchor="middle" fill="#1d4ed8">สุ่มสัญญาณ</text>
                        <polygon points="148,40 165,33 165,47" fill="#94a3b8"/>
                        <rect x="168" y="15" width="140" height="50" rx="10" fill="#ede9fe" stroke="#8b5cf6" stroke-width="2"/>
                        <text x="238" y="38" font-size="12" font-weight="bold" text-anchor="middle" fill="#6d28d9">2. Holding</text>
                        <text x="238" y="56" font-size="11" text-anchor="middle" fill="#6d28d9">ค้างค่าสัญญาณ</text>
                        <polygon points="311,40 328,33 328,47" fill="#94a3b8"/>
                        <rect x="331" y="15" width="140" height="50" rx="10" fill="#fef9c3" stroke="#ca8a04" stroke-width="2"/>
                        <text x="401" y="38" font-size="12" font-weight="bold" text-anchor="middle" fill="#92400e">3. Quantizing</text>
                        <text x="401" y="56" font-size="11" text-anchor="middle" fill="#92400e">แบ่งระดับแรงดัน</text>
                        <polygon points="474,40 491,33 491,47" fill="#94a3b8"/>
                        <rect x="494" y="15" width="140" height="50" rx="10" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
                        <text x="564" y="38" font-size="12" font-weight="bold" text-anchor="middle" fill="#15803d">4. Encoding</text>
                        <text x="564" y="56" font-size="11" text-anchor="middle" fill="#15803d">แปลงเป็น Binary</text>
                    </svg>
                    <div class="step-grid">
                        <div class="step-card s1">
                            <div class="step-num">1</div>
                            <h4>Sampling (สุ่มสัญญาณ)</h4>
                            <p>วัดค่าแรงดันของสัญญาณแอนะล็อก ณ จุดเวลาที่กำหนด เหมือนถ่ายภาพสัญญาณ ณ ช่วงเวลาหนึ่งๆ</p>
                        </div>
                        <div class="step-card s2">
                            <div class="step-num">2</div>
                            <h4>Holding (ค้างค่า)</h4>
                            <p>เก็บค่าแรงดันที่วัดได้ให้คงที่ชั่วขณะ เพื่อให้วงจรในขั้นถัดไปแปลงค่าได้อย่างแม่นยำ</p>
                        </div>
                        <div class="step-card s3">
                            <div class="step-num">3</div>
                            <h4>Quantizing (แบ่งระดับ)</h4>
                            <p>จัดค่าแรงดันให้อยู่ในหนึ่งระดับจากทั้งหมด เช่น 4096 ระดับสำหรับ ADC 12-bit ของ ESP32</p>
                        </div>
                        <div class="step-card s4">
                            <div class="step-num">4</div>
                            <h4>Encoding (แปลงรหัส)</h4>
                            <p>แปลงหมายเลขระดับให้เป็นเลขฐานสอง (Binary) เก็บในรีจิสเตอร์ของ ESP32 พร้อมนำไปใช้งาน</p>
                        </div>
                    </div>
                    <p style="margin-top:1.5rem"><strong>ภาพประกอบ: Sampling</strong> จุดสีแดงคือค่าที่ ADC วัดได้แต่ละครั้ง</p>
                    <svg style="width:100%;background:white;border-radius:12px;border:1px solid #e2e8f0;padding:0.5rem" viewBox="0 0 560 130">
                        <line x1="35" y1="10" x2="35" y2="105" stroke="#475569" stroke-width="2"/>
                        <line x1="35" y1="100" x2="550" y2="100" stroke="#475569" stroke-width="2"/>
                        <text x="5" y="24" font-size="10" fill="#64748b">3.3V</text>
                        <text x="5" y="64" font-size="10" fill="#64748b">1.65V</text>
                        <text x="10" y="104" font-size="10" fill="#64748b">0V</text>
                        <path d="M35,60 C75,15 115,15 155,60 C195,100 235,100 275,60 C315,15 355,15 395,60 C435,100 475,100 510,60 C525,40 540,35 550,38"
                            fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-dasharray="6,3"/>
                        <line x1="90" y1="100" x2="90" y2="28" stroke="#3b82f6" stroke-width="1" stroke-dasharray="4,2" opacity="0.6"/>
                        <line x1="150" y1="100" x2="150" y2="52" stroke="#3b82f6" stroke-width="1" stroke-dasharray="4,2" opacity="0.6"/>
                        <line x1="210" y1="100" x2="210" y2="88" stroke="#3b82f6" stroke-width="1" stroke-dasharray="4,2" opacity="0.6"/>
                        <line x1="270" y1="100" x2="270" y2="68" stroke="#3b82f6" stroke-width="1" stroke-dasharray="4,2" opacity="0.6"/>
                        <line x1="330" y1="100" x2="330" y2="28" stroke="#3b82f6" stroke-width="1" stroke-dasharray="4,2" opacity="0.6"/>
                        <line x1="390" y1="100" x2="390" y2="52" stroke="#3b82f6" stroke-width="1" stroke-dasharray="4,2" opacity="0.6"/>
                        <line x1="450" y1="100" x2="450" y2="82" stroke="#3b82f6" stroke-width="1" stroke-dasharray="4,2" opacity="0.6"/>
                        <line x1="510" y1="100" x2="510" y2="65" stroke="#3b82f6" stroke-width="1" stroke-dasharray="4,2" opacity="0.6"/>
                        <circle cx="90" cy="28" r="5" fill="#ef4444" stroke="white" stroke-width="2"/>
                        <circle cx="150" cy="52" r="5" fill="#ef4444" stroke="white" stroke-width="2"/>
                        <circle cx="210" cy="88" r="5" fill="#ef4444" stroke="white" stroke-width="2"/>
                        <circle cx="270" cy="68" r="5" fill="#ef4444" stroke="white" stroke-width="2"/>
                        <circle cx="330" cy="28" r="5" fill="#ef4444" stroke="white" stroke-width="2"/>
                        <circle cx="390" cy="52" r="5" fill="#ef4444" stroke="white" stroke-width="2"/>
                        <circle cx="450" cy="82" r="5" fill="#ef4444" stroke="white" stroke-width="2"/>
                        <circle cx="510" cy="65" r="5" fill="#ef4444" stroke="white" stroke-width="2"/>
                        <line x1="330" y1="120" x2="355" y2="120" stroke="#f59e0b" stroke-width="2.5" stroke-dasharray="5,3"/>
                        <text x="360" y="124" font-size="10" fill="#92400e">Analog Signal</text>
                        <circle cx="440" cy="120" r="5" fill="#ef4444" stroke="white" stroke-width="2"/>
                        <text x="450" y="124" font-size="10" fill="#dc2626">จุดที่ ADC วัด</text>
                    </svg>
                </div>

                <!-- Card 3: Resolution and Transfer Function -->
                <div class="card">
                    <h2 class="section-title">ความละเอียด (Resolution) และสูตรคำนวณ</h2>
                    <p>ยิ่ง ADC มี bit สูง ยิ่งแบ่งระดับแรงดันได้ละเอียด ผลลัพธ์ยิ่งแม่นยำ</p>
                    <div class="adc-compare-grid">
                        <div>
                            <p style="font-weight:bold;color:#dc2626">ADC 3-bit = 8 ระดับ (หยาบ)</p>
                            <svg width="100%" height="150" viewBox="0 0 240 150">
                                <line x1="20" y1="140" x2="230" y2="140" stroke="#475569" stroke-width="1.5"/>
                                <line x1="20" y1="10" x2="20" y2="140" stroke="#475569" stroke-width="1.5"/>
                                <path d="M20,130 C60,80 90,30 140,60 C170,80 200,20 230,50"
                                    fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="5,3"/>
                                <polyline points="20,130 50,130 50,110 80,110 80,50 110,50 110,70 140,70 140,50 170,50 170,30 200,30 200,50 230,50"
                                    fill="none" stroke="#ef4444" stroke-width="2.5"/>
                                <text x="125" y="148" font-size="10" fill="#dc2626" text-anchor="middle">บันไดใหญ่ ไม่แม่นยำ</text>
                            </svg>
                        </div>
                        <div>
                            <p style="font-weight:bold;color:#16a34a">ADC 12-bit = 4096 ระดับ (ละเอียดมาก) ESP32</p>
                            <svg width="100%" height="150" viewBox="0 0 240 150">
                                <line x1="20" y1="140" x2="230" y2="140" stroke="#475569" stroke-width="1.5"/>
                                <line x1="20" y1="10" x2="20" y2="140" stroke="#475569" stroke-width="1.5"/>
                                <path d="M20,130 C60,80 90,30 140,60 C170,80 200,20 230,50"
                                    fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="5,3"/>
                                <path d="M20,130 C60,80 90,30 140,60 C170,80 200,20 230,50"
                                    fill="none" stroke="#16a34a" stroke-width="3"/>
                                <text x="125" y="25" font-size="11" fill="#16a34a" text-anchor="middle" font-weight="bold">4096 ระดับ แม่นยำมาก</text>
                                <text x="125" y="148" font-size="10" fill="#16a34a" text-anchor="middle">แทบจะทับ Analog ได้เลย</text>
                            </svg>
                        </div>
                    </div>
                    <div class="formula-box">
                        <div class="formula-title">สูตรคำนวณ Transfer Function:</div>
                        ADC_Value = ( V_in / V_ref ) x ( 2^n - 1 )
                    </div>
                    <p><strong>ตัวอย่าง ESP32 (n=12 bit, V_ref=3.3V):</strong> ถ้า V_in = 1.65V — ADC_Value = (1.65 / 3.3) x 4095 = <strong>2047</strong></p>
                </div>

                <!-- Card 4: ESP32 Spec Table and Pinout -->
                <div class="card">
                    <h2 class="section-title">คุณสมบัติ ADC ของ ESP32 DevKit V1</h2>
                    <p>ESP32 มีช่อง ADC ในตัวถึง <strong>18 ช่อง</strong> แบ่งเป็น ADC1 และ ADC2 ควรใช้ <strong>ADC1</strong> เพราะ ADC2 มีปัญหาเมื่อใช้ Wi-Fi ร่วมกัน</p>
                    <table class="spec-table">
                        <tr>
                            <th>คุณสมบัติ</th><th>ESP32</th><th>Arduino Uno (เปรียบเทียบ)</th>
                        </tr>
                        <tr>
                            <td><strong>Resolution</strong></td>
                            <td><span class="tag tag-good">12-bit (0 ถึง 4095)</span></td>
                            <td>10-bit (0 ถึง 1023)</td>
                        </tr>
                        <tr>
                            <td><strong>Reference Voltage</strong></td>
                            <td>3.3V</td><td>5.0V</td>
                        </tr>
                        <tr>
                            <td><strong>จำนวนช่อง ADC</strong></td>
                            <td><span class="tag tag-good">18 ช่อง</span></td>
                            <td>6 ช่อง</td>
                        </tr>
                        <tr>
                            <td><strong>ฟังก์ชัน Arduino IDE</strong></td>
                            <td><code>analogRead(pin)</code></td>
                            <td><code>analogRead(pin)</code></td>
                        </tr>
                        <tr>
                            <td><strong>ขา ADC1 ที่แนะนำ</strong></td>
                            <td><span class="tag tag-info">GPIO 32, 33, 34, 35, 36, 39</span></td>
                            <td>A0 ถึง A5</td>
                        </tr>
                    </table>
                    <p style="margin-top:1.5rem;font-weight:bold">ตำแหน่งขา ADC บน ESP32 DevKit V1 (ขาสีเขียว = ADC1 ที่แนะนำ):</p>
                    <svg style="width:100%;background:white;border-radius:12px;border:1px solid #e2e8f0;padding:1rem;margin-top:0.5rem" viewBox="0 0 520 190">
                        <rect x="160" y="5" width="200" height="180" rx="8" fill="#2d3748" stroke="#1a202c" stroke-width="3"/>
                        <text x="260" y="98" font-size="20" font-weight="bold" fill="white" text-anchor="middle" opacity="0.35">ESP32</text>
                        <text x="260" y="116" font-size="10" fill="#a0aec0" text-anchor="middle" opacity="0.6">DevKit V1</text>
                        <rect x="230" y="0" width="60" height="12" rx="3" fill="#4a5568"/>
                        <text x="260" y="10" font-size="9" fill="white" text-anchor="middle">USB</text>
                        <rect x="95" y="20" width="60" height="16" rx="4" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5"/>
                        <text x="125" y="32" font-size="10" font-weight="bold" text-anchor="middle" fill="#15803d">GPIO32 (ADC1)</text>
                        <line x1="155" y1="28" x2="161" y2="28" stroke="#16a34a" stroke-width="2"/>
                        <rect x="95" y="40" width="60" height="16" rx="4" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5"/>
                        <text x="125" y="52" font-size="10" font-weight="bold" text-anchor="middle" fill="#15803d">GPIO33 (ADC1)</text>
                        <line x1="155" y1="48" x2="161" y2="48" stroke="#16a34a" stroke-width="2"/>
                        <rect x="90" y="60" width="65" height="16" rx="4" fill="#fef08a" stroke="#ca8a04" stroke-width="2.5"/>
                        <text x="122" y="72" font-size="9" font-weight="bold" text-anchor="middle" fill="#92400e">GPIO34 ใช้ในตัวอย่าง</text>
                        <line x1="155" y1="68" x2="161" y2="68" stroke="#ca8a04" stroke-width="2.5"/>
                        <rect x="95" y="80" width="60" height="16" rx="4" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5"/>
                        <text x="125" y="92" font-size="10" font-weight="bold" text-anchor="middle" fill="#15803d">GPIO35 (ADC1)</text>
                        <line x1="155" y1="88" x2="161" y2="88" stroke="#16a34a" stroke-width="2"/>
                        <rect x="95" y="100" width="60" height="16" rx="4" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5"/>
                        <text x="125" y="112" font-size="10" font-weight="bold" text-anchor="middle" fill="#15803d">GPIO36 (ADC1)</text>
                        <line x1="155" y1="108" x2="161" y2="108" stroke="#16a34a" stroke-width="2"/>
                        <rect x="95" y="120" width="60" height="16" rx="4" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5"/>
                        <text x="125" y="132" font-size="10" font-weight="bold" text-anchor="middle" fill="#15803d">GPIO39 (ADC1)</text>
                        <line x1="155" y1="128" x2="161" y2="128" stroke="#16a34a" stroke-width="2"/>
                        <rect x="365" y="20" width="45" height="16" rx="4" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5"/>
                        <text x="387" y="32" font-size="10" text-anchor="middle" fill="#dc2626">3.3V</text>
                        <line x1="358" y1="28" x2="364" y2="28" stroke="#ef4444" stroke-width="2"/>
                        <rect x="365" y="40" width="45" height="16" rx="4" fill="#334155" stroke="#475569" stroke-width="1.5"/>
                        <text x="387" y="52" font-size="10" text-anchor="middle" fill="white">GND</text>
                        <line x1="358" y1="48" x2="364" y2="48" stroke="#475569" stroke-width="2"/>
                        <rect x="55" y="162" width="14" height="12" rx="2" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5"/>
                        <text x="75" y="173" font-size="10" fill="#15803d">ขา ADC1 (แนะนำ)</text>
                        <rect x="220" y="162" width="14" height="12" rx="2" fill="#fef08a" stroke="#ca8a04" stroke-width="2"/>
                        <text x="240" y="173" font-size="10" fill="#92400e">ขาที่ใช้ในตัวอย่าง</text>
                    </svg>
                </div>

                <!-- Card 5: Analogy -->
                <div class="card">
                    <h2 class="section-title">เปรียบเทียบให้เห็นภาพ</h2>
                    <div class="adc-compare-grid">
                        <div style="background:#f0fdf4;border-radius:12px;padding:1.25rem;border:1px solid #bbf7d0">
                            <h4 style="color:#15803d">การวัดความสูง</h4>
                            <p style="font-size:0.95rem">ถ้าไม้บรรทัดแบ่งเพียง 8 ขีด (3-bit) กับแบ่ง 4096 ขีด (12-bit) ไม้บรรทัดละเอียดกว่าจะวัดได้แม่นยำกว่ามาก นั่นคือความหมายของ <strong>Resolution</strong></p>
                        </div>
                        <div style="background:#eff6ff;border-radius:12px;padding:1.25rem;border:1px solid #bfdbfe">
                            <h4 style="color:#1d4ed8">การถ่ายรูป</h4>
                            <p style="font-size:0.95rem">Sampling Rate คือความเร็วในการกดชัตเตอร์ ยิ่งถ่ายเร็ว ภาพยิ่งลื่น ในระบบเสียงต้องสุ่มอย่างน้อย 2 เท่าของความถี่สัญญาณ <strong>(Nyquist Theorem)</strong></p>
                        </div>
                    </div>
                </div>

            </section>"""

lines = open('index.html', 'r', encoding='utf-8').readlines()
# Lines 458-477 are the old intro section (1-indexed)
out = lines[:457] + [new_intro + '\n'] + lines[477:]
open('index.html', 'w', encoding='utf-8').writelines(out)
print('Done! Total lines now:', len(out))
