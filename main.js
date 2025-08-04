document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    
    // Respons sederhana
    const botResponses = {
        "halo": "Halo juga! 😊",
        "siapa kamu": "Aku Angel, AI asistenmu!",
        "terima kasih": "Sama-sama! 💖",
        "default": "Maaf, aku belum paham. Bisa diulangi?"
    };
    
    function addMessage(text, isUser) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${isUser ? 'user' : 'bot'}`;
        msgDiv.innerHTML = `<p>${text}</p>`;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function sendMessage() {
        const message = userInput.value.trim();
        if (!message) return;
        
        addMessage(message, true);
        userInput.value = '';
        
        // Respons bot
        setTimeout(() => {
            const lowerMsg = message.toLowerCase();
            const response = botResponses[lowerMsg] || botResponses["default"];
            addMessage(response, false);
        }, 800);
    }
    
    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
});
