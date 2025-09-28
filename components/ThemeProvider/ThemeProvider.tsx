'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import styles from './ThemeProvider.module.css';

export type ThemeName = 'girl' | 'boy' | 'neutral';

type ThemeContextValue = {
	theme: ThemeName;
	setTheme: (theme: ThemeName) => void;
	setThemeByGender: (gender: 'girl' | 'boy' | 'unknown' | null | undefined) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

type ThemeProviderProps = {
	children: React.ReactNode;
	initialTheme?: ThemeName;
	persist?: boolean;
};

const STORAGE_KEY = 'app_theme';

function readStoredTheme(): ThemeName | null {
	try {
		const raw = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null;
		if (!raw) return null;
		if (raw === 'girl' || raw === 'boy' || raw === 'neutral') return raw;
		return null;
	} catch {
		return null;
	}
}

function writeStoredTheme(theme: ThemeName) {
	try {
		if (typeof window !== 'undefined') {
			window.localStorage.setItem(STORAGE_KEY, theme);
		}
	} catch {
		// ignore persistence errors
	}
}

export function ThemeProvider({ children, initialTheme = 'neutral', persist = true }: ThemeProviderProps) {
	const [theme, setThemeState] = useState<ThemeName>(() => {
		if (!persist) return initialTheme;
		return readStoredTheme() ?? initialTheme;
	});

	const setTheme = useCallback((next: ThemeName) => {
		setThemeState(next);
		if (persist) writeStoredTheme(next);
	}, [persist]);

	const setThemeByGender = useCallback((gender: 'girl' | 'boy' | 'unknown' | null | undefined) => {
		if (gender === 'girl') setTheme('girl');
		else if (gender === 'boy') setTheme('boy');
		else setTheme('neutral');
	}, [setTheme]);

	useEffect(() => {
		if (!persist) return;
		const stored = readStoredTheme();
		if (stored && stored !== theme) setThemeState(stored);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const value = useMemo<ThemeContextValue>(() => ({ theme, setTheme, setThemeByGender }), [theme, setTheme, setThemeByGender]);

	return (
		<ThemeContext.Provider value={value}>
			<div className={styles.themeRoot} data-theme={theme}>
				{children}
			</div>
		</ThemeContext.Provider>
	);
}

export function useTheme(): ThemeContextValue {
	const ctx = useContext(ThemeContext);
	if (!ctx) {
		throw new Error('useTheme must be used within ThemeProvider');
	}
	return ctx;
}

// Route-scoped convenience wrappers (optional to use)
export function AuthTheme({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider initialTheme="neutral" persist={true}>
			{children}
		</ThemeProvider>
	);
}

export function ProfileTheme({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider initialTheme="neutral" persist={true}>
			{children}
		</ThemeProvider>
	);
}


