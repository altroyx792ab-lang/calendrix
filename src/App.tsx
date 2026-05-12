/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Home from './pages/Home';
import Calendar from './pages/Calendar';
import Events from './pages/Events';
import MoonPhases from './pages/MoonPhases';
import WorldClock from './pages/WorldClock';
import Countdown from './pages/Countdown';
import AgeCalculator from './pages/AgeCalculator';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import About from './pages/About';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Admin from './pages/Admin';
import AuthPage from './pages/Auth';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/events" element={<Events />} />
          <Route path="/moon-phases" element={<MoonPhases />} />
          <Route path="/world-clock" element={<WorldClock />} />
          <Route path="/countdown" element={<Countdown />} />
          <Route path="/age-calculator" element={<AgeCalculator />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/auth" element={<AuthPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
