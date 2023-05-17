const path = require("path");

const express = require("express");

const rootDir = require("./util/path");

const app = express();

//  EJS template engine
app.set("view engine", "ejs");
app.set("views", "views");

// Import routes
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// access to static files
app.use(express.static(path.join(rootDir, "public")));

//parse application / x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//parse application / application/json
app.use(express.json());

// admin routes
app.use("/admin", adminData.routes);

// homepage routes
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render("404", { docTitle: "Page not found", path: "" });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
