function decrypt(text, key) {
  // Convert text and key to arrays of ASCII values
  var textArr = text.split('').map(char => char.charCodeAt(0));
  var keyArr = key.split('').map(char => char.charCodeAt(0));
  
  // Decrypt each character in the text by subtracting its ASCII value from the corresponding key character's ASCII value
  var decryptedArr = textArr.map((char, index) => char - keyArr[index % keyArr.length]);
  
  // Convert decrypted array back to string and return it
  return decryptedArr.map(char => String.fromCharCode(char)).join('');
}
