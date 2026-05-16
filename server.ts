import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: AI Chat (Extract Leads & Query properties)
  // Note: Gemini is called from frontend as per guidelines, 
  // but we might need a backend route for lead saving or specialized logic.
  // The user explicitly asked for /api/chat. I will implement a bridge 
  // if needed or keep logic clean.
  
  app.post("/api/chat", async (req, res) => {
    // In a real app, logic for processing chat and extracting leads would be here.
    // However, guidelines say GEMINI API must be called from frontend.
    // I will use this endpoint for lead persistence and property matching 
    // AFTER the frontend AI extracts the data.
    res.json({ message: "Lead endpoint ready" });
  });

  // API Route: Ingest (Scraper)
  app.post("/api/ingest", async (req, res) => {
    const { url } = req.body;
    if (!process.env.FIRECRAWL_API_KEY) {
      return res.status(500).json({ error: "FIRECRAWL_API_KEY not configured" });
    }
    // Simulate/Placeholder for Firecrawl integration
    console.log(`Scraping: ${url}`);
    res.json({ status: "success", message: "Ingestion started" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
