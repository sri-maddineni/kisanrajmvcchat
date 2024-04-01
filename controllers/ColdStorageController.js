import express from "express";
import mongoose from 'mongoose';
import coldmodel from "../models/ColdStorageModel.js"
export const createcoldcontroller=async(req,res)=>{
    try {
        const {name,email,phone,address,pincode,description,link,license,owner}=req.body;

        const cold = await new coldmodel({
            name,email,phone,address,pincode,description,link,license,owner
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
