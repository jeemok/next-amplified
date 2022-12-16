
import React from "react";
import { Auth } from "aws-amplify";
import { Divider, Menu, MenuItem } from "@aws-amplify/ui-react";

export default function Header() {
  return (
    <header style={{ background: "black", height: 100, color: "white" }}>
      <img
        src="https://lms.gift-ed.com/static/gifted_theme/images/logo.60ca24482602.png"
        style={{ maxHeight: 60, margin: "20px 20px 0 40px" }}
      />

      <span
        style={{
          fontSize: "0.8rem",
          letterSpacing: "0.05rem",
          display: "inline-block",
          verticalAlign: "top",
          margin: "40px 20px",
        }}
      >
        REFERRAL
      </span>
      <span
        style={{
          fontSize: "0.8rem",
          letterSpacing: "0.05rem",
          display: "inline-block",
          verticalAlign: "top",
          margin: "40px 20px",
        }}
      >
        LEADERBOARD
      </span>
      <span
        style={{
          fontSize: "0.8rem",
          letterSpacing: "0.05rem",
          display: "inline-block",
          verticalAlign: "top",
          margin: "40px 20px",
        }}
      >
        SUPPORT
      </span>

      <div style={{ float: "right", margin: 30 }}>
        <Menu
          menuAlign="end"
          trigger={
            <div style={{ cursor: "pointer" }}>
              <img
                src="https://lms.gift-ed.com/static/images/profiles/default_50.3455a6581573.png"
                style={{ maxWidth: 40, marginRight: 10, borderRadius: 5 }}
              />
              <span
                style={{
                  verticalAlign: "top",
                  marginTop: 10,
                  display: "inline-block",
                }}
              >
                Mok
              </span>
            </div>
          }
        >
          <MenuItem onClick={() => alert("Resume")}>
            Resume your last course
          </MenuItem>
          <MenuItem onClick={() => alert("Dashboard")}>Dashboard</MenuItem>
          <MenuItem onClick={() => alert("Account")}>Account</MenuItem>
          <MenuItem onClick={() => alert("Profile")}>Profile</MenuItem>
          <Divider />
          <MenuItem onClick={() => Auth.signOut()}>Sign Out</MenuItem>
        </Menu>
      </div>
    </header>
  );
}
