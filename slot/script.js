const symbols = ["🍒", "🍋", "🍉", "🍇", "🔔"]; // 5 different symbols for the slots

let isSpinning = false;

function spin() {
    if (isSpinning) return; // Prevent multiple spins at the same time
    isSpinning = true;
    const slots = [];

    // Apply animation to each slot
    for (let i = 1; i <= 25; i++) {
        const slot = document.getElementById('slot' + i);
        slot.classList.add('spin-animation');
        slot.classList.add('hidden'); // Hide slot before spinning starts
    }

    // After the animation finishes, stop the spinning
    setTimeout(() => {
        for (let i = 1; i <= 25; i++) {
            const slot = document.getElementById('slot' + i);
            slot.classList.remove('spin-animation');
            slot.classList.remove('hidden');
            const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
            slot.innerHTML = randomSymbol;
        }

        // Check if the user has won (e.g., all symbols in the center row are the same)
        const result = checkWin();
        document.getElementById("result").innerHTML = result ? "You win!" : "Try again!";
        isSpinning = false;
    }, 2000); // Duration of the animation (in ms)
}

function checkWin() {
    // Example: check if the middle row has the same symbol
    const middleRow = [
        document.getElementById('slot11').innerHTML,
        document.getElementById('slot12').innerHTML,
        document.getElementById('slot13').innerHTML,
        document.getElementById('slot14').innerHTML,
        document.getElementById('slot15').innerHTML
    ];
    
    return middleRow.every(symbol => symbol === middleRow[0]);
}
