const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use(express.static("./public"));
app.use(express.static("./uploads"));
// routes
app.use("/api", require("./routes/authRouter"));
app.use("/api", require("./routes/studentRouter"));

// Global error handlers
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server started on on port ${PORT}`));
