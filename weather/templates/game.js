// Store references to elements
const btnRef = document.querySelectorAll(".board__cell");
    const restartBtn = document.getElementById("restart");
    const msgRef = document.getElementById("message");
    const popupRef = document.getElementById("popup");
    const currentTurnRef = document.getElementById("current-turn");

    // Winning pattern array
    let winningPattern = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];

    // Variables for game status
    let xTurn = true;
    let count = 0;

    // Function to disable all buttons (board and restart button)
    const disableButtons = () => {
        btnRef.forEach((element) => element.disabled = true);
    };

    // Function to enable buttons (board and restart button) and hide the popup
    const enableButtons = () => {
        btnRef.forEach((element) => {
            element.innerText = "";
            element.disabled = false;
        });
        currentTurnRef.innerHTML = "Current Turn: X"; // Reset the display
        xTurn = true;
        count = 0; // Reset move count
        popupRef.classList.remove("show");  // Hide the popup on new game
    };

    // Function to show the popup with the message
    const showPopup = (message) => {
        popupRef.classList.add("show"); // Show popup
        msgRef.innerHTML = message;     // Set the message in the popup
    };

    // Function executed when a player wins
    const winFunction = (letter) => {
        disableButtons(); // Disable all buttons when someone wins
        if (letter === "X") {
            showPopup("🥳 'X' Wins 🥳");
        } else {
            showPopup("🥳 'O' Wins 🥳");
        }
    };

    // Function for draw
    const drawFunction = () => {
        disableButtons(); // Disable all buttons on draw
        showPopup("😎 It's a Draw");
    };

    // Event listener for restarting the game using the "Restart" button
    restartBtn.addEventListener("click", () => {
        enableButtons(); // Reset everything and hide popup
    });

    // Win Logic
    const winChecker = () => {
        // Loop through all win patterns
        for (let i of winningPattern) {
            let [element1, element2, element3] = [
                btnRef[i[0]].innerText,
                btnRef[i[1]].innerText,
                btnRef[i[2]].innerText,
            ];

            // Check if elements are filled and same
            if (element1 !== "" && element2 !== "" && element3 !== "") {
                if (element1 === element2 && element2 === element3) {
                    // If all 3 buttons have same values, pass the value to winFunction
                    winFunction(element1);
                    return true; // Return true if there's a winner
                }
            }
        }
        return false; // No winner yet
    };

    // Display X/O on click
    btnRef.forEach((element) => {
        element.addEventListener("click", () => {
            if (element.innerText === "") {
                element.innerText = xTurn ? "X" : "O";
                element.disabled = true;
                count += 1;

                // Check for a win
                if (winChecker()) {
                    return; // Stop further actions if there's a winner
                }

                // Check for a draw
                if (count === 9) {
                    drawFunction();
                }

                // Switch turn
                xTurn = !xTurn;
                currentTurnRef.innerHTML = `Current Turn: ${xTurn ? "X" : "O"}`;
            }
        });
    });

    // Enable buttons and set initial state on page load
    window.onload = enableButtons;