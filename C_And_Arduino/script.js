// Data Configuration for C_And_Arduino module
const contentData = {
    variables: `
        <div class="card">
            <h1>1. ตัวแปรและชนิดข้อมูล (Variables & Data Types)</h1>
            <p>ภาษา C/C++ เป็นรากฐานของการเขียนโปรแกรมใน Arduino IDE การเข้าใจเรื่องตัวแปรและการจัดการข้อมูลเป็นสิ่งสำคัญอันดับแรก</p>
        </div>
        
        <div class="card">
            <h2>ตัวแปร (Variables)</h2>
            <p>ตัวแปรคือพื้นที่ในหน่วยความจำที่ใช้เก็บข้อมูล โดยต้องประกาศชนิดข้อมูล (Data Type) ก่อนใช้งานเสมอ</p>

            <div class="var-type-list">
                <div class="var-type-item">
                    <div class="var-type-head">
                        <span class="var-type-badge badge-int">int</span>
                        <span class="var-type-title">จำนวนเต็ม</span>
                    </div>
                    <p class="var-type-text">ใช้เก็บค่าตัวเลขที่ไม่มีจุดทศนิยม เช่น 10, -5</p>
                    <div class="code-block inline-code-block">
<span class="code-keyword">int</span> ledPin = <span class="code-number">13</span>;
                    </div>
                </div>

                <div class="var-type-item">
                    <div class="var-type-head">
                        <span class="var-type-badge badge-float">float</span>
                        <span class="var-type-title">ทศนิยม</span>
                    </div>
                    <p class="var-type-text">ใช้เก็บค่าที่มีจุดทศนิยม เช่น 3.14 หรือ 25.5</p>
                    <div class="code-block inline-code-block">
<span class="code-keyword">float</span> temperature = <span class="code-number">25.5</span>;
                    </div>
                </div>

                <div class="var-type-item">
                    <div class="var-type-head">
                        <span class="var-type-badge badge-char">char</span>
                        <span class="var-type-title">ตัวอักษร 1 ตัว</span>
                    </div>
                    <p class="var-type-text">ใช้เก็บอักขระเดี่ยว โดยต้องใส่ในเครื่องหมายอัญประกาศเดี่ยว เช่น 'A'</p>
                    <div class="code-block inline-code-block">
<span class="code-keyword">char</span> letter = <span class="code-type">'A'</span>;
                    </div>
                </div>

                <div class="var-type-item">
                    <div class="var-type-head">
                        <span class="var-type-badge badge-bool">boolean</span>
                        <span class="var-type-title">ค่าความจริง (1 bit)</span>
                    </div>
                    <p class="var-type-text">ใช้เก็บสถานะจริงหรือเท็จ เช่น <code>true</code> / <code>false</code> (หรือ <code>bool</code>)</p>
                    <div class="code-block inline-code-block">
<span class="code-keyword">boolean</span> isActive = <span class="code-keyword">true</span>;
                    </div>
                </div>

                <div class="var-type-item">
                    <div class="var-type-head">
                        <span class="var-type-badge badge-int">byte / uint8_t</span>
                        <span class="var-type-title">จำนวนเต็ม 8 บิต (0-255)</span>
                    </div>
                    <p class="var-type-text">ประหยัดแรมสูงสุด เหมาะกับหมายเลขขา I/O หรือค่า PWM (0-255)</p>
                    <div class="code-block inline-code-block">
<span class="code-keyword">byte</span> pwmVal = <span class="code-number">128</span>;
                    </div>
                </div>

                <div class="var-type-item">
                    <div class="var-type-head">
                        <span class="var-type-badge badge-float">unsigned long</span>
                        <span class="var-type-title">จำนวนเต็มบวก 32 บิต</span>
                    </div>
                    <p class="var-type-text">เก็บค่าได้ 0 ถึง 4,294,967,295 <strong>จำเป็นต้องใช้คู่กับฟังก์ชัน <code>millis()</code></strong></p>
                    <div class="code-block inline-code-block">
<span class="code-keyword">unsigned long</span> previousTime = <span class="code-number">0</span>;
                    </div>
                </div>
            </div>
        </div>

        <div class="card">
            <h2>💡 คำระบุคุณลักษณะตัวแปรพิเศษ (Variable Qualifiers สำหรับงานช่าง)</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 15px; margin-top: 15px;">
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; border-left: 4px solid #3b82f6;">
                    <h3 style="color: #3b82f6; margin-bottom: 5px;"><code>const</code> (ค่าคงที่)</h3>
                    <p style="font-size: 0.9rem; margin-bottom: 8px;">ป้องกันไม่ให้โค้ดส่วนอื่นแก้ไขค่า เช่น หมายเลขขาพอร์ต ช่วยประหยัด RAM</p>
                    <div class="code-block inline-code-block"><span class="code-keyword">const int</span> LED_PIN = <span class="code-number">13</span>;</div>
                </div>

                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; border-left: 4px solid #10b981;">
                    <h3 style="color: #10b981; margin-bottom: 5px;"><code>static</code> (คงค่าเดิม)</h3>
                    <p style="font-size: 0.9rem; margin-bottom: 8px;">ตัวแปรภายในฟังก์ชันจะไม่ถูกลบเมื่อออกจากฟังก์ชัน รักษาค่าเดิมไว้ใช้ในรอบถัดไป</p>
                    <div class="code-block inline-code-block"><span class="code-keyword">static int</span> counter = <span class="code-number">0</span>;</div>
                </div>

                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; border-left: 4px solid #ef4444;">
                    <h3 style="color: #ef4444; margin-bottom: 5px;"><code>volatile</code> (ห้าม Optimize)</h3>
                    <p style="font-size: 0.9rem; margin-bottom: 8px;"><strong>จำเป็นอย่างยิ่ง!</strong> สำหรับตัวแปรที่มีการเปลี่ยนแปลงค่าภายในฟังก์ชัน <strong>Interrupt (ISR)</strong></p>
                    <div class="code-block inline-code-block"><span class="code-keyword">volatile int</span> pulseCount = <span class="code-number">0</span>;</div>
                </div>
            </div>
        </div>
    `,
    arrays: `
        <div class="card">
            <h1>2. อาร์เรย์ (Arrays)</h1>
            <p>อาร์เรย์คือตัวแปรที่เก็บข้อมูลชนิดเดียวกันหลายค่าไว้ภายใต้ชื่อตัวแปรเดียว โดยข้อมูลจะเรียงต่อกันในหน่วยความจำ และเข้าถึงแต่ละตำแหน่งด้วย <code>index</code> ที่เริ่มนับจาก <code>0</code></p>
            <div class="array-note">
                <strong>แนวคิดสำคัญ:</strong> ถ้าเรามีข้อมูลหลายค่าที่เป็นชนิดเดียวกัน เช่น หมายเลขขา ค่าอุณหภูมิ หรือชุดตัวอักษร การใช้อาร์เรย์จะช่วยให้โค้ดสั้น เป็นระเบียบ และวนลูปประมวลผลทีละตำแหน่งได้ง่ายขึ้น
            </div>
        </div>

        <div class="card">
            <h2>การสร้างและใช้อาร์เรย์</h2>
            <p>โครงสร้างทั่วไปคือ <code>ชนิดข้อมูล ชื่อตัวแปร[ขนาด] = {ค่าที่ 1, ค่าที่ 2, ...};</code> โดยจำนวนค่าที่ใส่ควรสอดคล้องกับขนาดที่กำหนด และทุกค่าภายในอาร์เรย์ต้องเป็นชนิดข้อมูลเดียวกัน</p>

            <div class="array-explain-grid">
                <div class="array-explain-item">
                    <h3>1) อาร์เรย์ชนิด <code>int</code></h3>
                    <p>เหมาะกับข้อมูลจำนวนเต็ม เช่น หมายเลขขา LED, ค่าตัวนับ หรือคะแนน</p>
                    <div class="code-block">
<span class="code-keyword">int</span> pins[<span class="code-number">4</span>] = {<span class="code-number">2</span>, <span class="code-number">4</span>, <span class="code-number">6</span>, <span class="code-number">8</span>};
<span class="code-comment">// pins[0] = 2</span>
<span class="code-comment">// pins[1] = 4</span>
<span class="code-comment">// pins[2] = 6</span>
<span class="code-comment">// pins[3] = 8</span>
                    </div>
                    <p class="array-hint">เมื่อเรียก <code>pins[2]</code> จะได้ค่า <code>6</code> เพราะ index ตัวที่ 3 คือ 2</p>

                    <div class="array-demo-card">
                        <h4>🔧 ทดลอง: เปลี่ยนค่าภายใน <code>int[]</code></h4>
                        <p>ลองสังเกตว่าการแก้ค่าเพียงตำแหน่งเดียว จะมีผลเฉพาะ index นั้น</p>
                        <div class="array-memory-row" data-array-name="pins">
                            <div class="mem-cell" data-array-key="int" data-index="[0]">2</div>
                            <div class="mem-cell" data-array-key="int" data-index="[1]">4</div>
                            <div class="mem-cell" data-array-key="int" data-index="[2]">6</div>
                            <div class="mem-cell" data-array-key="int" data-index="[3]">8</div>
                        </div>
                        <div class="controls-row">
                            <button class="action-btn" data-array-action="update" data-array-key="int">อัปเดต pins[2] = 99</button>
                            <button class="action-btn secondary-btn" data-array-action="reset" data-array-key="int">รีเซ็ต</button>
                        </div>
                        <div class="array-status" id="array-status-int">ค่าปัจจุบัน: pins = {2, 4, 6, 8}</div>
                    </div>
                </div>

                <div class="array-explain-item">
                    <h3>2) อาร์เรย์ชนิด <code>float</code></h3>
                    <p>เหมาะกับข้อมูลที่มีทศนิยม เช่น ค่าแรงดันไฟฟ้า อุณหภูมิ หรือค่าจากเซนเซอร์ที่ต้องการความละเอียดมากกว่าเลขจำนวนเต็ม</p>
                    <div class="code-block">
<span class="code-keyword">float</span> voltages[<span class="code-number">3</span>] = {<span class="code-number">3.3</span>, <span class="code-number">4.7</span>, <span class="code-number">5.0</span>};
<span class="code-comment">// voltages[0] = 3.3</span>
<span class="code-comment">// voltages[1] = 4.7</span>
<span class="code-comment">// voltages[2] = 5.0</span>
                    </div>
                    <p class="array-hint">การใช้อาร์เรย์แบบ <code>float</code> ช่วยเก็บค่าที่เปลี่ยนแปลงต่อเนื่อง เช่น ผลการวัดจากเซนเซอร์หลายครั้ง</p>

                    <div class="array-demo-card">
                        <h4>🔧 ทดลอง: เปลี่ยนค่าภายใน <code>float[]</code></h4>
                        <p>ตัวอย่างนี้จำลองการอัปเดตค่าที่วัดได้ใหม่จากเซนเซอร์</p>
                        <div class="array-memory-row" data-array-name="voltages">
                            <div class="mem-cell" data-array-key="float" data-index="[0]">3.3</div>
                            <div class="mem-cell" data-array-key="float" data-index="[1]">4.7</div>
                            <div class="mem-cell" data-array-key="float" data-index="[2]">5.0</div>
                        </div>
                        <div class="controls-row">
                            <button class="action-btn" data-array-action="update" data-array-key="float">อัปเดต voltages[1] = 4.9</button>
                            <button class="action-btn secondary-btn" data-array-action="reset" data-array-key="float">รีเซ็ต</button>
                        </div>
                        <div class="array-status" id="array-status-float">ค่าปัจจุบัน: voltages = {3.3, 4.7, 5.0}</div>
                    </div>
                </div>

                <div class="array-explain-item">
                    <h3>3) อาร์เรย์ชนิด <code>char</code></h3>
                    <p>เหมาะกับการเก็บตัวอักษรทีละตัว เช่น เกรด A B C หรือชุดคำสั่งแบบสั้น ๆ ในไมโครคอนโทรลเลอร์</p>
                    <div class="code-block">
<span class="code-keyword">char</span> grades[<span class="code-number">4</span>] = {<span class="code-type">'A'</span>, <span class="code-type">'B'</span>, <span class="code-type">'C'</span>, <span class="code-type">'D'</span>};
<span class="code-comment">// grades[0] = 'A'</span>
<span class="code-comment">// grades[1] = 'B'</span>
<span class="code-comment">// grades[2] = 'C'</span>
<span class="code-comment">// grades[3] = 'D'</span>
                    </div>
                    <p class="array-hint">แต่ละช่องเก็บได้ 1 ตัวอักษร ถ้าต้องการเก็บข้อความยาวหลายตัวอักษร จะต่อยอดไปเป็น character array หรือ string ได้ในบทถัดไป</p>

                    <div class="array-demo-card">
                        <h4>🔧 ทดลอง: เปลี่ยนค่าภายใน <code>char[]</code></h4>
                        <p>ตัวอย่างนี้แสดงว่าตำแหน่งในอาร์เรย์สามารถเปลี่ยนจากตัวอักษรหนึ่งไปเป็นอีกตัวอักษรหนึ่งได้</p>
                        <div class="array-memory-row" data-array-name="grades">
                            <div class="mem-cell" data-array-key="char" data-index="[0]">'A'</div>
                            <div class="mem-cell" data-array-key="char" data-index="[1]">'B'</div>
                            <div class="mem-cell" data-array-key="char" data-index="[2]">'C'</div>
                            <div class="mem-cell" data-array-key="char" data-index="[3]">'D'</div>
                        </div>
                        <div class="controls-row">
                            <button class="action-btn" data-array-action="update" data-array-key="char">อัปเดต grades[3] = 'F'</button>
                            <button class="action-btn secondary-btn" data-array-action="reset" data-array-key="char">รีเซ็ต</button>
                        </div>
                        <div class="array-status" id="array-status-char">ค่าปัจจุบัน: grades = {'A', 'B', 'C', 'D'}</div>
                    </div>
                </div>
            </div>
        </div>
    `,
    arithmetic: `
        <div class="card">
            <h1>3. การประมวลผลทางคณิตศาสตร์ (Arithmetic Operations)</h1>
            <p>ภาษาซีรองรับเครื่องหมายคณิตศาสตร์พื้นฐาน เพื่อใช้ในการคำนวณต่างๆ ในโปรแกรม</p>
        </div>

        <div class="card">
            <h2>ตัวดำเนินการทางคณิตศาสตร์ (Arithmetic Operators)</h2>
            <p>การคำนวณใน C/C++ สำหรับ Arduino มีทั้งตัวดำเนินการพื้นฐานที่เขียนได้ตรง ๆ และฟังก์ชันคณิตศาสตร์บางตัวที่ต้องเรียกใช้เพิ่ม เช่น <code>pow()</code> และ <code>sqrt()</code></p>

            <div class="arith-grid">
                <div class="arith-item">
                    <div class="arith-symbol"><code>+</code></div>
                    <div>
                        <strong>บวก (Addition)</strong>
                        <p>ใช้รวมค่าของตัวเลขสองจำนวนเข้าด้วยกัน</p>
                        <div class="code-block arith-code">
<span class="code-keyword">int</span> sum = <span class="code-number">10</span> + <span class="code-number">3</span>; <span class="code-comment">// 13</span>
                        </div>
                    </div>
                </div>
                <div class="arith-item">
                    <div class="arith-symbol"><code>-</code></div>
                    <div>
                        <strong>ลบ (Subtraction)</strong>
                        <p>ใช้หาผลต่างระหว่างค่าซ้ายและค่าขวา</p>
                        <div class="code-block arith-code">
<span class="code-keyword">int</span> diff = <span class="code-number">10</span> - <span class="code-number">3</span>; <span class="code-comment">// 7</span>
                        </div>
                    </div>
                </div>
                <div class="arith-item">
                    <div class="arith-symbol"><code>*</code></div>
                    <div>
                        <strong>คูณ (Multiplication)</strong>
                        <p>ใช้เพิ่มค่าตามจำนวนเท่าที่ต้องการ เช่น คูณสเกล หรือแปลงหน่วย</p>
                        <div class="code-block arith-code">
<span class="code-keyword">int</span> prod = <span class="code-number">10</span> * <span class="code-number">3</span>; <span class="code-comment">// 30</span>
                        </div>
                    </div>
                </div>
                <div class="arith-item">
                    <div class="arith-symbol"><code>/</code></div>
                    <div>
                        <strong>หาร (Division)</strong>
                        <p>ใช้แบ่งค่าออกเป็นส่วน ๆ และควรระวังผลลัพธ์ต่างกันระหว่าง <code>int</code> กับ <code>float</code></p>
                        <div class="code-block arith-code">
<span class="code-keyword">float</span> result = <span class="code-number">10.0</span> / <span class="code-number">4.0</span>; <span class="code-comment">// 2.5</span>
                        </div>
                    </div>
                </div>
                <div class="arith-item">
                    <div class="arith-symbol"><code>%</code></div>
                    <div>
                        <strong>หารเอาเศษ (Modulo)</strong>
                        <p>ใช้หาค่าเศษของการหาร เช่น ตรวจว่าเลขเป็นคู่หรือคี่</p>
                        <div class="code-block arith-code">
<span class="code-keyword">int</span> rem = <span class="code-number">10</span> % <span class="code-number">3</span>; <span class="code-comment">// 1</span>
                        </div>
                    </div>
                </div>
                <div class="arith-item">
                    <div class="arith-symbol"><code>/</code></div>
                    <div>
                        <strong>หารเอาส่วน</strong>
                        <p>เมื่อใช้ตัวแปร <code>int</code> หารกัน เศษจะถูกตัดทิ้ง เหลือเฉพาะส่วนจำนวนเต็ม</p>
                        <div class="code-block arith-code">
<span class="code-keyword">int</span> quotient = <span class="code-number">10</span> / <span class="code-number">3</span>; <span class="code-comment">// 3</span>
                        </div>
                    </div>
                </div>
                <div class="arith-item">
                    <div class="arith-symbol"><code>pow()</code></div>
                    <div>
                        <strong>ยกกำลัง</strong>
                        <p>ใช้หาค่ากำลัง เช่น 2 ยกกำลัง 3 ได้ 8 โดยเรียกฟังก์ชัน <code>pow(base, exponent)</code></p>
                        <div class="code-block arith-code">
<span class="code-keyword">float</span> powerValue = <span class="code-function">pow</span>(<span class="code-number">2</span>, <span class="code-number">3</span>); <span class="code-comment">// 8.0</span>
                        </div>
                    </div>
                </div>
                <div class="arith-item">
                    <div class="arith-symbol"><code>sqrt()</code></div>
                    <div>
                        <strong>หาค่าราก</strong>
                        <p>ใช้หารากที่สองของตัวเลข เช่น <code>sqrt(25)</code> ได้ 5</p>
                        <div class="code-block arith-code">
<span class="code-keyword">float</span> rootValue = <span class="code-function">sqrt</span>(<span class="code-number">25</span>); <span class="code-comment">// 5.0</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="array-note">
                <strong>หมายเหตุ:</strong> ฟังก์ชัน <code>pow()</code> และ <code>sqrt()</code> เป็นฟังก์ชันคณิตศาสตร์ที่นิยมใช้เมื่อต้องการคำนวณขั้นสูงกว่าตัวดำเนินการพื้นฐาน
            </div>

            <h3 style="margin-top: 24px;">เปรียบเทียบผลของ <code>int</code> และ <code>float</code></h3>
            <p>จุดที่นักเรียนมักสับสนมากที่สุดคือ “การหาร” เพราะถ้าใช้ <code>int</code> ทั้งสองข้าง ผลลัพธ์จะไม่เก็บทศนิยม แต่ถ้าใช้ <code>float</code> จะได้ค่าทศนิยมกลับมา</p>

            <div class="arith-compare">
                <div class="arith-compare-card">
                    <h4>กรณีใช้ <code>int</code></h4>
                    <div class="code-block">
<span class="code-keyword">int</span> x = <span class="code-number">7</span>;
<span class="code-keyword">int</span> y = <span class="code-number">2</span>;
<span class="code-keyword">int</span> resultInt = x / y;
<span class="code-comment">// resultInt = 3</span>
                    </div>
                    <p class="arith-result-text">เพราะชนิดข้อมูลเป็น <code>int</code> เศษ <code>0.5</code> จะถูกตัดทิ้ง เหลือเพียง <code>3</code></p>
                </div>

                <div class="arith-compare-card">
                    <h4>กรณีใช้ <code>float</code></h4>
                    <div class="code-block">
<span class="code-keyword">float</span> xf = <span class="code-number">7.0</span>;
<span class="code-keyword">float</span> yf = <span class="code-number">2.0</span>;
<span class="code-keyword">float</span> resultFloat = xf / yf;
<span class="code-comment">// resultFloat = 3.5</span>
                    </div>
                    <p class="arith-result-text">เมื่อใช้ <code>float</code> โปรแกรมจะเก็บค่าทศนิยมไว้ ทำให้ผลลัพธ์ละเอียดกว่า</p>
                </div>
            </div>

            <div class="code-block">
<span class="code-keyword">int</span> radiusInt = <span class="code-number">3</span>;
<span class="code-keyword">float</span> radiusFloat = <span class="code-number">3.0</span>;

<span class="code-keyword">int</span> areaInt = <span class="code-number">22</span> / <span class="code-number">7</span> * radiusInt * radiusInt;         <span class="code-comment">// ได้ 18 เพราะ 22/7 เหลือ 3</span>
<span class="code-keyword">float</span> areaFloat = <span class="code-number">22.0</span> / <span class="code-number">7.0</span> * radiusFloat * radiusFloat; <span class="code-comment">// ได้ประมาณ 28.29</span>
            </div>
            <p class="array-hint">ตัวอย่างนี้ทำให้เห็นว่า ถ้าเลือกชนิดข้อมูลไม่เหมาะสม ผลการคำนวณอาจคลาดเคลื่อนมาก โดยเฉพาะงานวัดค่า งานเซนเซอร์ และการคำนวณทางวิศวกรรม</p>
        </div>

        <div class="card">
            <h2>⚡ การประมวลผลระดับบิต (Bitwise Operations สำหรับงานฮาร์ดแวร์/รีจิสเตอร์)</h2>
            <p>ในงานไมโครคอนโทรลเลอร์ระดับ ปวส. การควบคุมพอร์ตหรือตรวจเช็คสถานะ Flag จากโมดูลต่างๆ มักต้องจัดการกับบิตโดยตรง:</p>

            <div style="overflow-x: auto; margin-top: 15px;">
                <table class="flow-table" style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background: #1e293b; color: white;">
                            <th style="padding: 10px;">ตัวดำเนินการ</th>
                            <th style="padding: 10px;">ชื่อ</th>
                            <th style="padding: 10px;">ตัวอย่าง</th>
                            <th style="padding: 10px;">คำอธิบายการประยุกต์ใช้</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding: 10px; font-weight: bold; text-align: center; color: #3b82f6;"><code>&</code></td>
                            <td>Bitwise AND</td>
                            <td><code>0b1100 & 0b1010 = 0b1000</code></td>
                            <td>ใช้สำหรับ <strong>Bit Masking</strong> เช็คว่าบิตที่ต้องการเป็น 1 หรือไม่ เช่น <code>if (status & (1 << 3))</code></td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; font-weight: bold; text-align: center; color: #10b981;"><code>|</code></td>
                            <td>Bitwise OR</td>
                            <td><code>0b1100 | 0b1010 = 0b1110</code></td>
                            <td>ใช้สำหรับ <strong>เปิดการทำงาน (Set bit ให้เป็น 1)</strong> โดยไม่กระทบบิตอื่น เช่น <code>PORTB |= (1 << 5);</code></td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; font-weight: bold; text-align: center; color: #f59e0b;"><code>^</code></td>
                            <td>Bitwise XOR</td>
                            <td><code>0b1100 ^ 0b1010 = 0b0110</code></td>
                            <td>ใช้สำหรับ <strong>Toggle สลับสถานะบิต (จาก 0 เป็น 1 หรือ 1 เป็น 0)</strong></td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; font-weight: bold; text-align: center; color: #ef4444;"><code>~</code></td>
                            <td>Bitwise NOT</td>
                            <td><code>~0b00001111 = 0b11110000</code></td>
                            <td>กลับค่าทุกบิต (Invert)</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; font-weight: bold; text-align: center; color: #8b5cf6;"><code>&lt;&lt;</code> / <code>&gt;&gt;</code></td>
                            <td>Shift Left / Right</td>
                            <td><code>1 &lt;&lt; 3 = 0b00001000 (8)</code></td>
                            <td>เลื่อนบิตไปทางซ้าย/ขวา (เลื่อนซ้าย 1 บิตเทียบเท่ากับการคูณด้วย 2)</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h3 style="margin-top: 20px;">🛠️ คำสั่งสำเร็จรูปของ Arduino สำหรับจัดการบิต</h3>
            <div class="code-block">
<span class="code-keyword">byte</span> x = <span class="code-number">0b00000000</span>;
<span class="code-function">bitSet</span>(x, <span class="code-number">3</span>);       <span class="code-comment">// สั่งให้บิตตำแหน่งที่ 3 เป็น 1 -> x กลายเป็น 0b00001000</span>
<span class="code-keyword">bool</span> state = <span class="code-function">bitRead</span>(x, <span class="code-number">3</span>); <span class="code-comment">// อ่านค่าบิตที่ 3 -> ได้ค่า 1 (true)</span>
<span class="code-function">bitClear</span>(x, <span class="code-number">3</span>);     <span class="code-comment">// ล้างบิตตำแหน่งที่ 3 ให้กลับเป็น 0 -> x กลายเป็น 0b00000000</span>
<span class="code-function">bitWrite</span>(x, <span class="code-number">2</span>, <span class="code-number">1</span>);   <span class="code-comment">// เขียนค่า 1 ลงที่บิต 2</span>
            </div>
        </div>
    `,
    flowchart: `
        <div class="card">
            <h1>4. เงื่อนไขและการวนซ้ำ (Control Structures)</h1>
            <p>โปรแกรมไม่ได้ทำงานเรียงบรรทัดจากบนลงล่างเสมอไป เราสามารถใช้คำสั่งเงื่อนไข (If-Else) และคำสั่งวนซ้ำ (For, While) เพื่อควบคุมทิศทางการทำงานของโปรแกรมได้</p>
        </div>

        <div class="card">
            <h2>เงื่อนไข If-Else</h2>
            <p>ใช้เมื่อต้องการให้โปรแกรมเลือกทำงานตามเงื่อนไขที่กำหนด</p>
            <div class="code-block">
<span class="code-keyword">int</span> sensorValue = <span class="code-number">600</span>;

<span class="code-keyword">if</span> (sensorValue > <span class="code-number">500</span>) {
  <span class="code-function">digitalWrite</span>(LED_PIN, <span class="code-keyword">HIGH</span>);
} <span class="code-keyword">else</span> {
  <span class="code-function">digitalWrite</span>(LED_PIN, <span class="code-keyword">LOW</span>);
}
            </div>
            <p><strong>🔧 ทดลอง Flowchart:</strong> เลือกค่า sensorValue เพื่อดูทิศทางการทำงาน</p>
            <div class="controls-row">
                <button class="action-btn" id="btn-flow-if">sensorValue = 600 (เข้า if)</button>
                <button class="action-btn secondary-btn" id="btn-flow-else">sensorValue = 300 (เข้า else)</button>
            </div>
            <div class="simulator-canvas" style="height: 350px;">
                <svg viewBox="0 0 300 350" width="100%" height="100%" id="svg-ifelse">
                    <path id="path-start" d="M 150 20 L 150 70" stroke="#94a3b8" stroke-width="4" fill="none" />
                    <path id="path-if" d="M 110 110 L 80 110 L 80 230" stroke="#94a3b8" stroke-width="4" fill="none" />
                    <path id="path-else" d="M 190 110 L 220 110 L 220 230" stroke="#94a3b8" stroke-width="4" fill="none" />
                    <path id="path-end-if" d="M 80 280 L 80 320 L 150 320" stroke="#94a3b8" stroke-width="4" fill="none" />
                    <path id="path-end-else" d="M 220 280 L 220 320 L 150 320" stroke="#94a3b8" stroke-width="4" fill="none" />
                    
                    <rect x="100" y="10" width="100" height="30" rx="15" fill="#334155" />
                    <text x="150" y="30" fill="white" text-anchor="middle" font-size="12">Start</text>

                    <polygon points="150,70 200,110 150,150 100,110" fill="#f59e0b" id="diamond-cond" />
                    <text x="150" y="115" fill="white" text-anchor="middle" font-size="12">value > 500?</text>

                    <text x="92" y="102" fill="#22c55e" font-size="12" font-weight="bold">True</text>
                    <text x="208" y="102" fill="#ef4444" font-size="12" font-weight="bold">False</text>

                    <rect x="40" y="230" width="80" height="50" rx="5" fill="#3b82f6" id="block-if" />
                    <text x="80" y="250" fill="white" text-anchor="middle" font-size="10">LED = HIGH</text>

                    <rect x="180" y="230" width="80" height="50" rx="5" fill="#64748b" id="block-else" />
                    <text x="220" y="250" fill="white" text-anchor="middle" font-size="10">LED = LOW</text>

                    <circle cx="150" cy="320" r="10" fill="#334155" />
                </svg>
            </div>
        </div>

        <div class="card">
            <h2>การวนซ้ำ (While Loop)</h2>
            <p>ใช้เมื่อต้องการให้โปรแกรมทำงานซ้ำๆ ตราบใดที่เงื่อนไขเป็นจริง</p>
            <div class="code-block">
<span class="code-keyword">int</span> count = <span class="code-number">0</span>;
<span class="code-keyword">while</span> (count < <span class="code-number">3</span>) {
  <span class="code-function">Serial</span>.<span class="code-function">println</span>(count);
  count++;
}
<span class="code-comment">// เมื่อ count เป็น 3 จะหลุดลูป</span>
            </div>
            <p><strong>🔧 ทดลอง Flowchart:</strong> ดูการทำงานแบบวนซ้ำ</p>
            <div class="controls-row">
                <button class="action-btn" id="btn-flow-loop">รัน While Loop</button>
                <span id="loop-counter-display" style="font-size: 1.1rem; font-weight: bold; margin-left: 15px; color: var(--primary);">count = 0</span>
            </div>
            <div class="simulator-canvas" style="height: 350px;">
                <svg viewBox="0 0 300 350" width="100%" height="100%" id="svg-loop">
                    <path id="l-start" d="M 150 20 L 150 70" stroke="#94a3b8" stroke-width="4" fill="none" />
                    <path id="l-true" d="M 150 150 L 150 200" stroke="#94a3b8" stroke-width="4" fill="none" />
                    <path id="l-loop" d="M 150 250 L 150 280 L 50 280 L 50 50 L 150 50 L 150 70" stroke="#94a3b8" stroke-width="4" fill="none" />
                    <path id="l-false" d="M 200 110 L 250 110 L 250 300 L 150 300" stroke="#94a3b8" stroke-width="4" fill="none" />

                    <rect x="100" y="10" width="100" height="30" rx="15" fill="#334155" />
                    <text x="150" y="30" fill="white" text-anchor="middle" font-size="12">count = 0</text>

                    <polygon points="150,70 200,110 150,150 100,110" fill="#f59e0b" id="l-diamond" />
                    <text x="150" y="115" fill="white" text-anchor="middle" font-size="12">count < 3?</text>

                    <text x="155" y="180" fill="#22c55e" font-size="12" font-weight="bold">True</text>
                    <text x="210" y="100" fill="#ef4444" font-size="12" font-weight="bold">False</text>

                    <rect x="100" y="200" width="100" height="50" rx="5" fill="#3b82f6" id="l-action" />
                    <text x="150" y="220" fill="white" text-anchor="middle" font-size="10">Print count</text>
                    <text x="150" y="240" fill="white" text-anchor="middle" font-size="10">count++</text>

                    <rect x="100" y="300" width="100" height="30" rx="15" fill="#334155" />
                    <text x="150" y="320" fill="white" text-anchor="middle" font-size="12">End</text>
                </svg>
            </div>
        </div>

        <div class="card">
            <h2>ตัวอย่าง Flowchart แบบสะสมค่า</h2>
            <p>ตัวอย่างนี้แสดงการกำหนดค่าเริ่มต้นให้ <code>X = 1</code> และ <code>loop = 2</code> จากนั้นตรวจเงื่อนไข <code>loop &gt; 6</code> ถ้ายังไม่จริงจะคำนวณ <code>X = X + loop</code> แล้วเพิ่มค่า <code>loop = loop + 1</code> ก่อนวนกลับไปตรวจใหม่</p>
            <div class="code-block">
<span class="code-keyword">int</span> X = <span class="code-number">1</span>;
<span class="code-keyword">int</span> loop = <span class="code-number">2</span>;

<span class="code-keyword">while</span> (loop &lt;= <span class="code-number">6</span>) {
  X = X + loop;
  loop = loop + <span class="code-number">1</span>;
}
            </div>
            <p><strong>🔧 ทดลอง Flowchart:</strong> กดปุ่มเพื่อดูเส้นทางการไหลของโปรแกรม และการเปลี่ยนค่าของ <code>X</code> กับ <code>loop</code> ในแต่ละรอบ</p>
            <div class="controls-row">
                <button class="action-btn" id="btn-flow-accumulate">รันตัวอย่างสะสมค่า</button>
                <span id="accumulate-status" style="font-size: 1rem; font-weight: bold; margin-left: 15px; color: var(--primary);">X = 1, loop = 2</span>
            </div>
            <div class="flow-accumulate-layout">
                <div class="simulator-canvas accumulate-canvas" style="height: 540px;">
                    <svg viewBox="0 0 420 540" width="100%" height="100%" id="svg-accumulate">
                        <path id="a-start-1" d="M 210 40 L 210 70" stroke="#94a3b8" stroke-width="4" fill="none" />
                        <path id="a-start-2" d="M 210 110 L 210 140" stroke="#94a3b8" stroke-width="4" fill="none" />
                        <path id="a-start-3" d="M 210 180 L 210 210" stroke="#94a3b8" stroke-width="4" fill="none" />
                        <path id="a-yes" d="M 290 250 L 340 250 L 340 250" stroke="#94a3b8" stroke-width="4" fill="none" />
                        <path id="a-no-1" d="M 210 290 L 210 340" stroke="#94a3b8" stroke-width="4" fill="none" />
                        <path id="a-no-2" d="M 210 380 L 210 430" stroke="#94a3b8" stroke-width="4" fill="none" />
                        <path id="a-loop-back" d="M 210 470 L 70 470 L 70 170 L 210 170" stroke="#94a3b8" stroke-width="4" fill="none" />
                        <path id="a-stop" d="M 360 250 L 385 250" stroke="#94a3b8" stroke-width="4" fill="none" />

                        <rect x="150" y="10" width="120" height="30" rx="15" fill="#334155" id="a-node-start" />
                        <text x="210" y="30" fill="white" text-anchor="middle" font-size="12">Start</text>

                        <rect x="80" y="70" width="260" height="40" rx="4" fill="#e5e7eb" stroke="#111827" stroke-width="2" id="a-node-set-x" />
                        <text x="210" y="94" fill="#1f2937" text-anchor="middle" font-size="12">กำหนดตัวแปรผลบวก X = 1</text>

                        <rect x="80" y="140" width="260" height="40" rx="4" fill="#e5e7eb" stroke="#111827" stroke-width="2" id="a-node-set-loop" />
                        <text x="210" y="164" fill="#1f2937" text-anchor="middle" font-size="12">กำหนดตัวแปร loop = 2</text>

                        <polygon points="210,210 290,250 210,290 130,250" fill="#f59e0b" id="a-node-cond" />
                        <text x="210" y="256" fill="white" text-anchor="middle" font-size="12">loop &gt; 6</text>

                        <text x="314" y="234" fill="#ef4444" font-size="12" font-weight="bold">Yes</text>
                        <text x="190" y="317" fill="#22c55e" font-size="12" font-weight="bold">No</text>

                        <rect x="110" y="340" width="200" height="40" rx="4" fill="#e5e7eb" stroke="#111827" stroke-width="2" id="a-node-add" />
                        <text x="210" y="364" fill="#1f2937" text-anchor="middle" font-size="12">X = X + loop</text>

                        <rect x="110" y="430" width="200" height="40" rx="4" fill="#e5e7eb" stroke="#111827" stroke-width="2" id="a-node-inc" />
                        <text x="210" y="454" fill="#1f2937" text-anchor="middle" font-size="12">loop = loop + 1</text>

                        <rect x="340" y="225" width="70" height="50" rx="20" fill="#334155" id="a-node-stop" />
                        <text x="375" y="255" fill="white" text-anchor="middle" font-size="12">Stop</text>
                    </svg>
                </div>

                <div class="accumulate-panel">
                    <h3>ตารางผลการทำงาน</h3>
                    <table class="flow-table">
                        <thead>
                            <tr>
                                <th>X</th>
                                <th>loop</th>
                                <th>X + loop</th>
                            </tr>
                        </thead>
                        <tbody id="accumulate-table-body">
                            <tr data-row="0"><td>1</td><td>2</td><td>3</td></tr>
                            <tr data-row="1"><td>3</td><td>3</td><td>6</td></tr>
                            <tr data-row="2"><td>6</td><td>4</td><td>10</td></tr>
                            <tr data-row="3"><td>10</td><td>5</td><td>15</td></tr>
                            <tr data-row="4"><td>15</td><td>6</td><td>21</td></tr>
                            <tr data-row="5"><td>21</td><td>7</td><td>-</td></tr>
                        </tbody>
                    </table>
                    <div class="array-status" id="accumulate-result">ค่าปัจจุบัน: X = 1, loop = 2</div>
                </div>
            </div>
        </div>
    `,
    functions: `
        <div class="card">
            <h1>5. ฟังก์ชันและการใช้ไลบรารี (Functions & Libraries)</h1>
            <p>ฟังก์ชันช่วยให้เราสามารถแบ่งโค้ดออกเป็นส่วนเล็กๆ ที่ทำงานเฉพาะตัว และไลบรารีคือชุดฟังก์ชันสำเร็จรูปที่มีคนอื่นเขียนไว้อยู่แล้ว</p>
        </div>

        <div class="card">
            <h2>การสร้างฟังก์ชัน (Custom Functions)</h2>
            <p>การแบ่งโค้ดออกเป็นฟังก์ชันช่วยให้โค้ดเป็นระเบียบและเรียกใช้ซ้ำได้ ฟังก์ชันสามารถ <strong>รับค่า (Parameters)</strong> และ <strong>ส่งค่ากลับ (Return Value)</strong> ได้</p>
            <div class="code-block">
<span class="code-keyword">int</span> <span class="code-function">addNumbers</span>(<span class="code-keyword">int</span> a, <span class="code-keyword">int</span> b)
{
  <span class="code-keyword">int</span> sum = a + b;

  <span class="code-keyword">return</span> sum; <span class="code-comment">// คืนค่าผลบวก</span>
}

<span class="code-keyword">void</span> <span class="code-function">setup</span>()
{
  <span class="code-keyword">int</span> result = <span class="code-function">addNumbers</span>(<span class="code-number">5</span>, <span class="code-number">10</span>);
  <span class="code-comment">// result จะเท่ากับ 15</span>
}
            </div>
        </div>

        <div class="card">
            <h2>การเรียกใช้ไลบรารี (Libraries)</h2>
            <p>ไลบรารีคือชุดโค้ดสำเร็จรูปที่คนอื่นเขียนไว้ (เช่น ควบคุม Servo, จอ LCD) เราต้องใช้ <code>#include</code> และบางครั้งต้องสร้าง <strong>Object</strong> ขึ้นมาก่อนเรียกใช้ <strong>Method</strong></p>
            <div class="code-block">
<span class="code-keyword">#include</span> &lt;Servo.h&gt;  <span class="code-comment">// เรียกใช้ไลบรารี</span>

<span class="code-type">Servo</span> myServo;     <span class="code-comment">// สร้าง Object ชื่อ myServo</span>

<span class="code-keyword">void</span> <span class="code-function">setup</span>()
{
  myServo.<span class="code-function">attach</span>(<span class="code-number">9</span>); <span class="code-comment">// เรียก Method .attach()</span>

  myServo.<span class="code-function">write</span>(<span class="code-number">90</span>); <span class="code-comment">// สั่งให้หมุนไปที่ 90 องศา</span>
}
            </div>
        </div>

        <div class="card">
            <h2>⏱️ การจับเวลาแบบไม่หยุดรอ (Non-blocking Timing: <code>millis()</code> vs <code>delay()</code>)</h2>
            <p>ในงานอุตสาหกรรมและระบบควบคุมระดับ ปวส. <strong>ห้ามใช้คำสั่ง <code>delay()</code> เด็ดขาด</strong> ในโปรแกรมที่ต้องตรวจจับเซนเซอร์และทำงานหลายอย่างพร้อมกัน เพราะ <code>delay()</code> จะทำให้ CPU หยุดนิ่งและไม่ตอบสนองต่อปุ่มกดหรือเหตุการณ์ใดๆ</p>

            <div class="grid-2" style="margin-top: 15px;">
                <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 15px; border-left: 4px solid #ef4444;">
                    <h3 style="color: #ef4444; margin-bottom: 5px;">❌ แบบใช้ <code>delay()</code> (Blocking)</h3>
                    <p style="font-size: 0.9rem; margin-bottom: 8px;">CPU จะหยุดค้าง 1 วินาทีเต็ม หากมีคนกดปุ่มระหว่างนี้ โปรแกรมจะไม่รับรู้เลย</p>
                    <div class="code-block">
<span class="code-function">digitalWrite</span>(LED, <span class="code-keyword">HIGH</span>);
<span class="code-function">delay</span>(<span class="code-number">1000</span>); <span class="code-comment">// CPU ค้าง หยุดทำงาน 1 วิ</span>
<span class="code-function">digitalWrite</span>(LED, <span class="code-keyword">LOW</span>);
<span class="code-function">delay</span>(<span class="code-number">1000</span>);
                    </div>
                </div>

                <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 15px; border-left: 4px solid #10b981;">
                    <h3 style="color: #10b981; margin-bottom: 5px;">✅ แบบใช้ <code>millis()</code> (Non-blocking)</h3>
                    <p style="font-size: 0.9rem; margin-bottom: 8px;">CPU ทำงานลูปวนต่อเนื่องตลอดเวลา แล้วเช็คว่าเวลาผ่านไปครบ 1 วินาทีหรือยัง</p>
                    <div class="code-block">
<span class="code-keyword">unsigned long</span> previousTime = <span class="code-number">0</span>;
<span class="code-keyword">const long</span> interval = <span class="code-number">1000</span>;

<span class="code-keyword">void</span> <span class="code-function">loop</span>() {
  <span class="code-keyword">unsigned long</span> currentTime = <span class="code-function">millis</span>();
  <span class="code-keyword">if</span> (currentTime - previousTime >= interval) {
    previousTime = currentTime;
    <span class="code-comment">// สลับสถานะ LED</span>
  }
  <span class="code-comment">// ยังสามารถอ่านปุ่มกดได้ลื่นไหลตลอดเวลา!</span>
}
                    </div>
                </div>
            </div>
        </div>
    `,
    quiz: [
        { q: "ข้อใดคือการประกาศตัวแปรจำนวนเต็มที่ถูกต้อง?", options: ["int score = 10;", "float score = 10;", "char score = 10;", "boolean score = 10;"], ans: 0 },
        { q: "ชนิดข้อมูลใดเหมาะสำหรับเก็บค่าทศนิยม เช่น 25.5?", options: ["int", "float", "char", "boolean"], ans: 1 },
        { q: "ถ้าต้องการเก็บตัวอักษรเพียง 1 ตัว เช่น 'A' ควรใช้ชนิดข้อมูลใด?", options: ["char", "int", "float", "bool[]"], ans: 0 },
        { q: "ชนิดข้อมูลใดเหมาะสมที่สุดสำหรับเก็บค่าสถานะเปิด/ปิด หรือ true/false?", options: ["char", "boolean", "float", "String"], ans: 1 },
        { q: "ข้อใดคือการประกาศตัวแปรทศนิยมที่ถูกต้อง?", options: ["int pi = 3.14;", "float pi = 3.14;", "char pi = 3.14;", "boolean pi = 3.14;"], ans: 1 },

        { q: "คำสั่ง <code>int myPins[3] = {2, 4, 6};</code> หากเรียก <code>myPins[1]</code> จะได้ค่าใด?", options: ["1", "2", "4", "6"], ans: 2 },
        { q: "อาร์เรย์ข้อใดเก็บข้อมูลชนิดเดียวกันถูกต้อง?", options: ["int nums[3] = {1, 2, 3};", "int nums[3] = {1, 2.5, 'A'};", "char nums[3] = {1, 2, 3.5};", "boolean nums[2] = {true, 3};"], ans: 0 },
        { q: "index ของอาร์เรย์เริ่มต้นจากค่าใด?", options: ["-1", "0", "1", "ขึ้นกับชนิดข้อมูล"], ans: 1 },
        { q: "ถ้า <code>float voltages[3] = {3.3, 4.7, 5.0};</code> แล้ว <code>voltages[2]</code> มีค่าเท่าใด?", options: ["2", "3.3", "4.7", "5.0"], ans: 3 },
        { q: "ข้อใดคืออาร์เรย์ของตัวอักษรที่ถูกต้อง?", options: ["char grades[4] = {'A', 'B', 'C', 'D'};", "int grades[4] = {'A', 'B', 'C', 'D'};", "float grades[4] = {'A', 'B', 'C', 'D'};", "boolean grades[4] = {'A', 'B', 'C', 'D'};"], ans: 0 },

        { q: "ผลลัพธ์ของสมการ <code>10 + 3</code> คือเท่าใด?", options: ["7", "13", "30", "103"], ans: 1 },
        { q: "ผลลัพธ์ของสมการ <code>10 / 3</code> เมื่อใช้ตัวแปรชนิด <code>int</code> คือข้อใด?", options: ["3", "3.3", "3.33", "1"], ans: 0 },
        { q: "ผลลัพธ์ของสมการ <code>10 % 4</code> คือเท่าใด?", options: ["2", "2.5", "4", "0"], ans: 0 },
        { q: "ฟังก์ชันใดใช้สำหรับยกกำลังในตัวอย่างบทเรียนนี้?", options: ["sqrt()", "pow()", "sum()", "mod()"], ans: 1 },
        { q: "ถ้าใช้ <code>float a = 7.0;</code> และ <code>float b = 2.0;</code> แล้ว <code>a / b</code> ได้ผลลัพธ์เท่าใด?", options: ["3", "3.5", "4", "14"], ans: 1 },

        { q: "โครงสร้างเงื่อนไขใดเหมาะสมที่สุดเมื่อมีทางเลือกเพียง 2 ทาง?", options: ["for loop", "while loop", "if-else", "array"], ans: 2 },
        { q: "หากต้องการให้โปรแกรมทำงานซ้ำๆ ตามจำนวนรอบที่กำหนดอย่างชัดเจน ควรใช้คำสั่งใด?", options: ["if-else", "for loop", "while loop", "switch-case"], ans: 1 },
        { q: "คำสั่ง <code>count++</code> มีความหมายตรงกับข้อใด?", options: ["count = count + 2", "count = count + 1", "count = 1", "เพิ่มขนาดตัวแปรเป็น 2 เท่า"], ans: 1 },
        { q: "ในตัวอย่าง If-Else ถ้า <code>sensorValue = 300</code> โปรแกรมจะไปทางใด?", options: ["เข้า if", "เข้า else", "วนลูปทันที", "เกิด error"], ans: 1 },
        { q: "ในตัวอย่าง While Loop โปรแกรมจะหยุดเมื่อเงื่อนไขใดเกิดขึ้น?", options: ["count < 3", "count == 0", "count เป็น 3 แล้วเงื่อนไขไม่จริง", "Serial.println() ทำงานครบ 1 ครั้ง"], ans: 2 },

        { q: "ฟังก์ชัน <code>void turnOnLED() { ... }</code> คำว่า <code>void</code> หมายถึงอะไร?", options: ["ฟังก์ชันนี้ว่างเปล่าไม่มีโค้ด", "ฟังก์ชันนี้ไม่มีการรับค่าพารามิเตอร์", "ฟังก์ชันนี้ไม่มีการคืนค่า (No return value)", "เป็นคำสั่งบังคับใน Arduino"], ans: 2 },
        { q: "คำว่า <code>Parameters</code> ในฟังก์ชันหมายถึงอะไร?", options: ["ค่าที่ส่งเข้าไปในฟังก์ชัน", "ค่าที่ฟังก์ชันคืนกลับเสมอ", "ชื่อไลบรารี", "ชนิดข้อมูลของอาร์เรย์"], ans: 0 },
        { q: "ข้อใดคือวิธีการเรียกใช้ Library เข้ามาในโค้ด Arduino?", options: ["import Library;", "include <Library.h>", "#include <Library.h>", "using Library;"], ans: 2 },
        { q: "จากโค้ด <code>Servo myServo;</code> คำว่า <code>myServo</code> คืออะไร?", options: ["คำสั่ง", "ฟังก์ชัน", "ไลบรารี", "ออบเจกต์ (Object)"], ans: 3 },
        { q: "คำสั่ง <code>myServo.attach(9);</code> มีความหมายใกล้เคียงข้อใดที่สุด?", options: ["สร้างไลบรารีใหม่", "กำหนดให้ servo เชื่อมกับขา 9", "สั่งให้ servo หมุน 9 องศา", "ลบ object myServo"], ans: 1 }
    ]
};

