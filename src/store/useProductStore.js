import { create } from "zustand";
import swell from "../api/swellApi";

const useProductStore = create((set) => ({
	products: [],
	productsLoading: true,
	error: null,
	fetchProducts: async () => {
		try {
			set((state) => ({
				...state,
				productsLoading: true,
				error: null,
			}));

			const { results } = await swell.products.list({
				expand: ["categories"],
			});

			set((state) => ({
				...state,
				products: results,
				productsLoading: false,
			}));
		} catch (error) {
			set((state) => ({
				...state,
				error: error.message,
				productsLoading: false,
			}));
			console.error("Error fetching products:", error);
		}
	},
}));

export default useProductStore;
