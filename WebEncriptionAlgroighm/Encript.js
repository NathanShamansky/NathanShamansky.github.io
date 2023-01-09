function encrypt(text, key) {
  // Convert text and key to arrays of ASCII values
  var textArr = text.split('').map(char => char.charCodeAt(0));
  var keyArr = key.split('').map(char => char.charCodeAt(0));
  
  // Encrypt each character in the text by adding its ASCII value to the corresponding key character's ASCII value
  var encryptedArr = textArr.map((char, index) => char + keyArr[index % keyArr.length]);
  
  // Convert encrypted array back to string and return it
  return encryptedArr.map(char => String.fromCharCode(char)).join('');
}
