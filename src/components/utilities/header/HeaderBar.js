import React from "react";
import phoneIcon from "@/utils/images/phoneIcon.png";
import Image from "next/image";
import Button from "../button/Button";
import styles from "./HeaderBar.module.css"; // Corrected import statement

const HeaderBar = (props) => {
    const handleClick = () => {
        alert('Button clicked!');
      };
    return (
        <div className={styles.header}> {/* Corrected CSS class name */}
            <Image 
                src={phoneIcon} 
                alt="Phone Icon"
                width={50}
                height={25}
            />
            <h1>Featured</h1>
            <Button variant="outlined" onClick={handleClick} text="View more" />
        </div>
    );
};

export default HeaderBar;
