import "./LoadingScreen.css";

export default function LoadingScreen({ message = "Loading..." }) {
  return (
    <div className="loading-screen">
      <div className="loading-spinner"></div>

      <h2>{message}</h2>

      <p>Please wait while Sentra processes your request.</p>
    </div>
  );
}
