import "../App.css";
import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch("https://reazpartyrentals.onrender.com/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("✅ Thank you! Your message has been sent.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("❌ Something went wrong. Please try again.");
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("⚠️ Network error. Please try again later.");
    }
  };

  return (
    <section id="Contact">
      <div className="contact-container">
        {/* Thank You / Social Section */}
        <div className="thank-you">
          <img id="thanks-pic" src="/images/logo.png" alt="Company Logo" />

          <div className="thanks-mssg">
            <div className="thanks-box" id="thanks-box-special">
              <a
                href="https://www.instagram.com/reazpartyrentals/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/images/instagram.png" alt="Instagram" />
              </a>
            </div>

            <div className="thanks-box" id="thanks-box-special">
              <a
                href="https://www.facebook.com/ReazPartyRentals/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/images/fb.png" alt="Facebook" />
              </a>
            </div>

            <div className="thanks-box">
              <a href="tel:6469961753">
                <img src="/images/phone.png" alt="Call Us" />
              </a>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            required
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          <button id="contact-submit" type="submit">
            Submit
          </button>
        </form>

        {status && <p className="status-message">{status}</p>}
      </div>
    </section>
  );
}

export default Contact;
