const mongoose = require('mongoose');


mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection;

// Check for DB connection status
db.on("disconnected", () => console.log("MongoDB Disconnected!"));
db.on("connected", () => console.log("MongoDB Connected!"));
db.on("error", (err) => console.log(err.message + ""));
