import * as React from "react";
import { Image, tokens, makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
  welcome__header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "20px",
    backgroundColor: "white",
    paddingLeft: "10px",
    paddingRight: "10px",
  },
  message: {
    fontSize: "clamp(1.2rem, 2vw + 0.5rem, 1.5rem)", // min 16px, scale ikut viewport, max ~40px
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralBackgroundStatic, // betulkan daripada fontColor → color
    textAlign: "center",
    fontWeight: tokens.fontWeightBold,
    paddingTop: "15px",
  },
});

const Header = (props) => {
  const { title, logo, message } = props;
  const styles = useStyles();

  return (
    <section className={styles.welcome__header}>
      <Image width="300" src={logo} alt={title} />
      <div>
        <h1 className={styles.message}>{message}</h1>
      </div>
    </section>
  );
};

export default Header;
