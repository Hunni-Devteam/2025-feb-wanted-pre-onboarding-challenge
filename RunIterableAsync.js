const Product = {
  getProduct: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve({ id: 1, name: 'product 1' }), 500);
    });
  },
};

const ProductStock = {
  getStock: (productId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve({ productId, qty: 10 }), 200);
    });
  },
};

function runIterableAsync(generatorFn) {
  const gen = generatorFn();

  function run (result) {
    let res = gen.next(result);
    return res.done ? null : res.value.then(run);
  };

  return run();
}

runIterableAsync(function*() {
  const product = yield Product.getProduct();
  const productStock = yield ProductStock.getStock(product.id);

  console.log(product, productStock);
});

(async function () {
	const product = await Product.getProduct();
	const productStock = await ProductStock.getStock(product.id);

	console.log(product, productStock);
})();
