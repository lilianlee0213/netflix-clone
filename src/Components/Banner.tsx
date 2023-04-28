import styled from 'styled-components';
import {PlayBtn} from '../commonstyles';
import {makeImagePath} from '../utils';
import {ISlider} from './Slide';
import {useNavigate} from 'react-router-dom';

const Wrapper = styled.div<{$bgPhoto: string}>`
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 100vh;
	padding: 60px;
	background-image: linear-gradient(
			to bottom,
			rgba(24, 24, 24, 0),
			rgba(24, 24, 24, 0.2),
			rgba(24, 24, 24, 0.5),
			rgba(24, 24, 24, 0.7),
			rgba(24, 24, 24, 0.9)
		),
		url(${(props) => props.$bgPhoto});
	background-size: cover;
`;
const Title = styled.h2`
	margin-bottom: 20px;
	width: 40%;
	font-family: 'Bangers', cursive;
	font-size: 100px;
	letter-spacing: 5px;
`;
const BannerBtns = styled.div`
	display: flex;
	gap: 20px;
	margin-bottom: 40px;
`;
const BannerBtn = styled.button`
	${PlayBtn}
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
export default function Banner({mediaType, data}: ISlider) {
	const navigate = useNavigate();
	const onInfoClicked = (id: number) => {
		navigate(`/${mediaType}/${id}`);
	};
	return (
		<Wrapper $bgPhoto={makeImagePath(data?.results[0].backdrop_path || '')}>
			<Title>
				{data?.results[0].title
					? data?.results[0].title
					: data?.results[0].name}
			</Title>
			<BannerBtns>
				<BannerBtn className="playBtn">
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
				<BannerBtn
					className="lightBtn"
					onClick={() => onInfoClicked(data?.results[0].id as number)}>
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
			<Overview>{data?.results[0].overview}</Overview>
		</Wrapper>
	);
}
