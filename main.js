document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');

    // Ganti dengan API Key OpenAI Anda
    const API_KEY = "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";
    const API_URL = "https://api.openai.com/v1/chat/completions";

    // Menambahkan pesan ke chat
    function addMessage(text, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.innerHTML = `<p>${text}</p>`;

        messageDiv.appendChild(contentDiv);
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Mengambil respons dari OpenAI API
    async function getAIResponse(userMessage) {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [{ role: "user", content: userMessage }],
                    max_tokens: 150
                })
            });

            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            console.error("Error fetching AI response:", error);
            return "Sorry, I couldn't process your request. Please try again.";
        }
    }

    // Mengirim pesan
    async function sendMessage() {
        const message = userInput.value.trim();
        if (!message) return;

        addMessage(message, true);
        userInput.value = "";

        // Menampilkan "typing..." saat menunggu respons
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'message bot-message';
        typingIndicator.innerHTML = '<div class="message-content"><p><i>Typing...</i></p></div>';
        chatMessages.appendChild(typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Mengambil respons AI
        const aiResponse = await getAIResponse(message);
        
        // Menghapus "typing..." dan menampilkan respons
        chatMessages.removeChild(typingIndicator);
        addMessage(aiResponse, false);
    }

    // Event Listeners
    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
});
