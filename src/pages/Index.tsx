import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <p>This is the home page content.</p>
      <Link to="/work">Go to Work Page</Link>
    </div>
  );
}
