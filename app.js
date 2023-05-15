const path = require("path");

const express = require("express");

const rootDir = require("./util/path");

const app = express();

// Import routes
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// access to static files
app.use(express.static(path.join(rootDir, "public")));

//parse application / x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//parse application / application/json
app.use(express.json());

// admin routes
app.use("/admin", adminRoutes);

// homepage
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
