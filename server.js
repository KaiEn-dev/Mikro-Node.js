require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");

const profileRouter = require("./routes/profileRouter");
const shopRouter = require("./routes/shopRouter");
const productRouter = require("./routes/productRouter");
const productCategoryRouter = require("./routes/productCategoryRouter");
const attributeCategoryRouter = require("./routes/attributeCategoryRouter");
const attributeRouter = require("./routes/attributeRouter");
const imageRouter = require("./routes/imageRouter");
const shopAddressRouter = require("./routes/shopAddressRouter");
const operatingHourRouter = require("./routes/operatingHourRouter");
const orderModeRouter = require("./routes/orderModeRouter");
const deliveryModeRouter = require("./routes/deliveryModeRouter");
const deliveryAreaRouter = require("./routes/deliveryAreaRouter");
const customerOrderRouter = require("./routes/customerOrderRouter");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

const PORT = process.env.PORT;

//routers
app.use("/api/profile", profileRouter);
app.use("/api/shop", shopRouter);
app.use("/api/product", productRouter);
app.use("/api/productCategory", productCategoryRouter);
app.use("/api/attributeCategory", attributeCategoryRouter);
app.use("/api/attribute", attributeRouter);
app.use("/api/image", imageRouter);
app.use("/api/address", shopAddressRouter);
app.use("/api/operatingHour", operatingHourRouter);
app.use("/api/orderMode", orderModeRouter);
app.use("/api/deliveryMode", deliveryModeRouter);
app.use("/api/deliveryArea", deliveryAreaRouter);
app.use("/api/customerOrder", customerOrderRouter);

app.listen(PORT || 3000, () => {
  console.log(`server is listening  on ${PORT || "3000"}`);
});

module.exports = app;
