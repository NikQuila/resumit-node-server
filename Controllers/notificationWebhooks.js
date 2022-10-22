const {
  downloadedFileAndSaveInUserFS,
  downloadedFileAndSaveInResumitFS,
} = require("../Firebase/firebase.utils");

const axios = require("axios");

const PagarProducto = async (req, res) => {
  console.log("aqui");
  console.log(req.body);
  if (req.body.id) {
    const payment = await axios.get(
      `https://api.mercadopago.com/v1/payments/${req.body.data.id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
      }
    );
    console.log(payment.data);
    console.log(payment.data.metadata);
    const { uid, resumit_id, resumit_user_id, email, unit_price } =
      payment.data.metadata;
    downloadedFileAndSaveInUserFS(uid, resumit_id);
    downloadedFileAndSaveInResumitFS(
      uid,
      email,
      resumit_id,
      resumit_user_id,
      unit_price
    );
  }
  res.status(200).send("Ok");
};

module.exports = {
  PagarProducto,
};
