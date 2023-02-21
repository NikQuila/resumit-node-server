const {
  downloadedFileAndSaveInUserFS,
  downloadedFileAndSaveInResumitFS,
  downloadFileAndSaveInResumiterFB,
  addToHistorialFB,
} = require("../Firebase/firebase.utils");

const mandarMail = require("../mailgun/mailgun");

const axios = require("axios");

const MailNotPayment = async (req, res) => {
  const {
    uid,
    resumit_id,
    resumit_user_id,
    resumit_user_name,
    email,
    unit_price,
    email_vendedor,
    name_comprador,
    title,
  } = req.body;
  downloadedFileAndSaveInUserFS(uid, resumit_id, 0);
  downloadedFileAndSaveInResumitFS(uid, email, resumit_id, resumit_user_id, 0);
  downloadFileAndSaveInResumiterFB(
    resumit_user_id,
    uid,
    email,
    0,
    name_comprador
  );
  addToHistorialFB(name_comprador, resumit_user_name, false);
  await mandarMail(
    process.env.KEY_MAILGUN,
    email_vendedor,
    name_comprador,
    title,
    unit_price
  );
  res.status(200).send("Ok");
};

module.exports = {
  MailNotPayment,
};
