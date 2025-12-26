import express from "express";
import fetch from "node-fetch";

const router = express.Router();

// Auto-increment response number (simple memory version)
let responseCounter = 10335;

router.post("/send-otp", async (req, res) => {
  try {
    const { name, phone, email, city } = req.body;

    // Validate input
    if (!phone) {
      return res.status(400).json({ error: "Phone number is required" });
    }

    // Increment response number
    responseCounter++;

    // Prepare the message
    const message = `*Response* #${responseCounter}

*Tushar Bhumkar Institute (#premium commodity शेअर मार्केट क्लासेस)*

*Full Name :* ${name || "-"}
*Mobile Number :* ${phone}
*Email :* ${email || "-"}
*City :* ${city || "-"}`;

    // Send message via Interakt
    const apiRes = await fetch("https://api.interakt.ai/v1/public/message/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.INTERAKT_API_KEY}`
      },
      body: JSON.stringify({
        countryCode: "91",
        phoneNumber: phone,   // sending OTP/message to the user
        type: "text",
        text: message
      })
    });

    const data = await apiRes.json();

    // Check for API errors
    if (!data.result) {
      return res.status(400).json({ success: false, interakt: data });
    }

    // Success response
    res.json({ success: true, interakt: data });

  } catch (err) {
    console.error("Error sending OTP:", err);
    res.status(500).json({ error: "Failed to send OTP/message" });
  }
});

export default router;
