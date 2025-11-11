import styles from "../catalogpage.module.css";

const catalogItems = [
  // Regular items
  { imgSrc: "/images/chairs.jpg", description: "White foldable chairs" },
  { imgSrc: "/images/whitechaircover.jpg", description: "White chair cover" },
  { imgSrc: "/images/tables.jpg", description: "6ft long rectangle tables" },
  { imgSrc: "/images/cocktail.jpg", description: "30 inch cocktail table with adjusted poles" },
  { imgSrc: "/images/cocktailblackcover.jpg", description: "Black cocktail cover" },
  { imgSrc: "/images/cocktailwhitecover.jpg", description: "White cocktail cover" },
  { imgSrc: "/images/roundtables.jpg", description: "48 inch foldable table" },
  { imgSrc: "/images/chafer.jpg", description: "Chafer Dish" },
  { imgSrc: "/images/globelights.jpg", description: "White LED globe string lights" },
  { imgSrc: "/images/6arm.jpg", description: "LED 6 arm silver chandelier (available with 8 arms)" },
  { imgSrc: "/images/10arm.jpg", description: "LED 10 arm gold chandelier" },
  { imgSrc: "/images/ledbars.jpg", description: "LED modern light bar" },

  // Tent items
  { imgSrc: "/images/IMG_3416.jpg", description: "Traditional 20x20 tent with window sidewalls and sleeveless foots", isTent: true },
  { imgSrc: "/images/IMG_1594.jpg", description: "Traditional 20x30 tent with sleeveless foots", isTent: true },
  { imgSrc: "/images/IMG_1671.jpg", description: "Traditional 15x30 tent with sleeveless foots and 10 arm gold chandelier", isTent: true },
  { imgSrc: "/images/IMG_3634.jpg", description: "Traditional 15x30 tent with foot sleeves", isTent: true },
  { imgSrc: "/images/IMG_5957.jpg", description: "Traditional 20x40 tent with foot sleeves", isTent: true },
];

function CatalogGrid() {
  const regularItems = catalogItems.filter(item => !item.isTent);
  const tentItems = catalogItems.filter(item => item.isTent);

  return (
    <>
      
      <div id="catalogGrid" className={styles.catalogGrid}>
        {/* ---- Regular Catalog Grid ---- */}
        {regularItems.map((item, index) => (
          <div key={index} className={styles.catalogItem}>
            <img src={item.imgSrc} alt={item.description} />
            <p>{item.description}</p>
          </div>
        ))}
      </div>

      <div className={`${styles.catalogGrid} ${styles.tentGrid}`}>
        {tentItems.map((item, index) => (
          <div key={index} className={`${styles.catalogItem} ${styles.tentItem}`}>
            <img src={item.imgSrc} alt={item.description} />
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default CatalogGrid;
