declare module 'react-cookies' {
    const cookie: {
        load(name: string): string | undefined;
        save(name: string, value: string, options?: Record<string, unknown>): void;
        remove(name: string, options?: Record<string, unknown>): void;
    };
    export default cookie;
}
