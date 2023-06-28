import {useQuery} from 'react-query';
import styled from 'styled-components';
import {IDetails, getDetails} from '../api';
import {makeImagePath, netflixLogoUrl} from '../utils';
import {IconBtn, PlayBtn} from '../commonstyles';
import {IScreen} from '../App';

interface IModalProps extends IModal, IScreen {
	// No additional props needed
}
interface IModal {
	mediaType: string;
	id: string;
	data?: IDetails;
}
const Modal = styled.div`
	position: fixed;
	width: 80vw;
	max-width: 700px;
	height: 80vh;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	border-radius: 6px;
	background-color: ${(props) => props.theme.black.lighter};
	z-index: 3;
	box-shadow: 3px 3px 10px 3px rgba(0, 0, 0, 0.5);
	overflow-y: auto;
	&.mobile-modal {
		height: 55vh;
	}
	&.tablet-modal {
		height: 65vh;
	}
`;
const ModalTopWrapper = styled.div`
	position: relative;
	width: 100%;
	height: 55%;
`;
const ModalImg = styled.div<{$bgPhoto: string}>`
	border-top-right-radius: 6px;
	border-top-left-radius: 6px;
	width: 100%;
	height: 100%;
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
	top: 50%;
	left: 0;
	transform: translateY(-50%);
	margin-left: 20px;
	max-width: 87%;
	font-family: 'Bangers', cursive;
	font-size: 40px;
	letter-spacing: 5px;
	&.mobile-title {
		font-size: 30px;
	}
	&.tablet-title {
		font-size: 5vw;
	}
`;
const Buttons = styled.div`
	position: absolute;
	left: 0;
	bottom: 0;
	display: flex;
	align-items: center;
	gap: 20px;
	margin-left: 20px;
	margin-bottom: 20px;
`;
const Button = styled.button`
	${PlayBtn}
	padding: 12px 30px;
	&.mobile-tablet-btn {
		font-size: 16px;
		padding: 8px 20px;
	}
`;
const Icon = styled.button`
	${IconBtn}
	width: 30px;
	height: 30px;
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
		margin-bottom: 50px;
	}
	.moreInfo {
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

export default function Modals({
	mediaType,
	id,
	isMobile,
	isTablet,
	isDesktop,
}: IModalProps) {
	const {data: details} = useQuery<IDetails>([id], () =>
		getDetails(mediaType, id)
	);
	return (
		<Modal
			className={isMobile ? 'mobile-modal' : isTablet ? 'tablet-modal' : ''}>
			<ModalTopWrapper>
				<ModalImg
					$bgPhoto={
						details?.backdrop_path
							? makeImagePath(details?.backdrop_path + '')
							: netflixLogoUrl
					}
				/>
				<Title
					className={
						isMobile ? 'mobile-title' : isTablet ? 'tablet-title' : ''
					}>
					{details?.title ? details?.title : details?.name}
				</Title>
				<Buttons>
					<Button className={!isDesktop ? 'mobile-tablet-btn' : ''}>
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
			</ModalTopWrapper>

			<Info>
				<div>
					<div style={{marginBottom: '10px'}}>
						<span className="date">
							{details?.release_date
								? details?.release_date
								: details?.last_air_date}
						</span>
						<span>
							{details?.runtime
								? `${Math.floor(Number(details?.runtime) / 60)} hr ${
										Number(details?.runtime) % 60
								  } min`
								: `Season ${details?.number_of_seasons} `}
						</span>
					</div>
					<p className="genre">{details?.genres.map((i) => i.name + ' ')}</p>
					<p
						className="overview"
						style={{display: isMobile ? 'none' : 'block'}}>
						{details?.overview ? details?.overview : 'No Overview'}
					</p>
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
