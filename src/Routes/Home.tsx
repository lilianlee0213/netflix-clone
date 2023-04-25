import {useQuery} from 'react-query';
import {
	IGenre,
	IGetMoviesResult,
	getGenres,
	getNowPlaying,
	getUpcoming,
} from '../api';
import styled from 'styled-components';
import {makeImagePath} from '../utils';
import {AnimatePresence, motion} from 'framer-motion';
import {useState} from 'react';
import {useMatch, useNavigate, useOutlet} from 'react-router-dom';
import Slide from '../Components/Slide';
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
	background-image: linear-gradient(
			to bottom,
			rgba(24, 24, 24, 0),
			rgba(24, 24, 24, 0.2),
			rgba(24, 24, 24, 0.9)
		),
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
const BannerBtns = styled.div`
	display: flex;
	gap: 20px;
`;
const BannerBtn = styled.button`
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
	margin-bottom: 250px;
`;

const Overlay = styled(motion.div)`
	position: fixed;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.8);
	opacity: 0;
`;

function Home() {
	const navigate = useNavigate();

	const bigMovieMatch = useMatch('/movies/:movieId');
	const {data: nowPlaying, isLoading} = useQuery<IGetMoviesResult>(
		['movies', 'nowPlaying'],
		getNowPlaying
	);
	const {data: upcoming, isLoading: upcomingLoading} =
		useQuery<IGetMoviesResult>(['movies', 'upcoming'], getUpcoming);
	const onOverlayClick = () => navigate('/');
	const clickedMovie =
		bigMovieMatch?.params.movieId &&
		nowPlaying?.results.find(
			(movie) => movie.id + '' === bigMovieMatch.params.movieId
		);
	return (
		<Wrapper>
			{isLoading ? <Loader>Loading...</Loader> : null}
			<>
				<Banner
					$bgPhoto={makeImagePath(nowPlaying?.results[0].backdrop_path || '')}>
					<Title>{nowPlaying?.results[0].title}</Title>
					<BannerBtns>
						<BannerBtn>
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
						</BannerBtn>
						<BannerBtn className="lightBtn">
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg">
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM13 10V18H11V10H13ZM12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z"
									fill="currentColor"></path>
							</svg>
							More Info
						</BannerBtn>
					</BannerBtns>
					<Overview>{nowPlaying?.results[0].overview}</Overview>
				</Banner>
				<Slider>
					<Slide data={nowPlaying as IGetMoviesResult} title="Now Playing" />
				</Slider>
				<Slider>
					<Slide data={upcoming as IGetMoviesResult} title="Upcoming" />
				</Slider>
				<AnimatePresence>
					{bigMovieMatch ? (
						<>
							<Overlay onClick={onOverlayClick} animate={{opacity: 1}} />
							<motion.div
								// layoutId={bigMovieMatch.params.movieId}
								style={{
									position: 'fixed',
									width: '40vw',
									height: '80vh',
									top: 100,
									left: '0',
									margin: ' 0 auto',
									right: '0',
									backgroundColor: 'black',
								}}>
								{clickedMovie && (
									<>
										<img
											src={makeImagePath(clickedMovie.backdrop_path, 'w500')}
											alt=""
										/>
										<h2>{clickedMovie.title}</h2>
										<p>{clickedMovie.overview}</p>
									</>
								)}
							</motion.div>
						</>
					) : null}
				</AnimatePresence>
			</>
		</Wrapper>
	);
}

export default Home;
