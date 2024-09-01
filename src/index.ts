import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { responseHandler } from "./middlewares/responseHandler";

import { errorHandler } from "./middlewares/errorHandler";
import { config } from "./config";

import helmet from "helmet";
import passport from "./config/passport";

import ProductRoute from "./routes/ProductRoute";
import AuthRoute from "./routes/AuthRoute";
import AdminProductRoute from "./routes/AdminProductRoute";
import CartRoute from "./routes/CartRoute";

const app = express();
const port = config.port;

app.use(cors());

app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "default-src": ["'self'"],
        "img-src": ["'self'", "https:"],
        "script-src": ["'self'", "'unsafe-inline'"],
      },
    },
    hsts: {
      maxAge: 31536000, 
      includeSubDomains: true,
      preload: true,
    },
  })
);

app.use(bodyParser.json());

app.use(passport.initialize());

app.use(responseHandler);
app.use("/api/product", ProductRoute.router);
app.use("/api/auth", AuthRoute.router);
app.use("/api/cart", CartRoute.router);
app.use("/api/admin/product", AdminProductRoute.router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
