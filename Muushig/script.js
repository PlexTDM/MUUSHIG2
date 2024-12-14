document.addEventListener("DOMContentLoaded", () => {
    const playButton = document.getElementById("playButton");
    const profileButton = document.getElementById("profileButton");
    const settingsButton = document.getElementById("settingsButton");
    const statsButton = document.getElementById("statsButton");

    const joinButton = document.getElementById("joinButton");
    const createRoomButton = document.getElementById("createRoomButton");

    const formContainer = document.getElementById("formContainer");
    const backButton = document.getElementById("backButton");

    // When Play is clicked
    playButton.addEventListener("click", () => {
        profileButton.classList.add("hidden");
        settingsButton.classList.add("hidden");
        statsButton.classList.add("hidden");
        playButton.classList.add("hidden");

        joinButton.classList.remove("hidden");
        createRoomButton.classList.remove("hidden");
    });

    // Show input form and back button for Create Room
    createRoomButton.addEventListener("click", () => {
        joinButton.classList.add("hidden");
        createRoomButton.classList.add("hidden");

        formContainer.innerHTML = `
            <h2>Create a Room</h2>
            <input type="text" class="input-field" placeholder="Enter Room Name">
            <button class="button" id="createRoomSubmit"><h1>Create</h1></button>
        `;
        formContainer.classList.remove("hidden");
        backButton.classList.remove("hidden");

        document.getElementById("createRoomSubmit").addEventListener("click", () => {
            alert("Room created successfully!");
            resetToMainMenu();
        });
    });

    // Show input form and back button for Join Room
    joinButton.addEventListener("click", () => {
        joinButton.classList.add("hidden");
        createRoomButton.classList.add("hidden");

        formContainer.innerHTML = `
            <h2>Join a Room</h2>
            <input type="text" class="input-field" placeholder="Enter Room Code">
            <button class="button" id="joinRoomSubmit"><h1>Join</h1></button>
        `;
        formContainer.classList.remove("hidden");
        backButton.classList.remove("hidden");

        document.getElementById("joinRoomSubmit").addEventListener("click", () => {
            alert("Joined room successfully!");
            resetToMainMenu();
        });
    });

    // Back button functionality
    backButton.addEventListener("click", resetToMainMenu);

    // Reset to the main menu
    function resetToMainMenu() {
        // Hide all interactive elements
        formContainer.innerHTML = ""; // Clear form container content
        formContainer.classList.add("hidden"); // Hide form container
        backButton.classList.add("hidden"); // Hide back button
        joinButton.classList.add("hidden");
        createRoomButton.classList.add("hidden");

        // Restore default main menu buttons
        profileButton.classList.remove("hidden");
        settingsButton.classList.remove("hidden");
        statsButton.classList.remove("hidden");
        playButton.classList.remove("hidden");
    }
});

profileButton.addEventListener("click", () => {
    // Hide all main menu buttons
    playButton.classList.add("hidden");
    settingsButton.classList.add("hidden");
    statsButton.classList.add("hidden");
    profileButton.classList.add("hidden");

    // Show the form with input for nickname
    formContainer.innerHTML = `
        <h2>Edit Profile</h2>
        <input type="text" class="input-field" id="nicknameInput" placeholder="Enter your nickname">
        <button class="button" id="saveNicknameButton"><h1>Save</h1></button>
    `;
    formContainer.classList.remove("hidden");
    backButton.classList.remove("hidden");

    // Save button functionality
    const saveButton = document.getElementById("saveNicknameButton");
    saveButton.addEventListener("click", () => {
        const nickname = document.getElementById("nicknameInput").value.trim();
        if (nickname) {
            alert(`Nickname saved: ${nickname}`);
        } else {
            alert("Please enter a valid nickname.");
        }
    });
});

// Back button functionality
backButton.addEventListener("click", () => {
    // Clear the form and hide it
    formContainer.innerHTML = "";
    formContainer.classList.add("hidden");

    // Hide the back button
    backButton.classList.add("hidden");

    // Restore all main menu buttons
    playButton.classList.remove("hidden");
    settingsButton.classList.remove("hidden");
    statsButton.classList.remove("hidden");
    profileButton.classList.remove("hidden");
});


















profileButton.addEventListener("click", () => {
    // Hide all main menu buttons
    playButton.classList.add("hidden");
    settingsButton.classList.add("hidden");
    statsButton.classList.add("hidden");
    profileButton.classList.add("hidden");

    // Show the form with input for nickname
    formContainer.innerHTML = `
        <h2>Edit Profile</h2>
        <input type="text" class="input-field" id="nicknameInput" placeholder="Enter your nickname">
        <button class="button" id="saveNicknameButton"><h1>Save</h1></button>
    `;
    formContainer.classList.remove("hidden");
    backButton.classList.remove("hidden");

    // Save button functionality
    const saveButton = document.getElementById("saveNicknameButton");
    saveButton.addEventListener("click", () => {
        const nickname = document.getElementById("nicknameInput").value.trim();
        if (nickname) {
            alert(`Nickname saved: ${nickname}`);
        } else {
            alert("Please enter a valid nickname.");
        }
    });
});

