const mongoose = require("mongoose");
const initData = require("./data.js"); // Ensure data.js has hospital data
const Hospital = require("../models/hospital.js"); // Your hospital model

const MONGO_URL ="mongodb+srv://admin:14102003@hospital.kmg9x.mongodb.net/?retryWrites=true&w=majority&appName=hospital";

main()
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ Connection Error:", err));

async function main() {
  await mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
}

const initDB = async () => {
  try {
    await Hospital.deleteMany({});
    console.log("🗑️ Cleared existing hospital data");

    // Assign an owner field if needed (optional)
    initData.data = initData.data.map((obj) => ({
      ...obj,
      owner: "6782d424cfdd24d833ce1999", // Replace with actual user ID if needed
    }));

    await Hospital.insertMany(initData.data);
    console.log("✅ Hospital data initialized successfully!");

    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error initializing DB:", error);
  }
};

initDB();
