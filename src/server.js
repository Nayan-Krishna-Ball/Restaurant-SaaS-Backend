const app = require("./app");
const connectDB = require("./config/db");

//connections and listeneres
const PORT = process.env.PORT || 5000;
connectDB()
  .then(() => {
    app.listen(PORT, () =>
      console.log(
        `Server Open & Connected To Database 🤟 Server Running on ${process.env.PORT}`,
      ),
    );
  })
  .catch((err) => console.log(err));
