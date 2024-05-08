import Card from "../Components/Card";
import { supabase } from "../Libraries/client";
import { authActions } from "../../Store/userAuth";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userAuth);
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    if (userData.Authenticated) {
      navigate("/app");
    }
  }, [userData, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email: userInput.email,
      password: userInput.password,
      options: {
        data: {
          full_name: userInput.name,
        },
      },
    });
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
    if (data?.user?.aud === "authenticated") {
      // Check for existence of data and user property
      dispatch(authActions.signin(userDetails));
      navigate("/app");
    }
  };
  const handleChange = (e) => {
    setUserInput({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex justify-center items-center h-dvh">
      <Card>
        <h2 className="pb-8">Register</h2>
        <div>
          <form className="grid grid-cols-1 gap-8 pb-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-4 gap-8">
              <label>Name</label>
              <input
                type="text"
                placeholder="Name"
                className="col-span-3"
                name="name"
                required
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-4 gap-8">
              <label>Email</label>
              <input
                type="Email"
                placeholder="Email"
                className="col-span-3"
                name="email"
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
                name="password"
                required
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-center">
              <button>Register</button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Login;
