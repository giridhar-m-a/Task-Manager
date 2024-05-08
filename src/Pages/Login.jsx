import Card from "../Components/Card";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../Libraries/client";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../Store/userAuth";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userAuth);
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (userData.Authenticated) {
      navigate("/app");
    }
  }, [userData, navigate]);

  const handleChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: userInput.email,
      password: userInput.password,
    });
    console.log(data);
    const userDetails = {
      name: data?.user?.user_metadata?.full_name,
      email: data?.user?.user_metadata?.email,
      userId: data?.user?.id,
      accessToken: data?.session?.access_token,
      refreshToken: data?.session?.refresh_token,
      tokenType: data?.session?.token_type,
      expiresAt: data?.session?.expires_at,
      expiresIn: data?.session?.expires_in,
      userDetails: data,
    };
    console.log("userDetails:", userDetails);
    if (data?.user?.aud === "authenticated") {
      dispatch(authActions.signin(userDetails));
      navigate("/app");
    }
  };
  return (
    <div className="flex justify-center items-center h-dvh">
      <Card>
        <h2 className="pb-8">Login</h2>
        <div>
          <form className="grid grid-cols-1 gap-8 pb-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-4 gap-8">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="col-span-3"
                required
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-4 gap-8">
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                className="col-span-3"
                required
                onChange={handleChange}
                name="password"
              />
            </div>
            <div className="flex justify-center">
              <button>Login</button>
            </div>
          </form>
        </div>
        <p>
          If you don&apos;t have an account{" "}
          <Link to="/register">register here</Link>
        </p>
      </Card>
    </div>
  );
};

export default Login;
