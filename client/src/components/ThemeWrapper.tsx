// client/src/components/ThemeWrapper.tsx

'use client'; // This ensures the component is only rendered on the client

import { ThemeProvider, CssBaseline } from '@mui/material';
import React from 'react';
import theme from "@/theme";

const ThemeWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};

export default ThemeWrapper;
