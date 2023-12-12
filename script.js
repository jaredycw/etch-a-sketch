const board = document.querySelector('.board');
let defaultColor = "#1D1D1F";
let currentMode = '';
let mousedown = false;
const cells = [];
 
const colorPicker = document.getElementById('colorPicker');
const drawBtn = document.getElementById('drawBtn');
const eraserBtn = document.getElementById('eraserBtn');
const clearBtn = document.getElementById('clearBtn');
const sizeSlider = document.getElementById('sizeSlider');
const sizeValue = document.getElementById('sizeValue');
const saveBtn = document.getElementById('saveBtn');

function draw(color) {
  cells.forEach(cell => {
    cell.addEventListener('mousedown', () => {
      mousedown = true;
      cell.style.backgroundColor = color;
    });

    cell.addEventListener('mouseover', () => {
      if (mousedown) {
        cell.style.backgroundColor = color;
      }
    });

    cell.addEventListener('mouseup', () => {
      mousedown = false;
    });
  });
}


// Create the grid
function createGrid(size) {
  board.innerHTML = '';
  board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  board.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  //grid row and column
  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    board.appendChild(cell);
    cells.push(cell);
  }
  // Attach event listener to each cell
  draw(defaultColor);
}


function setActiveButton(activeButton) {
  const buttons = [drawBtn, eraserBtn, clearBtn];
  buttons.forEach(button => {
    if (button === activeButton) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
}


//Color Picker for Draw //
drawBtn.addEventListener('click', () => {
  const color = colorPicker.value;
  draw(color);
  currentMode = 'draw';
  setActiveButton(drawBtn);
});

colorPicker.addEventListener('input', () => {
  const drawColor = colorPicker.value;
  draw(drawColor);
});

eraserBtn.addEventListener('click', () => {
  let cleanWhite = '#ffffff';
  draw(cleanWhite);
  currentMode = 'eraser';
  setActiveButton(eraserBtn);
});

clearBtn.addEventListener('click', () => {
  cells.forEach(cell => {
    cell.style.backgroundColor = 'white';
  });
  currentMode = 'clear';
  setActiveButton(clearBtn);
});

sizeSlider.addEventListener('input', () => {
  const gridSize = sizeSlider.value;
  sizeValue.textContent = `${gridSize} x ${gridSize}`;
  if (!isNaN(gridSize)) {
    createGrid(gridSize);
  }
});
saveBtn.addEventListener('click', () => {
  const boardElement = document.querySelector('.board');

  html2canvas(boardElement).then(canvas => {
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = 'etch-a-sketch.png';
    link.click();
  });
});

// Default
const gridSize = "16";
if (!isNaN(gridSize)) {
  createGrid(gridSize);
}

