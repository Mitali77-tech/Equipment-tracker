const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const equipmentRoutes = require("./routes/equipmentRoutes");
app.use("/api/equipment", equipmentRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
