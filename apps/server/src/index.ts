import express from "express";
import userRoutes from "./routes/userRoutes";

const app = express();

app.use(express.json());

app.use("/api", userRoutes);

const PORT = 9000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
