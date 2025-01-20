import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import PressVinyl from "./pages/PressVinyl";
import CrowdfundingGallery from "./pages/CrowdfundingGallery";
import Crowdfunds from "./pages/Crowdfunds";
import CrowdfundDetails from "./pages/CrowdfundDetails";
// import CreateCrowdfund from "./pages/CreateCrowdfund";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import Process from "./pages/Process";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import FAQ from "./pages/FAQ";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import Error404 from "./pages/Error404";
import Login from "./pages/Login";
import UpdateDetails from "./pages/UpdateDetails";
import MyProjects from "./pages/MyProjects";
import DeleteAccount from "./pages/DeleteAccount";
import CreateNewProject from "./pages/CreateNewProject";
import PaymentFailed from "./pages/PaymentFailed";
import PaymentWaiting from "./pages/PaymentWaiting";
import Toast from "./components/Toast";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  const { user, isAuthenticated, isLoading, error } = useAuth0();
  const [alertMessage, setAlertMessage] = useState("");

  return (
    <div id="root-container">
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/press-Vinyl" element={<PressVinyl />} />
          <Route path="/crowdfunds" element={<Crowdfunds />} />
          <Route
            path="/crowdfunding-gallery"
            element={<CrowdfundingGallery />}
          />
          <Route
            path="/crowdfund-details/:id"
            element={<CrowdfundDetails setAlertMessage={setAlertMessage} />}
          />
          {/* <Route path="/createcrowdfund" element={<CreateCrowdfund />} /> */}
          <Route path="/process" element={<Process />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/userProfile" element={<Profile />} />
          <Route path="/paymentFailed" element={<PaymentFailed />} />
          <Route
            path="/processingPayment"
            element={<PaymentWaiting setAlertMessage={setAlertMessage} />}
          />
          <Route
            path="/signup"
            element={<SignUp setAlertMessage={setAlertMessage} />}
          />
          <Route path="*" element={<Error404 />} />
          <Route
            path="/login"
            element={<Login setAlertMessage={setAlertMessage} />}
          />
          <Route
            path="/updateDetails"
            element={<UpdateDetails setAlertMessage={setAlertMessage} />}
          />

          <Route path="/deleteAccount" element={<DeleteAccount />} />
          <Route
            path="/createNewProject"
            element={
              <CreateNewProject setAlertMessage={setAlertMessage} user={user} />
            }
          />
          <Route
            path="/currentProjects"
            element={
              <MyProjects user={user} setAlertMessage={setAlertMessage} />
            }
          />
        </Routes>
      </div>
      <Footer />
      <Toast />
      {alertMessage && (
        <Toast alertMessage={alertMessage} setAlertMessage={setAlertMessage} />
      )}
    </div>
  );
}

export default App;
