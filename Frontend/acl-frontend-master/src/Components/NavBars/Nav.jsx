import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import HRNav from "./hrNav";
import HODNav from "./hodNav";
import CCNav from "./ccNav";
import CINav from "./ciNav";
import StaffMemberNav from "./staffMemberNav";

const Nav = () => {
  const token = localStorage.getItem("user");
  const [role, setrole] = useState("");
  let decoded = null;
  const navbar = () => {
    if (!token) {
      return <></>;
    } else {
      if (role === "HR") {
        return (
          <>
            <HRNav />
          </>
        );
      } else if (role === "HOD") {
        return <HODNav />;
      } else if (role === "CC") {
        return <CCNav />;
      } else if (role === "CI") {
        return <CINav />;
      }
    }
  };
  useEffect(() => {
    if (token) {
      decoded = jwt_decode(token);
      setrole(decoded.role);
      console.log(role);
    }
  }, []);

  return (
    <>
      {role == "HR" ? (
        <HRNav />
      ) : role == "CC" ? (
        <CCNav />
      ) : role == "CI" ? (
        <CINav />
      ) : role == "HOD" ? (
        <HODNav />
      ) : role == "TA" ? (
        <StaffMemberNav />
      ) : null}
    </>
  );
};

export default Nav;
