import {StreamChat} from "stream-chat";
import {ENV} from "./env.js";

const apiKey = ENV.STREAM_ACCESS_KEY;
const apiSecret = ENV.STREAM_SECRET_KEY;

if(!apiKey || !apiSecret){
    console.error("STREAM_API_KEY or STREAM_API_SECRET is missing");
}

export const chatClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async(userData) => {
    
    try{
        await chatClient.upsertUser(userData)
        return userData
    }
    catch(error){
        console.error("Error upserting Stream user:", error)
    }
}; 

export const deleteStreamUser = async (userId) => {

    try {
        await chatClient.deleteUser(userId);
        console.log("Stream user deleted successfully:", userId);
    } catch (error) {
        console.error("Error deleting Stream user:", error);
    }
}

