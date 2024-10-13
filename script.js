// Define your API key and OpenAI API endpoint
const apiUrl = 'https://api.openai.com/v1/chat/completions';
const apiKey = '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'; // ضع مفتاح API الخاص بك هنا

// الدالة التي ترسل رسالة إلى الذكاء الاصطناعي وتحصل على الرد
async function sendMessageToAI(message) {
    const requestBody = {
        model: "gpt-3.5-turbo",  // أو "gpt-4" إذا كنت تستخدم الإصدار الأحدث
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
                'Authorization': `Bearer ${apiKey}`,  // تأكد من استخدام مفتاح API الصحيح
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.choices && data.choices.length > 0) {
            return data.choices[0].message.content;
        } else {
            return 'Sorry, no valid response from AI.';
        }

    } catch (error) {
        console.error('Error communicating with AI:', error);
        return 'Sorry, there was an error. Please try again.';
    }
}

// ربط إدخال المستخدم والرد من الذكاء الاصطناعي بواجهة المستخدم
document.getElementById('inputField').addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
        const inputField = document.getElementById('inputField');
        const userMessage = inputField.value;
        
        if (!userMessage) return; // إذا كان الإدخال فارغًا، لا ترسل شيء

        // عرض رسالة المستخدم في صندوق الدردشة
        const chatBox = document.getElementById('chatBox');
        chatBox.innerHTML += `<p><strong>User:</strong> ${userMessage}</p>`;

        // مسح حقل الإدخال بعد إرسال الرسالة
        inputField.value = '';

        // الحصول على رد من الذكاء الاصطناعي
        const aiResponse = await sendMessageToAI(userMessage);
        
        // عرض رد الذكاء الاصطناعي في صندوق الدردشة
        chatBox.innerHTML += `<p><strong>AI:</strong> ${aiResponse}</p>`;

        // التمرير التلقائي إلى الأسفل عند إضافة رسائل جديدة
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});

