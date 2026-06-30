'use client';

import { Button, Result } from 'antd';
import Container from './Container';

const errorMessage: Record<number, string> = {
    404: 'Not Found',
    500: 'Internal Server Error',
};

interface ErrorPageProps {
    code?: number;
}

export default function ErrorPage({ code = 404 }: ErrorPageProps) {
    return (
        <Container>
            <Result
                status={code as never}
                title={code}
                subTitle={errorMessage[code]}
                extra={
                    <Button type="link" onClick={() => window.history.back()}>
                        Kembali
                    </Button>
                }
            />
        </Container>
    );
}
