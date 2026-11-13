const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
    return (
        <footer className='border-t'>
            <p className='text-muted-foreground mx-auto max-w-5xl px-4 py-6 text-sm'>
                &copy; {CURRENT_YEAR}
            </p>
        </footer>
    );
}
