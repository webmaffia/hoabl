"use client";
import React, { useState } from 'react';
import axios from 'axios';


export default function FooterForm() {
    const [formData, setFormData] = useState({
    firstName: '',
    phone: '',
    email: '',
    message: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, phone, email, message } = formData;

    if (!firstName || !phone || !email || !message) {
      setError('Please fill all fields');
      return;
    }

    try {
     const leadsquaredPayload = {
    LeadDetails: [
      { Attribute: 'Phone', Value: phone },
      { Attribute: 'FirstName', Value: firstName },
      { Attribute: 'LastName', Value: '' },
      { Attribute: 'EmailAddress', Value: email },
      { Attribute: 'mx_City', Value: 'Bangalore' },
      { Attribute: 'SearchBy', Value: 'Phone' },
    ],
    Opportunity: {
      OpportunityEventCode: 12000,
      Fields: [
        {
          SchemaName: 'mx_Custom_1', 
          Value: `${firstName} – HoABL Naigaon`,
        },
        {
          SchemaName: 'mx_Custom_16', 
          Value: 'HoABL Naigaon',
        },
        {
          SchemaName: 'mx_Custom_17', 
          Value: 'Residential',
        },
        {
          SchemaName: 'Owner',
          Value: 'vigneswaran.k@xanadu.in',
        },
        {
          SchemaName: 'mx_Custom_73',
          Value: 'Web Leads',
        },
        {
          SchemaName: 'Status',
          Value: 'Open',
        },
        {
          SchemaName: 'mx_Custom_2', 
          Value: 'Not Attempted',
        },
        {
          SchemaName: 'mx_Custom_3', 
          Value: 'Facebook',
        },
        {
          SchemaName: 'mx_Custom_20', 
          Value: 'Palacio PW 123',
        },
        {
          SchemaName: 'mx_Custom_21', 
          Value: 'XYZ',
        },
      ],
    },
  };
      const leadResponse = await axios.post(
        'https://api-in21.leadsquared.com/v2/OpportunityManagement.svc/Capture',
        leadsquaredPayload,
        {
          params: {
            accessKey: 'u$r7b3a5c5c20947d02ad372f707c93a0b6',
            secretKey: '8d135be8ffe8346e335fe50ef899a55c9618ce9b',
          },
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const internalResponse = await axios.post(
       'https://cms-hoabl.devmaffia.in/api/enquiry-leads',
     {
    data: {
      first_name: firstName,
      mobile_number: phone,
      email: email,
      message: message,
    },
  },
  {
    headers: {
      'Content-Type': 'application/json',
    },
  }
);

      if (leadResponse.status === 200 && internalResponse.status === 200) {
        setSuccess(true);
        setFormData({ firstName: '', phone: '', email: '', message: '' });
        setError('');
      } else {
        setError('Something went wrong while submitting.');
      }
    } catch (err) {
       if (axios.isAxiosError(err)) {
    console.error('Axios Error:', err.response?.data);
       } else {
    console.error('Unexpected Error:', err);
      }
      setError('Submission failed. Please check form data.');
}
  };
    return(
        <form onSubmit={handleSubmit}>
      <div className="form_box">
        <div className="input_data">
          <label htmlFor="firstName">Name</label>
          <input
            type="text"
            name="firstName"
            required
            value={formData.firstName}
            onChange={handleChange}
          />
          {!formData.firstName && <div className="error">Please fill this field</div>}
        </div>

        <div className="input_data">
          <label htmlFor="phone">Mobile Number</label>
          <input
            type="number"
            name="phone"
            maxLength={10}
            required
            value={formData.phone}
            onChange={handleChange}
          />
          {!formData.phone && <div className="error">Please fill this field</div>}
        </div>

        <div className="input_data">
          <label htmlFor="email">Email Id</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          {!formData.email && <div className="error">Please fill this field</div>}
        </div>

        <div className="input_data w100">
          <label htmlFor="message">What Do You Have In Mind?</label>
          <textarea
            name="message"
            rows="1"
            required
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          {!formData.message && <div className="error">Please fill this field</div>}
        </div>
      </div>

      {error && <div className="error" style={{ marginTop: '10px' }}>{error}</div>}
      {success && <div className="success" style={{ marginTop: '10px', color: 'green' }}>Form submitted successfully!</div>}

      <button type="submit" className="view_white subtitle_57">Submit</button>
    </form>
    )
}