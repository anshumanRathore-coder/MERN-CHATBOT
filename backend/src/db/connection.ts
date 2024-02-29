import {connect,disconnect} from "mongoose";

async function connectToDatabase(){
    try {
        await connect(process.env.MONGODB_URL)
        console.log("connect to database");
    } catch (error) {
        console.log(error);
        throw new Error("Cannot connect to MongoDB");
    }
}

async function disconnectToDatabase() {
    try {
        await disconnect();
        console.log("Disconnect from database");
    } catch (error) {
        console.log(error);
        throw new Error("could not connect from databse");

    }
}

export {connectToDatabase,disconnectToDatabase};