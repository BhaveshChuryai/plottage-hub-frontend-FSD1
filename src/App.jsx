import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ExplorePlots from './pages/ExplorePlots';
import PropertyDetails from './pages/PropertyDetails';
import LoginRegister from './pages/LoginRegister';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<ExplorePlots />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
