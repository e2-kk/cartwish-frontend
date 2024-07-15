import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./LoginPage.css";
import { z } from "zod";
import { getUser, login, signup } from "../../services/userServices";

import { zodResolver } from "@hookform/resolvers/zod";
import { Navigate, useLocation } from "react-router-dom";

const schema = z.object({
  email: z
    .string()
    .email({ message: "Please enter valis email address." })
    .min(3),
  password: z
    .string()
    .min(8, { message: "Password should be at least 8 characters" }),
});

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const [formError, setformError] = useState("");

  const location = useLocation();
  console.log("Login location", location);

  const onSubmit = async (formData) => {
    try {
      await login(formData);

      const { state } = location;

      window.location = state ? state.from : "/";
    } catch (err) {
      if (err.response && err.response.status === 400) {
        //console.log(err.response);
        setformError(err.response.data.message);
      }
    }
  };
  if (getUser()) {
    return <Navigate to="/" />;
  }
  return (
    <section className="align_center form_page">
      <form className="authentication_form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Login Form</h2>
        <div className="form_inputs">
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form_text_input"
              placeholder="Enter your name"
              {...register("email")}
            ></input>
            {errors.email && (
              <em className="form_error"> {errors.email.message}</em>
            )}
            {errors.name?.type === "minLength" && (
              <em className="form_error">
                Name should be 3 or more characters
              </em>
            )}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form_text_input"
              placeholder="Enter your password"
              {...register("password")}
            ></input>
            {errors.password && (
              <em className="form_error"> {errors.password.message}</em>
            )}
          </div>
          {formError && <em className="form_error">{formError}</em>}
          <button type="submit" className="search_button form_submit">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