// Application State
const appState = {
    loopAnimating: false,
    ifAnimating: false,
    accumulateAnimating: false
};

document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    renderSection('variables'); // Default load
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
    contentArea.innerHTML = `<div class="section active">${contentData[sectionId] || ''}</div>`;

    // Attach Event Listeners based on loaded section
    if (sectionId === 'variables') {
        // Variables section - no interactive elements yet
    } 
    else if (sectionId === 'arrays') {
        initArrayDemos();
    }
    else if (sectionId === 'arithmetic') {
        // Arithmetic section - no interactive elements yet
    }
    else if (sectionId === 'flowchart') {
        const ifBtn = document.getElementById('btn-flow-if');
        const elseBtn = document.getElementById('btn-flow-else');
        const loopBtn = document.getElementById('btn-flow-loop');
        const accumulateBtn = document.getElementById('btn-flow-accumulate');
        
        if (ifBtn) ifBtn.addEventListener('click', () => animateIfElse(true));
        if (elseBtn) elseBtn.addEventListener('click', () => animateIfElse(false));
        if (loopBtn) loopBtn.addEventListener('click', () => animateLoop());
        if (accumulateBtn) accumulateBtn.addEventListener('click', () => animateAccumulateFlow());
    }
    else if (sectionId === 'quiz') {
        renderQuizHTML(contentArea);
    }
}

