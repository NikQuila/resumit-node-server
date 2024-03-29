const axios = require("axios");

class PaymentService {
  async createPayment(req) {
    const {
      title,
      unit_price,
      uid,
      email,
      email_vendedor,
      name_comprador,
      resumit_id,
      resumit_user_id,
      resumit_user_name,
    } = req.body;
    console.log(req.body);
    const url = "https://api.mercadopago.com/checkout/preferences";

    const body = {
      metadata: {
        uid: uid,
        resumit_id: resumit_id,
        resumit_user_id: resumit_user_id,
        resumit_user_name: resumit_user_name,
        unit_price: unit_price,
        email: email,
        email_vendedor: email_vendedor,
        name_comprador: name_comprador,
        title: title,
      },
      payer_email: email,
      payer: {
        name: "Nombre",
      },
      items: [
        {
          title: title,
          description: "Dummy description",
          picture_url: "http://www.myapp.com/myimage.jpg",
          category_id: "category123",
          quantity: 1,
          unit_price: unit_price,
        },
      ],
      back_urls: {
        failure: "/resumit.cl/payment/failure",
        pending: "/pending",
        success: "/resumit.cl/payment/success",
      },
      notification_url:
        "https://resumit-server-node.herokuapp.com/notificacion",
    };

    const payment = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    });

    return payment.data;
  }

  async createSubscription() {
    const url = "https://api.mercadopago.com/preapproval";

    const body = {
      reason: "Suscripción de ejemplo",
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: 10,
        currency_id: "ARS",
      },
      back_url: "https://google.com.ar",
      payer_email: "test_user_7003325@testuser.com",
    };

    const subscription = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    });

    return subscription.data;
  }
}

module.exports = PaymentService;
