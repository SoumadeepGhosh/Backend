import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path: './env'
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () =>{
        console.log(`Server is running on port ${process.env.PORT}`);
        
    })
})
.catch((err) =>{
    console.log("MONGODB connection faild !! : " ,err);
    
})










//////////////////////// Another Method to Connect Database //////////////
    /*( async () => {
        try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`)
        app.on("error", (error) => {
            console.log("ERROR", error);
            throw error
        })

        app.listen(process.env.PORT , ()=>{
                console.log(`App is listening on port ${process.env.PORT}`);  
        })
        } catch (error) {
            console.error(error);
            throw err
        }
    })()
    */
   
