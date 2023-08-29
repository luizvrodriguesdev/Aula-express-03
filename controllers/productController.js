const ProductController = {
  createProduct: (req, res) => {
    console.log("ENTREI AQUI!");
    res.status(201).send("createProduct");
  },
  getAllProducts: (req, res) => {
    console.log("ENTREI AQUI!");
    res.status(200).send("getAllProducts");
  },
  updateProduct: (req, res) => {
    console.log("ENTREI AQUI!");
    res.status(200).send("{nome:'Luiz', email:'luiz@gmail.com'}");
  },
  deleteProduct: (req, res) => {
    console.log("ENTREI AQUI!");
    res.status(204);
  },
  getProduct: (req, res) => {
    console.log("ENTREI AQUI!");
    res.status(200).send("getProduct");
  },
};

export default ProductController;
