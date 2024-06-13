import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FieldValues } from "react-hook-form";
import { z } from "zod";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import Cookies from 'js-cookie'

const stringValidationRules = {
  regex: /^[A-Za-z.]+(?: [A-Za-z.]+)*$/,
  refine: (value: string) => {
    const words = value.split(" ");
    return words.every((word) => /^[A-Z][a-z.]*$/.test(word)); // Check if each word starts with an uppercase letter followed by lowercase letters
  },
};
const regSchema = z
  .object({
    usertype: z.enum(["Student", "Teacher", "Instructor"]),
    name: z
      .string()
      .regex(
        stringValidationRules.regex,
        "Starting of each word must be uppercase letter"
      )
      .refine((value) => stringValidationRules.refine(value)),
    // dept: z.string().refine((value) => value === "IRE" || value === "EdTech", {
    //   message: 'Dept must be "IRE" or "EdTech"',
    dept: z.enum(["IRE", "EdTech"]),

    // session: z
    //   .string()
    //   .regex(/^\d{4}-\d{2}$/, "Session must follow the pattern YYYY-YY"),
    session: z.enum([
      "2018-19",
      "2019-20",
      "2020-21",
      "2021-22",
      "2022-23",
      "2023-24",
    ]),
    id: z
      .number({ invalid_type_error: "Only digits are accepted" })
      .int()
      .min(10000, "ID must contain 5 digit to 8 digit")
      .max(9999999, "ID must contain 5 digit to 7 digit"),
    phone_no: z
      .string()
      .regex(/^(013|016|014|017|019|018)\d{8}$/, "Input a valid Phone number"),

    email: z
      .string()
      .regex(
        /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)?bdu\.ac\.bd$/,
        "Must follow 'example@bdu.ac.bd' format"
      ),
    username: z
      .string()
      .regex(
        /^(?=.{5,})[a-zA-Z][a-zA-Z0-9_-]*$/,
        "At least 5 characters long and start with alphabets"
      ),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(20, "Password cannot exceed 20 characters."),
    conpassword: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(20, "Password cannot exceed 20 characters."),
  })
  .refine((data) => data.password === data.conpassword, {
    path: ["conpassword"],
    message: "Passwod doesnot match",
  });
const otpSchema = z.object({
  otp: z.string().length(6, { message: "OTP must be 6 characters long" }),
});

type regData = z.infer<typeof regSchema>;
type otpData = z.infer<typeof otpSchema>;

