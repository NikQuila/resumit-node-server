const {
  downloadedFileAndSaveInUserFS,
  downloadedFileAndSaveInResumitFS,
} = require("../Firebase/firebase.utils");

const mandarMail = require("../mailgun/mailgun");

const axios = require("axios");

const MailNotPayment = async (req, res) => {
  const {
    uid,
    resumitId,
    resumitUserId,
    email,
    unit_price,
    email_vendedor,
    name_comprador,
    title,
  } = req.body;
  downloadedFileAndSaveInUserFS(uid, resumitId, 0);
  downloadedFileAndSaveInResumitFS(uid, email, resumitId, resumitUserId, 0);
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
