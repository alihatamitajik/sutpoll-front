import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {ThemeProvider, createTheme} from '@mui/material/styles'

import { AuthProvider } from './contexts/AuthProvider';
import {LocalizationProvider} from "@mui/x-date-pickers";
import AdapterJalaali from '@date-io/jalaali';

const THEME = createTheme(
    {
        typography: {
            fontFamily: "var(--font)"
        }
    }
);

createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
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
    // </React.StrictMode>
);
