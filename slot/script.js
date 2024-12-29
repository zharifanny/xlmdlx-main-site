const symbols = ["🍒", "🍋", "🍉", "🍇", "🔔"]; // 5 different symbols for the slots

function spin() {
    const slots = [];
    // Randomly select symbols for each slot
    for (let i = 1; i <= 25; i++) {
        const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        document.getElementById('slot' + i).innerHTML = randomSymbol;
        slots.push(randomSymbol);
    }

    // Check for winning pattern (e.g., all symbols in the center row are the same)
    const result = checkWin(slots);
    document.getElementById("result").innerHTML = result ? "You win!" : "Try again!";
}

function checkWin(slots) {
    // Example: check if the middle row has the same symbol
    const middleRow = slots.slice(10, 15); // Slots 11-15 (middle row)
    return middleRow.every(symbol => symbol === middleRow[0]);
}
