import {useQuery} from 'react-query';
import {IGetMoviesResult, getMovies} from '../api';
import styled from 'styled-components';
import {makeImagePath} from '../utils';
import {AnimatePresence, motion} from 'framer-motion';
import {useState} from 'react';
const Wrapper = styled.div`
	background-color: ${(props) => props.theme.black.darker};
`;
const Loader = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 200vh;
`;
const Banner = styled.div<{$bgPhoto: string}>`
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 100vh;
	padding: 60px;
	background-image: linear-gradient(rgba(24, 24, 24, 0), rgba(24, 24, 24, 0.5)),
		url(${(props) => props.$bgPhoto});
	background-size: cover;
`;
const Title = styled.h2`
	margin-bottom: 20px;
	width: 30%;
	font-family: 'Bebas Neue', cursive;
	font-size: 100px;
	font-style: oblique;
`;
const Buttons = styled.div`
	display: flex;
	gap: 20px;
`;
const Button = styled.button`
	display: flex;
	align-items: center;
	gap: 10px;
	margin-bottom: 40px;
	padding: 12px 30px;
	border: none;
	border-radius: 6px;
	font-size: 22px;
	font-weight: 500;
	background-color: rgba(255, 255, 255, 0.9);
	:hover {
		background-color: rgba(255, 255, 255, 0.7);
	}
	i {
		font-weight: 900;
		font-size: 32px;
	}
	&.lightBtn {
		color: ${(props) => props.theme.white.darker};
		background-color: rgba(109, 109, 110, 0.7);
		:hover {
			background-color: rgba(109, 109, 110, 0.4);
		}
	}
`;
const Overview = styled.p`
	font-size: 20px;
	width: 34%;
`;
// Slide
const Slider = styled.div`
	position: relative;
	top: -100px;
`;
const Row = styled(motion.div)`
	position: absolute;
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	gap: 10px;
	width: 100%;
	padding: 0 60px;
`;
const Box = styled(motion.div)<{$bgPhoto: string}>`
	height: 163px;
	border-radius: 6px;
	background-image: url(${(props) => props.$bgPhoto});
	background-size: cover;
	background-position: center;
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

const offset = 6;
function Home() {
	const {data, isLoading} = useQuery<IGetMoviesResult>(
		['movies', 'nowPlaying'],
		getMovies
	);
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
	return (
		<Wrapper>
			{isLoading ? <Loader>Loading...</Loader> : null}
			<>
				<Banner
					onClick={moveNext}
					$bgPhoto={makeImagePath(data?.results[0].backdrop_path || '')}>
					<Title>{data?.results[0].title}</Title>
					<Buttons>
						<Button>
							<svg
								width="26"
								height="26"
								viewBox="0 0 24 24"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z"
									fill="currentColor"></path>
							</svg>
							Play
						</Button>
						<Button className="lightBtn">
							<svg
								width="26"
								height="26"
								viewBox="0 0 24 24"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg">
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM13 10V18H11V10H13ZM12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z"
									fill="currentColor"></path>
							</svg>
							More Info
						</Button>
					</Buttons>
					<Overview>{data?.results[0].overview}</Overview>
				</Banner>
				<Slider>
					<AnimatePresence initial={false} onExitComplete={toggleLeaving}>
						<Row
							variants={rowVariants}
							initial="hidden"
							animate="visible"
							exit="exit"
							transition={{type: 'tween', duration: 1}}
							key={index}>
							{data?.results
								.slice(1)
								.slice(offset * index, offset * index + offset)
								.map((movie) => (
									<Box
										key={movie.id}
										$bgPhoto={makeImagePath(movie.backdrop_path, 'w500')}></Box>
								))}
						</Row>
					</AnimatePresence>
				</Slider>
			</>
		</Wrapper>
	);
}

export default Home;
