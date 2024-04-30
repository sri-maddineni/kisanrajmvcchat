import express from "express";
import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import Jwt from "jsonwebtoken";
import mongoose from 'mongoose';
import ProductModel from "../models/ProductModel.js";
import TransactionalDb from "../models/TransactionalDb.js";


export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer, pincode, latitude, longitude } = req.body;

    if (!name) {
      return res.send({ message: "Name is required" });
    }

    if (!email) {
      return res.send({ message: "email is required" });
    }

    if (!password) {
      return res.send({ message: "password is required" });
    }

    if (!phone) {
      return res.send({ message: "phone no is required" });
    }

    if (!address) {
      return res.send({ message: "address is required" });
    }

    if (!answer) {
      return res.send({ message: "answer is required" });
    }
    if (!pincode) {
      return res.send({ message: "pincode is required" });
    }

    //existing user checking

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already registered please login",
      });
    }

    //register user
    const hashedPassword = await hashPassword(password);

    //save

    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
      pincode,
      latitude,
      longitude
    }).save();

    
    const updatedTransaction = await TransactionalDb.findOneAndUpdate({},{ $inc: { totalusers: 1 } },  { new: true } );
    console.log("updated",updatedTransaction)

    res.status(201).send({
      success: true,
      message: "Registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};




//login controller
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    const user = await userModel.findOne({ email }).select("-password");



    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(401).send({
        success: false,
        message: "Invalid password",
      });
    }

    // Generate token
    const token = await Jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Login success",
      user,
      token
    });


  } catch (error) {

    console.log(error);

    console.log("Internal server error");

    res.status(500).send({
      success: false,
      message: "Error in login",
      error: error.message,
    });
  }
};

//forgot password controller

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;

    if (!email) {
      res.status(400).send({ message: "Email is required" });
    }

    if (!answer) {
      res.status(400).send({ message: "answer is required" });
    }

    if (!newPassword) {
      res.status(400).send({ message: "newPassword is required" });
    }

    //check email and answer

    const user = await userModel.findOne({ email, answer })

    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong email or answer"
      })
    }

    const hashed = await hashPassword(newPassword)
    await userModel.findByIdAndUpdate(user._id, { password: hashed })
    res.status(200).send({
      success: "true",
      message: "Password reset success!"
    })

  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error
    })
  }
}

export const testController = (req, res) => {
  res.send({
    message: "hello world",
  });
  console.log("protected route");
};




export const getUserData = async (req, res) => {
  try {
    const { uid } = req.params;

    if (!uid) {
      return res.status(400).send({ message: "id is required" });
    }

    const user = await userModel
      .findById(uid)
      .select("-password")
      .populate({
        path: "listings",
        model: "products"
      })
      .populate({
        path: "wishlist",
        populate: {
          path: "commodityId",
          model: "commodities"
        }
      })
      .populate({
        path: "ordersplaced",
        populate: {
          path: "commodityId",
          model: "commodities"
        }
      })
      .populate({
        path:"potentials",
        model:"potentials"
      })
      .populate({
        path:"equipmenthire",
        model:"equipment"
      })
      .populate({
        path:"equipmentsale",
        model:"equipment"
      })




    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Convert proposalsReceived Map to an array of objects
    const proposalsReceivedArray = Array.from(user.proposalsReceived.values())
      .flat()
      .map(proposal => ({
        ...proposal,
        pid: new mongoose.Types.ObjectId(proposal.pid) // Convert pid to ObjectId
      }));

    // Populate the 'pid' field in each proposal object
    await userModel.populate(proposalsReceivedArray, { path: 'pid', model: 'products' });

    // Replace the original proposalsReceived map with the populated array
    user.proposalsReceived = new Map(proposalsReceivedArray.map(proposal => [proposal.pid, [proposal]]));

    res.status(200).send({
      success: true,
      message: "User data obtained",
      user: user
    });

  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error: error.message
    });
  }
};

export const getBasicDetails=async(req,res)=>{
  try {
    const uid=req?.params?.uid;

    

    const user=await userModel.find({_id:uid}).select("name phone rating")

    if(user){
      return res.status(200).send({
        success:true,
        message:"basic details obtained",
        user
      })
    }
    
    return res.status(59).send({
      success:false,
      message:"not obtained",
      user
    })

  } catch (error) {
    console.log(error)
  }
}



export const updateUserData = async (req, res) => {
  const userId = req.params.uid;
  const updates = req.body; // Assuming the request body contains updated user details

  try {
    // Find the user by ID and update the fields
    const updatedUser = await userModel.findByIdAndUpdate(userId, updates, { new: true });
    console.log(updateUserData);
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found', success: false });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
}



export const followController = async (req, res) => {
  try {
    const { myid, hisid } = req.body;

    const result1 = await userModel.findByIdAndUpdate(
      { _id: myid },
      { $addToSet: { following: hisid } },
      { new: true } // To return the updated document
    );

    const result2 = await userModel.findByIdAndUpdate(
      { _id: hisid },
      { $addToSet: { followers: myid } },
      { new: true } // To return the updated document
    );


    if (result1 && result2) {
      res.status(200).send({
        message: "success",
        success: true,

      })
    }
    else {
      res.status(256).send({
        success: false,
        message: "failed to follow"
      })
    }

  } catch (error) {
    console.log(error)
    res.status(256).send({
      success: false,
      message: error
    })
  }
}


export const getalluserscontroller = async (req, res) => {
  try {
    const userid = req?.user?._id;
    const users = await userModel.find({ _id: { $ne: userid } }).select("-password");// Find all users except the one with the specified userid
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}



// To get orders of a particular user
export const getorderscontroller = async (req, res) => {
  try {
    const { uid } = req.params;

    const user = await userModel.findById(uid).populate({
      path: 'ordersplaced',
      populate: [
        { path: 'buyer', model: "users" }, // Populate the buyer field with users collection
        { path: 'sellerid', model: "users" }, // Populate the seller field with users collection
        { path: 'itemid', model: "products" } // Populate the product field with products collection
      ]
    });

    const orders = user.ordersplaced;

    console.log(orders);

    if (orders) {
      return res.status(200).send({
        success: true,
        message: "Data fetched successfully!",
        orders
      });
    } else {
      console.log("Error occurred", error);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Did not get results!"
    });
  }
};
