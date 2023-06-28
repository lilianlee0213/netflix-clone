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
const Logo = styled.h1`
	font-family: 'Bebas Neue', sans-serif;
	font-style: italic;
	font-size: 35px;
	color: ${(props) => props.theme.red};
	padding-top: 10px;
	margin-right: 50px;
	height: 100%;
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
						<Logo className={isTablet ? 'tablet-logo' : ''}>NOMFLIX</Logo>
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
