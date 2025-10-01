import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
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
  return (
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
  )
}
