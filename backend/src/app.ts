import express from "express";
import cors from "cors";
import gamesRouter from "./routes/games";
import authRouter from "./routes/auth";

const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL;

app.use(cors({
  origin: FRONTEND_URL || true,
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false,
}));

app.options("*", cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "CheckIt API",
    endpoints: { auth: "/api/auth", games: "/api/games" },
  });
});

app.use("/api/auth", authRouter);
app.use("/api/games", gamesRouter);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

export default app;