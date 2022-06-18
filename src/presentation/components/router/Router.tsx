import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

type RouterProps = {
    MakeLogin: React.FC
}

const Router: React.FC<RouterProps> = ({ MakeLogin }) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<MakeLogin />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router
