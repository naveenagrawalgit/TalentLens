import { Inngest } from "inngest";
import { connectDB } from "./DB.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "my-app" });

// Create an empty array where we'll export future Inngest functions

const syncUser = inngest.createFunction(
    {
        id:"sync-user"
    },
    {event: "clerk/user.created"},
    async({event}) => {
        await connectDB()
        const {id,email_addresses, first_name,last_name,image_url} = event.data

        const newUser = {
        clerkId:id,
        email: email_addresses[0]?.email_address,
        name: `${first_name || ""} ${last_name || ""} `,
        profileImage: image_url
    }

    await User.create(newUser)
     
    },
    
);


const deleteUserFromDB = inngest.createFunction(
    {   id:"delete-user-from-db"  },
    {event: "clerk/user.created"},
    async({event}) => {
        await connectDB()
        const {id,email_addresses, first_name,last_name,image_url} = event.data

        const newUser = {
        clerkId:id,
        email: email_addresses[0]?.email_address,
        name: `${first_name || ""} ${last_name || ""} `,
        profileImage: image_url
    }
    await User.create(newUser)
    
    },
   
);


export const functions = [syncUser, deleteUserFromDB];


