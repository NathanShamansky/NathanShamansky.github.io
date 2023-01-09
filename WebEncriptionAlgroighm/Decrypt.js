function decrypt(text, key) {
    // Create an empty string to store the decrypted text
    let decryptedText = "";
  
    // Loop through each character in the text
    for (let i = 0; i < text.length; i++) {
      // Get the ASCII code for the character
      let asciiCode = text.charCodeAt(i);
  
      // Subtract the key from the ASCII code and get the modulus of the result
      // with 256. This ensures that the resulting ASCII code is always between
      // 0 and 255
      let decryptedCode = (asciiCode - Number(key)) % 256;
      if (decryptedCode < 0) decryptedCode += 256;
  
      // Convert the decrypted ASCII code back to a character and add it to
      // the decrypted text
      let decryptedChar = String.fromCharCode(decryptedCode);
      decryptedText += decryptedChar;
    }
  
    // Return the decrypted text
    return decryptedText;
  }