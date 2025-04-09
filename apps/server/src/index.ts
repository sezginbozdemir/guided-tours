import express from "express";
import userRoutes from "./routes/userRoutes";
import tourRoutes from "./routes/tourRoutes";
import cors from "cors";

const app = express();

app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use("/api", userRoutes);
app.use("/api", tourRoutes);

const PORT = 9000;

app.listen(PORT, () => {
  console.log(`Backend running on ${PORT}`);
});
