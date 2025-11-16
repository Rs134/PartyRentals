import "../App.css";
import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch(
        "https://reazpartyrentals-backend.onrender.com/api/contact/send",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData), // ⭐ Only send the fields needed
        }
      );

      if (response.ok) {
        setStatus("✅ Message sent successfully!");
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          message: "",
        });
      } else {
        setStatus("❌ Failed to send message.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("⚠️ Unable to reach server.");
    }
  };

  return (
    <section id="Contact">
      <div className="contact-container">

        {/* Social section */}
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

        {/* Contact Form */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            required
            value={formData.firstname}
            onChange={handleChange}
          />

          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            required
            value={formData.lastname}
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
