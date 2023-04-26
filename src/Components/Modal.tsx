import {useQuery} from 'react-query';
import styled from 'styled-components';
import {IDetails, getDetails} from '../api';
import {makeImagePath, netflixLogoUrl} from '../utils';

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
			<h2>{details?.title}</h2>
			<p>{details?.adult}</p>
			<p>{details?.homepage}</p>
			<p>{details?.overview}</p>
			<p>{details?.release_date}</p>
			<p>{details?.runtime}</p>
			<p>{details?.tagline}</p>
		</Modal>
	);
}
