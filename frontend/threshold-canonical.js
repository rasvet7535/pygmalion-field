/**
 * ========================================
 * Pygmalion v0.4.0 — Порог: ЧисСлоБукВ
 * Каноническая версия с виртуальной клавиатурой
 * ========================================
 */

// === КОНСТАНТЫ ===
const OK_MIN_LENGTH = 1;  // Обновлено: поддержка коротких У.З.
const OK_MAX_LENGTH = 50;
const MAX_SPACES = 5;

// === Зарезервированные ключи платформы ::0::-::33:: ===
const RESERVED_OK_KEYS = [];
for (let i = 0; i <= 33; i++) {
  RESERVED_OK_KEYS.push(String(i));
  RESERVED_OK_KEYS.push(String(i).padStart(2, '0'));
}

function isReservedOK(okKey) {
  const cleanKey = okKey.replace(/\s+/g, '').trim();
  return RESERVED_OK_KEYS.includes(cleanKey);
}

// Базовые цвета
const BASE_COLORS = {
  RED: 'RED',
  BLUE: 'BLUE',
  GREEN: 'GREEN',
  WHITE: 'WHITE'
};

// Цветовая схема символов (КАНОН)
const CHAR_COLORS = {
  // РУССКИЕ УНИКАЛЬНЫЕ (КРАСНЫЕ)
  'Ё': 'RED', 'Й': 'RED', 'Ц': 'RED', 'У': 'RED', 'К': 'RED', 'Е': 'RED',
  'Н': 'RED', 'Г': 'RED', 'Ш': 'RED', 'Щ': 'RED', 'З': 'RED', 'Х': 'RED',
  'Ъ': 'RED', 'Ф': 'RED', 'Ы': 'RED', 'В': 'RED', 'А': 'RED', 'П': 'RED',
  'Р': 'RED', 'О': 'RED', 'Л': 'RED', 'Д': 'RED', 'Ж': 'RED', 'Э': 'RED',
  'Я': 'RED', 'Ч': 'RED', 'С': 'RED', 'М': 'RED', 'И': 'RED', 'Т': 'RED',
  'Ь': 'RED', 'Б': 'RED', 'Ю': 'RED',
  // ЛАТИНСКИЕ УНИКАЛЬНЫЕ (СИНИЕ)
  'Q': 'BLUE', 'Z': 'BLUE', 'Y': 'BLUE', 'S': 'BLUE', 'U': 'BLUE',
  'F': 'BLUE', 'G': 'BLUE', 'J': 'BLUE', 'I': 'BLUE', 'W': 'BLUE',
  'V': 'BLUE', 'L': 'BLUE', 'N': 'BLUE', 'R': 'BLUE',
  // ОБЩИЕ БУКВЫ (ЗЕЛЁНЫЕ)
  'X': 'GREEN', 'C': 'GREEN', 'T': 'GREEN', 'M': 'GREEN', 'O': 'GREEN',
  'A': 'GREEN', 'K': 'GREEN', 'E': 'GREEN', 'B': 'GREEN', 'H': 'GREEN',
  'P': 'GREEN',
  // СПЕЦИАЛЬНЫЙ СИМВОЛ (ЗЕЛЁНЫЙ)
  '𝕯': 'GREEN'
};

function getCharColor(char) {
  return CHAR_COLORS[char] ?? 'WHITE';
}

