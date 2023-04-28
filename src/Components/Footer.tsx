import styled from 'styled-components';

const Copyright = styled.div`
	font-size: 14px;
	text-align: center;
	padding-bottom: 50px;
`;
export default function Footer() {
	return (
		<Copyright>
			&copy; {`${new Date().getFullYear()}. Netflix Clone All rights reserved`}
		</Copyright>
	);
}
