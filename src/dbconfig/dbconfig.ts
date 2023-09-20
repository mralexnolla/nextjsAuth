import mongoose from "mongoose";
import colors, { bgCyan, bgRed } from "colors"

const connect = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;
        connection.on('connect', () => {
            console.log('MongoDb connected successfully', bgCyan.white)
        })
        connection.on('error', (err) => {
            console.log(`Error with DB connetion ${err}`, bgRed.white)
            process.exit();
        })
    } catch (error) {
        console.log('Somthing went wrong')
        console.error(error)
    }
}

export default connect;