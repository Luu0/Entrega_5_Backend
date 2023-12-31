import { Router } from "express";
import productDao from "../daos/dbManager/product.dao.js";

const router = Router();

router.get("/", async (req, res) => {
  try{
    const products = await productDao.findProduct();
    res.json({
      data: products,
      message: "Products List"
    });
  }catch(error){
    console.log(error);
    res.json({
      error,
      message: "Error",
    });
  }
});

router.get("/:id",(req,res)=>{
  const {id} = req.params;
  try{
    const product = productManager.getProductById(Number(id));
    return res.status(200).json(product);
  }catch(error){
    return res.status(404).json({ message: error.message });
  }
})

router.post("/", async (req, res) => {
  try {
    const post = await productDao.createProduct(req.body);
    res.json({
      post,
      message: "Product created",
    });
  } catch (error) {
    console.log(error);
    res.json({
      error,
      message: "Error",
    });
  }
});

router.put("/:id",async (req,res)=>{
  try {
    const { id } = req.params;

    const product = await productDao.updateProduct(id, req.body);

    res.json({
      product,
      message: "Product updated",
    });
  } catch (error) {
    console.log(error);
    res.json({
      error,
      message: "Error",
    });
  }
});

router.delete("/:id",async (req,res)=>{
  try {
    const { id } = req.params;
    const cart = await productDao.deleteProduct(id);

    res.json({
      cart,
      message: "Product deleted",
    });
  } catch (error) {
    console.log(error);
    res.json({
      error,
      message: "Error",
    });
  }
});

export default router;