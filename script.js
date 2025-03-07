document.addEventListener('DOMContentLoaded', function() {
    const sendButton = document.getElementById('send-button');
    const messageText = document.getElementById('message-text');
    const messagesList = document.getElementById('messages').querySelector('ul');
    const updateButton = document.createElement('button');
    updateButton.textContent = 'Update Messages';
    document.getElementById('messages').parentNode.insertBefore(updateButton, document.getElementById('messages').nextSibling);

    let msgs = [
        { "msg" : "Hello World", "pseudo": "John", "date": new Date() },
        { "msg" : "Blah Blah", "pseudo": "Jane", "date": new Date() },
        { "msg" : "I love cats", "pseudo": "Peter", "date": new Date() }
    ];

    function update(messages) {
        messagesList.innerHTML = ''; // Clear the list

        messages.forEach(function(item) {
            const li = document.createElement('li');
            li.textContent = item.pseudo + ': ' + item.msg + ' (' + item.date.toLocaleTimeString() + ')';
            messagesList.appendChild(li);
        });
    }

    updateButton.addEventListener('click', function() {
        update(msgs);
    });

    sendButton.addEventListener('click', function() {
        const message = messageText.value;
        console.log('Message sent:', message);
        // In the future, send the message to the server
    });

    const themeButton = document.getElementById('theme-button');
    themeButton.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
    });
});
