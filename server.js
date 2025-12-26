import express from "express";
import cors from "cors";
import otpRoutes from "./src/otp.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", otpRoutes);

app.get("/", (req, res) => {
  res.send("OTP server running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
