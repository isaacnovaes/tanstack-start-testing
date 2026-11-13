import { beforeEach, expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import ThemeToggle from '#/components/ThemeToggle';

const getAppliedScheme = () => document.documentElement.style.colorScheme;
const getStoredMode = () => window.localStorage.getItem('theme');

beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute('style');
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
});

test('applies the stored mode when it mounts', async () => {
    window.localStorage.setItem('theme', 'dark');

    await render(<ThemeToggle />);

    await expect.poll(getAppliedScheme).toBe('dark');
});
