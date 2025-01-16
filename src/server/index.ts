import { Hono } from "hono";
import { logger } from "hono/logger";
import { serve } from "@hono/node-server";
import path from "path";
import fs from "fs/promises";

const app = new Hono();

// Add Hono's logger middleware
app.use("*", logger());

// Privacy file storage location
const PRIVACY_FILES_DIR = path.join(__dirname, "../../privacy-files");

// Define types for our API
// type PrivacyFile = {
//   name: string;
//   size: number;
//   modified: Date;
// };

type UploadRequest = {
  content: Record<string, unknown>;
  filename: string;
};

// Ensure privacy files directory exists
async function initializeStorage() {
  try {
    console.info("Initializing storage directory");
    await fs.mkdir(PRIVACY_FILES_DIR, { recursive: true });
  } catch (error) {
    console.error("Failed to initialize storage directory:", error);
    throw error;
  }
}

// Get all privacy files
app.get("/api/privacy-files", async (c) => {
  try {
    const files = await fs.readdir(PRIVACY_FILES_DIR);
    const fileStats = await Promise.all(
      files.map(async (file) => {
        const stats = await fs.stat(path.join(PRIVACY_FILES_DIR, file));
        return {
          name: file,
          size: stats.size,
          modified: stats.mtime,
        };
      })
    );
    return c.json(fileStats);
  } catch (error) {
    console.error("Error fetching privacy files:", error);
    return c.json({ error: "Failed to fetch privacy files" }, 500);
  }
});

// Download privacy file
app.get("/api/privacy-files/:filename", async (c) => {
  try {
    const filename = c.req.param("filename");
    const filePath = path.join(PRIVACY_FILES_DIR, filename);

    const fileContent = await fs.readFile(filePath);
    return new Response(fileContent, {
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Error downloading privacy file:", error);
    return c.json({ error: "Failed to download file" }, 500);
  }
});

// Upload privacy file
app.post("/api/privacy-files", async (c) => {
  try {
    const body = await c.req.json<UploadRequest>();
    const { content, filename } = body;

    await fs.writeFile(
      path.join(PRIVACY_FILES_DIR, filename),
      JSON.stringify(content, null, 2)
    );

    return c.json({ message: "File uploaded successfully" });
  } catch (error) {
    console.error("Error uploading privacy file:", error);
    return c.json({ error: "Failed to upload file" }, 500);
  }
});

// Initialize storage and start server
const PORT = process.env.PORT || 3001;

initializeStorage().then(() => {
  console.info(`Starting server on port ${PORT}`);
  serve({
    fetch: app.fetch,
    port: Number(PORT),
  });
});
