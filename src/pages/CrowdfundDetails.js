// CrowdfundDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./CrowdfundDetails.css";

const CrowdfundDetails = () => {
  const { id } = useParams(); // Get the project ID from the URL
  const [project, setProject] = useState(null);

  // useEffect(() => {
  //   const fetchProject = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:5000/api/crowdfundDetails/${id}`);
  //       setProject(response.data);
  //     } catch (error) {
  //       console.error('Error fetching project details:', error);
  //     }
  //   };

  //   fetchProject();
  // }, [id]);

  if (!project) {
    return <p>Loading project details...</p>;
  }

  return (
    <div className="crowdfund-details-container">
      <h1>{project.artistName}</h1>
      <p>{project.projectDescription}</p>
      <div className="crowdfund-media">
        {/* <img
          src={`http://localhost:5000/api/file/${project.imageFileId}`}
          alt={`${project.artistName} artwork`}
          className="crowdfund-image"
        /> */}
        <audio controls>
          {/* <source
            src={`http://localhost:5000/api/file/${project.audioFileId}`}
            type="audio/wav"
          /> */}
          Your browser does not support the audio element.
        </audio>
      </div>
      <div className="funding-info">
        <p>Goal: £{project.goal}</p>
        <p>Raised: £{project.raised}</p>
        <p>Status: {project.status}</p>
      </div>
    </div>
  );
};

export default CrowdfundDetails;
