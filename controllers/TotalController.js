import express from "express";
import slugify from "slugify";
import TransactionalDbModel from "../models/TransactionalDb.js";

export const totaldatacontroller=async(req,res)=>{
    try {
        const data=await TransactionalDbModel.find({_id:"662fd24e84023098e832e7c6"})
        
        if(data){
            return res.status(200).send({
                success:true,
                message:"successfully fetched data",
                datar:data[0]
            })
        }
        else{
            console.log(data)
        }
    } catch (error) {
        console.log(error)
    }
}