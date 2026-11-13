const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
    return (
        <footer className='mt-20 border-t border-[var(--line)] px-4 pt-10 pb-14 text-[var(--sea-ink-soft)]'>
            <div className='page-wrap flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left'>
                <p className='m-0 text-sm'>
                    &copy; {CURRENT_YEAR} Your name here. All rights reserved.
                </p>
                <p className='island-kicker m-0'>Built with TanStack Start</p>
            </div>
        </footer>
    );
}
