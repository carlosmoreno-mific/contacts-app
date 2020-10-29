const moongose = require("mongoose");

(async () => {
  try {
    const db = await moongose.connect(process.env.MONGODB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log(`DB ${db.connection.name} is ready.`);
  } catch (error) {
    console.log("DB error" + error);
  }
})();
