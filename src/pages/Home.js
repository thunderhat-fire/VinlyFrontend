import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Carousel from "react-material-ui-carousel";
import "./Home.css";
import { apiStem } from "../utils/variables";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
function Home() {
  const [crowdfunds, setCrowdfunds] = useState([]);
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    // Fetch the latest crowdfunds
    const fetchCrowdfunds = async () => {
      const response = await fetch(`${apiStem}/projects/allProjects?limit=5`);
      const data = await response.json();
      console.log(response);

      setCrowdfunds(data);
    };

    fetchCrowdfunds();
  }, []);

  // Filter completed projects
  // const completedCrowdfunds = crowdfunds.filter(
  //   (crowdfund) => crowdfund.status === "Completed"
  // );

  // const settings = {
  //   dots: true,
  //   infinite: false, // Set to false to prevent infinite scrolling over duplicate content
  //   speed: 500,
  //   slidesToShow: Math.min(completedCrowdfunds.length, 3), // Only show slides based on completed projects
  //   slidesToScroll: 1,
  // };
  console.log(crowdfunds);
  return (
    <div className="home-container">
      {showNotification && (
        <div className="notification-bar">
          <p>
            🎉 New Feature Alert! Check out the latest vinyl crowdfunding
            campaigns now!
          </p>
          <button onClick={() => setShowNotification(false)}>X</button>
        </div>
      )}

      <div className="cta-modal">
        <h2>Join the Revolution of Vinyl Crowdfunding!</h2>
        <p>
          Discover how you can be part of the next big hit. Create, support, or
          browse vinyl crowdfunding projects today!
        </p>
      </div>

      <div className="crowdfunds-slider">
        <h2>Latest Completed Crowdfunds</h2>

        <Carousel
          animation="slide"
          indicators={true}
          navButtonsAlwaysVisible={true}
          sx={{ width: "100%", maxWidth: 800, margin: "0 auto" }}
        >
          {crowdfunds.map((project, i) => (
            <Paper key={i} width="300px" height="300px">
              <Link
                to={`/crowdfund-details/${project.projectId}`}
                style={{ textDecoration: "none" }}
              >
                <Card sx={{ display: "flex", flexDirection: "column" }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={`${apiStem}/images/thumb/${project.frontCover}`}
                    alt={project.projectTitle}
                  />
                  <CardContent>
                    <Typography variant="h6" component="h3">
                      {project.projectTitle}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Artist: {project.artist}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Paper>
          ))}
        </Carousel>
        {/* 
        <Slider {...settings}>
          {completedCrowdfunds.map((crowdfund) => (
            <div key={crowdfund.id} className="crowdfund-item">
              <h3>{crowdfund.title}</h3> {/* Title stays above the image */}
        {/* <div className="crowdfund-content">
                <img
                  src={crowdfund.imageUrl}
                  alt="Album artwork"
                  className="crowdfund-image"
                />
                <div className="crowdfund-details">
                  <p>
                    {crowdfund.description.length > 120
                      ? `${crowdfund.description.slice(0, 120)}...`
                      : crowdfund.description}
                  </p>
                  <audio controls src={crowdfund.audioUrl} />
                </div>
              </div>
            </div>
          ))}
        </Slider> */}
      </div>

      <div className="home-content">Home Page Content</div>
    </div>
  );
}

export default Home;
