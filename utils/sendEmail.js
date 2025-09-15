const SibApiV3Sdk = require("sib-api-v3-sdk");
require("dotenv").config();

// Initialisation du client Brevo
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY; // Ta clé API Brevo

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

/**
 * Envoi d'un email transactionnel via un template Brevo
 * @param {Object} options
 * @param {string} options.to - Email du destinataire
 * @param {string} options.name - Nom du destinataire
 * @param {string} options.code - Code de vérification
 * @param {number} options.templateId - ID du template Brevo
 */
const sendEmail = async ({ to, name, code, templateId }) => {
  try {
    const sendSmtpEmail = {
      to: [{ email: to, name }],
      templateId,
      params: {
        name,
        code,
      },
    };

    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("Email envoyé avec succès :", data.messageId);
    return data;
  } catch (error) {
    console.error("Erreur lors de l'envoi d'email :", error);
    throw error;
  }
};

module.exports = sendEmail;
