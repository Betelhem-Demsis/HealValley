"use client";
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Training from '@/sections/Training';
import Testimony from '@/sections/Testimony';
import Ourapp from '@/sections/Ourapp';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const currentPath = '/';
export default function Home() {
  return (
    <div>
      <NavBar currentPath={currentPath}/>
      <Hero />
      <About />
      <Training />
      <Testimony />
      <Ourapp />
      <Footer />
    </div>
  );
}
