import {css} from 'styled-components';

export const PlayBtn = css`
	display: flex;
	align-items: center;
	gap: 10px;
	border-radius: 6px;
	font-size: 22px;
	font-weight: 500;
	background-color: rgba(255, 255, 255, 0.9);
	&:hover {
		background-color: rgba(255, 255, 255, 0.7);
	}
	i {
		font-weight: 900;
		font-size: 32px;
	}
`;
export const IconBtn = css`
	margin-right: 5px;
	width: 35px;
	height: 35px;
	vertical-align: middle;
	border: 1px solid rgba(255, 255, 255, 0.5);
	border-radius: 50%;
	background-color: transparent;
	&:hover {
		border-color: white;
	}
	i {
		font-size: 18px;
		color: white;
	}
	svg {
		vertical-align: middle;
	}
`;

export const Bubble = css`
	position: absolute;
	background: ${(props) => props.theme.white.darker};
	top: -35px;
	border-radius: 0.4em;
	color: ${(props) => props.theme.black.darker};
	font-size: 12px;
	padding: 8px;
	font-weight: 700;
`;
