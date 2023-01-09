document.getElementById('submit').addEventListener('click', function() {
    // Get the operation, text, and key from the form
    let operation = document.getElementById('operation').value;
    let text = document.getElementById('text').value;
    let key = document.getElementById('key').value;
  
    // Check if the operation is 'encrypt'
    if (operation === 'encrypt') {
      // Encrypt the text using the key
      let result = encrypt(text, key);
      console.log("e")
  
      // Display the result
      document.getElementById('output').textContent = result;
    }
    if (operation === 'decrypt') {
      // Decrypt the text using the key
      let result = decrypt(text, key);
      console.log("d")
  
      // Display the result
      document.getElementById('output').textContent = result;
    }
  });
document.getElementById('copy-button').addEventListener('click', function() {
  // Get the output text
  let output = document.getElementById('output');

  // Select the text
  output.select();

  // Copy the text to the clipboard
  document.execCommand('copy');
});