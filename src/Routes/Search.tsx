import {useLocation} from 'react-router-dom';
import {useQuery} from 'react-query';
import {IGetResult, getSearch} from '../api';
import Slide from '../Components/Slide';
import {IScreen} from '../App';
import styled from 'styled-components';

const Wrapper = styled.div``;
function Search({isMobile, isTablet, isDesktop}: IScreen) {
	const location = useLocation();
	const keyword = new URLSearchParams(location.search).get('keyword');
	const {data: searchData} = useQuery<IGetResult[]>(['search', keyword], () =>
		Promise.all([
			getSearch('movie', keyword as string),
			getSearch('tv', keyword as string),
		])
	);
	const movieData = searchData ? searchData[0] : null;
	const tvData = searchData ? searchData[1] : null;

	return (
		<Wrapper>
			<Slide
				mediaType="movie"
				title={`Movie results for: ${keyword}`}
				data={movieData as IGetResult}
				isMobile={isMobile}
				isTablet={isTablet}
				isDesktop={isDesktop}
			/>

			<Slide
				mediaType="tv"
				title={`TV results for: ${keyword}`}
				data={tvData as IGetResult}
				isMobile={isMobile}
				isTablet={isTablet}
				isDesktop={isDesktop}
			/>
		</Wrapper>
	);
}

export default Search;
