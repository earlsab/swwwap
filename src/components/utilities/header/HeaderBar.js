import React from "react";
import phoneIcon from "@/utils/images/phoneIcon.png";
import Image from "next/image";
import Button from "../button/Button";
import styles from "./HeaderBar.module.css"; // Corrected import statement

const HeaderBar = ({ texts , imageSrc }) => {
    const handleClick = () => {
        alert('Button clicked!');
      };
    return (
        <div className={styles.header}>
            { imageSrc === 'phone' ? (
                <>
                    <Image 
                    src={phoneIcon} 
                    alt="Phone Icon"
                    width={50}
                    height={25}
                    />  
                </>
                
            ) : (
                <>
                    <Image 
                    src="/fire.svg" 
                    alt="Phone Icon"
                    width={50}
                    height={25}
                    />  
                </>
                
            )}
            
            <h1>{texts}</h1>
            <Button variant="outlined" onClick={handleClick} text="View more" />
        </div>
    );
};

export default HeaderBar;
