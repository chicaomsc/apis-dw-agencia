import express from "express";
import cookieParser from "cookie-parser";
import CorsConfig from "./config/corsConfig";
import product from "./routes/product.routes";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(CorsConfig);
app.use("/api", product);

const PORT = process.env.PORT;

if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 8001;
  app.listen(PORT, () => {
    console.log(`Product Service running on port ${PORT}`);
  });
}

export default app;
