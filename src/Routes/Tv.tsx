import styled from 'styled-components';
import {IGetMoviesResult, getPopularTV} from '../api';
import {useQuery} from 'react-query';
import {AnimatePresence, motion} from 'framer-motion';
import {useMatch, useNavigate} from 'react-router-dom';
import Modals from '../Components/Modal';
import Slide from '../Components/Slide';
import Banner from '../Components/Banner';

const Wrapper = styled.div`
	background-color: ${(props) => props.theme.black.darker};
`;
const Loader = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 200vh;
`;
// Slide
const Slider = styled.div`
	position: relative;
	top: -120px;
	margin-bottom: 220px;
`;

const Overlay = styled(motion.div)`
	position: fixed;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.8);
	opacity: 0;
`;

function Tv() {
	const navigate = useNavigate();
	const {data: popular, isLoading} = useQuery<IGetMoviesResult>(
		['TVshows', 'popular'],
		getPopularTV
	);
	console.log(popular);
	const tvMatched = useMatch('/tv/:tvId');
	const onOverlayClick = () => navigate('/tv');
	return (
		<Wrapper>
			{isLoading ? <Loader>Loading...</Loader> : null}
			<>
				<Banner
					mediaType="tv"
					data={popular as IGetMoviesResult}
					title="Popular"
				/>
				<Slider>
					<Slide
						mediaType="tv"
						data={popular as IGetMoviesResult}
						title="Popular"
					/>
				</Slider>

				<AnimatePresence>
					{tvMatched ? (
						<>
							<Overlay onClick={onOverlayClick} animate={{opacity: 1}} />
							<Modals mediaType="tv" id={tvMatched.params.tvId + ''}></Modals>
						</>
					) : null}
				</AnimatePresence>
			</>
		</Wrapper>
	);
}

export default Tv;
