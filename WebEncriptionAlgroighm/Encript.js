function encrypt(text, key) {
    // Create an empty string to store the encrypted text
    let encryptedText = "";
  
    // Loop through each character in the text
    for (let i = 0; i < text.length; i++) {
      // Get the ASCII code for the character
      let asciiCode = text.charCodeAt(i);
  
      // Add the key to the ASCII code and get the modulus of the result
      // with 256. This ensures that the resulting ASCII code is always between
      // 0 and 255
      let encryptedCode = (asciiCode + Number(key)) % 256;
  
      // Convert the encrypted ASCII code back to a character and add it to
      // the encrypted text
      let encryptedChar = String.fromCharCode(encryptedCode);
      encryptedText += encryptedChar;
    }
  
    // Return the encrypted text
    return encryptedText;
  }