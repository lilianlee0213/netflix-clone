import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './Components/Header';
import Home from './Routes/Home';
import Tv from './Routes/Tv';
import Search from './Routes/Search';
import Footer from './Components/Footer';
import {useEffect, useState} from 'react';

export interface IScreen {
	isMobile: boolean;
	isTablet: boolean;
	isDesktop: boolean;
}
const getViewport = () => {
	const width = window.innerWidth;

	return {
		isMobile: width <= 576,
		isTablet: width >= 577 && width <= 991,
		isDesktop: width >= 992,
	};
};
function App() {
	const [viewport, setViewport] = useState<IScreen>(getViewport());
	const {isMobile, isTablet, isDesktop} = viewport;
	useEffect(() => {
		const handleResize = () => {
			setViewport(getViewport());
		};
		window.addEventListener('resize', handleResize);
		// Clean up the event listener on component unmount
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<BrowserRouter>
			<Header isMobile={isMobile} isTablet={isTablet} isDesktop={isDesktop} />
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="movie/:id" element={<Home />}></Route>
				<Route path="tv" element={<Tv />}></Route>
				<Route path="tv/:id" element={<Tv />}></Route>
				<Route path="search" element={<Search />}></Route>
			</Routes>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
