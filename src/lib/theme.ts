export type ThemeMode = 'light' | 'dark' | 'auto';

const STORAGE_KEY = 'theme';

// Runs in <head> before the first paint. It must stay in step with applyThemeMode.
export const THEME_INIT_SCRIPT = `try{const m=localStorage.getItem('${STORAGE_KEY}');if(m==='light'||m==='dark')document.documentElement.classList.add(m)}catch{}`;

export function readStoredMode(): ThemeMode {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === 'light' || stored === 'dark' ? stored : 'auto';
}

export function storeMode(mode: ThemeMode) {
    window.localStorage.setItem(STORAGE_KEY, mode);
}

// 'auto' sets no class: the stylesheet then follows the system color scheme.
export function applyThemeMode(mode: ThemeMode) {
    const { classList } = document.documentElement;
    classList.toggle('light', mode === 'light');
    classList.toggle('dark', mode === 'dark');
}
