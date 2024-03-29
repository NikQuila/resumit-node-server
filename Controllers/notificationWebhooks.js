const {
  downloadedFileAndSaveInUserFS,
  downloadedFileAndSaveInResumitFS,
  downloadFileAndSaveInResumiterFB,
  addToHistorialFB,
} = require("../Firebase/firebase.utils");

const mandarMail = require("../mailgun/mailgun");

const axios = require("axios");

const PagarProducto = async (req, res) => {
  if (req.body.action === "payment.created") {
    const payment = await axios.get(
      `https://api.mercadopago.com/v1/payments/${req.body.data.id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
      }
    );
    if (payment.data.status === "approved") {
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
      } = payment.data.metadata;
      const unit_with_taxes = unit_price * 0.77;
      downloadedFileAndSaveInUserFS(uid, resumit_id, unit_price);
      downloadedFileAndSaveInResumitFS(
        uid,
        email,
        resumit_id,
        resumit_user_id,
        unit_with_taxes
      );
      downloadFileAndSaveInResumiterFB(
        resumit_user_id,
        uid,
        email,
        unit_price,
        name_comprador
      );
      addToHistorialFB(name_comprador, resumit_user_name, unit_price);
      await mandarMail(
        process.env.KEY_MAILGUN,
        email_vendedor,
        name_comprador,
        title,
        unit_price
      );
    }
  }

  res.status(200).send("Ok");
};

module.exports = {
  PagarProducto,
};