// Раскладка клавиатуры ЧисСлоБукВ
const KEYBOARD_ROWS_DATA = [
  // Ряд 0: Ё Й цифры Ы Э
  [
    { val: 'Ё', color: BASE_COLORS.RED },
    { val: 'Й', color: BASE_COLORS.RED },
    { val: '8', color: BASE_COLORS.WHITE, isDigit: true },
    { val: '6', color: BASE_COLORS.WHITE, isDigit: true },
    { val: '4', color: BASE_COLORS.WHITE, isDigit: true },
    { val: '2', color: BASE_COLORS.WHITE, isDigit: true },
    { val: '0', color: BASE_COLORS.WHITE, isDigit: true },
    { val: '1', color: BASE_COLORS.WHITE, isDigit: true },
    { val: '3', color: BASE_COLORS.WHITE, isDigit: true },
    { val: '5', color: BASE_COLORS.WHITE, isDigit: true },
    { val: '7', color: BASE_COLORS.WHITE, isDigit: true },
    { val: '9', color: BASE_COLORS.WHITE, isDigit: true },
    { val: 'Ы', color: BASE_COLORS.RED },
    { val: 'Э', color: BASE_COLORS.RED }
  ],
  // Ряд 1: Q X C T 𝕯 M O A K E B H P Ю
  [
    { val: 'Q', color: BASE_COLORS.BLUE },
    { val: 'X', color: BASE_COLORS.GREEN },
    { val: 'C', color: BASE_COLORS.GREEN },
    { val: 'T', color: BASE_COLORS.GREEN },
    { val: '𝕯', color: BASE_COLORS.GREEN, isDouble: true },
    { val: 'M', color: BASE_COLORS.GREEN },
    { val: 'O', color: BASE_COLORS.GREEN },
    { val: 'A', color: BASE_COLORS.GREEN },
    { val: 'K', color: BASE_COLORS.GREEN },
    { val: 'E', color: BASE_COLORS.GREEN },
    { val: 'B', color: BASE_COLORS.GREEN },
    { val: 'H', color: BASE_COLORS.GREEN },
    { val: 'P', color: BASE_COLORS.GREEN },
    { val: 'Ю', color: BASE_COLORS.RED }
  ],
  // Ряд 2: Z Y S U F G J I W V L N R Я
  [
    { val: 'Z', color: BASE_COLORS.BLUE },
    { val: 'Y', color: BASE_COLORS.BLUE },
    { val: 'S', color: BASE_COLORS.BLUE },
    { val: 'U', color: BASE_COLORS.BLUE },
    { val: 'F', color: BASE_COLORS.BLUE },
    { val: 'G', color: BASE_COLORS.BLUE },
    { val: 'J', color: BASE_COLORS.BLUE },
    { val: 'I', color: BASE_COLORS.BLUE },
    { val: 'W', color: BASE_COLORS.BLUE },
    { val: 'V', color: BASE_COLORS.BLUE },
    { val: 'L', color: BASE_COLORS.BLUE },
    { val: 'N', color: BASE_COLORS.BLUE },
    { val: 'R', color: BASE_COLORS.BLUE },
    { val: 'Я', color: BASE_COLORS.RED }
  ],
  // Ряд 3: З Ч Ц У Ф Г Ж И Ш Щ Л Б П Ь/Ъ
  [
    { val: 'З', color: BASE_COLORS.RED },
    { val: 'Ч', color: BASE_COLORS.RED },
    { val: 'Ц', color: BASE_COLORS.RED },
    { val: 'У', color: BASE_COLORS.RED },
    { val: 'Ф', color: BASE_COLORS.RED },
    { val: 'Г', color: BASE_COLORS.RED },
    { val: 'Ж', color: BASE_COLORS.RED },
    { val: 'И', color: BASE_COLORS.RED },
    { val: 'Ш', color: BASE_COLORS.RED },
    { val: 'Щ', color: BASE_COLORS.RED },
    { val: 'Л', color: BASE_COLORS.RED },
    { val: 'Б', color: BASE_COLORS.RED },
    { val: 'П', color: BASE_COLORS.RED },
    { type: 'split', tl: 'Ь', br: 'Ъ', color: BASE_COLORS.RED }
  ],
  // Ряд 4: Управление + парные символы
  [
    { type: 'func', val: 'delete' },
    { type: 'split', tl: '+', br: '-', color: BASE_COLORS.WHITE },
    { type: 'split', tl: '&', br: '\\', color: BASE_COLORS.WHITE },
    { type: 'split', tl: '(', br: '[', color: BASE_COLORS.WHITE },
    { type: 'split', tl: ';', br: ':', color: BASE_COLORS.WHITE },
    { type: 'split', tl: '?', br: '!', color: BASE_COLORS.WHITE },
    { type: 'func', val: 'space' },
    { type: 'split', tl: '@', br: '#', color: BASE_COLORS.WHITE },
    { type: 'split', tl: '*', br: '/', color: BASE_COLORS.WHITE },
    { type: 'split', tl: ')', br: ']', color: BASE_COLORS.WHITE },
    { type: 'split', tl: '_', br: '=', color: BASE_COLORS.WHITE },
    { type: 'split', tl: ',', br: '.', color: BASE_COLORS.WHITE },
    { type: 'func', val: 'backspace' }
  ]
];

// === СОСТОЯНИЕ ===
const ThresholdState = {
  inputData: [],
  rowsOrder: [0, 1, 2, 3],
  draggedRowIndex: null,
  isComplete: false,
  okKey: ''
};

// === ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ===

function getCorrectLength(str) {
  return [...str].length;
}

function isValidOK() {
  const text = ThresholdState.inputData.map(i => i.char).join('');
  const length = getCorrectLength(text);
  const hasConsecutiveSpaces = /  +/.test(text);
  const startsWithSpace = text.startsWith(' ');
  const endsWithSpace = text.endsWith(' ');
  const spaceCount = (text.match(/ /g) || []).length;

  return (
    length >= OK_MIN_LENGTH &&
    length <= OK_MAX_LENGTH &&
    !hasConsecutiveSpaces &&
    !startsWithSpace &&
    !endsWithSpace &&
    spaceCount <= MAX_SPACES
  );
}

