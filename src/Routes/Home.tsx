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
const Banner = styled.div<{bgPhoto: string}>`
	display: flex;
	flex-direction: column;
	height: 100vh;
	padding: 60px;
	background-image: linear-gradient(rgba(24, 24, 24, 0), rgba(24, 24, 24, 0.5)),
		url(${(props) => props.bgPhoto});
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
const Slider = styled.div`
	position: relative;
	top: -200px;
`;
const Row = styled(motion.div)`
	position: absolute;
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	gap: 10px;
	width: 100%;
`;
const Box = styled(motion.div)`
	color: red;
	font-size: 40px;
	height: 200px;
	background-color: white;
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
function Home() {
	const {data, isLoading} = useQuery<IGetMoviesResult>(
		['movies', 'nowPlaying'],
		getMovies
	);
	const [index, setIndex] = useState(0);
	const moveNext = () => setIndex((prev) => prev + 1);
	return (
		<Wrapper>
			{isLoading ? <Loader>Loading...</Loader> : null}
			<>
				<Banner
					onClick={moveNext}
					bgPhoto={makeImagePath(data?.results[0].backdrop_path || '')}>
					<Title>{data?.results[0].title}</Title>
					<Overview>{data?.results[0].overview}</Overview>
				</Banner>
				<Slider>
					<AnimatePresence>
						<Row
							variants={rowVariants}
							initial="hidden"
							animate="visible"
							exit="exit"
							transition={{type: 'tween', duration: 1}}
							key={index}>
							{[1, 2, 3, 4, 5, 6].map((i) => (
								<Box key={i}>{i}</Box>
							))}
						</Row>
					</AnimatePresence>
				</Slider>
			</>
		</Wrapper>
	);
}

export default Home;
