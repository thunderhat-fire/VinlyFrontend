import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "./CrowdfundingGallery.css";
import { apiStem } from "../utils/variables";

const SliderElement = ({ allProjects }) => {
  // Slider settings for horizontal scrolling
  console.log(allProjects, "allProjects");
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

  return allProjects.length > 0 ? (
    <Slider {...sliderSettings}>
      {allProjects.map((project) => {
        return (
          <div key={project.projectId} className="project-card">
            <img
              src={`${apiStem}/images/thumb/${project.frontCover}`}
              alt="Album Artwork"
              className="album-artwork"
            />
            <h3 className="project-name">{project.projectTitle}</h3>
            <p className="artist-name">{project.artist}</p>
            <p className="description">{project.description}</p>
            <div className="goal-raised">
              <p>Goal: £{project.fundTarget}</p>
              <p>Raised: £{project.fundRaised}</p>
            </div>
            <div className="funding-slider">
              <input
                type="range"
                min="0"
                max="100"
                value={(project.fundRaised / project.fundTarget) * 100}
                className="slider"
                readOnly
              />
            </div>
            {/* <p>Status: {project.status}</p> */}
            <p>Demo Song : {project.songTitle}</p>
            <audio controls>
              <source
                src={`${apiStem}/songs/preview/${project.songPreviewId}`}
                type="audio/mp3"
              />
              Your browser does not support the audio element.
            </audio>
          </div>
        );
      })}
    </Slider>
  ) : (
    <p>No crowdfunding projects found.</p>
  );
};

const CrowdfundingGallery = () => {
  const [activeProjects, setActiveProjects] = useState([]);
  const [completedProjects, setCompletedProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${apiStem}/projects/allProjects`); // Adjust to the correct endpoint
        response.data.forEach((project) => {
          if (project.status === "active") {
            setActiveProjects((prev) => [...prev, project]);
          } else if (project.status === "complete") {
            setCompletedProjects((prev) => [...prev, project]);
          }
        });
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="crowdfunding-gallery">
      <h2 className="page-title">Crowdfunding Gallery</h2>
      <h3 className="page-title">Active Projects</h3>
      {activeProjects && <SliderElement allProjects={activeProjects} />}
      <h3 className="page-title">Completed Projects</h3>
      {completedProjects && <SliderElement allProjects={completedProjects} />}
    </div>
  );
};

export default CrowdfundingGallery;
