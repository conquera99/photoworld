import type { ReactNode } from 'react';

interface AdminContainerProps {
    children: ReactNode;
}

export default function AdminContainer({ children }: AdminContainerProps) {
    return <div>{children}</div>;
}
