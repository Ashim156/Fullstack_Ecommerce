import express from "express";
import { categoryController, deleteCategoryController, showCategoryController, singleCategoryController, updateCategoryController } from "../controler/categoryController.js";
import {signIn, isAdminLogin } from "../middlewares/authMiddleware.js";

const router=express.Router();
router.post('/create-category',signIn,isAdminLogin,categoryController);
router.put('/update-category/:id',signIn,isAdminLogin,updateCategoryController);
router.get('/get-category',showCategoryController);
router.get('/single-category/:slug',singleCategoryController);
router.delete('/delete-category/:id',signIn,isAdminLogin,deleteCategoryController);
export default router;
