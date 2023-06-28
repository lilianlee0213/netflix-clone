import {AnimatePresence, motion} from 'framer-motion';
import {IGenre, IGetResult, getGenres} from '../api';
import styled from 'styled-components';
import {useQuery} from 'react-query';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import {makeImagePath, netflixLogoUrl} from '../utils';
import {Bubble, IconBtn} from '../commonstyles';
import {IScreen} from '../App';

export interface ISlider {
	mediaType: string;
	data: IGetResult;
	title?: string;
}
interface ISlideProps extends ISlider, IScreen {
	// No additional props needed
}
const Wrapper = styled.div`
	margin-bottom: 230px;
`;
const Title = styled.h3`
	margin-bottom: 15px;
	padding-left: 60px;
	font-size: 25px;
	font-weight: 500;
	&.mobile-title {
		padding-left: 15px;
		font-size: 20px;
	}
	&.tablet-title {
		padding-left: 30px;
		font-size: 22px;
	}
`;
const Row = styled(motion.div)`
	position: absolute;
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	gap: 10px;
	width: 100%;
	padding: 0 60px;
	&.mobile-row {
		grid-template-columns: repeat(3, 1fr);
		padding: 0 15px;
	}
	&.tablet-row {
		padding: 0 30px;
		grid-template-columns: repeat(4, 1fr);
	}
`;
const Box = styled(motion.div)<{$bgPhoto: string}>`
	height: 163px;
	border-radius: 6px;
	background-image: url(${(props) => props.$bgPhoto});
	background-size: cover;
	background-position: center;
	box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.5);
	cursor: pointer;
	&:first-child {
		transform-origin: center left;
	}
	&:last-child {
		transform-origin: center right;
	}
	&.mobile-box {
		min-width: 140px;
		height: 200px;
		width: 100%;
	}
`;
const Info = styled(motion.div)`
	position: absolute;
	top: 95%;
	width: 100%;
	padding: 15px 15px 12px;
	border-bottom-left-radius: 6px;
	border-bottom-right-radius: 6px;
	background-color: ${(props) => props.theme.black.darker};
	box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.5);
	opacity: 0;
	h4 {
		&:first-of-type {
			font-size: 14px;
			margin-bottom: 5px;
		}
		&:last-of-type {
			font-size: 12px;
			color: ${(props) => props.theme.green};
		}
		span {
			&:after {
				padding: 0 3px;
				content: '•';
				font-size: 22px;
				vertical-align: -3px;
				color: ${(props) => props.theme.black.lighter};
			}
			&:last-child::after {
				opacity: 0;
			}
		}
	}
	&.mobile-tablet-info {
		padding: 10px;
		white-space: nowrap;
		h4 {
			overflow: hidden;
			&:first-of-type {
				font-size: 12px;
				margin-bottom: 4px;
			}
			&:last-of-type {
				font-size: 8px;
				line-height: 0.5;
			}
		}
		&:after {
			display: none;
		}
	}
`;
const Buttons = styled.div`
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;
`;
const Button = styled.button`
	${IconBtn}
	margin-right: 5px;
	width: 2.8vw;
	aspect-ratio: 1;
	max-width: 35px;
	&.playIcon {
		background-color: white;
		:hover {
			background-color: rgba(255, 255, 255, 0.8);
		}
	}
	&.moreInfo {
		:hover {
			border-color: ${(props) => props.theme.green};
			i {
				color: ${(props) => props.theme.green};
			}
		}
	}
	i {
		font-size: 18px;
	}
	&.mobile-tablet-btn {
		width: 25px;
		height: 25px;
		i {
			font-size: 12px;
		}
		svg {
			width: 14px;
			height: 14px;
		}
	}
`;
const HoverBubble = styled.div<{isHovered: Boolean}>`
	${Bubble}
	opacity: ${(props) => (props.isHovered ? 1 : 0)};
	transition: opacity 0.2s ease-in-out;
	right: -8px;
`;
const NextBtn = styled(motion.button)`
	position: absolute;
	background-color: transparent;
	width: 60px;
	height: 163px;
	right: 10px;
	background-color: rgba(21, 21, 21, 0.4);

	i {
		color: ${(props) => props.theme.white.darker};
		font-size: 30px;
	}
`;
const rowVariants = {
	hidden: {
		x: window.outerWidth + 10,
	},
	visible: {
		x: 0,
	},
	exit: {
		x: -window.outerWidth - 10,
	},
};
const boxVariants = {
	normal: {
		scale: 1,
		zIndex: 0,
	},
	hover: {
		zIndex: 3,
		y: -80,
		scale: 1.4,
		transition: {
			duration: 0.2,
			delay: 0.3,
			type: 'tween',
		},
	},
};
const mobileBoxVariants = {
	normal: {
		scale: 1,
		zIndex: 0,
	},
	hover: {
		zIndex: 3,
		y: -20,
		scale: 1.1,
		transition: {
			duration: 0.2,
			delay: 0.3,
			type: 'tween',
		},
	},
};
const tabletBoxVariants = {
	normal: {
		scale: 1,
		zIndex: 0,
	},
	hover: {
		zIndex: 3,
		y: -50,
		scale: 1.2,
		transition: {
			duration: 0.2,
			delay: 0.3,
			type: 'tween',
		},
	},
};
const infoVariants = {
	normal: {
		display: 'none',
	},
	hover: {
		opacity: 1,
		display: 'block',
		transition: {
			duration: 0.2,
			delay: 0.3,
			type: 'tween',
		},
	},
};

