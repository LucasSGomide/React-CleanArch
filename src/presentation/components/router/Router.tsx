import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { SignUp } from '@/presentation/pages'

type RouterProps = {
    MakeLogin: React.FC
}

const Router: React.FC<RouterProps> = ({ MakeLogin }) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<MakeLogin />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router
