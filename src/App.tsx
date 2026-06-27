import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useScrollReveal } from './hooks/useScrollReveal';
import Header from './components/Header';
import Hero from './components/Hero';
import ClinicStories from './components/ClinicStories';
import About from './components/About';
import VideoSection from './components/VideoSection';
import Services from './components/Services';
import Doctors from './components/Doctors';
import Promotions from './components/Promotions';
import Advantages from './components/Advantages';
import Reviews from './components/Reviews';
import Contacts from './components/Contacts';
import Footer from './components/Footer';
import MobileCTA from './components/MobileCTA';
import ServicePage from './pages/ServicePage';

function HomePage() {
  useScrollReveal();
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <ClinicStories />
        <About />
        <VideoSection />
        <Services />
        <Doctors />
        <Promotions />
        <Advantages />
        <Reviews />
        <Contacts />
      </main>
      <Footer />
      <MobileCTA />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services/:serviceId" element={<ServicePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
