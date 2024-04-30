import express from "express";
import PotentialModel from "../models/PotentialModel.js";
import RequirementModel from "../models/RequirementModel.js";
import NegHistory from "../models/NegHistoryModel.js"
import proposalModal from "../models/ProposalModel.js"
import slugify from "slugify";
import userModel from "../models/userModel.js";
import TransactionalDb from "../models/TransactionalDb.js";

export const postRequirementController = async (req, res) => {
  try {
    const { quantity, price, date, notes, buyerId, sellerId, productId, sentBy } = req.body;

    // Generate combinedId
    const combinedId = `${sellerId}_${productId}_${buyerId}`;

    // Finding documents with the given combinedId
    const exist = await RequirementModel.find({ combinedId });

    if (exist.length > 0) { // Check if any documents were found
      // Assuming you want to update the first document found with the given combinedId
      const requirement1 = await RequirementModel.findOneAndUpdate(
        { combinedId },
        {
          quantity,
          price,
          date,
          notes,
          buyerId,
          sellerId,
          productId,
          sentBy,
          combinedId,
        },
        { new: true } // to return the updated document
      );
    } else {
      // If no documents were found, you might want to insert a new document
      // Assuming RequirementModel.create() is a method to insert a new document
      const newRequirement = await RequirementModel.create({
        quantity,
        price,
        date,
        notes,
        buyerId,
        sellerId,
        productId,
        sentBy,
        combinedId,
      });

      const requirement2 = await NegHistory.create({
        quantity,
        price,
        date,
        notes,
        buyerId,
        sellerId,
        productId,
        sentBy,
        combinedId,
      });

      if (newRequirement && requirement2) {
        res.status(201).send({
          success: true,
          message: "Requirement created successfully!",
          newRequirement,
          requirement2,
        });
      }
      else {
        console.log("some thing went wrong")
        res.status(110).send({
          success: false,
          message: "Error in creating requirement",

        })
      }
    }

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating requirement",
      error,
    });
  }
};

//get requirements other buyers post to buy the product


export const getRequirementController = async (req, res) => {
  try {
    const { sellerId, productId } = req.body;

    if (!sellerId || !productId) {
      return res.status(400).json({
        success: false,
        message: "SellerId or ProductId not provided",
      });
    }

    // Find all documents that match the sellerId and productId
    const requirements = await RequirementModel.find({ sellerId, productId }).populate("buyerId").populate("productId").populate("sellerId").populate("sentBy")
      .sort({ createdAt: -1 }); // Convert documents to plain JavaScript objects

    // If no requirements are found, return 404
    if (!requirements || requirements.length === 0) {
      return res.status(201).json({
        success: false,
        message: "No requirements found for the specified sellerId and productId",
      });
    }

    const result = requirements;

    res.status(200).json({
      success: true,
      message: "Latest requirements fetched successfully",
      result,
    });

  } catch (error) {
    console.error("Error in fetching requirements:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetching requirements",
      error: error.message,
    });
  }
};


// potential leads to be displayed from potential model

export const postPotentialController = async (req, res) => {
  try {

    // Generate combinedId

    const { productName, buyerId, quantity, quantityUnit, date, price, organic, shipping, notes } = req.body;

    const result = await new PotentialModel({ productName, productSlug: slugify(productName), buyerId, quantity, quantityUnit, date, price, organic, shipping, notes }).save();

    const updatedTransaction = await TransactionalDb.findOneAndUpdate({}, { $inc: { potentials: 1 } }, { new: true });

    console.log(result._id)
    console.log(updatedTransaction._id)

    const userupdate = await userModel.findByIdAndUpdate(
      { _id: buyerId },
      { $addToSet: { potentials: result._id } },
      { new: true }
    );


    if (!result || !userupdate) {
      return res.status(500).send({
        success: false,
        message: "not found",
      });
    }

    res.status(201).send({
      success: true,
      message: "Potential posted successfully!",
      result,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in posting potential",
      error,
    });
  }
};


//posted potentials by loggedin user

export const getPotentialController = async (req, res) => {

  try {
    const { buyerId } = req.body;

    if (!buyerId) {
      return res.status(400).json({
        success: false,
        message: "BuyerId not provided",
      });
    }

    // Find all documents that match the sellerId and productId
    const potentials = await PotentialModel.find({ buyerId }).populate("buyerId").sort({ createdAt: -1 });

    // If no requirements are found, return 404
    if (!potentials || potentials.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No requirements found for the specified buyerid",
      });
    }

    potentials;

    res.status(200).json({
      success: true,
      message: "Latest potentials fetched successfully",
      potentials,
    });

  } catch (error) {
    console.error("Error in fetching potentials:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetching potentials",
      error: error.message,
    });
  }
}



// get potential leads based on product name
export const getProductPotentialController = async (req, res) => {
  try {
    const { productName } = req.body;
    const uid = req?.user?._id;



    if (!productName) {
      return res.status(400).json({
        success: false,
        message: "Product name not provided",
      });
    }

    // Find all documents that match the productName
    const potentials = await PotentialModel.find({ productName, buyerId: { $ne: uid } }).populate("buyerId").sort({ createdAt: -1 });


    // If no potentials are found, return 404
    if (!potentials || potentials.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No potentials found for the specified product name",
      });
    }

    res.status(200).send({
      success: true,
      message: "Latest potentials fetched successfully",
      potentials,
    });


  } catch (error) {

    console.error("Error in fetching potentials:", error);
    res.status(500).send({
      success: false,
      message: "Error in fetching potentials",
      error: error.message,
    });
  }
};


