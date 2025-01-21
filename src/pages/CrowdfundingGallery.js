import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "./CrowdfundingGallery.css";

const CrowdfundingGallery = () => {
  const [projects, setProjects] = useState([]);

  // useEffect(() => {
  //   const fetchProjects = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5000/crowdfunds'); // Adjust to the correct endpoint
  //       setProjects(response.data);
  //     } catch (error) {
  //       console.error('Error fetching projects:', error);
  //     }
  //   };

  //   fetchProjects();
  // }, []);

  // Slider settings for horizontal scrolling
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Adjust this number based on how many projects you want to show at once
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="crowdfunding-gallery">
      <h1 className="page-title">Crowdfunding Gallery</h1>
      <Slider {...sliderSettings}>
        {projects.length > 0 ? (
          projects.map((project) => (
            <div key={project.id} className="project-card">
              <img
                src={project.imageUrl}
                alt="Album Artwork"
                className="album-artwork"
              />
              <h2 className="artist-name">{project.title}</h2>
              <p className="description">{project.description}</p>
              <div className="goal-raised">
                <p>Goal: £{project.goal}</p>
                <p>Raised: £{project.raised}</p>
              </div>
              <div className="funding-slider">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={(project.raised / project.goal) * 100}
                  className="slider"
                  readOnly
                />
              </div>
              <p>Status: {project.status}</p>
              <audio controls>
                <source src={project.audioUrl} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>
            </div>
          ))
        ) : (
          <p>No crowdfunding projects found.</p>
        )}
      </Slider>
    </div>
  );
};

export default CrowdfundingGallery;
