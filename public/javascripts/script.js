document.addEventListener("DOMContentLoaded", function () {

  const sloganText = "Rent The Magic, Cherish The Moment!";
  let index = 0;
  const sloganElement = document.getElementById("slogan-text");

  function typeSlogan() {
      if (index < sloganText.length) {
          sloganElement.textContent += sloganText.charAt(index);
          index++;
          setTimeout(typeSlogan, 200); 
      }
  }

  if (sloganElement) {
      typeSlogan();
  } else {
      console.error("Slogan element not found!");
  }


  const catalogItems = [
      { imgSrc: "/images/chairs.jpg", description: "White foldable chairs" },
      { imgSrc: "/images/whitechaircover.jpg", description: "White chair cover" },
      { imgSrc: "/images/tables.jpg", description: "6ft long rectangle tables" },
      { imgSrc: "/images/cocktail.jpg", description: "30 inch cocktail table with adjusted poles" },
      { imgSrc: "/images/cocktailblackcover.jpg", description: "Black cocktail cover" },
      { imgSrc: "/images/cocktailwhitecover.jpg", description: "White cocktail cover" },
      { imgSrc: "/images/roundtables.jpg", description: "48 inch foldable table " },
      { imgSrc: "/images/chafer.jpg", description: "Chafer Dish" },
      { imgSrc: "/images/globelights.jpg", description: "White LED globe string lights" },
      { imgSrc: "/images/6arm.jpg", description: "LED 6 arm silver chandelier (available with 8 arms)" },
      { imgSrc: "/images/10arm.jpg", description: "LED 10 arm gold chandelier" },
      { imgSrc: "/images/ledbars.jpg", description: "LED modern light bar" },
      { imgSrc: "/images/IMG_3416.jpg", description: "Traditional 20x20 tent with window sidewalls and sleeveless foots", isTent: true },
      { imgSrc: "/images/IMG_1594.jpg", description: "Traditional 20x30 tent with sleeveless foots", isTent: true },
      { imgSrc: "/images/IMG_1671.jpg", description: "Traditional 15x30 tent with sleeveless foots and 10 arm gold chandelier", isTent: true },
      { imgSrc: "/images/IMG_3634.jpg", description: "Traditional 15x30 tent with foot sleeves", isTent: true },
      { imgSrc: "/images/IMG_5957.jpg", description: "Traditional 20x40 tent with foot sleeves", isTent: true }
  ];

  const catalogGrid = document.getElementById("catalogGrid");

  if (!catalogGrid) {
    console.error("Catalog grid not found!");
  } else {
    catalogItems.forEach(item => {
      const catalogItem = document.createElement("div");
      catalogItem.classList.add("catalog-item");

      if (item.isTent) {
          catalogItem.classList.add("tent-item");
      }

      const img = document.createElement("img");
      img.src = item.imgSrc;
      img.alt = item.description;
      catalogItem.appendChild(img);

      const description = document.createElement("p");
      description.textContent = item.description;
      catalogItem.appendChild(description);

      catalogGrid.appendChild(catalogItem);
    });

    console.log("Catalog items successfully added.");
  }

  const sliderImages = [
    "/images/IMG_0808.jpeg",
    "/images/IMG_1483.JPG",
    "/images/IMG_68953.JPG",
    "/images/IMG_1609.jpg",
    "/images/IMG_7080.jpg",
    "/images/IMG_8491.jpg",
    "/images/IMG_1666.jpg"
  ];

  const sliderElement = document.querySelector('.slider1 img');

  if (!sliderElement) {
    console.error("Slider 1 element not found!");
  } else {
    let sliderIndex = 0;

    const updateSlider = () => {
      sliderElement.src = sliderImages[sliderIndex];
    };

    setInterval(() => {
      sliderIndex = (sliderIndex + 1) % sliderImages.length;
      updateSlider();
    }, 2000);
  }

  const slider2Images = [
    "/images/IMG_52162.jpg",
    "/images/IMG_7017.jpg",
    "/images/IMG_1741.jpg",
    "/images/IMG_020.jpg",
    "/images/IMG_2214.JPG"
  ];

  const sliderElement2 = document.querySelector('.slider2 img');

  if (!sliderElement2) {
    console.error("Slider 2 element not found!");
  } else {
    let slider2Index = 0;

    const updateSlider2 = () => {
      sliderElement2.src = slider2Images[slider2Index];
    };

    setInterval(() => {
      slider2Index = (slider2Index + 1) % slider2Images.length;
      updateSlider2();
    }, 2000);
  }
  
});

window.addEventListener('load', () => {
  if (window.location.hash === '#requestquote') {
    const section = document.getElementById('requestquote');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
});

