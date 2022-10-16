import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { AuthProvider } from './contexts/AuthProvider';
import {LocalizationProvider} from "@mui/x-date-pickers";
import AdapterJalaali from '@date-io/jalaali';

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <LocalizationProvider dateAdapter={AdapterJalaali}>
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route path='/*' element={<App />} />
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </LocalizationProvider>
    </React.StrictMode>
);
