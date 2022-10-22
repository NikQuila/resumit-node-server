const express = require("express");
const { PagarProducto } = require("../Controllers/notificationWebhooks");
var router = express.Router();

router.post("/notificacion", (req, res) => {
  PagarProducto(req, res);
});

module.exports = router;
