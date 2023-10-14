import fs from 'fs'
import productModel from '../models/productModel.js'
import slugify from 'slugify'
import braintree from 'braintree';
import orderModel from '../models/orderModel.js';
import dotenv from 'dotenv'
dotenv.config()

//payment
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBILC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
  });


// create product
export const createProductController=async(req,res)=>{
    try { 
        const{name,slug,description,price,category ,quantity,shipping}=req.fields
        const {photo}=req.files

        switch(true){
            case !name:
                return res.status(200).send({message:"name is required"})
                case !description:
                    return res.status(200).send({message:"description is required"})
                    case !price:
                        return res.status(200).send({message:"category is required"})
                        case !quantity:
                            return res.status(200).send({message:"quantity is required"})
                            case !category:
                                return res.status(200).send({message:"category is required"})
                                    case photo && photo.size>1000000:
                                       return res.status(200).send({message:"photo is required"})
                    
        }
        const products= new productModel({...req.fields,slug:slugify(name)})
        if(photo){
            products.photo.data=fs.readFileSync(photo.path)
            products.photo.contentType=photo.type
        }
        await products.save()
        res.status(201).send({
            message:"product created",
            success:true,
            products,
        })
        
    } catch (error) {
        res.status(404).send({
            message:"error  to get product",
            success:false,
            error
        })
        
    }
}
// get all product
export const getProductController=async(req,res)=>{
try {
    const product=await productModel.find({}).select("-photo").limit(-12).sort({createdAt:-1}).populate('category');
    res.status(200).send({
        message:"success",
        total: product.length,
        success:true,
       product
      
    })
} catch (error) {
    res.status(404).send({
        message:"error  to get product",
        success:false,
        error
    })
}

}
// get single product
export const singleProductController=async(req,res)=>{
    try {
        const singleProduct= await productModel.findOne({slug:req.params.slug}).select("-photo").populate('category')
        res.status(200).send({
            message:"single category list",
            success:true,
            singleProduct 
        })
        
    } catch (error) {
        res.status(400).send({
            message:"error",
            success:false,
            error
        })
        
    }
}

// get photo
export const productPhotoController=async(req,res)=>{
    // const product=await productModel.findById(req.params.pid).select("photo").then((res)=>{
    //     if(product.photo.data){
    //         res.set("content-type",product.photo.contentType)
    //         return res.status(200).send(product.photo.data)
    //     }
    // }).catch((err)=>{
    //     res.status(400).send({
    //         message:"error to get photo",
    //         err
            

    //     })
    // })
   
    try {
        const product=await productModel.findById(req.params.pid).select("photo") 
    if(product.photo.data){
        res.set("content-type",product.photo.contentType)
        return res.status(200).send(product.photo.data)

    }
    } catch (error) {
        res.status(400).send({
            message:"error to get photo"
            

        })
    }
    
}
export const deleteProductController=async(req,res)=>{
try {
   await productModel.findByIdAndDelete(req.params.pid).select('-photo')
    res.status(200).send({message:"product deleted successfully"})
} catch (error) {
    res.status(400).send({message:"cannot be deleted"})
}
}
export const updateProductController=async(req,res)=>{
    try { 
        const{name,slug,description,price,category ,quantity,shipping}=req.fields
        const {photo}=req.files

        switch(true){
            case !name:
                return res.status(200).send({message:"name is required"})
                case !description:
                    return res.status(200).send({message:"description is required"})
                    case !price:
                        return res.status(200).send({message:"category is required"})
                        case !quantity:
                            return res.status(200).send({message:"quantity is required"})
                            case !category:
                                return res.status(200).send({message:"category is required"})
                                    case photo && photo.size>1000000:
                                       return res.status(200).send({message:"photo is required"})
                    
        }
        const products= await productModel.findByIdAndUpdate(req.params.pid,{...req.fields,slug:slugify(name)},{new:true})
        if(photo){
            products.photo.data=fs.readFileSync(photo.path)
            products.photo.contentType=photo.type
        }
        await products.save()
        res.status(201).send({
            message:"product updated",
            success:true,
            products,
        })
        
    } catch (error) {
        res.status(404).send({
            message:"error  to update product",
            success:false, 
            error
        })
        
    }

}
export const filterController=async(req,res)=>{

     try{
        const{checked,radio}=req.body;
      let args={}
      if (checked.length>0) args.category=checked;
      if(radio.length) args.price={$gte: radio[0],$lte: radio[1]}
      const product= await productModel.find(args);
      res.status(200).send({
        message:"success",
        success:true,
        product
      })
     
  } catch (error) {
    res.status(404).send({
        message:"error  to get product",
        success:false,
        error
    })
    
  


  }
}
export const filterPage=async(req,res)=>{
    try {
        const total= await productModel.find({}).estimatedDocumentCount()
        res.status(200).send({
            total,
            message:"success",
            success:true,
        })
        
    } catch (error) {
        res.status(404).send({
            message:"error  to load page",
            success:false,
            error
        })
        
        
    }
}

export const filterPageList = async (req, res) => {
    try {
        const perPage = 6;
        const page = req.params.page ? req.params.page : 1;
        const pagination = 
        await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
        res.status(200).send({
            message: "success",
            pagination,
            page
        })


    } catch (error) {
        res.status(404).send({
            message: "error",
            success: false,
            error
        })

    }
}
export const productFilterController = async (req, res) => {
    try {
       const keyword = req.params.keyword;
      
       const result = await productModel.find({
          $or: [
             { name: { $regex: keyword, $options: "i" } },
             { description: { $regex: keyword, $options: "i" } }
          ]
       }).select("-photo");
       res.json(result);
    } catch (error) {
       res.status(404).send({
          message: "error while",
          success: false,
          error
       });
    }
 };
 export const getSimilarProduct=async(req,res)=>{
    try {
        const{pid,cid}= req.params;
    const products=await productModel.find({
        category:cid,
        _id:{$ne:pid}

        
    }).select("-photo").limit(3).populate("category");
    res.status(200).send({
        products,
        success:true,
    })
    } catch (error) {
        res.status(404).send({
            message: "error while",
            success: false,
            error
         });
 }
}
 //payment gateway api
//token
export const braintreeTokenController = async (req, res) => {
    try {
      gateway.clientToken.generate({}, function (err, response) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send(response);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  //payment
  export const brainTreePaymentController = async (req, res) => {
    try {
      const { nonce, cart } = req.body;
      let total = 0;
      cart.map((i) => {
        total += i.price;
      });
      let newTransaction = gateway.transaction.sale(
        {
          amount: total,
          paymentMethodNonce: nonce,
          options: {
            submitForSettlement: true,
          },
        },
        function (error, result) {
          if (result) {
            const order = new orderModel({
              products: cart,
              payment: result,
              buyer: req.user._id,
            }).save();
            res.json({ ok: true });
          } else {
            res.status(500).send(error);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };