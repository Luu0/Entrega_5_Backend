import { Router } from "express";
import CartDao from "../daos/dbManager/cart.dao.js";
import cartDao from "../daos/dbManager/cart.dao.js";

const router = Router();


router.get("/", async (req, res) => {
  try{
    const Carts = await cartDao.findCart();
    res.json({
      data: Carts,
      message: "Cart List"
    });
  }catch(error){
    console.log(error);
    res.json({
      error,
      message: "Error",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const Cart = await CartDao.createCart(req.body);

    res.json({
      Cart,
      message: "Cart created",
    });
  } catch (error) {
    console.log(error);
    res.json({
      error,
      message: "Error",
    });
  }
});

router.post("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    const productAdded = await cartManager.addProductToCart(Number(cid), Number(pid), quantity);
    if (productAdded) {
      return res.status(201).json(productAdded);
    } else {
      return res.status(404).json({ message: "El carrito o el producto con los IDs especificados no existe" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
});

router.get("/:cid", async (req,res)=>{
  try {
    const { cid } = req.params;
    const cart = await CartDao.findCartById(cid);

    if (!cart) return res.json({ message: "Cart not found" });

    res.json({
      cart,
      message: "Cart found",
    });
  } catch (error) {
    console.log(error);
    res.json({
      error,
      message: "Error",
    });
  }
})

export default router;