function initArrayDemos() {
    const arrayConfigs = {
        int: {
            name: 'pins',
            original: ['2', '4', '6', '8'],
            updatedIndex: 2,
            updatedValue: '99',
            statusId: 'array-status-int'
        },
        float: {
            name: 'voltages',
            original: ['3.3', '4.7', '5.0'],
            updatedIndex: 1,
            updatedValue: '4.9',
            statusId: 'array-status-float'
        },
        char: {
            name: 'grades',
            original: ["'A'", "'B'", "'C'", "'D'"],
            updatedIndex: 3,
            updatedValue: "'F'",
            statusId: 'array-status-char'
        }
    };

    document.querySelectorAll('[data-array-action]').forEach((button) => {
        button.addEventListener('click', () => {
            const key = button.dataset.arrayKey;
            const action = button.dataset.arrayAction;
            const config = arrayConfigs[key];
            if (!config) return;

            const cells = Array.from(document.querySelectorAll(`.mem-cell[data-array-key="${key}"]`));
            const status = document.getElementById(config.statusId);
            if (!cells.length || !status) return;

            if (action === 'update') {
                cells.forEach((cell, index) => {
                    if (index === config.updatedIndex) {
                        cell.innerText = config.updatedValue;
                        cell.classList.add('updated');
                    }
                });
                const nextValues = config.original.map((value, index) => index === config.updatedIndex ? config.updatedValue : value);
                status.innerText = `ค่าปัจจุบัน: ${config.name} = {${nextValues.join(', ')}}`;
            }

            if (action === 'reset') {
                cells.forEach((cell, index) => {
                    cell.innerText = config.original[index];
                    cell.classList.remove('updated');
                });
                status.innerText = `ค่าปัจจุบัน: ${config.name} = {${config.original.join(', ')}}`;
            }
        });
    });
}

