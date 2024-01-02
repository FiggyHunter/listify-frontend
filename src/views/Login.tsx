import { Link } from "react-router-dom";

const Login = () => {
  return (
    <main className="">
      {" "}
      <div>
        {/* Navigation using Link component */}
        <Link className="" to="/">
          Home
        </Link>
        <Link to="/register">Register</Link>
      </div>
    </main>
  );
};

export default Login;