// === ОТРИСОВКА ===

function renderKeyboard() {
  const keyboard = document.getElementById('keyboard');
  if (!keyboard) return;

  let html = '';

  // Легенда
  html += `
    <div class="kb-legend">
      <span class="kb-legend-item">
        <span class="kb-legend-dot green"></span> Двойные
      </span>
      <span class="kb-legend-item">
        <span class="kb-legend-dot split"></span> Разделённые
      </span>
      <span class="kb-legend-item">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 8L22 12L18 16"/><path d="M6 8L2 12L6 16"/><path d="M2 12H22"/>
        </svg>
        Перетащи ряд
      </span>
    </div>
  `;

  // Ряды 0-3 (перетаскиваемые)
  ThresholdState.rowsOrder.forEach((rowIdx, visualIdx) => {
    const row = KEYBOARD_ROWS_DATA[rowIdx];
    html += `
      <div class="kb-row kb-draggable" draggable="true" data-row="${rowIdx}" data-visual="${visualIdx}">
        <span class="kb-drag-handle">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 8L22 12L18 16"/><path d="M6 8L2 12L6 16"/><path d="M2 12H22"/>
          </svg>
        </span>
        ${row.map(key => renderKey(key)).join('')}
      </div>
    `;
  });

  // Ряд 4 (фиксированный)
  html += `
    <div class="kb-row kb-fixed" data-row="4">
      ${KEYBOARD_ROWS_DATA[4].map(key => renderKey(key)).join('')}
    </div>
  `;

  keyboard.innerHTML = html;
  setupKeyboardHandlers();
}

function renderKey(key) {
  if (key.type === 'func') {
    if (key.val === 'delete') {
      return `<button class="kb-btn kb-control kb-delete" data-action="delete">DEL</button>`;
    }
    if (key.val === 'backspace') {
      return `<button class="kb-btn kb-control kb-backspace" data-action="backspace">←</button>`;
    }
    if (key.val === 'space') {
      return `<button class="kb-btn kb-control kb-space" data-char=" ">ПРОБЕЛ</button>`;
    }
  }

  if (key.type === 'split') {
    let colorClass = 'kb-num';
    if (key.color === BASE_COLORS.RED) colorClass = 'kb-red';
    if (key.color === BASE_COLORS.BLUE) colorClass = 'kb-blue';
    if (key.color === BASE_COLORS.GREEN) colorClass = 'kb-green';

    return `
      <button class="kb-btn ${colorClass} kb-split" data-char="${key.tl}" data-char-alt="${key.br}">
        <span class="kb-split-tl">${key.tl}</span>
        <span class="kb-split-br">${key.br}</span>
      </button>
    `;
  }

  // Обычная кнопка
  let colorClass = 'kb-num';
  if (key.color === BASE_COLORS.RED) colorClass = 'kb-red';
  if (key.color === BASE_COLORS.BLUE) colorClass = 'kb-blue';
  if (key.color === BASE_COLORS.GREEN) colorClass = 'kb-green';

  return `<button class="kb-btn ${colorClass}" data-char="${key.val}" data-is-double="${key.isDouble || false}">${key.val}</button>`;
}

function updateInputDisplay() {
  const display = document.getElementById('ok-display');
  const lengthCounter = document.getElementById('ok-length');
  const confirmBtn = document.getElementById('confirm-ok-btn');

  if (!display || !lengthCounter) return;

  const inputData = ThresholdState.inputData;
  const text = inputData.map(i => i.char).join('');
  const length = getCorrectLength(text);

  if (length === 0) {
    display.innerHTML = '<span class="ok-display-placeholder">_</span>';
    display.classList.remove('valid', 'invalid');
  } else {
    // Цветовое отображение с :: границами
    display.innerHTML = `
      <span class="ok-display-border">::</span>
      ${inputData.map(item => {
        const color = getCharColor(item.char);
        let colorClass = '';
        if (color === 'RED') colorClass = 'char-red';
        if (color === 'BLUE') colorClass = 'char-blue';
        if (color === 'GREEN') colorClass = 'char-green';

        const displayChar = item.char === ' ' ? '␣' : item.char;
        return `<span class="ok-char ${colorClass}">${displayChar}</span>`;
      }).join('')}
      <span class="ok-display-border">::</span>
    `;

    const valid = isValidOK();
    display.classList.toggle('valid', valid);
    display.classList.toggle('invalid', !valid);
  }

  lengthCounter.textContent = `${length} / ${OK_MAX_LENGTH}`;

  if (confirmBtn) {
    confirmBtn.disabled = !isValidOK();
  }
}

