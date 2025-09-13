const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

// Assurez-vous que les variables d'environnement sont définies
const adminUsername = process.env.ADMIN_USERNAME;
const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

if (!adminUsername || !adminEmail || !adminPassword) {
  console.error(
    "Erreur: Les variables d'environnement ADMIN_USERNAME, ADMIN_EMAIL et ADMIN_PASSWORD doivent être définies."
  );
  process.exit(1);
}

const seedAdminUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connexion à la base de données réussie.");

    const adminExists = await User.findOne({ role: "admin" });
    if (adminExists) {
      console.log(
        "Un utilisateur admin existe déjà. Aucune action nécessaire."
      );
      mongoose.disconnect();
      return;
    }

    const adminUser = new User({
      username: adminUsername,
      email: adminEmail,
      password: adminPassword,
      role: "admin",
    });

    await adminUser.save();
    console.log("Utilisateur admin créé avec succès.");

    mongoose.disconnect();
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur admin :", error);
    process.exit(1);
  }
};

seedAdminUser();
