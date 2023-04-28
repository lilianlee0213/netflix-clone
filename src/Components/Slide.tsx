import {AnimatePresence, motion} from 'framer-motion';
import {IGenre, IGetResult, getGenres} from '../api';
import styled from 'styled-components';
import {useQuery} from 'react-query';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import {makeImagePath, netflixLogoUrl} from '../utils';
import {IconBtn} from '../commonstyles';

export interface ISlider {
	mediaType: string;
	data: IGetResult;
	title?: string;
}
const Wrapper = styled.div`
	margin-bottom: 230px;
`;
const Title = styled.h3`
	margin-bottom: 15px;
	padding-left: 60px;
	font-size: 25px;
	font-weight: 500;
`;
const Row = styled(motion.div)`
	position: absolute;
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	gap: 10px;
	width: 100%;
	padding: 0 60px;
`;
// Modal
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
`;
const Buttons = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;
`;
const Button = styled.button`
	${IconBtn}
	&.playIcon {
		background-color: white;
		:hover {
			background-color: rgba(255, 255, 255, 0.8);
		}
	}
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

const offset = 6;
export default function Slide({mediaType, data, title}: ISlider) {
	const navigate = useNavigate();
	const {data: genre} = useQuery(['genres'], getGenres);
	const [index, setIndex] = useState(0);
	const [leaving, setLeaving] = useState(false);
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
	const onBoxClicked = (id: number) => {
		navigate(`/${mediaType}/${id}`);
	};
	return (
		<Wrapper>
			<Title>{title}</Title>
			<AnimatePresence initial={false} onExitComplete={toggleLeaving}>
				<Row
					key={index}
					variants={rowVariants}
					initial="hidden"
					animate="visible"
					transition={{type: 'tween'}}
					exit="exit">
					{data?.results
						.slice(1)
						.slice(offset * index, offset * index + offset)
						.map((movie) => (
							<Box
								// layoutId={movie.id + ''}
								key={movie.id}
								variants={boxVariants}
								initial="normal"
								whileHover="hover"
								transition={{type: 'tween'}}
								$bgPhoto={
									movie.backdrop_path
										? makeImagePath(movie.backdrop_path, 'w500')
										: netflixLogoUrl
								}>
								<Info variants={infoVariants}>
									<Buttons>
										<div>
											<Button className="playIcon">
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
											<Button>
												<i className="fa-solid fa-plus"></i>
											</Button>
											<Button>
												<i className="fa-regular fa-thumbs-up"></i>
											</Button>
										</div>
										<div>
											<Button onClick={() => onBoxClicked(movie.id)}>
												<i className="fa-solid fa-arrow-down"></i>
											</Button>
										</div>
									</Buttons>
									<h4>{movie.title ? movie.title : movie.name}</h4>
									<h4>
										{genre?.genres.map((i: IGenre) =>
											movie.genre_ids.slice(0, 3).includes(i.id) ? (
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
