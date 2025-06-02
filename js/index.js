const ckbaj = document.getElementById('ckbaj');
const visibleDiv = localStorage.getItem('visibleDiv') || 'jailbreak-page';
const savedaj = localStorage.getItem('autojbstate');
const menuBtns = document.querySelectorAll('.menu-btn');
const psBtns = document.querySelectorAll('.ps-btn');
const plsbtn = document.querySelectorAll('.button-container button');

window.addEventListener('DOMContentLoaded', loadsettings);

document.getElementById('jailbreak').addEventListener('click', () => {
  jailbreak();
});

document.getElementById('binloader').addEventListener('click', () => {
  binloader();
});

document.querySelectorAll('button[data-func]').forEach(button => {
  button.addEventListener('click', () => {
    const payload = button.getAttribute('data-func');
    Loadpayloads(payload);
  });
});

document.getElementById('generate-cache-btn').addEventListener('click', () => {
  fetch('/generate_manifest', { method: 'POST' })
    .then(response => response.json())
    .then(data => {
      alert(data.message);
    })
    .catch(error => {
      alert('Error: ' + error + "\nThis option only work on local server !\nPlease make sure you'r server is up.");
    });
});

document.getElementById('update-exploit').addEventListener('click', () => {
  fetch('/update_exploit', { method: 'POST' })
    .then(res => res.json())
    .then(data => {
      document.getElementById('console').textContent = data.results.join('\n') + "\nPlease don't forget to update the cache !";
    })
    .catch(err => {
      alert('Error: ' + err + "\nThis option only work on local server !\nPlease make sure you'r server is up.");
    });
});

ckbaj.addEventListener('change', (e) => {
  alert("WARNING :\nThis option make the jailbreak unstable and this option is not recommended please use the jailbreak button instead !")
  localStorage.setItem('autojbstate', e.target.checked);
  onCheckboxChange(e.target.checked);
});

function isHttps() {
  return window.location.protocol === 'https:';
}

async function loadMultipleModules(files) {
  try {
    // Dynamically import all modules
    const modules = await Promise.all(files.map(file => import(file)));
    return modules; // array of imported modules
  } catch (error) {
    console.error("Error loading modules:", error);
    throw error;
  }
}

function showabout() {
  document.getElementById('about-popup').style.display = 'block'; // Show popup
  document.getElementById('overlay-popup').style.display = 'block'; // Show overlay
}

function closeabout() {
  document.getElementById('about-popup').style.display = 'none'; // Hide popup
  document.getElementById('overlay-popup').style.display = 'none'; // Hide overlay
}

function showsettings() {
  document.getElementById('settings-popup').style.display = 'block'; // Show popup
  document.getElementById('overlay-popup').style.display = 'block'; // Show overlay
}

function closesettings() {
  document.getElementById('settings-popup').style.display = 'none'; // Hide popup
  document.getElementById('overlay-popup').style.display = 'none'; // Hide overlay
}

function CheckFW() {
  var fwUA = navigator.userAgent.substring(navigator.userAgent.indexOf('5.0 (') + 19, navigator.userAgent.indexOf(') Apple'));
  var FwUAR = fwUA.replace("layStation 4/","");
  if (FwUAR == "9.00") {
    document.getElementById('PS4FW').textContent = `PS4 FW: ${FwUAR} | Compatible`;
    document.getElementById('PS4FW').style.color = 'green';
  }else{
    document.getElementById('PS4FW').textContent = `PS4 FW: ${FwUAR} | Incompatible`;
    document.getElementById('PS4FW').style.color = 'red';
    document.getElementById('jailbreak-page').style.display = 'none';
    document.getElementById('jailbreak').style.display = 'none';
    document.getElementById('autogoldhen').style.display = 'none';
    document.getElementById('agtext').style.display = 'none';
    document.getElementById('payloadsbtn').style.display = 'none';
    document.getElementById('generate-cache-btn').style.display = 'none';
    document.getElementById('update-exploit').style.display = 'none';
  };
}

