// backend/utils/sendEmail.js
const SibApiV3Sdk = require("sib-api-v3-sdk");
const dotenv = require("dotenv");
dotenv.config();

const client = SibApiV3Sdk.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY; // ajoute BREVO_API_KEY dans .env

const sendEmail = async ({ to, subject, text, html }) => {
  const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail({
    to: [{ email: to }],
    sender: { email: process.env.BREVO_SENDER_EMAIL, name: "Oppai" },
    subject,
    textContent: text,
    htmlContent: html,
  });

  try {
    await tranEmailApi.sendTransacEmail(sendSmtpEmail);
    console.log(`Email envoyé à ${to}`);
  } catch (error) {
    console.error("Erreur d'envoi email:", error);
  }
};

module.exports = sendEmail;
