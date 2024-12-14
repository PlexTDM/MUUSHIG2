document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll("#player1 img");

    cards.forEach(card => {
        card.addEventListener("click", () => {
            // Check if the card is already selected
            if (card.classList.contains("clicked")) {
                // If it's selected, deselect it by removing the 'clicked' class
                card.classList.remove("clicked");
            } else {
                // Deselect any previously selected card
                cards.forEach(otherCard => {
                    otherCard.classList.remove("clicked");
                });

                // Select the clicked card
                card.classList.add("clicked");
            }
        });
    });
});





document.addEventListener("dragstart", (event) => {
    event.preventDefault();
});


const elements = document.querySelectorAll("img, p"); // Target images and paragraphs
elements.forEach((element) => {
    element.addEventListener("dragstart", (event) => {
        event.preventDefault();
    });
});











document.addEventListener("DOMContentLoaded", () => {
    const playButton = document.getElementById("playButton");
    const cards = document.querySelectorAll("#player1 .card");

    let selectedCard = null; // Keep track of the selected card

    // Click event for selecting a card
    cards.forEach(card => {
        card.addEventListener("click", () => {
            // If a card is already selected, remove 'selected' class from it
            if (selectedCard) {
                selectedCard.classList.remove("selected");
            }

            // Set the clicked card as the selected one
            selectedCard = card;
            selectedCard.classList.add("selected");
        });
    });

    // Play button click event
    playButton.addEventListener("click", () => {
        if (selectedCard) {
            // Move the selected card to the center when the button is clicked
            selectedCard.classList.add("centered");

            // Optionally, remove 'selected' class after moving the card
            selectedCard.classList.remove("selected");
        } else {
            alert("Please select a card first!");
        }
    });
});



//card stack

