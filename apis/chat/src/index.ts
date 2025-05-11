import express from "express";
import cookieParser from "cookie-parser";
import CorsConfig from "./config/corsConfig";
import chat from "./routes/chat.routes";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(CorsConfig);
app.use("/api", chat);

const PORT = process.env.PORT;

if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`Product Service running on port ${PORT}`);
  });
}

export default app;
