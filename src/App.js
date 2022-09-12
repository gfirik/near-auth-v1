import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/Button";

export default function App({ currentUser, nearConfig, wallet }) {
  const handleUser = (e) => {
    if (currentUser && e.target.textContent === "Sign Out") {
      (function signOut() {
        wallet.signOut();
        window.location.replace(
          window.location.origin + window.location.pathname
        );
      })();
    } else if (!currentUser && e.target.textContent === "Login") {
      (function signIn() {
        wallet.requestSignIn(nearConfig.contractName, "NEAR Block Dice");
      })();
    }
  };
  return (
    <div className="App">
    <h3>Hello {currentUser?.accountId || "Stranger"}!</h3>
      <Button variant="outline-dark" size="lg" onClick={handleUser}>
        {currentUser ? "Sign Out" : "Login"}
      </Button>
    </div>
  );
}
