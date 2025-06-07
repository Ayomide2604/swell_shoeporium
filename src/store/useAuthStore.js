import { create } from "zustand";
import { persist } from "zustand/middleware";
import swell from "./../api/swellApi";

const useAuthStore = create(
	persist(
		(set) => ({
			user: null,
			loading: false,
			error: null,

			// login: async (email, password) => {
			// 	set({ loading: true, error: null });
			// 	try {
			// 		await swell.account.login({
			// 			email,
			// 			password,
			// 		});
			// 		const session = swell.session.getCookie();
			// 		console.log("session", session);

			// 		alert("Login successful");
			// 	} catch (err) {
			// 		set({ error: err.message || "Login failed" });
			// 		console.error(err);
			// 	} finally {
			// 		set({ loading: false });
			// 	}
			// },

			login: async (email, password) => {
				set({ loading: true, error: null });
				try {
					await swell.account.login({ email, password });

					const session = await swell.session.get();
					console.log("Session values:", session);

					if (session?.account_id) {
						const user = await swell.account.get();
						console.log("Logged in user:", user);
						set({ user });
						alert("Login successful");
					} else {
						throw new Error("No account ID in session — login failed");
					}
				} catch (err) {
					set({ error: err.message || "Login failed" });
					console.error("Login error:", err);
				} finally {
					set({ loading: false });
				}
			},

			register: async (email, password, first_name, last_name) => {
				set({ loading: true, error: null });
				try {
					await swell.account.create({
						email,
						password,
						first_name,
						last_name,
					});
					alert("Registration successful");
				} catch (err) {
					set({ error: err.message || "Registration failed" });
					console.error(err);
				} finally {
					set({ loading: false });
				}
			},

			logout: async () => {
				set({ loading: true, error: null });
				try {
					await swell.account.logout();
					alert("Logout Successful");
					set({ user: null });
				} catch (err) {
					set({ error: err.message || "Logout failed" });
					console.error(err);
				} finally {
					set({ loading: false });
				}
			},

			fetchUser: async () => {
				set({ loading: true, error: null });
				try {
					const user = await swell.account.get();
					set({ user });
				} catch (err) {
					set({ error: err.message || "Could not fetch user" });
					console.error(err);
				} finally {
					set({ loading: false });
				}
			},
		}),
		{
			name: "auth-storage",
			partialize: (state) => ({ user: state.user }),
		}
	)
);

export default useAuthStore;