// === ОБРАБОТЧИКИ СОБЫТИЙ ===

function setupKeyboardHandlers() {
  // Клик по кнопкам
  document.querySelectorAll('.kb-btn').forEach(btn => {
    btn.addEventListener('click', handleKeyClick);
  });

  // Drag and drop для рядов
  document.querySelectorAll('.kb-draggable').forEach(row => {
    row.addEventListener('dragstart', handleDragStart);
    row.addEventListener('dragover', handleDragOver);
    row.addEventListener('drop', handleDrop);
    row.addEventListener('dragend', handleDragEnd);
  });
}

function handleKeyClick(e) {
  const btn = e.currentTarget;
  const action = btn.dataset.action;
  const char = btn.dataset.char;
  const charAlt = btn.dataset.charAlt;

  if (action === 'delete') {
    ThresholdState.inputData = [];
    updateInputDisplay();
    return;
  }

  if (action === 'backspace') {
    ThresholdState.inputData.pop();
    updateInputDisplay();
    return;
  }

  if (char) {
    const text = ThresholdState.inputData.map(i => i.char).join('');
    const currentLength = getCorrectLength(text);

    if (currentLength >= OK_MAX_LENGTH) {
      return; // Достигнут лимит
    }

    // Для split-кнопок: клик слева = tl, клик справа = br
    let selectedChar = char;
    if (charAlt) {
      const rect = btn.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const halfWidth = rect.width / 2;
      if (clickX > halfWidth) {
        selectedChar = charAlt;
      }
    }

    ThresholdState.inputData.push({ char: selectedChar });
    updateInputDisplay();
  }
}

// Drag and drop
function handleDragStart(e) {
  const rowIdx = parseInt(e.currentTarget.dataset.row);
  ThresholdState.draggedRowIndex = rowIdx;
  e.currentTarget.classList.add('dragging');
}

function handleDragOver(e) {
  e.preventDefault();
}

function handleDrop(e) {
  e.preventDefault();
  const targetRow = e.currentTarget;
  const targetRowIdx = parseInt(targetRow.dataset.row);
  const draggedRowIdx = ThresholdState.draggedRowIndex;

  if (draggedRowIdx === null || draggedRowIdx === targetRowIdx) return;

  // Swap rows
  const draggedPos = ThresholdState.rowsOrder.indexOf(draggedRowIdx);
  const targetPos = ThresholdState.rowsOrder.indexOf(targetRowIdx);

  [ThresholdState.rowsOrder[draggedPos], ThresholdState.rowsOrder[targetPos]] =
  [ThresholdState.rowsOrder[targetPos], ThresholdState.rowsOrder[draggedPos]];

  renderKeyboard();
}

function handleDragEnd(e) {
  e.currentTarget.classList.remove('dragging');
  ThresholdState.draggedRowIndex = null;
}

// === ПОДТВЕРЖДЕНИЕ О.К. ===

function handleConfirmOK() {
  const text = ThresholdState.inputData.map(i => i.char).join('');
  const okKey = `::${text}::`;

  if (isReservedOK(text)) {
    alert('Этот О.К. зарезервирован платформой (диапазон 0-33)');
    return;
  }

  // Сохранить в localStorage
  localStorage.setItem('pygmalion_ok_key', okKey);
  localStorage.setItem('pygmalion_ok_created', new Date().toISOString());

  // Отправить на backend
  fetch('http://localhost:3001/api/ok', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ok_key: okKey })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      alert(`О.К. создан: ${okKey}`);
      // Перенаправить на главную
      window.location.href = '../index.html';
    } else {
      alert('Ошибка создания О.К.');
    }
  })
  .catch(err => {
    console.error('Ошибка:', err);
    alert('Не удалось подключиться к backend');
  });
}

// === ИНИЦИАЛИЗАЦИЯ ===

document.addEventListener('DOMContentLoaded', () => {
  renderKeyboard();
  updateInputDisplay();

  const confirmBtn = document.getElementById('confirm-ok-btn');
  if (confirmBtn) {
    confirmBtn.addEventListener('click', handleConfirmOK);
  }

  const copyBtn = document.getElementById('btn-copy-ok');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const text = ThresholdState.inputData.map(i => i.char).join('');
      const okKey = `::${text}::`;
      navigator.clipboard.writeText(okKey);

      const feedback = document.getElementById('copy-feedback');
      if (feedback) {
        feedback.style.opacity = '1';
        setTimeout(() => { feedback.style.opacity = '0'; }, 2000);
      }
    });
  }
});