function checksettings() {
  if (localStorage.getItem('HEN')) {
    menuBtns.forEach(el => {
      el.onmouseover = () => el.style.backgroundColor = '#00F0FF'; // Corrigé ici
      el.onmouseout = () => el.style.backgroundColor = ''; // Remise à zéro en sortant
    });

    psBtns.forEach(el => {
      el.onmouseover = () => {
      el.style.boxShadow = '0 0px 48px #00F0FF, 0 0px 10px #000c';
        // Vérifie si l'élément SVG existe avant d'essayer de changer sa couleur
        const svg = el.querySelector('svg');
        if (svg) svg.style.fill = '#00F0FF';
      };
      el.onmouseout = () => {
        el.style.boxShadow = '';
        const svg = el.querySelector('svg');
        if (svg) svg.style.fill = ''; // Réinitialise la couleur si nécessaire
      };
    });

    plsbtn.forEach(btn => {
      btn.style.borderColor = '#00F0FF';
      btn.addEventListener('mouseenter', () => {
        btn.style.backgroundColor = '#00F0FF'; // par exemple, changer la couleur de fond au hover
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.backgroundColor = ''; // revenir à la couleur d'origine
      });
    });

    document.getElementById('console').style.borderColor = '#00F0FF';
    document.getElementById('header-title').style.borderColor = '#00F0FF';
    document.getElementById('header-title').style.textShadow = '0px 0px 15px #00F0FF';
    
    const containers = document.querySelectorAll('.button-container');
    containers.forEach(container => {
      container.style.borderColor = '#00F0FF';
    });
  } else {
    menuBtns.forEach(el => {
      el.onmouseover = () => el.style.backgroundColor = '#FFB84D'; // Corrigé ici
      el.onmouseout = () => el.style.backgroundColor = ''; // Remise à zéro
    });

    psBtns.forEach(el => {
      el.onmouseover = () => {
        el.style.boxShadow = '0 0px 48px #FFB84D, 0 0px 10px #000c';
        // Vérifie si l'élément SVG existe avant d'essayer de changer sa couleur
        const svg = el.querySelector('svg');
        if (svg) svg.style.fill = '#FFB84D';
      };
      el.onmouseout = () => {
        el.style.boxShadow = '';
        const svg = el.querySelector('svg');
        if (svg) svg.style.fill = ''; // Réinitialise la couleur si nécessaire
      };
    });

    plsbtn.forEach(btn => {
      btn.style.borderColor = '#FFB84D';
      btn.addEventListener('mouseenter', () => {
        btn.style.backgroundColor = '#FFB84D'; // par exemple, changer la couleur de fond au hover
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.backgroundColor = ''; // revenir à la couleur d'origine
      });
    });

    document.getElementById('console').style.borderColor = '#FFB84D';
    document.getElementById('header-title').style.borderColor = '#FFB84D';
    document.getElementById('header-title').style.textShadow = '0px 0px 15px #FFB84D';
    document.getElementById('button-container').style.borderColor = '#FFB84D';

    const containers = document.querySelectorAll('.button-container');
    containers.forEach(container => {
      container.style.borderColor = '#FFB84D';
    });
  }
}

function choosejb(hen) {
  if (hen === 'HEN') {
    localStorage.removeItem('GoldHEN');
    localStorage.setItem('HEN', 1);
  } else if (hen === 'GoldHEN') {
    localStorage.removeItem('HEN');
    localStorage.setItem('GoldHEN', 1);
  }
  checksettings();
}

function showpayloads() {
  if (document.getElementById('payloadsbtn').textContent == 'Payloads') {
  document.getElementById('jailbreak-page').style.display = 'none';
  document.getElementById('PS4FW').style.display = 'none';
  document.getElementById('payloads-page').style.display = 'block';
  document.getElementById('payloadsbtn').textContent = 'Jailbreak';
  localStorage.setItem('visibleDiv', 'payloads-page');
  }else{
  document.getElementById('jailbreak-page').style.display = 'block';
  document.getElementById('PS4FW').style.display = 'flex';
  document.getElementById('payloads-page').style.display = 'none';
  document.getElementById('payloadsbtn').textContent = 'Payloads';
  localStorage.setItem('visibleDiv', 'jailbreak-page');

  };
  CheckFW();
}

function showtoolspayloads() {
  document.getElementById('payloads-linux').style.display = 'none';
  document.getElementById('payloads-game').style.display = 'none';
  document.getElementById('payloads-tools').style.display = 'block';
}

function showgamepayloads() {
  document.getElementById('payloads-linux').style.display = 'none';
  document.getElementById('payloads-game').style.display = 'block';
  document.getElementById('payloads-tools').style.display = 'none';
}

function showlinuxpayloads() {
  document.getElementById('payloads-linux').style.display = 'block';
  document.getElementById('payloads-game').style.display = 'none';
  document.getElementById('payloads-tools').style.display = 'none';
}

