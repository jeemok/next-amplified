import Image from "next/image";
import React from "react";
import styles from "../../styles/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div style={{ textAlign: 'center'}}>
        <a
          href="https://www.gift-ed.com/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ height: 72 }}
        >
          <span className={styles.logo}>
            <Image
              src="https://lms.gift-ed.com/static/gifted_theme/images/logo.60ca24482602.png"
              alt="GIFTed Logo"
              width={72}
              height={72}
            />
          </span>
        </a>

        <div>About | Blog | Contact us</div>

        <div>insta | youtube</div>

        <div>GIFT.ed. © 2022 All rights reserved.</div>

        <div>
          <span style={{ margin: "0 10px" }}>Terms & Conditions</span>
          <span style={{ margin: "0 10px" }}>Privacy Policy</span>
        </div>
      </div>
    </footer>
  );
}
