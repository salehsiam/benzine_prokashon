import React from "react";

import logo from "./../assets/logo.png";
import { Link } from "react-router-dom";
import RegisterForm from "../components/modules/Authentication/RegisterForm";

const Register = () => {
  return (
    <div className="grid min-h-svh">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <div className="flex justify-center gap-2 ">
              <Link to="/" className="flex items-center gap-2 font-medium">
                <img src={logo} alt="Benzine Logo" width={42} height={42} />
              </Link>
            </div>
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
