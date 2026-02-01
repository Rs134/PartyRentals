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

  const rentalItems = [
    { name: "White Folding Chairs", key: "chairsqty" },
    { name: "White Chair Covers", key: "whitechaircoversqty" },
    { name: "Cocktail Tables", key: "cocktailqty" },
    { name: "Black Cocktail Table Covers", key: "blackcocktailcoversqty" },
    { name: "White Cocktail Table Covers", key: "whitecocktailcoversqty" },
    { name: "Round Tables", key: "roundtablesqty" },
    { name: "Rectangle Tables", key: "rectangleqty" },
    { name: "6 Arm Silver Chandelier", key: "sixarmsilverchandelier" },
    { name: "8 Arm Silver Chandelier", key: "eightarmsilverchandelier" },
    { name: "10 Arm Gold Chandelier", key: "tenarmgoldchandelier" },
    { name: "Chafers", key: "chaferqty" },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let rentalItemsList = "";
    rentalItems.forEach((item) => {
      const qty = formData[item.key];
      if (qty && qty > 0) {
        rentalItemsList += `${item.name}: ${qty}\n`;
      }
    });

    const formDataToSend = new FormData();
    formDataToSend.append("access_key", "65ae3cf4-6a2a-434d-9e47-0400e03d49e7");
    formDataToSend.append("subject", "New Quote Request from Reaz Party Rentals");
    formDataToSend.append("name", `${formData.firstname} ${formData.lastname}`);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    
    const message = `
      EVENT DETAILS:
      --------------
      Address: ${formData.address}
      Setup Date: ${formData.setup}
      Pickup Date: ${formData.pickup}

      RENTAL ITEMS:
      -------------
      ${rentalItemsList || "None selected"}

      TENT SIZES:
      -----------
      ${formData.tents || "None"}

      ADDITIONAL DETAILS:
      -------------------
      ${formData.extra || "None"}
          `;

    formDataToSend.append("message", message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        alert("Success! Your quote request has been sent.");
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
        setStatus("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error sending quote request:", error);
      setStatus("Something went wrong. Please try again.");
    }
  };

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
                required
                value={formData.firstname}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Last Name:</label>
              <input
                type="text"
                name="lastname"
                required
                value={formData.lastname}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Phone Number:</label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Event Address:</label>
            <input
              type="text"
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className={styles.rowFlex}>
            <div className={styles.formGroup}>
              <label>Setup Date:</label>
              <input
                type="date"
                name="setup"
                required
                value={formData.setup}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Pickup Date:</label>
              <input
                type="date"
                name="pickup"
                required
                value={formData.pickup}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.itemsGrid}>
            {rentalItems.map((item, index) => (
              <div className={styles.itemRow} key={index}>
                <label>{item.name}:</label>
                <input
                  type="number"
                  min="0"
                  name={item.key}
                  value={formData[item.key] || ""}
                  onChange={handleChange}
                />
              </div>
            ))}
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

          <button 
            type="submit" 
            className={styles.quoteSubmit}
            disabled={status === "Sending..."}
          >
            {status === "Sending..." ? "Sending..." : "Submit"}
          </button>

          {status && status !== "Sending..." && (
            <p className={styles.statusMessage}>{status}</p>
          )}
        </form>
      </div>
    </section>
  );
}

export default QuoteForm;