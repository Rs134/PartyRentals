import Header from "./Header";
import About from "./About";
import Video from "./Video";
import Services from "./Services";
import Catalog from "./Catalog";
import Testimonials from "./Testimonials";
import Contact from "./Contact";
import Footer from "./Footer";
import Slider from "./Slider";

// Slider 1 Images
const slider1Images = [
  "/images/IMG_0808.jpeg",
  "/images/IMG_1483.jpg",
  "/images/IMG_68953.JPG",
  "/images/IMG_1609.jpg",
  "/images/IMG_7080.jpg",
  "/images/IMG_8491.jpg",
  "/images/IMG_1666.jpg",
];

// Slider 2 Images
const slider2Images = [
  "/images/IMG_52162.jpg",
  "/images/IMG_7017.jpg",
  "/images/IMG_1741.jpg",
  "/images/IMG_2214.JPG",
  "/images/IMG_0808.jpeg",
];

function Home() {
  return (
    <>
      <About />
      <Video />
      <Services />

      {/* Slider 1 */}
      <Slider images={slider1Images} className="slider1" />

      <Catalog />

      {/* Slider 2 */}
      <Slider images={slider2Images} className="slider2" />

      <Testimonials />
      <Contact />
    </>
  );
}

export default Home;
