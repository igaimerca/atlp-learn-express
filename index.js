const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

mongoose
    .connect("mongodb://localhost:27017/learn-express", { useNewUrlParser: true })
    .then(() => {
        const app = express();
        app.use(express.json());
        app.use("/api", routes);

        const PORT = 5000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT} && DB Connected`);
        });
    });
