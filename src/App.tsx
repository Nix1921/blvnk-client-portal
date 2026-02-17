import { Routes, Route } from 'react-router-dom'
import { ClientPortal } from './pages/ClientPortal.tsx'
import { DeliverablePage } from './pages/DeliverablePage.tsx'
import { Home } from './pages/Home.tsx'
import { NotFound } from './pages/NotFound.tsx'

export default function App() {
  return (
    <Routes>
      <Route path="/c/:clientSlug" element={<ClientPortal />} />
      <Route path="/c/:clientSlug/:deliverableId" element={<DeliverablePage />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
