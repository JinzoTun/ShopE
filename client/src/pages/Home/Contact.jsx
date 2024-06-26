import { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here, e.g., sending data to a backend
    console.log(formData);
    // Reset form fields after submission
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <div className="container mx-auto py-8 min-h-screen">
      <h1 className="text-4xl lg:text-5xl px-4 mt-16 mb-4">Contact Us</h1>
      <div className="flex flex-col lg:flex-row justify-center">
        <div className="lg:w-1/2 p-4">
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="mb-4">
              <label className="block text-base mb-2" htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-base mb-2" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-base mb-2" htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
                rows="5"
                required
              ></textarea>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
              Submit
            </button>
          </form>
        </div>
        <div className="lg:w-1/2 p-4">
          <div className="mb-4">
            <h2 className="text-2xl mb-4">Contact Information</h2>
            <p className="text-base mb-2"><strong>Phone:</strong> +1 (123) 456-7890</p>
            <p className="text-base mb-2"><strong>Email:</strong> info@example.com</p>
            <p className="text-base mb-2"><strong>Address:</strong> 123 Street, City, Country</p>
          </div>
          <div className="mb-4">
            {/* Replace the iframe src with your Google Map embed code */}
            <div className="aspect-w-16 aspect-h-9">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d102454.66354208332!2d10.088825877755787!3d36.80649432160168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4ea3c6bdf96e7%3A0x46c3bf3c6d86a7d!2sTunis%2C%20Tunisia!5e0!3m2!1sen!2sus!4v1620576033360!5m2!1sen!2sus" width="600" height="300"  allowfullscreen="" loading="lazy"></iframe>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
