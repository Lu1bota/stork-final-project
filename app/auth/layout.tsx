import React from 'react';
import { AuthTheme } from '@/components/ThemeProvider/ThemeProvider';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	return <AuthTheme>{children}</AuthTheme>;
}


