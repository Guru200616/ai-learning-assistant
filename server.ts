import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Luxury Products Data
  const products = [
    {
      id: "1",
      name: "AURELIA Signature Silk Scarf",
      price: 450,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800",
      category: "Accessories",
      description: "Hand-rolled edges, 100% Italian silk."
    },
    {
      id: "2",
      name: "Midnight Obsidian Gown",
      price: 3200,
      image: "https://images.unsplash.com/photo-1539109132314-34775d4ee99a?auto=format&fit=crop&q=80&w=800",
      category: "Apparel",
      description: "Hand-stitched obsidian sequins on delicate tulle."
    },
    {
      id: "3",
      name: "Champagne Gold Clutch",
      price: 1850,
      image: "https://images.unsplash.com/photo-1566150905458-1bf1fd113f0d?auto=format&fit=crop&q=80&w=800",
      category: "Accessories",
      description: "Fine leather with 24k gold-plated hardware."
    },
    {
      id: "4",
      name: "Cashmere Heritage Coat",
      price: 2750,
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800",
      category: "Outerwear",
      description: "Pure hand-sourced Mongolian cashmere."
    }
  ];

  // API Endpoints
  app.get("/api/products", (req, res) => {
    res.json(products);
  });

  app.post("/api/process-payment", async (req, res) => {
    const { cart } = req.body;
    console.log("Processing payment for cart:", cart);
    // 2 second simulated delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    res.json({ status: "Payment Successful", transactionId: "TXN-" + Math.random().toString(36).substr(2, 9).toUpperCase() });
  });

  app.post("/api/contact-submit", (req, res) => {
    const { name, email, message } = req.body;
    console.log("Inquiry received:", { name, email, message });
    res.json({ status: "Success", message: "Inquiry received. Our advisors will contact you shortly." });
  });

  app.post("/api/chat", (req, res) => {
    const { message } = req.body;
    const msg = message.toLowerCase();
    let response = "I apologize, but as your AURELIA personal shopper, I am here to assist with your journey. Could you specify your interest?";

    if (msg.includes("material") || msg.includes("fabric") || msg.includes("quality")) {
      response = "Our artisans exclusively utilize Italian silk and hand-sourced cashmere, ensuring a tactile experience that transcends standard luxury.";
    } else if (msg.includes("shipping") || msg.includes("delivery")) {
      response = "We offer white-glove concierge delivery worldwide. Each AURELIA piece is transported in climate-controlled conditions to preserve its integrity.";
    } else if (msg.includes("hello") || msg.includes("hi") || msg.includes("help") || msg.includes("concierge")) {
      response = "Welcome to the AURELIA Concierge. I am here to curate your aesthetic. Are you looking for evening wear or our signature accessories today?";
    } else if (msg.includes("price") || msg.includes("cost")) {
      response = "AURELIA represents an investment in heirloom-quality craftsmanship. Our pricing reflects the rarity of materials and the hours of hand-labour required.";
    }

    res.json({ response });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
