import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <Button component={Link} to="/studio" variant="contained">
        Go to Studio
      </Button>
    </div>
  );
}

export default HomePage;
