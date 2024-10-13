// Define your API key and OpenAI API endpoint
const apiKey = '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';  // استبدل YOUR_API_KEY بمفتاح API الخاص بك
const apiUrl = 'https://api.openai.com/v1/chat/completions';

async function sendMessageToAI(message) {
    const requestBody = {
        model: "gpt-3.5-turbo",  // أو gpt-4 إذا كنت تستخدم إصدار GPT-4
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: message }
        ],
        max_tokens: 150
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        // تحقق من نجاح الاستجابة
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // التحقق من وجود البيانات الصحيحة في الاستجابة
        if (data.choices && data.choices.length > 0) {
            const aiReply = data.choices[0].message.content;
            return aiReply;
        } else {
            return 'Sorry, no valid response from AI.';
        }

    } catch (error) {
        console.error('Error communicating with AI:', error);
        return 'Sorry, there was an error. Please try again.';
    }
}

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