const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<regData>({ resolver: zodResolver(regSchema), mode: "onChange" });
  const {
    register: otpRegister,
    handleSubmit: otpHandleSubmit,
    formState: { errors: otpErrors, isValid: isOtpValid },
  } = useForm<otpData>({ resolver: zodResolver(otpSchema), mode: "onChange" });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConPassword, setConShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConPasswordVisibility = () => {
    setConShowPassword(!showConPassword);
  };

  //Signup button clicked
  const [signup, setSignup] = useState(false);

  //Registration form data collected here
  const [regdata, setRegData] = useState<FieldValues>();

  const onRegSubmit = async (data: FieldValues) => {
    setRegData(data);

    const regidata = data;
    console.log("Data from reg: ", regidata);
    try {
      console.log("Hello");
      const response = await axios.post(
        "http://localhost:5000/signup/saveusers",
        regidata
      );
      console.log("world");
      console.log('response: ', response)
      
      if (response.status == 201) {
        alert("User already exists. Now verify account with OTP.")
        setSignup(true);
      } else if(response.status == 202){
        alert("Account already activated with this email. Please Log in.");
        navigate("/login");
      }else if(response.status == 200){
        setSignup(true);
        // console.log("User Registration failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      if(error.response.data.errors.id !=""){
        alert(error.response.data.errors.id);
      }
      else if(error.response.data.errors.phone_no != ""){
        alert(error.response.data.errors.phone_no);
      }
      else if(error.response.data.errors.Username != ""){
        alert(error.response.data.errors.username);
      }
      console.log(error.response.data.errors);
      
    } // Log the response if needed
  };

  //Otp collected here
  //verify email button cliked
  const [showOtp, setShowOtp] = useState(false);

  //Otp verify button clicked
  const [onOtp, setOnOtp] = useState(false);

  const navigate = useNavigate();

  const sendOtp = async () => {
    console.log("Reg Data: ", regdata); //send regdata for email
    if (regdata != null) {
      try {
        const response = await axios.post(
          "http://localhost:5000/signup/sendotp",
          regdata
        );
        if (response.status == 200) {
          setShowOtp(true);
        }
      } catch (error) {
        console.log("Cannot go to OTP page error: ", error);
      }
    } else {
      alert("Regdata is null");
    }
  };

  const [message, setMessage] = useState("");
  const onOtpSubmit = async (data: FieldValues) => {
    const otpdata = data;
    const fulldata = { ...regdata, ...otpdata };
    console.log("OTP in frontend: ", { ...regdata, ...otpdata });

    if (otpdata != null) {
      try {
        await axios.post("http://localhost:5000/users/register", fulldata);

        setOnOtp(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (error) {
        if ((error as AxiosError).response?.status === 400) {
          setMessage("OTP did not match");
        } else {
          console.error("Error:", error);
        }
      } // Log the response if needed
    } else {
      alert("Otp Api failed");
    }
  };

  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };
  return (
    
      <section
        className="vh-auto bg-image"
        style={{
          backgroundImage:
            "url(https://mdbcdn.b-cdn.net/img/new/fluid/nature/015.webp)",
        }}
      >
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{ borderRadius: "15px" }}>
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">
                      Create an account
                    </h2>

                    <form onSubmit={handleSubmit(onRegSubmit)}>
                      <div className="mb-2 d-flex flex-row justify-content-center  ">
                        <div className="col-md-3  col-sm-3 ">
                          <label
                            className="form-label fw-bold"
                            style={{ fontSize: "18px", fontStyle: "italic" }}
                            htmlFor="utype"
                          >
                            User type:
                          </label>
                        </div>
                        <div className="mb-4">
                          <select
                            className="form-select border border-info"
                            id="utype"
                            {...register("usertype")}
                            onChange={handleSelectChange}
                            data-mdb-select-init
                            disabled={signup}
                            defaultValue="Student"
                          >
                            <option value="Student">Student</option>
                            <option value="Teacher">Teacher</option>
                            <option value="Instructor">Instructor</option>
                          </select>
                        </div>
                      </div>

                      <div className="mb-1 d-flex flex-row">
                        <div className="col-md-3 col-sm-3">
                          <label className="form-label fw-bold" htmlFor="name">
                            Name:
                          </label>
                        </div>
                        <div className="col-md-9 col-sm-9">
                          <input
                            type="text"
                            {...register("name")}
                            id="name"
                            className={
                              errors.name
                                ? "form-control form-control-md border border-danger"
                                : "form-control form-control-md border border-info"
                            }
                            placeholder="Enter your name"
                            disabled={signup}
                          />
                          {errors.name && (
                            <small className="invalid-feedback">
                              {errors.name.message}
                            </small>
                          )}
                        </div>
                      </div>

                      <div className="row mb-1">
                        <div className="col-md-6 col-sm-6">
                          <label className="form-label fw-bold" htmlFor="dept">
                            Dept:
                          </label>

                          <select
                            className="form-select form-select-md border border-info"
                            id="dept"
                            {...register("dept")}
                            data-mdb-select-init
                            disabled={signup}
                            defaultValue="IRE"
                          >
                            <option value="IRE">IRE</option>
                            <option value="EdTech">EdTech</option>
                          </select>
                        </div>

                        <div className="col-md-6 col-sm-6">
                          {selectedOption != "Teacher" &&
                            selectedOption != "Instructor" && (
                              <>
                                <label
                                  className="form-label fw-bold"
                                  htmlFor="session"
                                >
                                  Session:
                                </label>
                                <select
                                  id="session"
                                  className="form-select form-select-md border border-info"
                                  {...register("session")}
                                  data-mdb-select-init
                                  disabled={signup}
                                  defaultValue="2020-21"
                                >
                                  <option value="2018-19">2018-19</option>
                                  <option value="2019-20">2019-20</option>
                                  <option value="2020-21">2020-21</option>
                                  <option value="2021-22">2021-22</option>
                                  <option value="2022-23">2022-23</option>
                                  <option value="2023-24">2023-24</option>
                                </select>
                              </>
                            )}
                        </div>
                      </div>

                      <div className="mb-1 d-flex flex-row">
                        <div className="col-md-3 col-sm-3">
                          <label className="form-label fw-bold" htmlFor="uid">
                            ID:
                          </label>
                        </div>
                        <div className="col-md-9 col-sm-9">
                          <input
                            type="text"
                            id="uid"
                            {...register("id", { valueAsNumber: true })}
                            className={
                              errors.id
                                ? "form-control form-control-md border border-danger"
                                : "form-control form-control-md border border-info"
                            }
                            placeholder="Student ID"
                            disabled={signup}
                          />
                          {errors.id && (
                            <small className="text-danger">
                              {errors.id.message}
                            </small>
                          )}
                        </div>
                      </div>

                      <div className="mb-1 d-flex flex-row">
                        <div className="col-md-3 col-sm-3">
                          <label className="form-label fw-bold" htmlFor="email">
                            Email:
                          </label>
                        </div>
                        <div className="col-md-9 col-sm-9">
                          <input
                            type="email"
                            id="email"
                            {...register("email")}
                            className={
                              errors.email
                                ? "form-control form-control-md border border-danger"
                                : "form-control form-control-md border border-info"
                            }
                            placeholder="i.e. example@bdu.ac.bd"
                            disabled={signup}
                          />
                          {errors.email && (
                            <small className="text-danger">
                              {errors.email.message}
                            </small>
                          )}
                        </div>
                      </div>

                      <div className="mb-1 d-flex flex-row">
                        <div className="col-md-3 col-sm-3">
                          <label className="form-label fw-bold" htmlFor="phone">
                            Phone no:
                          </label>
                        </div>
                        <div className="col-md-9 col-sm-9">
                          <input
                            type="text"
                            id="phone"
                            {...register("phone_no")}
                            className={
                              errors.phone_no
                                ? "form-control form-control-md border border-danger"
                                : "form-control form-control-md border border-info"
                            }
                            placeholder="i.e. 017xxxxxxxx"
                            disabled={signup}
                          />

                          {errors.phone_no && (
                            <small className="text-danger">
                              {errors.phone_no.message}
                            </small>
                          )}
                        </div>
                      </div>

                      <div className="mb-1 d-flex flex-row">
                        <div className="col-md-3 col-sm-3">
                          <label className="form-label fw-bold" htmlFor="uname">
                            Username:
                          </label>
                        </div>
                        <div className="col-md-9 col-sm-9">
                          <input
                            type="text"
                            id="uname"
                            {...register("username")}
                            className={
                              errors.username
                                ? "form-control form-control-md border border-danger"
                                : "form-control form-control-md border border-info"
                            }
                            placeholder="Enter username"
                            disabled={signup}
                          />
                          {errors.username && (
                            <small className="text-danger">
                              {errors.username.message}
                            </small>
                          )}
                        </div>
                      </div>

                      <div className="mb-1 d-flex flex-row">
                        <div className="col-md-3 col-sm-3 ">
                          <label className="form-label fw-bold" htmlFor="upwd">
                            Password:
                          </label>
                        </div>
                        <div className="col-md-9 col-sm-9">
                          <div className="input-group">
                            <input
                              type={showPassword ? "text" : "password"}
                              className={
                                errors.password
                                  ? "form-control form-control-md border border-danger"
                                  : "form-control form-control-md border border-info"
                              }
                              id="upwd"
                              {...register("password")}
                              placeholder="Password"
                              disabled={signup}
                            />

                            <button
                              className="btn btn-outline-secondary"
                              type="button"
                              onClick={togglePasswordVisibility}
                            >
                              {showPassword ? <BiHide /> : <BiShow />}
                            </button>
                          </div>
                          {errors.password && (
                            <small className="text-danger">
                              {errors.password.message}
                            </small>
                          )}
                        </div>
                      </div>

                      <div className="mb-1 d-flex flex-row">
                        <div className="col-md-4 col-sm-4 ">
                          <label
                            className="form-label fw-bold"
                            htmlFor="uconpwd"
                          >
                            Confirm Password:
                          </label>
                        </div>
                        <div className="col-md-8 col-sm-8">
                          <div className="input-group">
                            <input
                              type={showConPassword ? "text" : "password"}
                              className="form-control form-control-md col-md-8 col-sm-8 border border-info"
                              id="uconpwd"
                              {...register("conpassword")}
                              placeholder="Confirm Password"
                              disabled={signup}
                            />

                            <button
                              className="btn btn-outline-secondary"
                              type="button"
                              onClick={toggleConPasswordVisibility}
                            >
                              {showConPassword ? <BiHide /> : <BiShow />}
                            </button>
                          </div>
                          {errors.conpassword && (
                            <small className="text-danger">
                              {errors.conpassword.message}
                            </small>
                          )}
                        </div>
                      </div>

                      <div className="d-grid gap-2">
                        {signup ? (
                          <>
                            <button
                              type="button"
                              onClick={sendOtp}
                              className="btn btn-primary btn-block btn-lg gradient-custom-4"
                            >
                              Verify Email
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              disabled={!isValid}
                              type="submit"
                              data-mdb-button-init
                              data-mdb-ripple-init
                              className="btn btn-success btn-block btn-lg gradient-custom-4"
                            >
                              Register
                            </button>
                          </>
                        )}
                      </div>
                    </form>

                    <form onSubmit={otpHandleSubmit(onOtpSubmit)}>
                      {showOtp && (
                        <div className="p-2 mb-2 mt-2 d-flex flex-column border border-dark">
                          <p className="text-center">
                            We have sent an OTP to your email address.
                          </p>
                          <div className="d-flex flex-column align-items-center justify-content-center">
                            {onOtp ? (
                              <div className="p-2 mb-2 mt-2 fs-5 fw-bold text-success">
                                Verified. Please wait...
                              </div>
                            ) : (
                              <>
                                <div className="text-center ml-1 col-md-12 col-sm-12">
                                  <label
                                    className="form-label fw-bold"
                                    htmlFor="otp"
                                  >
                                    Enter OTP
                                  </label>
                                </div>
                                <div className="col-md-4 col-sm-4">
                                  <input
                                    type="text"
                                    id="otp"
                                    {...otpRegister("otp")}
                                    className={
                                      otpErrors.otp
                                        ? "text-center form-control form-control-md border border-danger"
                                        : "text-center form-control form-control-md border border-dark"
                                    }
                                    placeholder="Enter OTP"
                                  />
                                </div>
                                <div>
                                  {otpErrors.otp && (
                                    <small className="text-danger">
                                      {otpErrors.otp.message}
                                    </small>
                                  )}
                                  {message && (
                                    <small className="text-danger">
                                      {message}
                                    </small>
                                  )}
                                </div>
                              </>
                            )}
                          </div>
                          <div className="d-flex justify-content-center">
                            <button
                              disabled={!isOtpValid}
                              // onClick={verifyOtp}
                              type="submit"
                              data-mdb-button-init
                              data-mdb-ripple-init
                              className="btn btn-primary mt-2 col-sm-4 btn-block btn-md gradient-custom-4"
                            >
                              Verify
                            </button>
                          </div>
                        </div>
                      )}
                    </form>

                    <h6 className="text-center text-muted mt-5 mb-0 border border-primary border-2 rounded p-2 shadow">
                      Already have an account?{" "}
                      <button>
                        <Link
                          to="/login"
                          className=" btn btn-dark fw-bold text-decoration-none text-white w-auto"
                        >
                          Login here
                        </Link>
                      </button>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default Registration;
