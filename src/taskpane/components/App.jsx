import * as React from "react";

//templates formatting files
import Header from "./Header";
import CoverPage from "./Formatting Templates/CoverPage";
import SecondCoverPage from "./Formatting Templates/SecondCoverPage";
import DeclarationOfOriginality from "./Formatting Templates/DeclarationOfOriginality";

import { makeStyles } from "@fluentui/react-components";
import { Ribbon24Regular, LockOpen24Regular, DesignIdeas24Regular } from "@fluentui/react-icons";

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
  },
});

const App = (props) => {
  const { title } = props;
  const styles = useStyles();
  // The list items are static and won't change at runtime,
  // so this should be an ordinary const, not a part of state.
  const listItems = [
    {
      icon: <Ribbon24Regular />,
      primaryText: "Achieve more with Office integration",
    },
    {
      icon: <LockOpen24Regular />,
      primaryText: "Unlock features and functionality",
    },
    {
      icon: <DesignIdeas24Regular />,
      primaryText: "Create and visualize like a pro",
    },
  ];

  return (
    <div className={styles.root}>
      <Header logo="assets/uptmlogo.png" title={title} message="UPTM REPORT FORMATTING" />
      <CoverPage></CoverPage>
      <SecondCoverPage></SecondCoverPage>
      <DeclarationOfOriginality></DeclarationOfOriginality>
      {/* <HeroList message="Discover what this add-in can do for you today!" items={listItems} /> */}
      {/* <TextInsertion insertText={insertText} /> */}
    </div>
  );
};

export default App;
