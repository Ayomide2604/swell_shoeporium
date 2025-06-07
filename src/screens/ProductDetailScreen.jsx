import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import BreadCrumb from "../components/BreadCrumb";
import Rating from "../components/Rating";
import RelatedProducts from "../pages/RelatedProducts";
import useProductStore from "../store/useProductStore";
// import useCartStore from "../store/useCartStore";
import formatter from "../utils/currencyFormatter";
import defaultProduct from "../assets/img/default_product.jpg";

const ProductDetailScreen = () => {
	const { id } = useParams();
	const { products, productsLoading, fetchProducts } = useProductStore();
	// const { addToCart } = useCartStore();
	const [product, setProduct] = useState(null);
	const [quantity, setQuantity] = useState(1);
	const [liked, setLiked] = useState(false);

	useEffect(() => {
		fetchProducts();
	}, []);

	useEffect(() => {
		if (products.length > 0) {
			const foundProduct = products.find((p) => p.id === id);
			setProduct(foundProduct);
		}
	}, [products, id]);

	const getImageUrl = (product) => {
		if (product?.images?.[0]?.file?.url) {
			return product.images[0].file.url;
		}
		return defaultProduct;
	};

	const relatedProducts = products.filter(
		(p) => p.collection?.id === product?.collection?.id && p.id !== product?.id
	);

	if (productsLoading) {
		return (
			<div id="preloder">
				<div className="loader"></div>
			</div>
		);
	}

	if (!product) {
		return <div>Product not found</div>;
	}

	return (
		<>
			<section className="shop-details">
				<div className="container">
					<BreadCrumb title={product.name} />
					<div className="row d-flex justify-content-center align-items-center">
						<div className="col-lg-6 col-md-6">
							<div className="tab-content">
								<div>
									<div className="product__details__pic__item">
										<img
											src={getImageUrl(product)}
											alt={product.name}
											height="auto"
											className="mb-3"
											style={{ objectFit: "contain" }}
										/>
									</div>
								</div>
							</div>
						</div>

						<div className="product__details__content col-lg-6 col-md-6">
							<div className="product__details__text">
								<div
									className="text-start mb-4"
									dangerouslySetInnerHTML={{ __html: product.description }}
								/>
								<h3 className="text-left">{formatter.format(product.price)}</h3>
								<div className="rating d-flex align-items-center">
									<Rating rating={4} />
									<span> - 5 Reviews</span>
								</div>

								<div className="product__details__cart__option text-left">
									<div className="quantity mr-3">
										<div className="pro-qty w-100 h-100">
											<button
												onClick={() => setQuantity((q) => Math.max(1, q - 1))}
												className="btn primary-btn mr-2"
											>
												-
											</button>
											<input
												type="number"
												min={1}
												value={quantity}
												onChange={(e) => setQuantity(Number(e.target.value))}
												className="mr-2"
											/>
											<button
												className="btn primary-btn"
												onClick={() => setQuantity(quantity + 1)}
											>
												+
											</button>
										</div>
									</div>
									<button
										className="btn primary-btn"
										onClick={() => addToCart(product.id, quantity)}
									>
										Add to cart
									</button>
								</div>

								<div
									onClick={() => setLiked(!liked)}
									className="product__details__btns__option text-left d-flex align-items-center"
								>
									{liked ? (
										<IoMdHeart className="mr-2" />
									) : (
										<IoMdHeartEmpty className="mr-2" />
									)}

									<Link>
										{liked ? "Remove from wishlist" : "Add to wishlist"}
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<RelatedProducts products={relatedProducts.slice(0, 8)} />
		</>
	);
};

export default ProductDetailScreen;
