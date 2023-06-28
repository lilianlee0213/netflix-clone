import styled from 'styled-components';
import {
	motion,
	useAnimation,
	useMotionValueEvent,
	useScroll,
} from 'framer-motion';
import {Link, useMatch, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import {IScreen} from '../App';
import {useForm} from 'react-hook-form';

const Nav = styled(motion.nav)`
	position: fixed;
	top: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 15px 60px;
	width: 100%;
	font-size: 14px;
	color: ${(props) => props.theme.white.darker};
	z-index: 2;
	&.mobile-nav {
		padding: 15px;
	}
	&.tablet-nav {
		padding: 15px 30px;
	}
`;
const Col = styled.div`
	position: relative;
	display: flex;
	align-items: center;
`;
const Logo = styled.svg`
	padding-top: 10px;
	margin-right: 50px;
	height: 100%;
	fill: ${(props) => props.theme.red};
	&.tablet-logo {
		margin-right: 40px;
	}
`;

const DesktopItems = styled.ul`
	display: flex;
	align-items: center;
	padding-top: 6px;
`;
const DesktopItem = styled.li`
	position: relative;
	flex-direction: column;
	display: flex;
	justify-content: center;
	margin-right: 20px;
	font-weight: 300;
	color: ${(props) => props.theme.white.darker};
	a {
		opacity: 0.5;
		transition: opacity 0.3s ease-in-out;

		&:hover {
			opacity: 1;
		}
	}
	.active {
		opacity: 1;
	}
`;

const Search = styled.form`
	position: relative;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	gap: 20px;
	svg {
		position: absolute;
		height: 25px;
		cursor: pointer;
	}
`;
const Input = styled(motion.input)`
	width: 275px;
	padding: 8px 8px 8px 40px;
	border: 1.5px solid ${(props) => props.theme.white.lighter};
	color: ${(props) => props.theme.white.darker};
	background-color: transparent;
	transform-origin: right center;
	font-size: 14px;
	&.mobile-input {
		width: 180px;
		font-size: 12px;
	}
`;
// When isMobile && isTablet
const MobileLogo = styled.h1`
	margin-right: 20px;
	padding-top: 8px;
	font-family: 'Bebas Neue', sans-serif;
	font-size: 30px;
	letter-spacing: -5px;
	color: ${(props) => props.theme.red};
`;
const BrowseBtn = styled.button`
	display: flex;
	gap: 5px;
	font-size: 14px;
	background: transparent;
	color: ${(props) => props.theme.white.darker};
	margin-top: 4px;
`;
const BrowserItems = styled(motion.ul)`
	position: absolute;
	top: 60px;
	left: 0;
	width: 100%;
	min-width: 200px;
	height: 200px;
	padding: 10px;
	background-color: ${(props) => props.theme.black.darker};
`;
const BrowserItem = styled(motion.li)`
	padding: 10px 20px;
	text-align: center;
	color: ${(props) => props.theme.white.darker};
	a {
		opacity: 0.5;
		transition: opacity 0.3s ease-in-out;

		&:hover {
			opacity: 1;
		}
	}
	.active {
		opacity: 1;
	}
`;
export interface IForm {
	keyword: string;
}

export default function Header({isMobile, isTablet, isDesktop}: IScreen) {
	const homeMatch = useMatch('/');
	const tvMatch = useMatch('tv');
	const navigate = useNavigate();
	//Link(only isMobile and isTablet)
	const [browserOpen, setBrowserOpen] = useState(false);
	const toggleBrowserBtn = () => {
		setBrowserOpen((prev) => !prev);
	};
	// Search
	const [searchOpen, setSearchOpen] = useState(false);
	const toggleSearch = () => setSearchOpen((prev) => !prev);
	const {register, handleSubmit} = useForm<IForm>();
	const onValid = (data: IForm) => {
		navigate(`/search?keyword=${data.keyword}`);
	};
	// Scroll Event
	const {scrollY} = useScroll();
	const navAnimation = useAnimation();
	useMotionValueEvent(scrollY, 'change', (latest) => {
		if (latest > 10) {
			navAnimation.start({
				backgroundColor: 'rgba(24, 24, 24,1)',
			});
		} else {
			navAnimation.start({backgroundColor: 'rgba(24, 24, 24,0)'});
		}
	});
	return (
		<Nav
			className={isMobile ? 'mobile-nav' : isTablet ? 'tablet-nav' : ''}
			initial={{backgroundColor: 'rgba(24, 24, 24,0)'}}
			animate={navAnimation}>
			<Col>
				<Link to="/">
					{isMobile ? (
						<MobileLogo>N</MobileLogo>
					) : (
						<Logo
							className={isTablet ? 'tablet-logo' : ''}
							viewBox="0 0 111 30"
							version="1.1"
							xmlns="http://www.w3.org/2000/svg"
							width="100">
							<path d="M105.06233,14.2806261 L110.999156,30 C109.249227,29.7497422 107.500234,29.4366857 105.718437,29.1554972 L102.374168,20.4686475 L98.9371075,28.4375293 C97.2499766,28.1563408 95.5928391,28.061674 93.9057081,27.8432843 L99.9372012,14.0931671 L94.4680851,-5.68434189e-14 L99.5313525,-5.68434189e-14 L102.593495,7.87421502 L105.874965,-5.68434189e-14 L110.999156,-5.68434189e-14 L105.06233,14.2806261 Z M90.4686475,-5.68434189e-14 L85.8749649,-5.68434189e-14 L85.8749649,27.2499766 C87.3746368,27.3437061 88.9371075,27.4055675 90.4686475,27.5930265 L90.4686475,-5.68434189e-14 Z M81.9055207,26.93692 C77.7186241,26.6557316 73.5307901,26.4064111 69.250164,26.3117443 L69.250164,-5.68434189e-14 L73.9366389,-5.68434189e-14 L73.9366389,21.8745899 C76.6248008,21.9373887 79.3120255,22.1557784 81.9055207,22.2804387 L81.9055207,26.93692 Z M64.2496954,10.6561065 L64.2496954,15.3435186 L57.8442216,15.3435186 L57.8442216,25.9996251 L53.2186709,25.9996251 L53.2186709,-5.68434189e-14 L66.3436123,-5.68434189e-14 L66.3436123,4.68741213 L57.8442216,4.68741213 L57.8442216,10.6561065 L64.2496954,10.6561065 Z M45.3435186,4.68741213 L45.3435186,26.2498828 C43.7810479,26.2498828 42.1876465,26.2498828 40.6561065,26.3117443 L40.6561065,4.68741213 L35.8121661,4.68741213 L35.8121661,-5.68434189e-14 L50.2183897,-5.68434189e-14 L50.2183897,4.68741213 L45.3435186,4.68741213 Z M30.749836,15.5928391 C28.687787,15.5928391 26.2498828,15.5928391 24.4999531,15.6875059 L24.4999531,22.6562939 C27.2499766,22.4678976 30,22.2495079 32.7809542,22.1557784 L32.7809542,26.6557316 L19.812541,27.6876933 L19.812541,-5.68434189e-14 L32.7809542,-5.68434189e-14 L32.7809542,4.68741213 L24.4999531,4.68741213 L24.4999531,10.9991564 C26.3126816,10.9991564 29.0936358,10.9054269 30.749836,10.9054269 L30.749836,15.5928391 Z M4.78114163,12.9684132 L4.78114163,29.3429562 C3.09401069,29.5313525 1.59340144,29.7497422 0,30 L0,-5.68434189e-14 L4.4690224,-5.68434189e-14 L10.562377,17.0315868 L10.562377,-5.68434189e-14 L15.2497891,-5.68434189e-14 L15.2497891,28.061674 C13.5935889,28.3437998 11.906458,28.4375293 10.1246602,28.6868498 L4.78114163,12.9684132 Z" />
						</Logo>
					)}
				</Link>
				{(isMobile || isTablet) && (
					<>
						<BrowseBtn onClick={toggleBrowserBtn}>
							Browse
							<i className="fa-solid fa-caret-down" />
						</BrowseBtn>
						<BrowserItems
							initial={{opacity: 0}}
							animate={{opacity: browserOpen ? 1 : 0}}>
							<BrowserItem>
								<Link to="/" className={Boolean(homeMatch) ? 'active' : ''}>
									Home
								</Link>
							</BrowserItem>
							<BrowserItem>
								<Link to="tv" className={Boolean(tvMatch) ? 'active' : ''}>
									TV Shows
								</Link>
							</BrowserItem>
						</BrowserItems>
					</>
				)}
				{isDesktop && (
					<DesktopItems>
						<DesktopItem>
							<Link to="/" className={Boolean(homeMatch) ? 'active' : ''}>
								Home
							</Link>
						</DesktopItem>
						<DesktopItem>
							<Link to="tv" className={Boolean(tvMatch) ? 'active' : ''}>
								TV Shows
							</Link>
						</DesktopItem>
					</DesktopItems>
				)}
			</Col>
			<Col>
				<Search onSubmit={handleSubmit(onValid)}>
					<Input
						{...register('keyword', {required: true, minLength: 2})}
						className={isMobile ? 'mobile-input' : ''}
						initial={{scaleX: 0}}
						animate={{scaleX: searchOpen ? 1 : 0}}
						transition={{type: 'linear'}}
						placeholder="Titles, people, genres"
					/>
					<motion.svg
						onClick={toggleSearch}
						animate={{
							x:
								searchOpen && !isMobile
									? -240
									: searchOpen && isMobile
									? -150
									: 0,
						}}
						transition={{type: 'linear'}}
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg">
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M14 11C14 14.3137 11.3137 17 8 17C4.68629 17 2 14.3137 2 11C2 7.68629 4.68629 5 8 5C11.3137 5 14 7.68629 14 11ZM14.3623 15.8506C12.9006 17.7649 10.5945 19 8 19C3.58172 19 0 15.4183 0 11C0 6.58172 3.58172 3 8 3C12.4183 3 16 6.58172 16 11C16 12.1076 15.7749 13.1626 15.368 14.1218L24.0022 19.1352L22.9979 20.8648L14.3623 15.8506Z"
							fill="currentColor"
						/>
					</motion.svg>
				</Search>
			</Col>
		</Nav>
	);
}
