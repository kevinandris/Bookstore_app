import React, { useEffect, useState } from "react";
import styles from "./auth.module.scss";
import loginImg from "../../assets/register.jpg";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { validateEmail } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { RESET_AUTH, register } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { MdPermIdentity } from "react-icons/md";
import { TfiEmail } from "react-icons/tfi";
import { RiLockPasswordLine } from "react-icons/ri";
import { LuRepeat1 } from "react-icons/lu";
import AuthCard from "../../components/card/AuthCard";

const initialState = {
  name: "",
  email: "",
  password: "",
  cPassword: "",
};
const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const { name, email, password, cPassword } = formData;
  const { isLoading, isLoggedIn, isSuccess } = useSelector(
    (state) => state.auth
  );

  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const passwordToggler = () => {
    setShowPassword(!showPassword);
  };

  const registerUser = async (e) => {
    e.preventDefault(); /* preventing a reload every-time a user submits the their details */
    // console.log(name, email, password, cPassword);
    if (!email || !password) {
      return toast.error("All fields are required");
    }

    if (password.length < 6) {
      return toast.error("Password must be up to 6 characters");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    if (password !== cPassword) {
      return toast.error("Your passwords are not match");
    }

    // * Send the name, email and passwords in an object to the "BACKEND" to register the user using dispatch (redux-toolkit)
    const userData = {
      name,
      email,
      password,
    };

    await dispatch(register(userData));
  };

  // ! Monitoring whether the registration is successful or a user is logged in and direct them to the homepage.
  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/");
    }

    // * In case there is another redux function that fires from the homepage, it will have a fresh state.
    dispatch(RESET_AUTH());
  }, [isSuccess, isLoggedIn, dispatch, navigate]);

  return (
    <>
      <Toaster />
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <AuthCard>
          <div className={styles.form}>
            <h2>Register Page</h2>
            <form onSubmit={registerUser}>
              <div className={styles.name}>
                <MdPermIdentity size={22} className={styles.MdPermIdentity} />
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  maxLength="29"
                  value={name}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.email}>
                <TfiEmail size={20} className={styles.TfiEmail} />
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  maxLength="36"
                  value={email}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.password}>
                <RiLockPasswordLine
                  size={24}
                  className={styles.RiLockPasswordLine}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  maxLength="29"
                  value={password}
                  onChange={handleInputChange}
                />
                <span className={styles.icon} onClick={passwordToggler}>
                  {showPassword ? (
                    <AiOutlineEye size={20} color="darkblue" />
                  ) : (
                    <AiOutlineEyeInvisible size={20} color="darkblue" />
                  )}
                </span>

                <LuRepeat1 size={22} className={styles.LuRepeat1} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  name="cPassword"
                  maxLength="29"
                  value={cPassword}
                  onChange={handleInputChange}
                />
              </div>

              <button
                type="submit"
                className={"--btn --btn-primary --btn-block"}
              >
                Register
              </button>
            </form>
            <span className={styles.register}>
              <p>Already have an account? </p> &nbsp;
              <Link to="/login" className={styles.registerLink}>
                Login
              </Link>
            </span>
          </div>
        </AuthCard>

        <div className={styles.img}>
          <img src={loginImg} alt="Login" width={400} height={500} />
        </div>
      </section>
    </>
  );
};

export default Register;
