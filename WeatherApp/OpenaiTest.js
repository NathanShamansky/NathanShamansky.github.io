const ApiKey = '';
const endpoint = 'https://api.openai.com/v1/chat/completions';
let UsingApiKey = 'test';

function CallRequest(location) {
    const payload = {
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": "I am in "+location+". What fairly unique activities should I do? Just list activities without extra text. Put them in html item format, but only include li elements, no ul, or ol. Include one introductory sentence in a h4."}]
    };

    if(document.getElementsByClassName("TryAgainInputAPIKey").length > 0)
    {
        UsingApiKey = document.getElementsByClassName("TryAgainInputAPIKey")[0].value;
        var elements = document.getElementsByClassName("OpenAiOL");
        if (elements.length > 0) {
          elements[0].innerHTML = '<img class="LoadingImage" src="Images/SpinnerLoading.png" alt="">';
        }
    }else{
        UsingApiKey = ApiKey;
    }
      
    fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${UsingApiKey}`
        },
        body: JSON.stringify(payload)
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        var elements = document.getElementsByClassName("OpenAiOL");
        if (elements.length > 0) {
          elements[0].innerHTML = data.choices[0].message.content + '<p class="TokenCounter">Total Used Tokens: '+data.usage.total_tokens+'</p>';
        }

      })
      .catch(error => {
        console.error('Error:', error);
        var elements = document.getElementsByClassName("OpenAiOL");
        if (elements.length > 0) {
          elements[0].innerHTML = '<p style="color: red;">Unable Co Collect Data <small>('+error+')</small></p> <input type="text" class="TryAgainInputAPIKey" placeholder="Your API key"><button class="TryAgainBtn" onclick="ForwadTOCallRequest()">Try Again</button>';
        }
    });
}

  