
    const canvas = document.getElementById('overlayCanvas');
    const ctx = canvas.getContext('2d');

    let drawing = false;
    let isCanvasActive = false;
    let isEraser = false;
    let strokeColor = '#000000';
    let strokeSize = 2;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function getPosition(e) {
      const x = (e.touches ? e.touches[0].clientX : e.clientX);
      const y = (e.touches ? e.touches[0].clientY : e.clientY);
      return { x, y };
    }

    function startDraw(e) {
      if (!isCanvasActive) return;
      drawing = true;
      const pos = getPosition(e);
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    }

    function endDraw() {
      drawing = false;
      ctx.beginPath();
    }

    function draw(e) {
      if (!drawing || !isCanvasActive) return;
      const pos = getPosition(e);
      ctx.lineWidth = strokeSize;
      ctx.lineCap = 'round';
      ctx.strokeStyle = isEraser ? '#ffffff' : strokeColor;
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }

    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mouseup', endDraw);
    canvas.addEventListener('mousemove', draw);

    canvas.addEventListener('touchstart', startDraw);
    canvas.addEventListener('touchend', endDraw);
    canvas.addEventListener('touchmove', draw);

    function activateCanvas() {
      document.getElementById("actCan").style.display = 'none';
      document.getElementById("deActCan").style.display = 'block';
      canvas.style.display = 'block';
      isCanvasActive = true;
    }

    function deactivateCanvas() {
      document.getElementById("deActCan").style.display = 'none';
      document.getElementById("actCan").style.display = 'block';
      canvas.style.display = 'none';
      isCanvasActive = false;
    }

    function clearCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function changeColor(color) {
      strokeColor = color;
      isEraser = false;
    }

    function openColorPicker() {
      document.getElementById("colorPicker").click();
    }

    function toggleEraser() {
      isEraser = !isEraser;
    }

    function changePenSize(size) {
      strokeSize = parseInt(size);
      document.getElementById("penSizeValue").innerText = size;
    }

    function toggleToolMenu() {
      const allBtns = document.querySelectorAll('.tool-btn:not(#mainToggleBtn)');
      allBtns.forEach(btn => {
        btn.classList.toggle('show');
      });
      const toggleBtn = document.getElementById('mainToggleBtn');
      toggleBtn.textContent = toggleBtn.textContent.includes('➕') ? '✖ Close' : '➕ Tools';
    }



    // saare tool buttons ka NodeList
    const toolButtons = document.querySelectorAll('.tool-btn-changeColor');

    // har button par listener
    toolButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // pehle sab se selected hatao
        toolButtons.forEach(b => b.classList.remove('selected'));
        // jis pe click hua usme daalo
        btn.classList.add('selected');

        // ↓ optional: apne drawing logic ke flags yahin set karo
        if (btn.id === 'eraserBtn') currentMode = 'eraser';
        if (btn.id === 'penBtn') currentMode = 'pen';
        // ...etc
      });
    });
