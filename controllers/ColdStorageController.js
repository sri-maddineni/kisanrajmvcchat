import express from "express";
import mongoose from 'mongoose';
import coldmodel from "../models/ColdStorageModel.js"



export const createcoldcontroller=async(req,res)=>{
    try {
        const {name, capacity, phone, address, pincode, description, link, license, owner}=req.body;

        const cold = await new coldmodel({
            name, capacity, phone, address, pincode, description, link, license, owner
          }).save();

          if(cold){
            res.status(200).send({
                success:true,
                message:"created succesfully",
                cold
            })
          }
          else{
            res.status(256).send({
                success:false,
                message:"failed to create"
            })
          }
      
    } catch (error) {

        console.log(error)
        res.status(256).send({
            success:false,
            message:"failed to create"
        })
        
    }
}

export const getColdController = async (req, res) => {
    try {
        const userid = req?.user?._id;
        const result = await coldmodel.find();

        if (result) {
            console.log("result obtained successfully");
            res.status(200).send({
                success: true,
                message: "success obtained",
                result
            });
        } else {
            console.log("not obtained");
            res.status(256).send({
                success: false,
                message: "failed to get",
                result: []
            });
        }
    } catch (error) {
        console.log("not obtained", error);
        res.status(500).send({
            success: false,
            message: "failed to get",
            error: error.message
        });
    }
};
