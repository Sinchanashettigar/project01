const mongoose = require("mongoose");


const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI,
      { useNewUrlParser: true,
        useUnifiedTopology: true ,
        useFindAndModify: false 
       });
    console.log("MongoDB connected sucessfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
module.exports = connectDb;
