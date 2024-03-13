import React, { Suspense, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { getAccount } from './js/data/account.js'

const Loader = React.lazy(() => import('./components/Loader/Loader'))
const Signin = React.lazy(() => import('./pages/Signin/Signin'))
const Chat = React.lazy(() => import('./pages/Chat/Chat'))

function App() {
  const [hasAccount, setHasAccount] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    async function hasAccount() {
      const localData = localStorage.getItem('webAI') || false
      const dbAccount = (await getAccount()) || false

      setHasAccount(localData && dbAccount)
      setLoaded(true)
    }
    hasAccount()
  }, [])

  if (!loaded) return <Loader size="100px">Checking your account</Loader>

  return (
    <>
      <Suspense fallback={<Loader size="100px">Loading pages</Loader>}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={hasAccount ? <Chat /> : <Signin />} />
            <Route
              path="/signin"
              element={!hasAccount ? <Signin /> : <Navigate to="/chat" />}
            />
            <Route
              path="/chat"
              element={hasAccount ? <Chat /> : <Navigate to="/signin" />}
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </>
  )
}

export default App
