const mailgun = require("mailgun.js");

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
  const mg = mailgun({ apiKey: key, domain: DOMAIN });
  const data = {
    from: "Resumit <resumits@outlook.com>",
    to: mail,
    subject: "Hello",
    template: "resumitsend",
    "v:nombreComprador": nombreComprador,
    "v:nombreResumit": nombreResumit,
    "v:precioCompra": precioCompra,
    "v:texto": texto,
  };
  mg.messages().send(data, function (error, body) {
    console.log(body);
  });
};

module.exports = mandarMail;