// SVG Flowchart Animation: If-Else
function animateIfElse(isIf) {
    if (appState.ifAnimating) return;
    appState.ifAnimating = true;

    // Reset lines
    const paths = ['path-start', 'path-if', 'path-else', 'path-end-if', 'path-end-else'];
    paths.forEach(id => {
        document.getElementById(id).classList.remove('flow-active');
    });
    document.getElementById('block-if').classList.remove('glow-filter');
    document.getElementById('block-else').classList.remove('glow-filter');
    document.getElementById('diamond-cond').classList.remove('glow-filter');

    // Sequence
    const delay = 800;
    
    // Step 1: Start to Condition
    document.getElementById('path-start').classList.add('flow-active');
    
    setTimeout(() => {
        document.getElementById('diamond-cond').classList.add('glow-filter');
    }, delay * 1);

    setTimeout(() => {
        if (isIf) {
            document.getElementById('path-if').classList.add('flow-active');
            setTimeout(() => {
                document.getElementById('block-if').classList.add('glow-filter');
                document.getElementById('path-end-if').classList.add('flow-active');
                appState.ifAnimating = false;
            }, delay);
        } else {
            document.getElementById('path-else').classList.add('flow-active');
            setTimeout(() => {
                document.getElementById('block-else').classList.add('glow-filter');
                document.getElementById('path-end-else').classList.add('flow-active');
                appState.ifAnimating = false;
            }, delay);
        }
    }, delay * 2);
}

