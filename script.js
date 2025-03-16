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
        
        messages.forEach(function(msg, index) {
            const li = document.createElement('li');
            li.textContent = 'Message ' + index + ': ' + msg;
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
        
        // Send the message to the server
        fetch(serviceUrl + '/msg/post/' + encodeURIComponent(message))
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
            alert('Service URL updated to: ' + window.serviceUrl);
            
            // Refresh messages from the new URL
            fetchMessages()
                .then(function(messages) {
                    updateUI(messages);
                });
        }
    }
    
    // Add a button for configuring the service URL
    const configButton = document.createElement('button');
    configButton.textContent = 'Configure Service URL';
    configButton.addEventListener('click', setServiceUrl);
    document.getElementById('controls').appendChild(configButton);
});
