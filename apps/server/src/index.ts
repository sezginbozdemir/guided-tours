import express from "express";
import userRoutes from "./routes/userRoutes";
import tourRoutes from "./routes/tourRoutes";
import locationRoutes from "./routes/locationRoutes";
import articleRoutes from "./routes/articleRoutes";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./static");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max size
}).array("files");

const app = express();

app.use(cors());
app.use("/static", express.static("static"));
app.use(express.json());

// Image upload route
app.post("/api/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: "Error uploading file", err });
    }

    const uploadedFiles = req.files as Express.Multer.File[];
    if (!uploadedFiles || uploadedFiles.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const filePaths = uploadedFiles.map((file) => `/static/${file.filename}`);

    res.status(200).json({
      message: "Images uploaded successfully",
      paths: filePaths,
    });
  });
});

// Delete image route
app.delete("/api/upload/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, "..", "static", filename);

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
      return res.status(500).json({ error: "Error deleting file" });
    }

    res.status(200).json({ message: "File deleted successfully" });
  });
});

// Routes
app.use("/api", userRoutes);
app.use("/api", tourRoutes);
app.use("/api", locationRoutes);
app.use("/api", articleRoutes);

const PORT = 9000;

app.listen(PORT, () => {
  console.log(`Backend running on ${PORT}`);
});
