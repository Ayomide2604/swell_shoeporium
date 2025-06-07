import { create } from "zustand";
import swell from "../api/swellApi";

const useCollectionStore = create((set) => ({
	collections: [],
	collectionsLoading: true,
	error: null,
	fetchCollections: async () => {
		try {
			set((state) => ({
				...state,
				collectionsLoading: true,
				error: null,
			}));

			const { results } = await swell.categories.list();

			set((state) => ({
				...state,
				collections: results,
				collectionsLoading: false,
			}));
		} catch (error) {
			set((state) => ({
				...state,
				error: error.message,
				collectionsLoading: false,
			}));
			console.error("Error fetching collections:", error);
		}
	},
}));

export default useCollectionStore;
