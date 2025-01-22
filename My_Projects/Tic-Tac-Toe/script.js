// Select elements from the DOM
const announcement = document.querySelector(".announcement");
const winAnnouncement = document.querySelector("#para");
const startBtn = document.querySelector("#start");
const resetBtn = document.querySelector("#reset");
const boxes = document.querySelectorAll(".box");

// Initially hide the start button
startBtn.style.display = "none";

// Define winning patterns for Tic-Tac-Toe
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
];

// Game state variables
let playerO = true; // Track whose turn it is (O or X)
let turns = 0; // Count the number of turns played

// Add event listeners to each box
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // Mark the box with the current player's symbol
        if (playerO) {
            box.innerText = "O";
            box.style.color = "blue";
            playerO = false;
        } else {
            box.innerText = "X";
            box.style.color = "red";
            playerO = true;
        }

        // Disable the box to prevent multiple clicks
        box.disabled = true;
        turns += 1;

        // Check for a winner or draw based on the number of turns
        if (turns < 9) {
            checkWinner();
        } else {
            if (checkWinner() === true) {
                checkWinner();
            } else {
                isDraw();
            }
        }
    });
});

// Handle a draw scenario
const isDraw = () => {
    winAnnouncement.textContent = "OOOOOP's the game is Draw.!";
    showPara(true); // Display the draw message
    disbleBtnsAction(true); // Disable all boxes
    resetBtn.disabled = true; // Disable reset button
    startBtn.style.removeProperty("display"); // Show the start button
};

// Check for a winner
const checkWinner = () => {
    let win = false;

    // Loop through each winning pattern
    for (let pattern of winPatterns) {
        let box1 = boxes[pattern[0]].innerText;
        let box2 = boxes[pattern[1]].innerText;
        let box3 = boxes[pattern[2]].innerText;

        // Check if all three boxes in the pattern have the same symbol
        if (box1 !== "" && box2 !== "" && box3 !== "") {
            if (box1 === box2 && box1 === box3) {
                winAnnouncement.textContent = "Congratulations Player " + box1 + " Won!";
                showPara(true); // Display the winner message
                disbleBtnsAction(true); // Disable all boxes
                resetBtn.disabled = true; // Disable reset button
                startBtn.style.removeProperty("display"); // Show the start button
                win = true;
            }
        }
    }
    return win;
};

// Show or hide the announcement paragraph
const showPara = (toshow) => {
    if (toshow) {
        winAnnouncement.removeAttribute("class", "hidden");
        winAnnouncement.setAttribute("class", "para");
    } else {
        winAnnouncement.removeAttribute("class", "para");
        winAnnouncement.setAttribute("class", "hidden");
        winAnnouncement.innerText = "";
        startBtn.style.display = "none";
    }
};

// Disable or enable buttons and optionally clear their text
const disbleBtnsAction = (val, clearData = false) => {
    for (const btn of boxes) {
        btn.disabled = val;
        if (clearData) {
            btn.innerText = "";
        }
    }
};

// Restart the game
const restart = () => {
    disbleBtnsAction(false, true); // Enable all boxes and clear their text
    playerO = true; // Reset to Player O's turn
    resetBtn.disabled = false; // Enable reset button
    turns = 0; // Reset turn count
};

// Add event listeners to reset and start buttons
resetBtn.addEventListener("click", restart);
startBtn.addEventListener("click", restart);
startBtn.addEventListener("click", () => showPara(false));
