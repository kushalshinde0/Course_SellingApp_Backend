const express = require("express");
const mongoose = require("mongoose");

const app = express(); // Initialize Express
app.use(express.json()); // Middleware to parse JSON request bodies


//connect to MongoDB("alternative")
// const mongoDB = 'mongodb://127.0.0.1/myDB'
// mongoose.connect(mongoDB).then((data)=>{
//   console.log('db connection is successful..');
  
// })
// const db = mongoose.connection;
// // Connect to MongoDB


mongoose.connect(
  "mongodb+srv://admin:wbdOsrM3lfdogfS5@cluster0.6cihj.mongodb.net/userappnew"
).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});

// Define the User model
const User = mongoose.model("User", {
  name: String,
  email: String,
  password: String,
});

// Define the /signup endpoint
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Email already exists");
    }

    // Create and save the new user
    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ msg: "User created successfully" });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).send("Server error");
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
