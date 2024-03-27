import express from "express";
import chatModel from "../models/chatModel.js";
import userModel from "../models/userModel.js"


export const postChatController = async (req, res) => {
    try {
        const { pid, sentBy, sellerId, toId, quantity, price, notes, date } = req.body;
        const data = { pid: pid, sentBy: sentBy, sellerId: sellerId }

        const result = await chatModel.create({
            pid, sentBy, sellerId, toId, quantity, price, notes, date
        })



        //push data into useid sellerid.chats wehre 

        if (result) {
            console.log("success")
            return res.status(200).send({
                success: true,
                message: "Chat posted success"
            })
        }
        else {
            console.log("failed to post")
            return res.status(403).send({
                success: false,
                message: "failed to post in db"
            })
        }

    } catch (error) {
        console.log(error)
    }
}


//for buyer chats only because while buying buyer need to get productid, seller and his own sent id
export const getChatsController = async (req, res) => {
    try {
        const { sentBy, toId, pid, sellerId, flag } = req.body;

        // Find all chats where sentBy, toId, and pid match the provided values
        let chats;


        if (flag == 0) {
            chats = await chatModel.find({

                toId: toId,
                pid: pid
            }).populate("pid").populate("sellerId");
        }
        else {
            chats = await chatModel.find({
                sellerId: sellerId,
                toId: toId,
                pid: pid
            }).populate("pid").populate("sellerId");
        }

        // Send the found chats as response
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

