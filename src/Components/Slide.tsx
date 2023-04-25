import {AnimatePresence, motion} from 'framer-motion';
import {IGenre, IGetMoviesResult, getGenres} from '../api';
import styled from 'styled-components';
import {useQuery} from 'react-query';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import {makeImagePath, netflixLogoUrl} from '../utils';
import {title} from 'process';

interface ISlider {
	data: IGetMoviesResult;
	title?: string;
}
const SlideTitle = styled.h3`
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
const ModalBtns = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;
`;
const ModalBtn = styled.button`
	margin-right: 5px;
	width: 35px;
	height: 35px;
	vertical-align: middle;
	border: 1px solid rgba(255, 255, 255, 0.5);
	border-radius: 50%;
	background-color: transparent;
	&:first-child {
		background-color: white;
		:hover {
			background-color: rgba(255, 255, 255, 0.8);
		}
	}
	&:nth-child(2) {
		&:hover {
			border-color: white;
		}
	}
	&:last-child {
		background-color: transparent;
		:hover {
			background-color: transparent;
			border-color: white;
		}
	}
	i {
		font-size: 18px;
		color: white;
	}
	svg {
		vertical-align: middle;
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
	},
	hover: {
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
export default function Slide({data, title}: ISlider) {
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
	const onBoxClicked = (movieId: number) => {
		navigate(`/movies/${movieId}`);
	};
	return (
		<>
			<SlideTitle onClick={moveNext}>{title}</SlideTitle>
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
								layoutId={movie.id + ''}
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
									<ModalBtns>
										<div>
											<ModalBtn>
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
											</ModalBtn>
											<ModalBtn>
												<i className="fa-solid fa-plus"></i>
											</ModalBtn>
											<ModalBtn>
												<i className="fa-regular fa-thumbs-up"></i>
											</ModalBtn>
										</div>
										<div>
											<ModalBtn onClick={() => onBoxClicked(movie.id)}>
												<i className="fa-solid fa-arrow-down"></i>
											</ModalBtn>
										</div>
									</ModalBtns>
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
		</>
	);
}
