import { Link } from '@tanstack/react-router';
import ThemeToggle from './ThemeToggle';

export default function Header() {
    return (
        <header className='border-b'>
            <nav
                aria-label='Main'
                className='mx-auto flex max-w-5xl items-center justify-between px-4 py-3'
            >
                <Link className='text-sm font-semibold' to='/'>
                    Home
                </Link>
                <ThemeToggle />
            </nav>
        </header>
    );
}
