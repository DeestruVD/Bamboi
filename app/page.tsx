import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Expertise from '@/components/Expertise'
import Gallery from '@/components/Gallery'
import Configurator from '@/components/Configurator'
import Process from '@/components/Process'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Expertise />
      <Gallery />
      <Configurator />
      <Process />
      <Contact />
      <Footer />
    </main>
  )
}
