import { Button, Result } from 'antd';

import React from 'react';
import Container from './Container';

const errorMessage = {
	404: 'Not Found',
	500: 'Internal Server Error',
};

const ErrorPage = ({ code = 404 }) => (
	<Container>
		<Result
			status={code}
			title={code}
			subTitle={errorMessage[code]}
			extra={
				<Button appearance="link" onClick={() => window.history.back()}>
					Kembali
				</Button>
			}
		/>
	</Container>
);

export default ErrorPage;
