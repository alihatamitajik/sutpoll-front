import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {ThemeProvider, createTheme} from '@mui/material/styles'

import { AuthProvider } from './contexts/AuthProvider';
import {LocalizationProvider} from "@mui/x-date-pickers";
import AdapterJalaali from '@date-io/jalaali';


/* RTL Mui */
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

const THEME = createTheme({
    direction: 'rtl',
    typography: {
        fontFamily: "Vazirmatn FD, sans-serif"
    }
});

const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin]
  });

createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
    <CacheProvider value={cacheRtl}>
        <LocalizationProvider dateAdapter={AdapterJalaali}>
            <ThemeProvider theme={THEME}>
                <BrowserRouter>
                    <AuthProvider>
                        <Routes>
                            <Route path='/*' element={<App />} />
                        </Routes>
                    </AuthProvider>
                </BrowserRouter>
            </ThemeProvider>
        </LocalizationProvider>
    </CacheProvider>
    // </React.StrictMode>
);
