const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: "bc90f98599504aad50af6ff16fd3fecb-d117dd33-4b51e1b8",
});
mg.messages
  .create("sandbox3ca851a49b7c4746a869a3d206586608.mailgun.org", {
    from: "Mailgun Sandbox <postmaster@sandbox3ca851a49b7c4746a869a3d206586608.mailgun.org>",
    to: ["nicopirozzi1@gmail.com"],
    subject: "Hello",
    text: "Testing some Mailgun awesomness!",
  })
  .then((msg) => console.log(msg)) // logs response data
  .catch((err) => console.log(err)); // logs any error`;

// You can see a record of this email in your logs: https://app.mailgun.com/app/logs.

// You can send up to 300 emails/day from this sandbox server.
// Next, you should add your own domain so you can send 10000 emails/month for free.
