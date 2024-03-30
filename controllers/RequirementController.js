import e from "express";
import PotentialModel from "../models/PotentialModel.js";
import RequirementModel from "../models/RequirementModel.js";
import NegHistory from "../models/NegHistoryModel.js"
import proposalModal from "../models/ProposalModel.js"
import slugify from "slugify";
import userModel from "../models/userModel.js";

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

    const { productName,
      buyerId,
      quantity,
      quantityUnit,
      date,
      price,
      organic,
      shipping,
      notes } = req.body;

    const result = await new PotentialModel({
      productName,
      productSlug: slugify(productName),
      buyerId,
      quantity,
      quantityUnit,
      date,
      price,
      organic,
      shipping,
      notes,
    }).save();

    if (!result) {
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

export const proposeOfferController = async (req, res) => {
  const {pid, sentBy, quantity, price, notes, date, buyerId, sellerId,name, quantityUnit } = req.body;
  const proposalObj = {pid, sentBy, quantity, price, notes, date, buyerId, sellerId,name, quantityUnit };

  try {
    // Update the buyer's document to push the proposal into proposalsSent array
    const buyerResult = await userModel.findOneAndUpdate(
      { _id: sentBy },
      { $push: { proposalsSent: proposalObj } },
      { new: true }
    );

    // Update the seller's document to push the proposal into proposalsReceived array
    const sellerResult = await userModel.findOneAndUpdate(
      { _id: sellerId, [`proposalsReceived.${pid}.sentBy`]: { $ne: proposalObj.sentBy } },
      { $addToSet: { [`proposalsReceived.${pid}`]: proposalObj } },
      { new: true }
    );

    const seller = await userModel.findOne({ _id: sellerId });




    if (buyerResult && sellerResult) {
      console.log("Proposal sent and received successfully");
      return res.status(200).json({
        success: true,
        message: "Proposal sent and received successfully",
        buyer: buyerResult,
        seller: sellerResult
      });
    } else {
      console.log("Database operation error");
      return res.status(400).json({
        success: false,
        message: "Failed to send or receive proposal"
      });
    }
  } catch (error) {
    console.log("Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to propose offer"
    });
  }
};


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