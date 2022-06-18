import React from 'react'
import ReactDOM from 'react-dom'

import '@/presentation/styles/global.scss'
import Router from '@/presentation/components/router/Router'

import { makeLogin } from '@/main/factories/pages/login/LoginFactory'

ReactDOM.render(
    <Router MakeLogin={makeLogin} />,
    document.getElementById('main')
)
