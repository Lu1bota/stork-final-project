import React from 'react';
import { ProfileTheme } from '@/components/ThemeProvider/ThemeProvider';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
	return <ProfileTheme>{children}</ProfileTheme>;
}


