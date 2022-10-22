const axios = require("axios");

class PaymentService {
  async createPayment(req) {
    const { title, unit_price, uid, email, resumitId, resumitUserId } =
      req.body;
    console.log(req.body);
    const url = "https://api.mercadopago.com/checkout/preferences";

    const body = {
      metadata: {
        uid: uid,
        resumitId: resumitId,
        resumitUserId: resumitUserId,
        unit_price: unit_price,
        email: email,
      },
      payer_email: "test_user_7003325@testuser.com",
      payer: {
        name: "El nombre del qlio",
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
        failure: "/localhost:3000/dashboard/payment/failure",
        pending: "/pending",
        success: "/localhost:3000/dashboard/payment/success",
      },
      notification_url: "https://a005-132-147-42-19.ngrok.io/notificacion",
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
