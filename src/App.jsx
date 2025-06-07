import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import ProductDetailScreen from "./screens/ProductDetailScreen";
import LoginScreen from "./components/LoginScreen";
import RegisterScreen from "./components/RegisterScreen";

function App() {
	return (
		<>
			<Header />
			<div className="app">
				<Routes>
					<Route path="/" element={<HomeScreen />} />
					<Route path="/products" element={<ProductScreen />} />
					<Route path="/products/:id" element={<ProductDetailScreen />} />
					<Route path="/login" element={<LoginScreen />} />
					<Route path="/signup" element={<RegisterScreen />} />
				</Routes>
			</div>
			<Footer />
		</>
	);
}

export default App;
