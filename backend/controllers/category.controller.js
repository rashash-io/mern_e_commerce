import cloudinary from "../lib/cloudinary.js";
import  {Category}  from "../models/category.model.js";
import Product from "../models/product.model.js";
//
//TODO: Put the categories in redis db
//

export const getAllCategories = async (req, res) => {
try{
  const categories = await Category.find({});
  res.json({categories})
}catch(error){
  console.log("Error in getAllCategories controller", error.message);
  res.status(500).json({ message: "Server error", error: error.message });
}

};

export const createCategory = async (req, res) => {
  try {
    const { name, image, enabled } = req.body;

    const categoryExists = await Category.findOne({name})
    if (categoryExists){
      return res.status(400).json({message: "Category already exists"});
    }
    let cloudinaryResponse = null;
    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "store.rashash.io/categories",
      });
    }

    const category= await Category.create({
      name, 
      image : cloudinaryResponse?.secure_url
        ? cloudinaryResponse.secure_url
        : "", 
      enabled,
    })

    res.status(201).json({ message: "Category created successfully", id:category._id });

  } catch ({error}) {
    console.log("CreateCategory backend error ==>", error);
    if(error?.code === "ENOENT"){
      res.status(500).json({message: "Image sent is invalid", errorno: -2,})
    }
    res.status(500).json({ message: "Server error", error: error });
  }

  
};

export const toggleEnable = async(req, res)=>{
try{
  const category = await Category.findById(req.params.id);
  if(category){
    category.enabled = !category.enabled;
    const updatedCategory = await category.save()
    res.json(updatedCategory);
  }else{
     res.status(404).json({ message: "Category not found" });
  }
}catch(error){ console.log("Error in toggleEnable controller", error.message);
res.status(500).json({ message: "Server error", error: error.message });}

}

export const updateCategory = async (req, res) => {
  try{
    const {name,image, enabled} = req.body
    const category = await Category.findById(req.params.id);
    if (category){
      const NewCategory = {name, image, enabled}
      const updatedCategory = await Category.updateOne(NewCategory)
      res.json(updateCategory)

    }else{
      res.status(404).json({ message: "Category not found" });
    }

  }catch(error){
     console.log("Error in updateCategory controller", error);
     res.status(500).json({ message: "Server error", error: error });

  }
  
};
export const deleteCategory = async (req, res) => {
  try{
  const category = await Category.findById(req.params.id);
   if (!category) {
     return res.status(404).json({ message: "Category not found" });
   }
   if (category.image) {
    const publicId = category.image.split("/").pop().split(".")[0];
    try {
      await cloudinary.uploader.destroy(`categories/${publicId}`);
      console.log("deleted image from cloduinary");
    } catch (error) {
      console.log("error deleting image from cloduinary", error);
    }
   }

   await Category.findByIdAndDelete(req.params.id)
   return res.status(201).json({ message: "Category deleted successfully", id: req.params.id});


 }catch(error){
  console.log("deleteCategory controller Error ==> ",error)
   res.status(500).json({ message: "Server error", error: error });
 }
};
