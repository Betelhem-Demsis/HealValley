import { useState } from 'react';
import '@/styles/franchiseForm.css';
import axios from 'axios';

export default function FranchiseForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    capital: '',
    operatedBusiness: '',
    attendedEvent: '',
    franchise: '',
    terms: false,
    subscribe: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.country ||
      !formData.capital ||
      !formData.operatedBusiness ||
      !formData.attendedEvent ||
      !formData.terms
    ) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      const apiUrl = "http://127.0.0.1:8000/api/v1/franchiseinquiry";
      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
      });

      if (response.status === 200 || response.status === 201) {
        setSubmitted(true);
        setError(''); 
        console.log('Form submitted successfully');
      } else {
        setError('Failed to submit the form');
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
      setError('There was an error submitting the form.');
    }
  };

  return (
    <div className="container">
      <h1 className="heading">Inquire Today</h1>
      {submitted ? (
        <p className="thankYouMessage">Thank you! Your form has been submitted.</p>
      ) : (
        <form onSubmit={handleSubmit} className="form">
          <label className="label">
            First Name*:
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="input"
            />
          </label>
          <label className="label">
            Last Name*:
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="input"
            />
          </label>
          <label className="label">
            E-mail*:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input"
            />
          </label>
          <label className="label">
            Please Select Your Country*:
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="select"
            >   
            </input>
          </label>
          <label className="label">
            How much liquid capital do you have available to invest?*:
            <select
              name="capital"
              value={formData.capital}
              onChange={handleChange}
              required
              className="select"
            >
              <option value="">Select Capital</option>
              <option value="Less than $50,000">Less than $50,000</option>
              <option value="$50,000 - $100,000">$50,000 - $100,000</option>
              <option value="Over $100,000">Over $100,000</option>
            </select>
          </label>
          <label className="label">
            Have you operated a business before?*:
            <div className="radioGroup">
              <label className="radioLabel">
                <input
                  type="radio"
                  name="operatedBusiness"
                  value="Yes"
                  onChange={handleChange}
                  required
                  className="radioInput"
                />
                Yes
              </label>
              <label className="radioLabel">
                <input
                  type="radio"
                  name="operatedBusiness"
                  value="No"
                  onChange={handleChange}
                  required
                  className="radioInput"
                />
                No
              </label>
            </div>
          </label>
          <label className="label">
            Have you experienced a class or event?*:
            <div className="radioGroup">
              <label className="radioLabel">
                <input
                  type="radio"
                  name="attendedEvent"
                  value="Yes"
                  onChange={handleChange}
                  required
                  className="radioInput"
                />
                Yes
              </label>
              <label className="radioLabel">
                <input
                  type="radio"
                  name="attendedEvent"
                  value="No"
                  onChange={handleChange}
                  required
                  className="radioInput"
                />
                No
              </label>
            </div>
          </label>
          <label className="label">
            In which franchise concept are you interested?:
            <select
              name="franchise"
              value={formData.franchise}
              onChange={handleChange}
              className="select"
            >
              <option value="">Select Franchise</option>
              <option value="F45 Training">F45 Training</option>
              <option value="FS8">FS8</option>
              <option value="Vaura">Vaura</option>
            </select>
          </label>
          <label className="checkboxLabel">
            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
              required
              className="checkboxInput"
            />
            I agree to the Terms of Use and Privacy Policy.*
          </label>
          <label className="checkboxLabel">
            <input
              type="checkbox"
              name="subscribe"
              checked={formData.subscribe}
              onChange={handleChange}
              className="checkboxInput"
            />
            I would like to receive information from F45 Training, FS8, and Vaura about the franchise opportunity via Email or SMS.
          </label>
          {error && <p className="errorMessage">{error}</p>}
          <button type="submit" className="submitButton">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
