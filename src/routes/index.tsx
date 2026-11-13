import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({ component: Home });

function Home() {
    return (
        <main className='mx-auto w-full max-w-5xl flex-1 px-4 py-16'>
            <h1 className='text-3xl font-semibold tracking-tight'>Home</h1>
        </main>
    );
}
