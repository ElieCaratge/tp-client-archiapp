document.addEventListener('DOMContentLoaded', function() {
    const sendButton = document.getElementById('send-button');
    const messageText = document.getElementById('message-text');
    const messagesList = document.getElementById('messages').querySelector('ul');
    const updateButton = document.getElementById('update-button');
    
    // Base URL for the microservice - can be changed for different deployments
    const serviceUrl = 'http://localhost:8080';
    
    // Function to fetch all messages from the server
    function fetchMessages() {
        return fetch(serviceUrl + '/msg/getAll')
            .then(function(response) {
                return response.json();
            })
            .catch(function(error) {
                console.error('Error fetching messages:', error);
                return [];
            });
    }
    
    // Function to update the UI with messages
    function updateUI(messages) {
        messagesList.innerHTML = ''; // Clear the list
        
        messages.forEach(function(msgObj, index) {
            const li = document.createElement('li');
            
            // Handle both string messages and object messages with metadata
            if (typeof msgObj === 'string') {
                li.textContent = 'Message ' + index + ': ' + msgObj;
            } else {
                // Format the date
                const date = new Date(msgObj.date);
                const formattedDate = date.toLocaleTimeString() + ' ' + date.toLocaleDateString();
                
                // Create the message text with metadata
                li.textContent = msgObj.pseudo + ': ' + msgObj.msg + ' (' + formattedDate + ')';
            }
            
            messagesList.appendChild(li);
        });
    }
    
    // Initial load of messages
    fetchMessages()
        .then(function(messages) {
            updateUI(messages);
            // Alert with the first message (for testing)
            if (messages.length > 0) {
                alert(messages[0]);
            }
        });
    
    // Update button click handler
    updateButton.addEventListener('click', function() {
        fetchMessages()
            .then(function(messages) {
                updateUI(messages);
            });
    });
    
    // Send button click handler
    sendButton.addEventListener('click', function() {
        const message = messageText.value;
        if (message.trim() === '') {
            alert('Please enter a message');
            return;
        }
        
        console.log('Message sent:', message);
        
        // Get the username (prompt the user if not already set)
        let username = localStorage.getItem('messageBoardUsername');
        if (!username) {
            username = prompt('Enter your username:', 'Anonymous');
            if (username) {
                localStorage.setItem('messageBoardUsername', username);
            } else {
                username = 'Anonymous';
            }
        }
        
        // Send the message to the server
        fetch(serviceUrl + '/msg/post/' + encodeURIComponent(message) + '?pseudo=' + encodeURIComponent(username))
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                console.log('Message posted with index:', data);
                messageText.value = ''; // Clear the input field
                
                // Refresh the messages
                return fetchMessages();
            })
            .then(function(messages) {
                updateUI(messages);
            })
            .catch(function(error) {
                console.error('Error posting message:', error);
            });
    });

    const themeButton = document.getElementById('theme-button');
    themeButton.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
    });
    
    // Function to make the service URL configurable
    function setServiceUrl() {
        const urlInput = prompt('Enter the microservice URL:', serviceUrl);
        if (urlInput && urlInput.trim() !== '') {
            window.serviceUrl = urlInput.trim();
            localStorage.setItem('messageBoardServiceUrl', window.serviceUrl);
            alert('Service URL updated to: ' + window.serviceUrl);
            
            // Refresh messages from the new URL
            fetchMessages()
                .then(function(messages) {
                    updateUI(messages);
                });
        }
    }
    
    // Function to set or change username
    function setUsername() {
        const currentUsername = localStorage.getItem('messageBoardUsername') || 'Anonymous';
        const username = prompt('Enter your username:', currentUsername);
        if (username && username.trim() !== '') {
            localStorage.setItem('messageBoardUsername', username.trim());
            alert('Username updated to: ' + username.trim());
        }
    }
    
    // Add a button for configuring the service URL
    const configButton = document.createElement('button');
    configButton.textContent = 'Configure Service URL';
    configButton.addEventListener('click', setServiceUrl);
    document.getElementById('controls').appendChild(configButton);
    
    // Add a button for setting username
    const usernameButton = document.createElement('button');
    usernameButton.textContent = 'Set Username';
    usernameButton.addEventListener('click', setUsername);
    document.getElementById('controls').appendChild(usernameButton);
    
    // Check if we have a saved service URL
    const savedServiceUrl = localStorage.getItem('messageBoardServiceUrl');
    if (savedServiceUrl) {
        window.serviceUrl = savedServiceUrl;
        console.log('Using saved service URL:', window.serviceUrl);
        
        // Refresh messages from the saved URL
        fetchMessages()
            .then(function(messages) {
                updateUI(messages);
            });
    }
});
