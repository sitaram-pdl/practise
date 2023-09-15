import LeafletMapContainer from '@/components/LeafletMapContainer';
import { postContactForm } from '@/services/ContactForm/contactForm.api';
import { useState } from 'react';

function ContactUS() {
  const [form, setForm] = useState(
    Object.freeze({
      name: '',
      email: '',
      phone: '',
      message: '',
    }),
  );

  const handleChange = (event) => {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const respomse = await postContactForm(form);
    if (respomse.status === 'success') event.target.reset();
  };
  return (
    <div className="container contact">
      <h1
        style={{ fontWeight: 700, fontFamily: 'lato, sans-serif' }}
        className="row justify-content-center mb-5 margin-auto"
      >
        Get In Touch
      </h1>

      <div className="d-flex justify-content-center ">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="col-default">
                <form onSubmit={handleSubmit}>
                  <div className="form-input mb-3">
                    <label htmlFor="name" className="mb-1 contact-label ">
                      Your Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="form-control"
                      name="name"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-input mb-3">
                    <label htmlFor="email" className="mb-1 contact-label ">
                      Your Email <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="form-control"
                      name="email"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-input mb-3">
                    <label htmlFor="phone" className="mb-1 contact-label ">
                      Your Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="form-control"
                      name="phone"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-input mb-3">
                    <label htmlFor="message" className="mb-1 contact-label">
                      Your Message <span className="text-danger">*</span>
                    </label>
                    <textarea
                      className="form-control"
                      rows="6"
                      required
                      id="message"
                      name="message"
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <button
                    className="btn button__generate mt-4 mb-4"
                    type="submit"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            <div className="google-map col-md-6">
              <LeafletMapContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUS;
