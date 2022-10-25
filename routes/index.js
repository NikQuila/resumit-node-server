var express = require("express");
var router = express.Router();
const PaymentController = require("../Controllers/PaymentsController");
const PaymentService = require("../Services/PaymentsService");
const PaymentInstance = new PaymentController(new PaymentService());
const mandarMail = require("../mailgun/mailgun");

/* GET home page. */
router.get("/", function (req, res, next) {
  // await mandarMail(
  //   process.env.KEY_MAILGUN,
  //   "nicopirozzi1@gmail.com",
  //   "NikQuila",
  //   "Resumit 2",
  //   1500
  // );
  return res.json({
    "/payment": "generates a payment link",
    "/subscription": "generates a subscription link",
  });
});

router.get("/payment", function (req, res, next) {
  //Yo aqui deberia poder leerr lo q mando del front end
  res.set("Access-Control-Allow-Origin", "*");
  PaymentInstance.getPaymentLink(req, res);
});

router.post("/payment", function (req, res, next) {
  //Yo aqui deberia poder leerr lo q mando del front end
  res.set("Access-Control-Allow-Origin", "*");
  console.log(req.body);
  PaymentInstance.getPaymentLink(req, res);
});

router.get("/subscription", function (req, res, next) {
  PaymentInstance.getSubscriptionLink(req, res);
});

module.exports = router;
