function getRandomColor() {
  const colors = ['green', 'yellow', 'blue', 'red'];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

const colorsMapping = {
  'green': 'Verde',
  'yellow': 'Amarelo',
  'blue': 'Azul',
  'red': 'Vermelho'
};

const icons = document.querySelectorAll('.objects_description img');
const colorTextElement = document.querySelector('.color_text');
const buttons = document.querySelectorAll('.button');
const messageElement = document.getElementById('message');
const backButton = document.getElementById('back');
const continueButton = document.getElementById('continue');
const buttonMessageContainer = document.querySelector('.button-message-container');

const maxAttemptsPerRound = 5;
let currentRound = 0;
let totalAttempts = 0;
let countTargetColor;

buttons.forEach((button) => {
  button.addEventListener('click', function () {
    handleButtonClick.call(this);  
  });
});

function updateColors() {
  currentRound++;

  // Mapeia os objetos da página com suas cores
  const objectsWithColors = Array.from(icons).map(icon => {
    const iconColor = getRandomColor();
    icon.style.backgroundColor = iconColor;
    return { icon, color: iconColor };
  });

  // Seleciona aleatoriamente um objeto
  const randomIndex = Math.floor(Math.random() * objectsWithColors.length);
  const targetObject = objectsWithColors[randomIndex];

  // Define a cor e atualiza a interface
  const targetColor = targetObject.color;
  colorTextElement.style.color = targetColor;
  colorTextElement.textContent = colorsMapping[targetColor] || targetColor;

  // Conta a quantidade de objetos com a cor
  countTargetColor = objectsWithColors.filter(obj => obj.color === targetColor).length; // Mova para fora da função para torná-la global

  // Gera uma lista com números diferentes da quantidade correta (evitar o erro de duplicidade)
  const otherNumbers = generateUniqueNumbers(countTargetColor, buttons.length);

  // Escolhe aleatoriamente um índice para o botão correto
  const correctButtonIndex = Math.floor(Math.random() * buttons.length);
  otherNumbers[correctButtonIndex] = countTargetColor;

  buttons.forEach((button, index) => {
    button.textContent = colorsMapping[otherNumbers[index]] || otherNumbers[index];
  });

  // Limpa a mensagem e exibe os botões
  messageElement.textContent = '';
  showButtons();
}

continueButton.addEventListener('click', handleContinueClick);

function generateUniqueNumbers(exclude, count) {
  const uniqueNumbers = [];

  while (uniqueNumbers.length < count) {
    const number = getRandomNumber(exclude);
    if (!uniqueNumbers.includes(number)) {
      uniqueNumbers.push(number);
    }
  }

  return uniqueNumbers;
}

function getRandomNumber(exclude) {
  let number;
  do {
    number = Math.floor(Math.random() * 6) + 1;
  } while (number === exclude);
  return number;
}

function showButtons() {
  buttonMessageContainer.style.display = 'flex';
}

function hideButtons() {
  buttonMessageContainer.style.display = 'none';
}

function handleButtonClick() { 
 
  const selectedText = this.textContent.trim();

  // Verifica se o texto não está vazio
  if (!selectedText) {
    console.error('Erro: O texto está vazio.');
    return;
  }

  // Converte o texto para número
  const selectedNumber = parseInt(selectedText, 10);

  if (isNaN(selectedNumber)) {
    console.error(`Erro: Não foi possível converter o texto "${selectedText}" para número.`);
    return;
  }

  console.log(`Número selecionado: ${selectedNumber}`);
  console.log(`Contagem alvo: ${countTargetColor}`);

  // Verifica se o número selecionado é o mesmo da cor escolhida
  if (selectedNumber === countTargetColor) {
    messageElement.textContent = 'Parabéns! Você acertou!';
    showButtons();
  } else {
    messageElement.textContent = 'Ops! Tente novamente.';
    showButtons();
  }

  totalAttempts++;

  if (totalAttempts > maxAttemptsPerRound) {
    messageElement.textContent = 'Você atingiu o limite de tentativas. Deseja continuar?';
    showButtons();

    // Reinicia o número de tentativas para a próxima rodada
    totalAttempts = 0;
  }
}

function handleContinueClick() {
  // Incrementa para a próxima rodada
  currentRound++;

  // Reinicia o número de tentativas e oculta os botões
  totalAttempts = 0;
  hideButtons();

  // Atualiza as cores para a próxima rodada
  updateColors();

  messageElement.textContent = '';
}

// Adiciona um evento de clique ao botão "Voltar"
backButton.addEventListener('click', function () {
  window.location.href = './area_infantil.html';
});

hideButtons();
updateColors();
