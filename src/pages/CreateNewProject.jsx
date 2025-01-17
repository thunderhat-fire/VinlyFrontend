import NewProjectText from "../components/NewProjectText";
import NewProjectAudio from "../components/NewProjectAudio";
import NewProjectImages from "../components/NewProjectImages";
import NewProjectConfirm from "../components/NewProjectConfirm";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Card, Box } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios"; // Ensure axios is imported

const createNewProject = ({ setAlertMessage }) => {
  const { user, isAuthenticated, isLoading, error } = useAuth0();
  const { tempProjectId } = useParams();
  // const [doRedirect, setDoRedirect] = useState(false);
  const navigate = useNavigate();
  const [projectId, setProjectId] = useState("");
  const steps = ["Information", "Images", "Audio", "Complete"];
  const [activeStep, setActiveStep] = useState(0);
  const [thumbUrls, setThumbUrls] = useState({}); // Store thumbnail URLs

  useEffect(() => {
    if (user) {
      const active = JSON.parse(localStorage.getItem("activeProject"));
      if (active && active.active) {
        setProjectId(active.active);
        setActiveStep(active.activeStep || 0);
      } else {
        const newId = `${new Date().getTime()}_${user.sub}`;
        setProjectId(newId);
        localStorage.setItem(
          "activeProject",
          JSON.stringify({ active: newId, activeStep: 0 })
        );
      }
    }
    const checkAuthAndPayment = () => {
      if (isLoading) {
        return; // Wait for auth to complete
      }

      if (!isAuthenticated || !tempProjectId) {
        navigate("/"); // Redirect to home if not authenticated
        return;
      }
    };

    checkAuthAndPayment();
  }, [isAuthenticated, isLoading, navigate, user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleImageUpload = async (file, name) => {
    try {
      const formData = new FormData();
      formData.append("imageFile", file);
      formData.append("ownerId", user.sub);
      formData.append("projectId", projectId);
      formData.append("type", name); // 'front' or 'back'

      // Upload the image and receive the thumbId
      const response = await axios.post("/api/images", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        const thumbId = response.data.thumbId;

        // Now fetch the thumbnail
        const thumbUrl = await fetchThumbnail(thumbId);

        // Store the URL for later use in the component
        setThumbUrls((prevState) => ({
          ...prevState,
          [name]: thumbUrl,
        }));
      }
    } catch (err) {
      setAlertMessage("Error uploading image");
      console.error(err);
    }
  };

  const fetchThumbnail = async (thumbId) => {
    try {
      const response = await axios.get(`/api/images/thumb/${thumbId}`, {
        responseType: "blob",
      });

      const thumbUrl = URL.createObjectURL(response.data);
      return thumbUrl;
    } catch (err) {
      console.error("Error fetching thumbnail", err);
    }
  };

  return (
    <>
      {/* {doRedirect && <Navigate replace to="/" />} */}
      <h2>Create New Project</h2>
      <Card raised={true} sx={{ borderRadius: "10px" }}>
        {activeStep === 0 && (
          <NewProjectText
            setActiveStep={setActiveStep}
            setAlertMessage={setAlertMessage}
            projectId={projectId}
            tempProjectId={tempProjectId}
            user={user}
          />
        )}
        {activeStep === 1 && (
          <NewProjectImages
            setActiveStep={setActiveStep}
            setAlertMessage={setAlertMessage}
            projectId={projectId}
            user={user}
            handleImageUpload={handleImageUpload} // Pass image upload handler to the component
          />
        )}
        {activeStep === 2 && (
          <NewProjectAudio
            setActiveStep={setActiveStep}
            setAlertMessage={setAlertMessage}
            projectId={projectId}
            user={user}
          />
        )}
        {activeStep === 3 && (
          <NewProjectConfirm
            setActiveStep={setActiveStep}
            setAlertMessage={setAlertMessage}
            projectId={projectId}
            user={user}
            thumbUrls={thumbUrls} // Display thumbnails in the confirmation step
          />
        )}
        <Box
          sx={{ display: "flex", justifyContent: "center", margin: "30px" }}
        ></Box>
      </Card>
      <Stepper activeStep={activeStep} sx={{ margin: "30px" }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </>
  );
};

export default createNewProject;
