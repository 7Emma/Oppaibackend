const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // STARTTLS
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASSWORD,
  },
});

/**
 * Envoi d'email via Brevo avec template HTML
 * @param {Object} options
 * @param {string} options.to - Destinataire
 * @param {string} options.subject - Sujet du mail
 * @param {string} options.code - Code de vérification
 * @param {string} options.name - Nom du destinataire
 */
const sendEmail = async ({ to, subject, code, name }) => {
  try {
    // Lire le template HTML depuis le même dossier
    const templatePath = path.join(__dirname, "brevo.html");
    let html = fs.readFileSync(templatePath, "utf-8");

    // Remplacer les variables dynamiques utilisées dans Brevo
    html = html
      .replace(/{{params.name}}/g, name)
      .replace(/{{params.code}}/g, code);

    const info = await transporter.sendMail({
      from: `"Oppai" <${process.env.BREVO_USER}>`,
      to,
      subject,
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
