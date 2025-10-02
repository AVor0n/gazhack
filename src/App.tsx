import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { SplashScreen } from './components/SplashScreen'
import {
  MainMenu,
  Rating,
  LecturesList,
  Lecture,
  WorldMap,
  LevelMap,
  Level,
  Shop
} from './pages'

export const App = () => {
  const [showSplash, setShowSplash] = useState(true)

  const handleSplashComplete = () => {
    setShowSplash(false)
  }

  return (
    <>
      {showSplash ? (
        <SplashScreen onComplete={handleSplashComplete} />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<MainMenu />} />
              <Route path="rating" element={<Rating />} />
              <Route path="lectures" element={<LecturesList />} />
              <Route path="lectures/:id" element={<Lecture />} />
              <Route path="worlds" element={<WorldMap />} />
              <Route path="worlds/:worldId" element={<LevelMap />} />
              <Route path="worlds/:worldId/:levelId" element={<Level />} />
              <Route path="shop" element={<Shop />} />
            </Route>
          </Routes>
        </BrowserRouter>
      )}
    </>
  )
}
