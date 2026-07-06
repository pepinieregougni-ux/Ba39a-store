import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import Footer from './components/Footer';
import { supabase } from '../supabase'; 

export default async function Home() {
  const { data: products } = await supabase.from('products').select('*');

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Products products={products || []} />
      <Footer />
    </main>
  );
}