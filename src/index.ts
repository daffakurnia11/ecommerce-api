import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { responseHandler } from "./middlewares/responseHandler";

import { errorHandler } from "./middlewares/errorHandler";
import { config } from "./config";

import ProductRoute from "./routes/ProductRoute";

const app = express();
const port = config.port;

app.use(cors());

app.use(bodyParser.json());

app.use(responseHandler);
app.use("/api/product", ProductRoute.router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
