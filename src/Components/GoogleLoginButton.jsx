// components/GoogleLoginButton.jsx
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // ✅
import toast from "react-hot-toast";

const GoogleLoginButton = ({ onSuccess }) => {
  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: "654604749390-259b2qkpqea8ar3vntu59bttsj3q1a1b.apps.googleusercontent.com", 
        callback: handleCallbackResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("google-signin-btn"),
        {
          theme: "outline",
          size: "large",
          width: "100%",
        }
      );
    }
  }, []);

  const handleCallbackResponse = (response) => {
    const userObject = jwtDecode(response.credential);
    toast.success(`Welcome, ${userObject.name}!`);
    onSuccess(userObject); // send back to parent
  };

  return <div id="google-signin-btn" className="google-btn-wrapper"></div>;
};

export default GoogleLoginButton;
