document.addEventListener('DOMContentLoaded', function() {
    const sendButton = document.getElementById('send-button');
    const messageText = document.getElementById('message-text');
    const messagesList = document.getElementById('messages').querySelector('ul');

    let msgs = [
        { "msg" : "Hello World" },
        { "msg" : "Blah Blah" },
        { "msg" : "I love cats" }
    ];

    function update(messages) {
        messagesList.innerHTML = ''; // Clear the list

        messages.forEach(function(item) {
            const li = document.createElement('li');
            li.textContent = item.msg;
            messagesList.appendChild(li);
        });
    }

    sendButton.addEventListener('click', function() {
        const message = messageText.value;
        console.log('Message sent:', message);
        // In the future, send the message to the server
        update(msgs);
    });
});
