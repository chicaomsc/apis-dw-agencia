import express from "express";
import funnel from "./routes/funnel.routes";
import cookieParser from "cookie-parser";
import CorsConfig from "./config/corsConfig";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(CorsConfig);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Lead Service running on port ${PORT}`);
});

app.use("/api", funnel);
