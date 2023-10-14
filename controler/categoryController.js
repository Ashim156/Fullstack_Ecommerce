import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";
export const categoryController=async(req,res)=>{
   try {
    const{name}=req.body;
    if(!name){
     return res.status(401).send({
            success:false,
            message:"name is required"
        })
        
    }
    const existingCategory= await categoryModel.findOne({name});
    if(existingCategory)
    {
        return res.status(200).send({
            success:false,
            message:"category already exist"
        })
        
    }
    const category= await new categoryModel({name,slug:slugify(name),}).save();
    res.status(201).send({
        success:true,
        message:"new category created",
        category
    })


   } catch (error) {
    res.status(404).send({
        message:"error in category",
        success:false

    })
   }
}

// update
export const updateCategoryController=async(req,res)=>{
    try {
        const {name}=req.body
        const {id}=req.params
    
        const category = await categoryModel.findByIdAndUpdate(id,
        {name,
        slug:slugify(name)},
        {new:true});
        res.status(200).send({
        message:"updated",
        success:true,
        category
        })
console.log(id)
        
    } catch (error) {
        console.log(error)
        res.status(404).send({
            message:"error to update",
            success:false,
            error
        })
        
    }

}
// showing all category
export const showCategoryController=async(req,res)=>{
    try {
       const category= await categoryModel.find({})
res.status(200).send({
    message:"all category list",
    success:true,
    category
})
        
    } catch (error) {
        res.status(404).send({
            message:"error to show category",
            success:false,

        })
        
    }

}

export const singleCategoryController=async(req,res)=>{
    try {
        const category= await categoryModel.findOne({slug: req.params.slug})
 res.status(200).send({
     message:"single category list",
     success:true,
     category
 })
         
     } catch (error) {
         res.status(404).send({
             message:"error to show category",
             success:false,
 
         })
         
     }

}
export const deleteCategoryController=async(req,res)=>{
try {
    const {id}=req.params
    const category= await categoryModel.findByIdAndDelete(id)
    res.status(200).send({
        message:"deleted",
        success:true,
        category
    })} catch (error) {
   
        res.status(404).send({
            message:"error to delete category",
            success:false,

        })
        
    }
}
