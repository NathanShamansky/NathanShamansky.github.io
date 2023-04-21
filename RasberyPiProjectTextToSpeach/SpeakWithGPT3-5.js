const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const messagesList = document.getElementById("messages");

let recognition;
let messages = [];
let TotalUsedTokens = 0;

let isAssistantSpeaking = false;

startButton.addEventListener("click", () => {
    if (isAssistantSpeaking) return;
    startRecognition();
});

stopButton.addEventListener("click", () => {
    stopRecognition();
});

function startRecognition() {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = async (event) => {
        if (isAssistantSpeaking) {
            stopRecognition();
            return;
        }

        const result = event.results[event.results.length - 1];
        if (result.isFinal) {
            const transcript = result[0].transcript;
            console.log("You Say:", transcript);
            messages.push({
                role: "user",
                content: transcript
            });
            displayMessage({
                role: "user",
                content: transcript
            });

            const assistantMessage = await getAssistantResponse(transcript);
            if (!assistantMessage) return;

            isAssistantSpeaking = true;
            const utterance = new SpeechSynthesisUtterance(assistantMessage);
            utterance.onstart = () => {
                stopRecognition();
            };
            utterance.onend = () => {
                isAssistantSpeaking = false;
                if (!stopButton.disabled) {
                    startRecognition();
                }
            };
            window.speechSynthesis.speak(utterance);
        }
    };

    recognition.start();
    startButton.disabled = true;
    stopButton.disabled = false;
}

function stopRecognition() {
    recognition.stop();

}

async function getAssistantResponse(userMessage) {
    // Replace with your OpenAI API key
    const apiKey = "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";
    const url = "https://api.openai.com/v1/chat/completions";
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
    };

    const data = {
        model: "gpt-3.5-turbo",
        messages: [...messages, {
            role: "user",
            content: userMessage
        }],
    };

    const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
    });

    const responseData = await response.json();
    if (response.status !== 200) {
        const errorElements = document.getElementsByClassName("ErrorMessage");
        if (errorElements.length > 0) {
          errorElements[0].textContent = responseData.error.message;
        }
        console.log("Request failed with status code:", response.status);
        console.log("Response content:", responseData);
        return null;
      }
      

    if (!responseData.choices) {
        console.log("Response does not contain choices:", responseData);
        return null;
    }

    const assistantMessage = responseData.choices[0].message.content;
    console.log("GPT:", assistantMessage);
    messages.push({
        role: "assistant",
        content: assistantMessage
    });
    displayMessage({
        role: "assistant",
        content: assistantMessage
    });
    TotalUsedTokens += responseData.usage.total_tokens;
    document.getElementsByClassName("TotalTokens")[0].textContent = "Total Used Tokens: " + TotalUsedTokens;


    return assistantMessage;
}
stopButton.addEventListener("click", () => {
    recognition.stop();
    startButton.disabled = false;
    stopButton.disabled = true;
});

function displayMessage(message) {
    const listItem = document.createElement("li");
    listItem.textContent = message.content;
    listItem.className = message.role === "user" ? "User" : "AI";

    const senderDiv = document.createElement("div");
    senderDiv.textContent = message.role;
    senderDiv.className = "SenderText";

    listItem.appendChild(senderDiv);
    messagesList.appendChild(listItem);

}
