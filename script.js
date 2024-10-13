// Define your API key and OpenAI API endpoint
const apiKey = 'sk-P1uAtUqt-7TLvPQbulft6fTzx3PI7I8Qr_l35vUbW1T3BlbkFJX8QQyzXxIzpRH1Q2bppaOj1aB1C8GUffEwHzPT15QA';  // استبدل YOUR_API_KEY بمفتاح API الخاص بك
const apiUrl = 'https://api.openai.com/v1/chat/completions';

async function sendMessageToAI(message) {
    // Prepare the API request payload
    const requestBody = {
        model: "gpt-3.5-turbo",  // أو gpt-4 إذا كنت تستخدم إصدار GPT-4
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: message }
        ],
        max_tokens: 150
    };

    try {
        // Send the request to OpenAI API
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        // Parse the response as JSON
        const data = await response.json();

        // Extract the AI's reply
        const aiReply = data.choices[0].message.content;
        return aiReply;

    } catch (error) {
        console.error('Error communicating with AI:', error);
        return 'Sorry, there was an error. Please try again.';
    }
}

// Get input from user and display response
const inputField = document.querySelector('input');
inputField.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
        const userMessage = inputField.value;
        const aiResponse = await sendMessageToAI(userMessage);
        
        // Display the AI's response
        const chatBox = document.querySelector('.chat-box');
        chatBox.innerHTML += `<p>User: ${userMessage}</p>`;
        chatBox.innerHTML += `<p>AI: ${aiResponse}</p>`;

        // Clear the input field
        inputField.value = '';
    }
});
