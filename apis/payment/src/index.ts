import express from "express";
import cookieParser from "cookie-parser";
import CorsConfig from "./config/corsConfig";
import payment from "./routes/payment.routes";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(CorsConfig);
app.use("/api", payment);

const PORT = process.env.PORT;

if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 8001;
  app.listen(PORT, () => {
    console.log(`Product Service running on port ${PORT}`);
  });
}

export default app;
