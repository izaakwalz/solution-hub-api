const { customAlphabet } = require('nanoid');
const alphabet = 'abcdefghijklmnopqrstuvwxy0123456789zABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nanoid = customAlphabet(alphabet, 10);
nanoid(); //=> "MeclG0o2Ru"
