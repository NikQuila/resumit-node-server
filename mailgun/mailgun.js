const Mailgun = require("mailgun.js");
const formData = require("form-data");
const mailgun = new Mailgun(formData);

const mandarMail = async (
  key,
  mail,
  nombreComprador,
  nombreResumit,
  precioCompra
) => {
  let texto = "";
  if (precioCompra > 0) {
    texto = "Hay que estar muy agradecido con nuestro compañero :)";
  } else if (precioCompra === 0) {
    texto =
      "Esperemos que nuestro compañero pueda aporta algo la próxima vez :(";
  }
  const DOMAIN = "mail.resumit.cl";
  const mg = mailgun.client({ key: key, username: "Resumit" });
  const data = {
    from: "Resumit <resumits@outlook.com>",
    to: mail,
    subject: "Has recibido una Descarga",
    template: "resumitsend",
    "v:nombreComprador": nombreComprador,
    "v:nombreResumit": nombreResumit,
    "v:precioCompra": precioCompra.toString(),
    "v:texto": texto,
  };
  mg.messages
    .create(DOMAIN, data)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = mandarMail;
