// إضافة دعم خلفيات BADERLINK
document.addEventListener('DOMContentLoaded', function() {
    // إضافة زر اختيار الخلفية
    const themeButton = document.createElement('div');
    themeButton.id = 'theme-selector';
    themeButton.innerHTML = '<button onclick="showThemeSelector()">THEME PS4</button>';
    
    // إضافة بعد Debug Console
    const debugConsole = document.getElementById('DebugConsole');
    debugConsole.parentNode.insertBefore(themeButton, debugConsole.nextSibling);
    
    // إضافة نافذة اختيار الخلفية
    const themePopup = document.createElement('div');
    themePopup.id = 'theme-popup';
    themePopup.innerHTML = `
        <h2>اختر خلفية</h2>
        <div class="themes-container">
            <div class="theme-option">
                <img src="1.jpg.gz" onclick="setTheme('1.jpg.gz')">
                <p>خلفية 1</p>
            </div>
            <div class="theme-option">
                <img src="2.jpg.gz" onclick="setTheme('2.jpg.gz')">
                <p>خلفية 2</p>
            </div>
            <div class="theme-option">
                <img src="3.jpg.gz" onclick="setTheme('3.jpg.gz')">
                <p>خلفية 3</p>
            </div>
            <div class="theme-option">
                <img src="4.jpg.gz" onclick="setTheme('4.jpg.gz')">
                <p>خلفية 4</p>
            </div>
            <div class="theme-option">
                <img src="5.jpg.gz" onclick="setTheme('5.jpg.gz')">
                <p>خلفية 5</p>
            </div>
        </div>
        <button class="close-btn" onclick="closeThemeSelector()">إغلاق</button>
    `;
    document.body.appendChild(themePopup);
    
    // إضافة الخلفية المعتمة
    const themeOverlay = document.createElement('div');
    themeOverlay.id = 'theme-overlay';
    document.body.appendChild(themeOverlay);
    
    // تطبيق الخلفية المحفوظة
    if(localStorage.getItem("theme")) {
        document.body.style.background = "url('" + localStorage.getItem("theme") + "')";
        document.body.style.backgroundSize = "cover";
    }
});

// دوال التحكم بالخلفيات
function showThemeSelector() {
    document.getElementById('theme-popup').style.display = 'block';
    document.getElementById('theme-overlay').style.display = 'block';
}

function closeThemeSelector() {
    document.getElementById('theme-popup').style.display = 'none';
    document.getElementById('theme-overlay').style.display = 'none';
}

function setTheme(themePath) {
    localStorage.setItem("theme", themePath);
    document.body.style.background = "url('" + themePath + "')";
    document.body.style.backgroundSize = "cover";
    closeThemeSelector();
}
