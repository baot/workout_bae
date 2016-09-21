const crypto = require('crypto');

exports.encode = function(payload, secret) {
  const algorithm = 'HS256';

  const header = {
    typ: 'JWT',
    alg: algorithm,
  };

  let jwt = base64Encode(JSON.stringify(header)) + '.' + base64Encode(JSON.stringify(payload));
  jwt += '.' + createSignature(jwt, secret);
  return jwt;
};

function createSignature(str, secret) {
  return crypto.createHmac('sha256', secret).update(str).digest('base64');
}

function base64Encode(str) {
  return new Buffer(str).toString('base64');
}
