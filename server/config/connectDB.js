// import mongoose from "mongoose";

// const connectDB =async()=>{
//     try {

//         console.log("Connecting to:", process.env.MONGODB_URL);
//         mongoose.connect(process.env.MONGODB_URL,{
//             dbName:"Agent"
//         });
//         console.log("Database Connected");
//         console.log("DB:", mongoose.connection.name);
        
//     } catch (error) {
//         console.log(`Database Error ${error}`);

//     }
// }

// export default connectDB







import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);

    console.log("Database Connected");
    console.log("DB:", conn.connection.name); // ✅ correct

  } catch (error) {
    console.error("DB connection error:", error);
  }
};

export default connectDB;