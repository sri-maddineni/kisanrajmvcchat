import express from "express";
import chatModel from "../models/chatModel.js";
import userModel from "../models/userModel.js"
import mongoose from "mongoose";

export const postChatController = async (req, res) => {
    try {
        const { pid, sentBy, toId, sellerId, quantity,qunit, price, notes, date, quantityUnit } = req.body;

        const chatData = {
            pid: pid,
            sentBy: sentBy,
            toId: toId,
            quantity: quantity,
            qunit:qunit,
            price: price,
            notes: notes,
            date: date,
            sellerId: sellerId,
            qtyunit: quantityUnit,
            timestamp: new Date() // Add timestamp field with current date and time
        };

        // Update the user document with new chat data
        const result1 = await userModel.findOneAndUpdate(
            { _id: sentBy }, // Filter: Find the user with sentBy id
            { $push: { chats: chatData } }, // Update: Push chatData into chats array
            { new: true } // Options: Return the updated document
        );

        const result2 = await userModel.findOneAndUpdate(
            { _id: toId }, // Filter: Find the user with sentBy id
            { $push: { chats: chatData } }, // Update: Push chatData into chats array
            { new: true } // Options: Return the updated document
        );

        if (!result1) {
            console.log("Chat not  posted successfully1");
            return res.status(403).send({
                success: true,
                message: "Chat posted successfully 1"
            });
        }

        if (!result2) {
            console.log("Chat not  posted successfully2");
            return res.status(403).send({
                success: true,
                message: "Chat posted successfully 2"
            });
        }


        if (result1 && result2) {
            console.log("Chat posted successfully");
            return res.status(200).send({
                success: true,
                message: "Chat posted successfully"
            });
        } else {
            console.log("Failed to post chat in DB");
            return res.status(403).send({
                success: false,
                message: "Failed to post chat in DB"
            });
        }
    } catch (error) {
        console.error("Error posting chat:", error);
        return res.status(500).send({
            success: false,
            message: "Internal server error"
        });
    }
}



export const getChatsController = async (req, res) => {
    try {
        const { pid, seller, buyer } = req.body;

        //const chats=await userModel.findOne({"_id":seller},{sentBy:sentBy},{sentBy:seller},{pid:pid})

        const chats = await userModel.findOne(
            {
                "_id": buyer, // Match user by _id
                "chats.pid": pid, // Match chats by pid
                $or: [
                    { "chats.sentBy": buyer },
                    { "chats.sentBy": seller }
                ]
            },
            { chats: 1 } // Projection to retrieve only the chats array
        );


        if(chats){
            
            return res.status(200).json({ success: true, message: "Chats retrieved successfully", chats });
        }
        else{
            console.log("chats fetching failed")
            // console.log(chats,"chats")
        }
 

       



        res.status(200).json({ success: true, message: "Chats retrieved successfully", chats });
    } catch (error) {
        console.error("Error retrieving chats:", error);
        res.status(500).json({ success: false, message: "Failed to retrieve chats" });
    }
};



//get proposed chat data from pid, sellerid, buyerid
export const getProposedChatDataController = async (req, res) => {
    try {
        const { pid, sellerId, buyerId } = req.body;

        const chat = await chatModel
            .findOne({ pid: pid, sellerId: sellerId, sentBy: buyerId })
            .sort({ createdAt: -1 }) // Sort by createdAt in descending order
            .limit(1); // Limit to only one document

        if (chat) {
            console.log(chat, "hello");
            console.log("chats obtained");
            return res.status(200).send({
                success: true,
                message: "Chat data obtained successfully",
                chat
            });
        } else {
            console.log("Failed to get chat data");
            return res.status(400).send({
                success: false,
                message: "Failed to get chat data"
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Internal server error"
        });
    }
};

