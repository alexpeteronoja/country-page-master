import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CountryRanking from './pages/CountryRanking';
import CountryDetail from './pages/CountryDetail';

function App() {
  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<CountryRanking />} />
            <Route path="/country/:countryCode" element={<CountryDetail />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