function loadjbflavor() {
  const savedValue = localStorage.getItem('selectedHEN');
  if (savedValue) {
    const radio = document.querySelector(`input[name="hen"][value="${savedValue}"]`);
    if (radio) {
      radio.checked = true;
    }
  }
}

function savejbflavor() {
  const radios = document.querySelectorAll('input[name="hen"]');
  radios.forEach(radio => {
    if (radio.checked) {
      localStorage.setItem('selectedHEN', radio.value);
    }
  });
}

function loadajbsettings(){
  if (savedaj !== null) {
    ckbaj.checked = savedaj === 'true';
    onCheckboxChange(ckbaj.checked);
  }
  if (ckbaj.checked) {
    if (sessionStorage.getItem('jbsuccess')) {
      console.log('Aleardy jailbroken !');
    } else {
      setTimeout(() => {
        jailbreak();
      }, 3000);
    }
  }

  if (isHttps()) {
    const btn1 = document.getElementById('generate-cache-btn');
    const btn2 = document.getElementById('update-exploit');
    if (btn1) btn1.style.display = 'none';
    if (btn2) btn2.style.display = 'none';
  }

  if (visibleDiv === 'jailbreak-page') {
    document.getElementById('jailbreak-page').style.display = 'block';
    document.getElementById('PS4FW').style.display = 'flex';
    document.getElementById('payloads-page').style.display = 'none';
    document.getElementById('payloadsbtn').textContent = 'Payloads';
  } else {
    document.getElementById('jailbreak-page').style.display = 'none';
    document.getElementById('PS4FW').style.display = 'none';
    document.getElementById('payloads-page').style.display = 'block';
    document.getElementById('payloadsbtn').textContent = 'Jailbreak';
    localStorage.setItem('visibleDiv', 'payloads-page');
  }
}

async function jailbreak() {
  try {
    const modules = await loadMultipleModules([
      '../payloads/Jailbreak.js',
      '../psfree/alert.mjs'
    ]);
    console.log("All modules are loaded!");
    const JailbreakModule = modules[0];

    if (localStorage.getItem('HEN')) {
      if (JailbreakModule && typeof JailbreakModule.HEN === 'function') {
          JailbreakModule.HEN();
      } else {
          console.error("HEN function not found in Jailbreak.js module");
      }
    } else if (localStorage.getItem('GoldHEN')) {
      if (JailbreakModule && typeof JailbreakModule.GoldHEN === 'function') {
          JailbreakModule.GoldHEN();
      } else {
          console.error("GoldHEN function not found in Jailbreak.js module");
      }
    } else {
      if (JailbreakModule && typeof JailbreakModule.GoldHEN === 'function') {
          JailbreakModule.GoldHEN();
      } else {
          console.error("GoldHEN function not found in Jailbreak.js module");
      }
    }
  } catch (e) {
    console.error("Failed to jailbreak:", e);
  }
}

async function binloader() {
  try {
    sessionStorage.setItem('binloader', 1);
    const modules = await loadMultipleModules([
      '../payloads/Jailbreak.js',
      '../psfree/alert.mjs'
    ]);
    console.log("All modules are loaded!");

    const goldhenModule = modules[0];
    if (goldhenModule && typeof goldhenModule.runBinLoader === 'function') {
      goldhenModule.runBinLoader();
    } else {
      console.error("GoldHEN function not found in GoldHEN.js module");
    }
  } catch (e) {
    console.error("Failed to jailbreak:", e);
  }
}

async function Loadpayloads(payload) {
  try {
    let modules;
    sessionStorage.removeItem('binloader');
    if (isHttps()) {
      modules = await loadMultipleModules([
        '../payloads/payloads.js',
        '../psfree/alert.mjs'
      ]);
      console.log("All modules are loaded!");
    } else {
      modules = await loadMultipleModules([
        '../payloads/payloads.js'
      ]);
      console.log("All modules are loaded!");
    }

    const payloadModule = modules[0];
    if (payloadModule && typeof payloadModule[payload] === 'function') {
      payloadModule[payload]();
    } else {
      console.error(`${payload} function not found in payloads.js module`);
    }
  } catch (e) {
    console.error(`Failed to load ${payload}:`, e);
  }
}

async function loadsettings() {
  CheckFW();
  loadajbsettings();
  loadjbflavor();
  checksettings();
}

function onCheckboxChange(checked) {
  if (checked) {
    console.log('Checkbox is checked!');
  } else {
    console.log('Checkbox is unchecked!');
  }
}