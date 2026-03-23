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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("access_key", "65ae3cf4-6a2a-434d-9e47-0400e03d49e7");
    formDataToSend.append("name", `${formData.firstname} ${formData.lastname}`);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("message", formData.message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        alert("Success! Your message has been sent.");
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          message: "",
        });
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="Contact">
      <div className="contact-container">
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

          <button id="contact-submit" type="submit" disabled={status === "Sending..."}>
            {status === "Sending..." ? "Sending..." : "Submit"}
          </button>
        </form>

        {status && status !== "Sending..." && (
          <p className="status-message">{status}</p>
        )}
      </div>
    </section>
  );
}

export default Contact;