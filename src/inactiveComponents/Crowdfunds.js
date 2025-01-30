// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./CrowdfundingGallery.css";

// const CrowdfundingGallery = () => {
//   const [projects, setProjects] = useState([]);

//   // useEffect(() => {
//   //   const fetchProjects = async () => {
//   //     try {
//   //       const response = await axios.get('http://localhost:5000/crowdfunds');
//   //       setProjects(response.data);
//   //     } catch (error) {
//   //       console.error('Error fetching projects:', error);
//   //     }
//   //   };

//   //   fetchProjects();
//   // }, []);

//   return (
//     <div className="crowdfunding-gallery">
//       <h1 className="page-title">Crowdfunding Gallery</h1>
//       <div className="projects-container">
//         {projects.length > 0 ? (
//           projects.map((project) => (
//             <div key={project.id} className="project-card">
//               <img
//                 src={project.imageUrl}
//                 alt="Album Artwork"
//                 className="album-artwork"
//               />
//               <h2 className="artist-name">{project.title}</h2>
//               <p className="description">{project.description}</p>

//               {/* Display goal and raised side by side */}
//               <div className="goal-raised">
//                 <span className="goal">Goal: £{project.goal}</span>
//                 <span className="raised">Raised: £{project.raised}</span>
//               </div>

//               <audio controls>
//                 <source src={project.audioUrl} type="audio/wav" />
//                 Your browser does not support the audio element.
//               </audio>

//               <p className="status">
//                 Status: <strong>{project.status}</strong>
//               </p>
//             </div>
//           ))
//         ) : (
//           <p>No crowdfunding projects found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CrowdfundingGallery;
