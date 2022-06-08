const admin = require('firebase-admin');

//firebase service account pk, update for your pk
const type = "";
const project_id= "";
const private_key_id= "";
const private_key="";
const client_email= "";
const client_id= "";
const auth_uri= "";
const token_uri= "";
const auth_provider_x509_cert_url= "";
const client_x509_cert_url= "";

//credential grants access to firebase services
admin.initializeApp({
  credential: admin.credential.cert({
    type,
    project_id,
    private_key_id,
    private_key:
      private_key.replace(/\\n/g, '\n'),
    client_email,
    client_id,
    auth_uri,
    token_uri,
    auth_provider_x509_cert_url,
    client_x509_cert_url
  }),
});

async function decodeIDToken(req, res, next) {
  const header = req.headers?.authorization;
  if (header !== 'Bearer null' && req.headers?.authorization?.startsWith('Bearer ')) {

    const idToken = req.headers.authorization.split('Bearer ')[1];

    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req['currentUser'] = decodedToken;
    } catch (err) {
      console.log(err);
    }
  }

  next();
}

module.exports = decodeIDToken;