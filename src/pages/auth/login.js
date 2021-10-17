import Button from "../../components/base/button";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../configs/redux/actions/userActions";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Formik } from "formik";
import * as yup from "yup";
import Input from "../../components/base/input";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const validatingSchema = yup.object({
    password: yup
      .string()
      .min(8, "Password must be at least 8 charaters!")
      .required("Password is required"),
    email: yup.string().email("Email is invalid").required("Email is required"),
  });

  return (
    <div className="pt-10">
      <ToastContainer draggable={false} transition={Zoom} autoClose={4000} />
      <div className="w-11/12 lg:w-1/3 bg-white mx-auto py-5 lg:py-10 rounded-lg h-full flex flex-col px-8 lg:px-16">
        <h3 className="text-center font-rubic text-2xl font-medium text-indigo-300">
          Login
        </h3>
        <span className="font-rubic text-sm font-normal my-8">
          Hi, Welcome back!
        </span>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validatingSchema}
          onSubmit={(values, { resetForm }) => {
            dispatch(login(values, history));
            resetForm();
          }}
        >
          {({ errors, touched, handleChange, handleBlur, values, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Input
                type="text"
                name="email"
                placeholder="Email"
                giveClass="border-b mt-4"
                label="Email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && errors.email && (
                <div className="text-xs text-red-500">{errors.email}</div>
              )}
              <Input
                name="password"
                type="password"
                placeholder="Password"
                giveClass="border-b mt-8"
                label="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password && errors.password && (
                <div className="text-xs text-red-500">{errors.password}</div>
              )}
              <Button
                type="submit"
                title="Login"
                giveClass="mt-6"
                buttonClass="bg-indigo-400 hover:bg-indigo-500 focus:outline-none text-white text-base"
              />
              <p className="bg-white text-black text-center">Login with</p>
              <Button
                type="button"
                title="Google"
                giveClass="mt-6"
                logo
                buttonClass="focus:outline-none hover:bg-gray-200 text-base border text-indigo-400"
              />
            </Form>
          )}
        </Formik>
        <p className="mt-8 font-rubic text-sm font-medium">
          Don’t have an account?{" "}
          <Link to="/register" className="text-indigo-400 font-normal">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
