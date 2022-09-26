/* se definen los productos se deja vacio para mostrar la el mensaje que no hay productos */
const products = [];
/* Funcion para crear productos */
function postProduct(data) {
      let _id;
      if (products.length != 0) {
            let ultimoId = products[products.length - 1]._id;
            _id = parseInt(ultimoId) + 1;
      } else {
            _id = 1;
      }
      products.push({ _id, ...data });
      return { insertedId: _id };
}
/* funcion para obtener todos los productos */
function getProduct(query = {}) {
      return products;
}
/* funcion para obtener producto por id*/
function getProId(idproduct) {
      const product = products.filter((product) => product._id === idproduct);
      if (!product) {
            throw new Error(`Producto con id ${idproduct} no encontrado.`);
      }
      return product;
}
module.exports = {
      postProduct,
      getProduct,
      getProId,
};
