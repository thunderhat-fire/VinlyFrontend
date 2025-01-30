// CreateCrowdfund.js
import React, { useState } from "react";
import axios from "axios";
import "./CreateCrowdfund.css";

const CreateCrowdfund = () => {
  const [artistName, setArtistName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [goal, setGoal] = useState("");
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  // Create form data
  //   const formData = new FormData();
  //   formData.append('artistName', artistName);
  //   formData.append('projectDescription', projectDescription);
  //   formData.append('goal', goal);
  //   formData.append('image', image);
  //   formData.append('audio', audio);

  //   try {
  //     // Send POST request to the server
  //     const response = await axios.post('http://localhost:5000/api/crowdfund', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });
  //     alert(response.data.message);
  //   } catch (error) {
  //     console.error('Error submitting form', error);
  //     alert('Error submitting form');
  //   }
  // };

  return (
    <div className="create-crowdfund-wrapper">
      <div className="create-crowdfund-container">
        <h1>Create a New Crowdfund Project</h1>
        <form onSubmit={handleSubmit} className="create-crowdfund-form">
          <div className="form-group">
            <label>Artist/Producer Name:</label>
            <input
              type="text"
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Project Description:</label>
            <textarea
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Funding Goal (£):</label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              required
            >
              <option value="" disabled>
                Select your target amount
              </option>
              <option value="2000">£2000 = 100 RECORDS</option>
              <option value="2500">£2500 = 300 RECORDS</option>
              <option value="2800">£2800 = 500 RECORDS</option>
            </select>
          </div>
          <div className="form-group">
            <label>Album Artwork (PNG or JPG) minimum 2000x2000 pixels:</label>
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </div>
          <div className="form-group">
            <label>
              Audio File (WAV) - pls uplaod a zip file with two files A&B side.
              Max length 6 tracks @ total of 22 mins per side:
            </label>
            <input
              type="file"
              accept="audio/wav"
              onChange={(e) => setAudio(e.target.files[0])}
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
      <footer className="footer">
        <p>
          WE DO NOT TAKE ANY IP RIGHTS, WE DO NOT INFRINGE OTHERS COPYRIGHT, WE
          WILL NOT PIRATE, AND WE WILL GET FULL PERMISSIONS.
        </p>
      </footer>
    </div>
  );
};

export default CreateCrowdfund;