// SVG Flowchart Animation: While Loop
async function animateLoop() {
    if (appState.loopAnimating) return;
    appState.loopAnimating = true;

    const display = document.getElementById('loop-counter-display');
    const pStart = document.getElementById('l-start');
    const pTrue = document.getElementById('l-true');
    const pLoop = document.getElementById('l-loop');
    const pFalse = document.getElementById('l-false');
    const diamond = document.getElementById('l-diamond');
    const actionBlock = document.getElementById('l-action');

    // Reset
    [pStart, pTrue, pLoop, pFalse].forEach(p => p.classList.remove('flow-active'));
    display.innerText = "count = 0";

    const wait = (ms) => new Promise(res => setTimeout(res, ms));

    // Step 1: Start
    pStart.classList.add('flow-active');
    await wait(800);

    let count = 0;
    
    while (count < 3) {
        diamond.classList.add('glow-filter');
        await wait(600);
        
        pTrue.classList.add('flow-active');
        await wait(600);
        
        actionBlock.classList.add('glow-filter');
        count++;
        display.innerText = "count = " + count;
        await wait(800);
        actionBlock.classList.remove('glow-filter');
        
        pLoop.classList.add('flow-active');
        await wait(800);
        
        // Remove path animations for next loop
        pTrue.classList.remove('flow-active');
        pLoop.classList.remove('flow-active');
        
        // Hack to trigger re-animation by reflow
        void pTrue.offsetWidth;
        void pLoop.offsetWidth;
    }

    // Condition false
    diamond.classList.add('glow-filter');
    await wait(600);
    pFalse.classList.add('flow-active');
    diamond.classList.remove('glow-filter');
    
    appState.loopAnimating = false;
}

