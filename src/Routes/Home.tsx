import {useQuery} from 'react-query';
import {IGetMoviesResult, getMovies} from '../api';
import styled from 'styled-components';
import {makeImagePath} from '../utils';
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
function Home() {
	const {data, isLoading} = useQuery<IGetMoviesResult>(
		['movies', 'nowPlaying'],
		getMovies
	);
	console.log(data);
	return (
		<Wrapper>
			{isLoading ? <Loader>Loading...</Loader> : null}
			<>
				<Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || '')}>
					<Title>{data?.results[0].title}</Title>
					<Overview>{data?.results[0].overview}</Overview>
				</Banner>
			</>
		</Wrapper>
	);
}

export default Home;
