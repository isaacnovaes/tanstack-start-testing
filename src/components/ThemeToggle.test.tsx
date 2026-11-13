import { beforeEach, expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import ThemeToggle from '@/components/ThemeToggle';
import '@/styles.css';

const getAppliedScheme = () => getComputedStyle(document.documentElement).colorScheme;
const getStoredMode = () => window.localStorage.getItem('theme');

beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.classList.remove('light', 'dark');
});

test('each click applies the next mode and stores it', async () => {
    const screen = await render(<ThemeToggle />);
    const toggle = screen.getByRole('button');

    await toggle.click();
    expect(getStoredMode()).toBe('light');
    expect(getAppliedScheme()).toBe('light');

    await toggle.click();
    expect(getStoredMode()).toBe('dark');
    expect(getAppliedScheme()).toBe('dark');

    await toggle.click();
    expect(getStoredMode()).toBe('auto');
    expect(getAppliedScheme()).toBe('light dark');
});

test('applies the stored mode when it mounts', async () => {
    window.localStorage.setItem('theme', 'dark');

    await render(<ThemeToggle />);

    await expect.poll(getAppliedScheme).toBe('dark');
});