export default function Slide({
	mediaType,
	data,
	title,
	isMobile,
	isTablet,
	isDesktop,
}: ISlideProps) {
	const navigate = useNavigate();
	const {data: genre} = useQuery(['genres'], getGenres);
	const [index, setIndex] = useState(0);
	const [leaving, setLeaving] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const offset = isMobile ? 3 : isTablet ? 4 : 6;

	const moveNext = () => {
		if (data) {
			if (leaving) return;
			toggleLeaving();
			const totalMovies = data.results.length - 1;
			const maxIndex = Math.floor(totalMovies / offset) - 1;
			setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
		}
	};
	const toggleLeaving = () => setLeaving((prev) => !prev);
	const onSlideClicked = (id: number) => {
		navigate(`/${mediaType}/${id}`);
	};
	return (
		<Wrapper>
			<Title
				className={isMobile ? 'mobile-title' : isTablet ? 'tablet-title' : ''}>
				{title}
			</Title>
			<AnimatePresence initial={false} onExitComplete={toggleLeaving}>
				<Row
					className={isMobile ? 'mobile-row' : isTablet ? 'tablet-row' : ''}
					key={index}
					variants={rowVariants}
					initial="hidden"
					animate="visible"
					transition={{type: 'tween'}}
					exit="exit">
					{data?.results
						.slice(1)
						.slice(offset * index, offset * index + offset)
						.map((media) => (
							<Box
								className={isMobile ? 'mobile-box' : ''}
								key={media.id}
								variants={
									isMobile
										? mobileBoxVariants
										: isTablet
										? tabletBoxVariants
										: boxVariants
								}
								initial="normal"
								whileHover="hover"
								transition={{type: 'tween'}}
								$bgPhoto={
									media.backdrop_path
										? makeImagePath(media.backdrop_path, 'w500')
										: netflixLogoUrl
								}>
								<Info
									variants={infoVariants}
									className={!isDesktop ? 'mobile-tablet-info' : ''}>
									<Buttons>
										<div>
											<Button
												className={`playIcon ${
													!isDesktop ? 'mobile-tablet-btn' : ''
												}`}>
												<svg
													width="19"
													height="19"
													viewBox="0 0 24 24"
													fill="currentColor"
													xmlns="http://www.w3.org/2000/svg">
													<path
														d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z"
														fill="currentColor"></path>
												</svg>
											</Button>
											<Button className={!isDesktop ? 'mobile-tablet-btn' : ''}>
												<i className="fa-solid fa-plus"></i>
											</Button>
										</div>
										<div>
											<Button
												className={`moreInfo ${
													!isDesktop ? 'mobile-tablet-btn' : ''
												}`}
												onMouseEnter={() => setIsHovered(true)}
												onMouseLeave={() => setIsHovered(false)}
												onClick={() => onSlideClicked(media.id)}>
												<i className="fa-solid fa-arrow-down"></i>
											</Button>
										</div>
										<HoverBubble isHovered={isHovered}>
											Overview & Info
										</HoverBubble>
									</Buttons>
									<h4>{media.title ? media.title : media.name}</h4>
									<h4>
										{genre?.genres.map((i: IGenre) =>
											media.genre_ids.slice(0, 3).includes(i.id) ? (
												<span key={i.id}>{i.name}</span>
											) : null
										)}
									</h4>
								</Info>
							</Box>
						))}
				</Row>
			</AnimatePresence>
			<NextBtn
				onClick={moveNext}
				whileHover={{
					backgroundColor: 'rgba(21, 21, 21, 0.7)',
				}}>
				<motion.i
					className="fa-solid fa-chevron-right"
					whileHover={{scale: 1.3}}
				/>
			</NextBtn>
		</Wrapper>
	);
}
