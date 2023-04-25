import styled from 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		red: string;
		black: {
			veryDark: string;
			darker: string;
			lighter: string;
		};
		white: {
			darker: string;
			lighter: string;
		};
		green: string;
	}
}
