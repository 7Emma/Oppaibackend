const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

const adminUsername = process.env.ADMIN_USERNAME;
const adminEmail = process.env.ADMIN_EMAIL;

const seedAdminUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const adminExists = await User.findOne({ role: "admin" });
    if (adminExists) {
      console.log("Un utilisateur admin existe déjà.");
      mongoose.disconnect();
      return;
    }

    const adminUser = new User({
      username: adminUsername,
      email: adminEmail,
      role: "admin",
    });

    await adminUser.save();
    console.log("Admin créé sans mot de passe.");

    mongoose.disconnect();
  } catch (error) {
    console.error("Erreur lors du seed admin :", error);
    process.exit(1);
  }
};

seedAdminUser();
