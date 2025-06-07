import { useEffect, useState } from "react";
import Hero from "../pages/Hero";
import ProductList from "../pages/ProductList";
import useProductStore from "../store/useProductStore";
// import useCollectionStore from "../store/useCollectionStore";
// import useCollectionStore from "../store/useCollectionStore";
// import useProductStore from "./../store/useProductstore";
// import ProductTabs from "../components/ProductTabs";
import defaultProduct from "../assets/img/default_product.jpg";
import ProductTabs from "./../components/ProductTabs";
import useCollectionStore from "../store/useCollectionStore";

const HomeScreen = () => {
	const { products, productsLoading, fetchProducts } = useProductStore();
	const [selectedCollection, setSelectedCollection] = useState(null);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const { collections, fetchCollections, collectionsLoading } =
		useCollectionStore();

	useEffect(() => {
		fetchProducts();
		fetchCollections();
	}, []);

	useEffect(() => {
		if (!products) return;

		let filtered = [...products];

		if (selectedCollection) {
			filtered = filtered.filter((product) =>
				product.categories?.some((cat) => cat.id === selectedCollection)
			);
		}

		setFilteredProducts(filtered);
	}, [selectedCollection, products]);

	const handleCollectionSelect = (collectionId) => {
		setSelectedCollection(collectionId);
	};

	return (
		<>
			{productsLoading || collectionsLoading ? (
				<div id="preloder">
					<div className="loader"></div>
				</div>
			) : null}
			<Hero />

			{collections && collections.length > 0 && (
				<ProductTabs
					items={collections}
					selectedItem={selectedCollection}
					onSelect={handleCollectionSelect}
				/>
			)}

			<ProductList products={filteredProducts} />
		</>
	);
};

export default HomeScreen;
