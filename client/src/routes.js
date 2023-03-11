import React from 'react'
import { Route, Routes } from "react-router-dom";
import AuthPage from './pages/AuthPage';
import CreatePage from './pages/CreatePage';
import DetailPage from './pages/DetailPage';
import LinksPage from './pages/LinksPage';

export const useRoutes = (isAuthenticated) => {   
    if (isAuthenticated) {
        return (
            <Routes>
                <Route path='/create' element={<CreatePage />} />
                <Route path='/links' element={<LinksPage />} />
                <Route path='/detail/:id' element={<DetailPage />} />
                <Route path="" element={<CreatePage />} redirect={'/create'}/>
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path='/' element={<AuthPage />} />
            <Route path="/*" element={<AuthPage />} redirect={'/'}/>
        </Routes>
    )
}