'use strict';
import sha256 from 'crypto-js/sha256';
import aes from 'crypto-js/aes';
import base64 from 'crypto-js/enc-base64';
import utf8 from 'crypto-js/enc-utf8';
import hex from 'crypto-js/enc-hex';
import latin1 from 'crypto-js/enc-latin1';
import ECB from 'crypto-js/mode-ecb';
import ENCRYPTION_SECRET from '../config'

export const generateSecret = (key, label) => {
  return hash(key + label + ENCRYPTION_SECRET);
}

export const encrypt = (plainText, encryption_key) => {

  let deserialisedText = plainText;

  return aes.encrypt(deserialisedText, encryption_key, {
    mode: ECB
  }).toString();
}

export const decrypt = (ciphertext, key, id = null) => {
  let secret = id ? hash(key + id) : key;
  let result = aes.decrypt(ciphertext, secret, {
    mode: ECB
  }).toString(utf8)
  return result;
}

const hash = (string) => {
  return hex.stringify(sha256(base64.stringify(utf8.parse(string))));
}
export default {
  encrypt,
  decrypt,
  generateSecret
};