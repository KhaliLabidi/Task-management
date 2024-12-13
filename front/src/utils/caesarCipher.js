// front/src/utils/caesarCipher.js
export const caesarEncrypt = (text, shift) => {
    return text.replace(/[a-z]/gi, (char) => {
      const start = char <= 'Z' ? 65 : 97;
      return String.fromCharCode(((char.charCodeAt(0) - start + shift) % 26) + start);
    });
  };
  
  export const caesarDecrypt = (text, shift) => {
    return text.replace(/[a-z]/gi, (char) => {
      const start = char <= 'Z' ? 65 : 97;
      return String.fromCharCode(((char.charCodeAt(0) - start - shift + 26) % 26) + start);
    });
  };