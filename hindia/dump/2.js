// Define consts
const [delayMin, delayMax] = [0, 14];
const [speedMin, speedMax] = [12, 18];
const [blinkMin, blinkMax] = [1, 4];

// Process headlines imported in HTML as headlines.js
let headlines = blueValleyHeadlines;

// Shuffle the array with Fisher-Yates algorithm
function shuffle(arr) {
  var i = arr.length,
    j,
    temp;
  while (--i > 0) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
}
shuffle(headlines);

// Function to generate a single HTML span for a headline with random text
function generateSingleSentimentSpan(headlineObj) {
  const color = headlineObj.isPositive
    ? "var(--positive-color)"
    : "var(--negative-color)";
  const text = headlineObj.headline;
  return `<span style="color: ${color}; filter: drop-shadow(0 0 0.5rem ${color});">${text}</span>`;
}

// Get the ticker container
const ticker = document.getElementById("ticker");

// Function to create a ticker-inner div with random text
function createTickerInner() {
  const delay = (delayMin + Math.random() * delayMax) - ((delayMax - delayMin) / 2);
  const scrollSpeed = speedMin + Math.random() * speedMax;
  const blinkSpeed = blinkMin + Math.random() * blinkMax;

  const tickerInner = document.createElement("div");
  tickerInner.classList.add("ticker-inner");
  tickerInner.style.animation = `scroll ${scrollSpeed}s linear infinite, blink-random ${blinkSpeed}s ease-in-out infinite`;
  tickerInner.style.animationDelay = `${delay}s`;
  tickerInner.innerHTML = generateSingleSentimentSpan(headlines[Math.floor(Math.random() * headlines.length)]);
  ticker.appendChild(tickerInner);

  return tickerInner;
}

// Function to update the text of a ticker-inner div with random text
function updateTickerText(tickerInner) {
  tickerInner.innerHTML = generateSingleSentimentSpan(headlines[Math.floor(Math.random() * headlines.length)]);
}

// Create initial ticker elements
const tickerInnerElements = [];
for (let i = 0; i < 10; i++) {
  tickerInnerElements.push(createTickerInner());
}

// Update ticker text continuously
setInterval(() => {
  const randomIndex = Math.floor(Math.random() * tickerInnerElements.length);
  updateTickerText(tickerInnerElements[randomIndex]);
}, 1000);
  