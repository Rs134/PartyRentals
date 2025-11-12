import { useState } from "react";
import styles from "../catalogpage.module.css";

function QuoteForm() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    setup: "",
    pickup: "",
    tents: "",
    extra: "",
    chairsqty: "",
    whitechaircoversqty: "",
    cocktailqty: "",
    blackcocktailcoversqty: "",
    whitecocktailcoversqty: "",
    roundtablesqty: "",
    rectangleqty: "",
    sixarmsilverchandelier: "",
    eightarmsilverchandelier: "",
    tenarmgoldchandelier: "",
    chaferqty: "",
  });

  const [status, setStatus] = useState("");

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch("https://reazpartyrentals-backend.onrender.com/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("✅ Quote request sent successfully!");
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          address: "",
          setup: "",
          pickup: "",
          tents: "",
          extra: "",
          chairsqty: "",
          whitechaircoversqty: "",
          cocktailqty: "",
          blackcocktailcoversqty: "",
          whitecocktailcoversqty: "",
          roundtablesqty: "",
          rectangleqty: "",
          sixarmsilverchandelier: "",
          eightarmsilverchandelier: "",
          tenarmgoldchandelier: "",
          chaferqty: "",
        });
      } else {
        setStatus("❌ Failed to send. Please try again.");
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("⚠️ Network error. Please try again later.");
    }
  };

  const rentalItems = [
    "White Folding Chairs",
    "White Chair Covers",
    "Cocktail Tables",
    "Black Cocktail Table Covers",
    "White Cocktail Table Covers",
    "Round Tables",
    "Rectangle Tables",
    "6 Arm Silver Chandelier",
    "8 Arm Silver Chandelier",
    "10 Arm Gold Chandelier",
    "Chafers",
  ];

  return (
    <section className={styles.requestQuote} id="requestquote">
      <div className={styles.quoteContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.formHeader}>Request A Quote</h2>

          <div className={styles.rowFlex}>
            <div className={styles.formGroup}>
              <label>First Name:</label>
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Last Name:</label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Phone Number:</label>
            <input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Event Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.rowFlex}>
            <div className={styles.formGroup}>
              <label>Setup Date:</label>
              <input
                type="date"
                name="setup"
                value={formData.setup}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Pickup Date:</label>
              <input
                type="date"
                name="pickup"
                value={formData.pickup}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.itemsGrid}>
            {rentalItems.map((item, index) => {
              const key = item.toLowerCase().replace(/ /g, "");
              return (
                <div className={styles.itemRow} key={index}>
                  <label>{item}:</label>
                  <input
                    type="number"
                    min="0"
                    name={key}
                    value={formData[key] || ""}
                    onChange={handleChange}
                  />
                </div>
              );
            })}
          </div>

          <div className={styles.formGroup}>
            <label>Tent Sizes (Ex: 10x20, 20x20, etc):</label>
            <input
              type="text"
              name="tents"
              value={formData.tents}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Additional Details or Requests:</label>
            <textarea
              name="extra"
              rows="4"
              value={formData.extra}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className={styles.quoteSubmit}>
            Submit
          </button>

          {status && <p className={styles.statusMessage}>{status}</p>}
        </form>
      </div>
    </section>
  );
}

export default QuoteForm;
