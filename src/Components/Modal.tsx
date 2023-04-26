import {useQuery} from 'react-query';
import styled from 'styled-components';
import {IDetails, getDetails} from '../api';
import {makeImagePath, netflixLogoUrl} from '../utils';
import {IconBtn, PlayBtn} from '../commonstyles';
import {theme} from '../theme';

const Modal = styled.div`
	position: fixed;
	width: 45vw;
	height: 90vh;
	top: 40px;
	left: 0;
	margin: 0 auto;
	right: 0;
	border-radius: 6px;
	background-color: ${(props) => props.theme.black.lighter};
	z-index: 3;
	box-shadow: 3px 3px 10px 3px rgba(0, 0, 0, 0.5);
`;
const ModalImg = styled.div<{$bgPhoto: string}>`
	position: relative;
	border-top-right-radius: 6px;
	border-top-left-radius: 6px;
	width: 100%;
	height: 55%;
	background-position: center center;
	background-size: cover;
	background-image: linear-gradient(
			to bottom,
			rgba(20, 20, 20, 0),
			rgba(20, 20, 20, 0.2),
			rgba(20, 20, 20, 0.4),
			rgba(20, 20, 20, 0.6),
			rgba(20, 20, 20, 0.8),
			rgba(20, 20, 20, 0.99)
		),
		url(${(props) => props.$bgPhoto});
`;

const Title = styled.h2`
	position: absolute;
	bottom: 480px;
	left: 30px;
	max-width: 60%;
	font-family: 'Bangers', cursive;
	font-size: 60px;
	line-height: 1.2em;
	letter-spacing: 5px;
	margin-bottom: 12px;
`;
const Buttons = styled.div`
	position: absolute;
	left: 30px;
	bottom: 430px;
	display: flex;
	align-items: center;
	gap: 20px;
`;
const Button = styled.button`
	${PlayBtn}
`;
const Icon = styled.button`
	${IconBtn}
	scale: 1.4;
`;
const Info = styled.div`
	padding: 25px 30px;
	.date {
		margin-right: 8px;
		color: ${(props) => props.theme.green};
	}
	.genre {
		margin-bottom: 10px;
		font-size: 12px;
	}
	.overview {
		font-size: 14px;
		line-height: 2;
	}
	.moreInfo {
		position: absolute;
		bottom: 25px;
		font-size: 12px;
		line-height: 2;
		h3 {
			font-size: 20px;
			color: ${(props) => props.theme.white.lighter};
			margin-bottom: 5px;
			span {
				font-weight: 600;
				color: ${(props) => props.theme.white.darker};
			}
		}
		span {
			color: ${(props) => props.theme.green};
		}
	}
`;
interface IModal {
	movieId: string;
	data?: IDetails;
}
export default function Modals({movieId}: IModal) {
	const {data: details} = useQuery<IDetails>([movieId], () =>
		getDetails(movieId)
	);
	return (
		<Modal>
			<ModalImg
				$bgPhoto={
					details?.backdrop_path
						? makeImagePath(details?.backdrop_path + '')
						: netflixLogoUrl
				}
			/>
			<Title>{details?.title}</Title>
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
				<Icon>
					<i className="fa-solid fa-plus"></i>
				</Icon>
				<Icon>
					<i className="fa-regular fa-thumbs-up"></i>
				</Icon>
			</Buttons>
			<Info>
				<div>
					<div style={{marginBottom: '10px'}}>
						<span className="date">{details?.release_date}</span>
						<span>
							{Math.floor(Number(details?.runtime) / 60)}hr{' '}
							{Number(details?.runtime) % 60}min
						</span>
					</div>
					<p className="genre">{details?.genres.map((i) => i.name + ' ')}</p>
					<p className="overview">{details?.overview}</p>
				</div>
				<div className="moreInfo">
					<h3>
						About <span>{details?.title}</span>
					</h3>
					<p>
						<span>Rating: </span>
						{Number(details?.vote_average).toFixed(1)} / 10
					</p>
					<p>
						<span>Status: </span>
						{details?.status}
					</p>
					<p>
						<span>Homepage: </span>
						{details?.homepage ? (
							<a href={details.homepage}>{details.homepage}</a>
						) : (
							<a href="https://www.themoviedb.org">
								https://www.themoviedb.org
							</a>
						)}
					</p>
				</div>
			</Info>
		</Modal>
	);
}
