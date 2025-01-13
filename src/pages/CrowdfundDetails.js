// CrowdfundDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./CrowdfundDetails.css";
import { apiStem } from "../utils/variables";

const CrowdfundDetails = () => {
  const { id } = useParams(); // Get the project ID from the URL
  const [project, setProject] = useState(null);
  const [previewId, setPreviewId] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`${apiStem}/projects/single/${id}`);

        setProject(response.data);
        const { songArray } = response.data;
        const preview = songArray.find((song) => song.preview === true);
        setPreviewId(preview.previewId);
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    fetchProject();
  }, [id]);

  useEffect(() => {
    if (previewId) {
      fetch(`${apiStem}/songs/preview/${previewId}`)
        .then((response) => response.blob())
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          console.log("Blob URL:", url);
          console.log("blob", blob);
          setAudioUrl(url);
        })
        .catch((error) => console.log("Error creating blob URL:", error));
    }

    // Cleanup
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [previewId]);

  if (!project) {
    return <p>Loading project details...</p>;
  }
  console.log(project.songArray);
  console.log(previewId);
  return (
    <div className="crowdfund-details-container">
      <h1>{project.artist}</h1>
      <p>{project.description}</p>
      <div className="crowdfund-media">
        <img
          src={`${apiStem}/images/thumb/${project.thumbArray[0]}`}
          alt={`${project.artistName} artwork`}
          className="crowdfund-image"
        />
        {audioUrl && (
          <audio
            controls
            onLoadStart={() => console.log("Audio loading started")}
            onLoadedData={() => console.log("Audio data loaded")}
            onCanPlay={() => console.log("Audio can play")}
            onError={(e) => {
              console.log("Audio error event:", e);
              console.log("Audio element error:", e.target.error);
              console.log("Audio source:", e.target.src);
            }}
          >
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}
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
