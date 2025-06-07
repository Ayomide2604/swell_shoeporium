import Product from "../components/Product";
import defaultProduct from "../assets/img/default_product.jpg";

const ProductList = ({ products }) => {
	const getImageUrl = (product) => {
		if (product?.images?.[0]?.file?.url) {
			return product.images[0].file.url;
		}
		return defaultProduct;
	};

	return (
		<section className="product spad mt-5">
			<div className="container">
				<div className="row product__filter">
					{products.map((product) => {
						const imageUrl = getImageUrl(product);
						return (
							<div
								key={product.id}
								className="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix"
							>
								<Product
									id={product.id}
									name={product.name}
									price={product.price}
									image={imageUrl}
									rating={4}
									/>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default ProductList;
