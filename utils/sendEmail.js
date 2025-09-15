const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // STARTTLS
  auth: {
    user: process.env.BREVO_USER, // identifiant Brevo
    pass: process.env.BREVO_PASSWORD, // mot de passe SMTP Brevo
  },
});

/**
 * Envoi d'email via Brevo
 * @param {Object} options
 * @param {string} options.to - Destinataire
 * @param {string} options.subject - Sujet du mail
 * @param {string} options.text - Version texte
 * @param {string} options.html - Version HTML
 */
const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Oppai" <${process.env.BREVO_USER}>`, // expéditeur
      to,
      subject,
      text,
      html,
    });
    console.log("Email envoyé :", info.messageId);
    return info;
  } catch (err) {
    console.error("Erreur envoi email :", err);
    throw err;
  }
};

module.exports = sendEmail;
