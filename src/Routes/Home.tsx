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
	height: 100vh;
	padding: 60px;
	background-image: linear-gradient(rgba(24, 24, 24, 0), rgba(24, 24, 24, 0.5)),
		url(${(props) => props.$bgPhoto});
	background-size: cover;
`;
const Title = styled.h2`
	margin-bottom: 20px;
	font-size: 48px;
`;
const Overview = styled.p`
	font-size: 30px;
	width: 50%;
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
`;
const Box = styled(motion.div)<{$bgPhoto: string}>`
	font-size: 40px;
	height: 150px;
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