async function animateAccumulateFlow() {
    if (appState.accumulateAnimating) return;
    appState.accumulateAnimating = true;

    const status = document.getElementById('accumulate-status');
    const result = document.getElementById('accumulate-result');
    const rows = Array.from(document.querySelectorAll('#accumulate-table-body tr'));
    const paths = [
        'a-start-1', 'a-start-2', 'a-start-3', 'a-yes',
        'a-no-1', 'a-no-2', 'a-loop-back', 'a-stop'
    ].map(id => document.getElementById(id));
    const nodes = {
        start: document.getElementById('a-node-start'),
        setX: document.getElementById('a-node-set-x'),
        setLoop: document.getElementById('a-node-set-loop'),
        cond: document.getElementById('a-node-cond'),
        add: document.getElementById('a-node-add'),
        inc: document.getElementById('a-node-inc'),
        stop: document.getElementById('a-node-stop')
    };

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const pulseNode = async (node, ms = 500) => {
        node.classList.add('glow-filter');
        await delay(ms);
        node.classList.remove('glow-filter');
    };

    paths.forEach(path => path.classList.remove('flow-active'));
    Object.values(nodes).forEach(node => node.classList.remove('glow-filter'));
    rows.forEach(row => row.classList.remove('flow-row-active', 'flow-row-done'));
    status.innerText = 'X = 1, loop = 2';
    result.innerText = 'ค่าปัจจุบัน: X = 1, loop = 2';

    let x = 1;
    let loop = 2;

    nodes.start.classList.add('glow-filter');
    paths[0].classList.add('flow-active');
    await delay(600);
    nodes.start.classList.remove('glow-filter');

    await pulseNode(nodes.setX);
    paths[1].classList.add('flow-active');
    await delay(500);

    await pulseNode(nodes.setLoop);
    paths[2].classList.add('flow-active');
    await delay(600);

    for (let step = 0; step < 5; step++) {
        await pulseNode(nodes.cond, 600);
        paths[4].classList.add('flow-active');
        rows[step].classList.add('flow-row-active');
        await delay(500);

        await pulseNode(nodes.add, 650);
        const sum = x + loop;
        status.innerText = `X = ${x}, loop = ${loop} -> X + loop = ${sum}`;
        result.innerText = `ค่าปัจจุบัน: X = ${x}, loop = ${loop}, ผลรวมใหม่ = ${sum}`;
        paths[5].classList.add('flow-active');
        await delay(550);

        x = sum;
        await pulseNode(nodes.inc, 650);
        loop += 1;
        status.innerText = `X = ${x}, loop = ${loop}`;
        result.innerText = `ค่าปัจจุบัน: X = ${x}, loop = ${loop}`;
        rows[step].classList.remove('flow-row-active');
        rows[step].classList.add('flow-row-done');
        paths[6].classList.add('flow-active');
        await delay(800);

        paths[4].classList.remove('flow-active');
        paths[5].classList.remove('flow-active');
        paths[6].classList.remove('flow-active');
        void nodes.cond.offsetWidth;
    }

    await pulseNode(nodes.cond, 650);
    paths[3].classList.add('flow-active');
    rows[5].classList.add('flow-row-active');
    status.innerText = `X = ${x}, loop = ${loop} -> loop > 6 เป็นจริง`;
    result.innerText = `ค่าปัจจุบัน: X = ${x}, loop = ${loop}, จบการทำงาน`;
    await delay(600);

    paths[7].classList.add('flow-active');
    await pulseNode(nodes.stop, 700);
    rows[5].classList.remove('flow-row-active');
    rows[5].classList.add('flow-row-done');

    appState.accumulateAnimating = false;
}

// Quiz Logic
function renderQuizHTML(container) {
    let html = `<div class="card">
        <h1>แบบทดสอบท้ายบท</h1>
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
                <button type="submit" class="action-btn" id="submit-btn">ส่งคำตอบ</button>
            </div>
        </form>
        <div id="quiz-result" class="quiz-result-msg"></div>
    </div>`;
    
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
        resDiv.innerHTML = `<span style="color: var(--color-correct);">🎉 ยินดีด้วย! คุณได้คะแนน ${score} / ${total}</span>`;
        document.getElementById('submit-btn').style.display = 'none';
    } else {
        resDiv.innerHTML = `<span style="color: var(--color-incorrect);">คุณได้คะแนน ${score} / ${total}</span><br>
        <button id="retry-btn" class="action-btn secondary-btn" style="margin-top: 15px;">กลับไปทำแบบทดสอบใหม่</button>`;
        document.getElementById('submit-btn').style.display = 'none';
        
        document.getElementById('retry-btn').addEventListener('click', () => {
            renderSection('quiz'); // re-render to reset
        });
    }
}
