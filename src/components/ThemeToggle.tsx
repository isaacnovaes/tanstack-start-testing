import { useEffect, useState } from 'react';
import { applyThemeMode, readStoredMode, storeMode } from '@/lib/theme';
import type { ThemeMode } from '@/lib/theme';

const NEXT_MODE: Record<ThemeMode, ThemeMode> = { light: 'dark', dark: 'auto', auto: 'light' };
const MODE_TEXT: Record<ThemeMode, string> = { light: 'Light', dark: 'Dark', auto: 'Auto' };

export default function ThemeToggle() {
    const [mode, setMode] = useState<ThemeMode>('auto');

    useEffect(() => {
        const storedMode = readStoredMode();
        // The server cannot read localStorage, so the stored mode is applied after hydration.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMode(storedMode);
        applyThemeMode(storedMode);
    }, []);

    function toggleMode() {
        const nextMode = NEXT_MODE[mode];
        setMode(nextMode);
        applyThemeMode(nextMode);
        storeMode(nextMode);
    }

    const label =
        mode === 'auto'
            ? 'Theme mode: auto (system). Click to switch to light mode.'
            : `Theme mode: ${mode}. Click to switch mode.`;

    return (
        <button
            aria-label={label}
            className='hover:bg-accent rounded-md border px-3 py-1.5 text-sm font-medium'
            title={label}
            type='button'
            onClick={toggleMode}
        >
            {MODE_TEXT[mode]}
        </button>
    );
}
