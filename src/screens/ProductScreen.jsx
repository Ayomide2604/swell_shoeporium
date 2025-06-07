import { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Product from "../components/Product";
// import Pagination from "../components/Pagination";
import ProductFilter from "./../components/ProductFilter";
import ProductSearch from "../components/ProductSearch";
import ProductSorter from "../components/ProductSorter";
// import PageSize from "../components/PageSize";
import defaultProduct from "../assets/img/default_product.jpg";
import useProductStore from "../store/useProductStore";
import useCollectionStore from "../store/useCollectionStore";

const ProductScreen = () => {
	const getImageUrl = (product) => {
		if (product?.images?.[0]?.file?.url) {
			return product.images[0].file.url;
		}
		return defaultProduct;
	};
	const { products, productsLoading, fetchProducts } = useProductStore();
	const { fetchCollections, collections, collectionsLoading } =
		useCollectionStore();
	const [selectedCollection, setSelectedCollection] = useState(null);
	// const [selectedOrder, setSelectedOrder] = useState("name");
	// const [page, setPage] = useState(1);
	// const [pageSize, setPageSize] = useState(10);

	// const [search, setSearch] = useState("");

	// useEffect(() => {
	// 	fetchCollections();
	// }, []);

	useEffect(() => {
		fetchProducts();
		fetchCollections();
	}, []);

	// const handleSortChange = (e) => {
	// 	setSelectedOrder(e.target.value);
	// };

	// const handleOnSearch = (e) => {
	// 	setSearch(e);
	// };

	// const handlePageSize = (e) => {
	// 	setPageSize(Number(e.target.value));
	// 	setPage(1);
	// };

	return (
		<div>
			<BreadCrumb title="Products" />

			{productsLoading || collectionsLoading ? (
				<div id="preloder">
					<div className="loader"></div>
				</div>
			) : null}

			<section className="shop spad">
				<div className="container">
					<div className="row">
						<div className="col-lg-3">
							<div className="shop__sidebar">
								<ProductSearch />
								<div className="shop__sidebar__accordion">
									<div className="accordion ">
										<ProductFilter
											title="Collections"
											items={collections}
											selectedItem={selectedCollection}
											onSelect={setSelectedCollection}
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-9">
							<div className="shop__product__option">
								<div className="row d-flex justify-content-between align-items-center">
									<div className="col-lg-6">
										<div className="shop__product__option__left">
											<h5 className="d-flex">
												Showing All {products.length} results
											</h5>
										</div>
									</div>
									<div className="d-flex justify-content-between align-items-center col-lg-6 mx-2 my-3">
										{/* <ProductSorter onChange={handleSortChange} /> */}
										<div className="">
											{/* <PageSize
												pageSize={pageSize}
												handlePageSize={handlePageSize}
											/> */}
										</div>
									</div>
								</div>
							</div>
							<div className="row">
								{products.map((product) => {
									const imageUrl = getImageUrl(product);
									return (
										<div
											key={product.id}
											className="col-lg-4 col-md-6 col-sm-6"
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
							<div className="row">
								{/* <Pagination
									page={page}
									count={count}
									pageSize={pageSize}
									onPageChange={(newPage) => setPage(newPage)}
								/> */}
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default ProductScreen;
