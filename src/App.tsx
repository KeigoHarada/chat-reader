import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './components/pages/Home'
import Chat from './components/pages/Chat'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from './theme/theme'
import { useState } from 'react'

function App() {
  const [file, setFile] = useState<File | null>(null)

  return (
    <div style={{
      backgroundColor: theme.palette.background.default
    }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<Home file={file} setFile={setFile} />} />
            <Route path="/chat" element={<Chat file={file} />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div >
  )
}

export default App
