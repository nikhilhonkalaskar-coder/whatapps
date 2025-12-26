import express from "express";
import fetch from "node-fetch";

const router = express.Router();

// Auto-increment response number (simple memory version)
let responseCounter = 10335;

router.post("/send-otp", async (req, res) => {
  try {
    const { name, phone, email, city } = req.body;

    if (!phone) {
      return res.status(400).json({ error: "Phone required" });
    }

    responseCounter++;

    const message = `*Response* #${responseCounter}

*Tushar Bhumkar Institute (#premium commodity शेअर मार्केट क्लासेस)*

*Full Name :* ${name}
*Mobile Number :* ${phone}
*Email :* ${email}
*City :* ${city}`;

    const apiRes = await fetch("https://api.interakt.ai/v1/public/message/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.INTERAKT_API_KEY}`
      },
      body: JSON.stringify({
        countryCode: "91",
        phoneNumber: process.env.SALES_NUMBER,
        type: "text",
        text: message
      })
    });

    const data = await apiRes.json();

    res.json({ success: true, interakt: data });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "OTP failed" });
  }
});

export default router;
