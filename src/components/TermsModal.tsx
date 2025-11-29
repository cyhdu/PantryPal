import "./Modal.css";

interface Props {
  show: boolean;
  onClose: () => void;
}

export const TermsModal = ({ show, onClose }: Props) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2 className="modal-title">Terms of Use & Privacy Policy</h2>

        <div className="modal-content">
          <h3>1. Introduction</h3>
          <p>
            Welcome to PantryPal! By using our application, you agree to comply
            with these Terms of Use and acknowledge our Privacy Policy.
          </p>

          <h3>2. User Responsibilities</h3>
          <p>
            You agree to provide accurate information when creating an account
            and are responsible for maintaining confidentiality of your login
            credentials.
          </p>

          <h3>3. Data Collection</h3>
          <p>
            We collect basic account information such as username, email, and
            password to allow you to log in and use the app.
          </p>

          <h3>4. How Your Data Is Used</h3>
          <p>
            Your information is used only to operate PantryPal features, such as
            account login, food tracking, and personalized app experience.
          </p>

          <h3>5. Data Protection</h3>
          <p>
            We use secure storage methods and industry-standard encryption to
            protect your information.
          </p>

          <h3>6. Third-Party Sharing</h3>
          <p>
            We do not sell, share, or rent your personal data to third parties.
          </p>

          <h3>7. Your Rights</h3>
          <p>
            You may request deletion of your account and associated data at any
            time by contacting support.
          </p>

          <h3>8. Updates</h3>
          <p>
            These terms may be updated periodically. Continued use of the app
            means you accept the updated terms.
          </p>
        </div>

        <button className="modal-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default TermsModal;