export const postToNegHisRequirementController = async (req, res) => {

  try {
    const { quantity, price, date, notes, buyerId, sellerId, productId, sentBy } = req.body;

    // Generate combinedId
    const combinedId = `${sellerId}_${productId}_${buyerId}`;

    const requirement = await NegHistory.create({
      quantity,
      price,
      date,
      notes,
      buyerId,
      sellerId,
      productId,
      sentBy,
      combinedId,
    });

    res.status(201).send({
      success: true,
      message: "Requirement created successfully!",
      requirement,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating requirement",
      error,
    });
  }

}


//propose offer controller on begining a conversation with user seller from buyer prodetneg page
export const proposeOfferController = async (req, res) => {

  const { pid, sentBy, recievedby, sentname, phone, quantity, quantityUnit, price, notes, date, rating, address } = req.body;

  const obj = { sentBy, sentname, phone }
  const chatobj = { pid, sentBy, recievedby, sentname, phone, quantity, quantityUnit, price, notes, date, rating, address, timestamp: new Date() }

  try {

    const proposalsent = await userModel.findByIdAndUpdate(
      { _id: req?.user?._id },
      { $addToSet: { proposalsSentIds: pid } }

    );

    const prop = await userModel.findOneAndUpdate(
      { _id: recievedby }, // Assuming receivedBy is the user ID
      { $addToSet: { [`proposalsReceived.${pid}`]: obj } },
      { new: true } // To return the updated document
    );

    //to add to chats here
    // user contins a chat field and i want to add the chatobj to this user with sentby id

    const sentbychat = await userModel.findByIdAndUpdate(
      { _id: sentBy },
      { $addToSet: { chats: chatobj } }
    );

    const recievedbychat = await userModel.findByIdAndUpdate(
      { _id: recievedby },
      { $addToSet: { chats: chatobj } }
    );




    if (proposalsent && prop && sentbychat && recievedbychat) {
      return res.status(200).send({
        message: "add to proposalsentids",
        success: true,
        proposalsent
      })
    }
    else {
      console.log("might be some error")
    }
    return res.status(408).send({
      message: "somethign done unknown",
      success: false,
      proposalsent
    })
  } catch (error) {
    console.log(error)
  }

};








//decline offer controller here

export const declineOfferController = async (req, res) => {
  try {
    const { buyerid, pid, sellerid } = req.body;
    if (!buyerid || !pid || !sellerid) {
      return res.status(500).send({
        success: false,
        message: "Parameters not found!",
      });
    }

    const updateQuery = { $pull: { [`proposalsRecieved.${pid}`]: buyerid, }, };
    const resp = await userModel.findOneAndUpdate({ _id: sellerid }, updateQuery);

    if (resp) {
      return res.status(200).send({
        success: true,
        message: "Buyer ID removed from proposalsRecieved successfully",
        resp
      });
    }
    else {
      console.log("failed")
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};



export const negotiateController = async (req, res) => {
  try {
    const { quantity, price, date, notes, buyerId, sellerId, productId, sentBy } = req.body;

  } catch (error) {

  }
}


export const getAllPotentialsController = async (req, res) => {
  const uid = req?.user?._id;
  try {
    const potentials = await PotentialModel.find({ buyerId: { $ne: uid } }).populate("buyerId")
    if (potentials) {
      return res.status(200).send({
        success: true,
        message: "all potentials fetched",
        potentials
      })
    }
    else {
      console.log("spmething went werong")
    }
  } catch (error) {
    console.log(error)
  }
}


export const addidcontroller = async (req, res) => {
  try {
    const { uid, pid } = req.body;

    const result = await userModel.findOneAndUpdate(
      { _id: uid },
      { $addToSet: { proposalsSentids: pid } }
    );

    if (result) {
      console.log("done adding id")
      return res.status(200).send({
        success: true,
        message: "done",
        result
      })
    }

  } catch (error) {
    console.log(error)
  }
}




export const addtowishlistcontroller = async (req, res) => {
  try {
    const { uid, pid } = req.body;

    // Update the user document to add the pid to the wishlist array if it doesn't already exist
    const result = await userModel.findByIdAndUpdate(uid, { $addToSet: { wishlist: pid } });

    res.status(200).json({ success: true, message: 'Product added to wishlist successfully' });
  } catch (error) {
    console.error('Error adding product to wishlist:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


//remove an item from orders
export const removefromorderscontroller = async (req, res) => {
  try {
    const { uid,id } = req.body
    const result = await userModel.findByIdAndUpdate( { _id: uid},{ $pull: { ordersplaced: id } }, { new: true });
    if(result){
      return res.status(200).send({
        message:"removed successfully!",
        success:true,
        result
      })
    }
    else{
      console.log("something database error")
    }
  }
  catch(error){
    console.log(error)
  }
}
