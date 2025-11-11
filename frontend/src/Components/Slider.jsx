import { useEffect, useState } from "react";

function Slider({ images, className }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className={`${className}-section`}>
      <div className={`${className}-container`}>
        <div className={className}>
          <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} />
        </div>
      </div>
    </div>
  );
}

export default Slider;
