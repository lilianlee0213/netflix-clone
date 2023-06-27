import {useQuery} from 'react-query';
import {IGetResult, getNowPlaying, getTopRated, getUpcoming} from '../api';
import styled from 'styled-components';
import {AnimatePresence, motion} from 'framer-motion';
import {useMatch, useNavigate} from 'react-router-dom';
import Slide from '../Components/Slide';
import Modals from '../Components/Modal';
import Banner from '../Components/Banner';
import {IScreen} from '../App';

const Wrapper = styled.div`
	background-color: ${(props) => props.theme.black.darker};
`;
const Loader = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 200vh;
`;

const Slider = styled.div`
	position: relative;
	top: -120px;
`;

const Overlay = styled(motion.div)`
	position: fixed;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.8);
	opacity: 0;
`;

function Home({isMobile, isTablet, isDesktop}: IScreen) {
	const {data: nowPlaying, isLoading} = useQuery<IGetResult>(
		['movies', 'nowPlaying'],
		getNowPlaying
	);
	const {data: upcoming} = useQuery<IGetResult>(
		['movies', 'upcoming'],
		getUpcoming
	);
	const {data: topRated} = useQuery<IGetResult>(
		['movies', 'topRated'],
		getTopRated
	);
	const navigate = useNavigate();
	const movieMatched = useMatch('/movie/:movieId');
	const onOverlayClick = () => navigate('/');
	return (
		<Wrapper>
			{isLoading ? <Loader>Loading...</Loader> : null}
			<>
				<Banner
					mediaType="movie"
					data={nowPlaying as IGetResult}
					title="Now Playing"
					isMobile={isMobile}
					isTablet={isTablet}
					isDesktop={isDesktop}
				/>
				<Slider>
					<>
						<Slide
							mediaType="movie"
							data={nowPlaying as IGetResult}
							title="Now Playing"
						/>
						<Slide
							mediaType="movie"
							data={upcoming as IGetResult}
							title="Upcoming"
						/>
						<Slide
							mediaType="movie"
							data={topRated as IGetResult}
							title="Top Rated"
						/>
					</>
				</Slider>
				<AnimatePresence>
					{movieMatched ? (
						<>
							<Overlay onClick={onOverlayClick} animate={{opacity: 1}} />
							<Modals
								mediaType="movie"
								id={movieMatched.params.movieId + ''}></Modals>
						</>
					) : null}
				</AnimatePresence>
			</>
		</Wrapper>
	);
}

export default Home;
