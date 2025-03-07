document.addEventListener('DOMContentLoaded', function() {
    const sendButton = document.getElementById('send-button');
    const messageText = document.getElementById('message-text');

    sendButton.addEventListener('click', function() {
        const message = messageText.value;
        console.log('Message sent:', message);
        // In the future, send the message to the server
    });
});
