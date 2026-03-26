import { useState } from "react";
import styles from "../catalogpage.module.css";

const initialState = {
  firstname: "", lastname: "", email: "", phone: "",
  address: "", setup: "", pickup: "", tents: "", extra: "",
  chairsqty: "", whitechaircoversqty: "", cocktailqty: "",
  blackcocktailcoversqty: "", whitecocktailcoversqty: "",
  roundtablesqty: "", rectangleqty: "", sixarmsilverchandelier: "",
  eightarmsilverchandelier: "", tenarmgoldchandelier: "", chaferqty: "",
};

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

const Field = ({ label, name, type = "text", required = false, formData, handleChange }) => (
  <div className={styles.formGroup}>
    <label>{label}:</label>
    <input
      type={type}
      name={name}
      required={required}
      value={formData[name]}
      onChange={handleChange}
    />
  </div>
);

function QuoteForm() {
  const [formData, setFormData] = useState(initialState);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const rentalItemsList = rentalItems
      .filter((item) => formData[item.key] > 0)
      .map((item) => `${item.name}: ${formData[item.key]}`)
      .join("\n") || "None selected";

    const formDataToSend = new FormData();
    formDataToSend.append("access_key", "65ae3cf4-6a2a-434d-9e47-0400e03d49e7");
    formDataToSend.append("subject", "New Quote Request from Reaz Party Rentals");
    formDataToSend.append("name", `${formData.firstname} ${formData.lastname}`);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("message", `
      EVENT DETAILS:
      --------------
      Address: ${formData.address}
      Setup Date: ${formData.setup}
      Pickup Date: ${formData.pickup}

      RENTAL ITEMS:
      -------------
      ${rentalItemsList}

      TENT SIZES:
      -----------
      ${formData.tents || "None"}

      ADDITIONAL DETAILS:
      -------------------
      ${formData.extra || "None"}
    `);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        alert("Thank you for requesting a quote! We will get back to you shortly.");
        setFormData(initialState);
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
            <Field label="First Name" name="firstname" required formData={formData} handleChange={handleChange} />
            <Field label="Last Name" name="lastname" required formData={formData} handleChange={handleChange} />
          </div>

          <Field label="Email" name="email" type="email" required formData={formData} handleChange={handleChange} />
          <Field label="Phone Number" name="phone" type="tel" required formData={formData} handleChange={handleChange} />
          <Field label="Event Address" name="address" required formData={formData} handleChange={handleChange} />

          <div className={styles.rowFlex}>
            <Field label="Setup Date" name="setup" type="date" required formData={formData} handleChange={handleChange} />
            <Field label="Pickup Date" name="pickup" type="date" required formData={formData} handleChange={handleChange} />
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

          <Field label="Tent Sizes (Ex: 10x20, 20x20, etc)" name="tents" formData={formData} handleChange={handleChange} />

          <div className={styles.formGroup}>
            <label>Additional Details or Requests:</label>
            <textarea
              name="extra"
              rows="4"
              value={formData.extra}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className={styles.quoteSubmit}>Submit</button>

          {status && <p className={styles.statusMessage}>{status}</p>}
        </form>
      </div>
    </section>
  );
}

export default QuoteForm;