import express from "express";
import { AllException } from "./src/error";

const app = express();
const PORT = process.env.PORT || 8000;


app.use(AllException);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