// Back button functionality
backButton.addEventListener("click", () => {
    // Clear the form and hide it
    formContainer.innerHTML = "";
    formContainer.classList.add("hidden");

    // Hide the back button
    backButton.classList.add("hidden");

    // Restore all main menu buttons
    playButton.classList.remove("hidden");
    settingsButton.classList.remove("hidden");
    statsButton.classList.remove("hidden");
    profileButton.classList.remove("hidden");
});






settingsButton.addEventListener("click", () => {
    // Hide all main menu buttons
    playButton.classList.add("hidden");
    profileButton.classList.add("hidden");
    statsButton.classList.add("hidden");
    settingsButton.classList.add("hidden");

    // Show settings form with volume control and music selection
    formContainer.innerHTML = `
        <h2>Settings</h2>
        <div class="settings-group">
            <label for="volumeControl">Audio Volume:</label>
            <input type="range" id="volumeControl" min="0" max="100" value="50">
            <span id="volumeValue">50</span>%
        </div>
        <div class="settings-group">
            <label for="musicSelection">Menu Music:</label>
            <select id="musicSelection">
                <option value="track1">Track 1</option>
                <option value="track2">Track 2</option>
                <option value="track3">Track 3</option>
            </select>
        </div>
        <button class="button" id="applySettingsButton"><h1>Apply</h1></button>
    `;
    formContainer.classList.remove("hidden");
    backButton.classList.remove("hidden");

    // Volume slider functionality
    const volumeControl = document.getElementById("volumeControl");
    const volumeValue = document.getElementById("volumeValue");
    volumeControl.addEventListener("input", () => {
        volumeValue.textContent = volumeControl.value; // Update displayed volume percentage
    });

    // Apply button functionality
    const applySettingsButton = document.getElementById("applySettingsButton");
    applySettingsButton.addEventListener("click", () => {
        const selectedVolume = volumeControl.value;
        const selectedMusic = document.getElementById("musicSelection").value;

        alert(`Settings applied:\nVolume: ${selectedVolume}%\nMusic: ${selectedMusic}`);
    });
});

// Back button functionality remains unchanged
backButton.addEventListener("click", () => {
    // Clear the form and hide it
    formContainer.innerHTML = "";
    formContainer.classList.add("hidden");

    // Hide the back button
    backButton.classList.add("hidden");

    // Restore all main menu buttons
    playButton.classList.remove("hidden");
    profileButton.classList.remove("hidden");
    statsButton.classList.remove("hidden");
    settingsButton.classList.remove("hidden");
});







document.addEventListener("DOMContentLoaded", () => {
    const playButton = document.getElementById("playButton");
    const profileButton = document.getElementById("profileButton");
    const settingsButton = document.getElementById("settingsButton");
    const statsButton = document.getElementById("statsButton");

    const joinButton = document.getElementById("joinButton");
    const createRoomButton = document.getElementById("createRoomButton");

    const formContainer = document.getElementById("formContainer");
    const backButton = document.getElementById("backButton");

    // Get the audio element
    const audio = document.getElementById("backgroundMusic");

    // Load saved volume level from localStorage
    const savedVolume = localStorage.getItem("volume");
    if (savedVolume !== null) {
        audio.volume = savedVolume / 100;  // Convert the stored value (0-100) to a decimal (0-1)
    } else {
        audio.volume = 0.5;  // Default to 50% volume if no value is saved
    }

    // Play the music when the "Play" button is clicked
    playButton.addEventListener("click", () => {
        profileButton.classList.add("hidden");
        settingsButton.classList.add("hidden");
        statsButton.classList.add("hidden");
        playButton.classList.add("hidden");

        joinButton.classList.remove("hidden");
        createRoomButton.classList.remove("hidden");

        // Play the music when the play button is clicked
        audio.play();
    });

    // Handle Settings Button
    settingsButton.addEventListener("click", () => {
        formContainer.innerHTML = `
            <h2>Settings</h2>
            <div class="settings-group">
                <label for="volumeControl">Audio Volume:</label>
                <input type="range" id="volumeControl" min="0" max="100" value="${audio.volume * 100}">
                <span id="volumeValue">${audio.volume * 100}</span>%
            </div>
        `;
        formContainer.classList.remove("hidden");
        backButton.classList.remove("hidden");

        // Volume control functionality
        const volumeControl = document.getElementById("volumeControl");
        const volumeValue = document.getElementById("volumeValue");

        // Update volume and audio element
        volumeControl.addEventListener("input", () => {
            const volume = volumeControl.value / 100; // Convert slider value to decimal
            audio.volume = volume; // Set the volume on the audio element
            volumeValue.textContent = volumeControl.value; // Update the volume display

            // Save the volume to localStorage
            localStorage.setItem("volume", volumeControl.value);
        });

        // Optional: Apply settings when the apply button is clicked
        const applySettingsButton = document.getElementById("applySettingsButton");
        applySettingsButton.addEventListener("click", () => {
            alert(`Settings applied:\nVolume: ${volumeControl.value}%`);
        });
    });

    // Back button functionality remains unchanged
    backButton.addEventListener("click", () => {
        formContainer.innerHTML = "";
        formContainer.classList.add("hidden");
        backButton.classList.add("hidden");

        // Restore all main menu buttons
        playButton.classList.remove("hidden");
        profileButton.classList.remove("hidden");
        statsButton.classList.remove("hidden");
        settingsButton.classList.remove("hidden");
    });
});