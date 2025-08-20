import React, { memo } from "react";

import { Image, tokens, makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
  wrapper: {
    alignItems: "center",
    // backgroundColor: "blue",
    paddingLeft: "10px",
    paddingRight: "10px",
    display: "flex",
    marginTop: "15px",
  },
  cover: {
    paddingLeft: "10px",
    fontSize: "clamp(1.3rem, 2vw + 0.5rem, 1.5rem)", // min 16px, scale ikut viewport, max ~40px
    fontWeight: tokens.fontWeightBold,
  },
  wrapperButtonCover: {
    paddingLeft: "20px",
    display: "flex",
    flexDirection: "column",
    width: "80%",
    gap: "10px",
  },

  buttonCover: {
    height: "35px",
  },
});

async function applyTemplateMargin(template) {
  await Word.run(async (context) => {
    const selection = context.document.getSelection();
    const paragraphs = selection.paragraphs;
    selection.load("text");
    paragraphs.load("items");
    await context.sync();

    let leftIndent = 0;
    let rightIndent = 0;
    let fontSize = 0;
    let spacingAfter = 0;
    let spacingBefore = 0;

    const upperText = selection.text.toUpperCase();

    // Template margin style
    if (template === "projectTitle") {
      leftIndent = 18; // ~0.25 inch (18 points)
      rightIndent = 18;
      fontSize = 20;
      spacingBefore = 30;
      spacingAfter = 250;
    } else if (template === "studentName") {
      leftIndent = 72; // ~1 inch (72 points)
      rightIndent = 72;
      fontSize = 20;
      spacingAfter = 280;
    } else if (template === "UPTM") {
      leftIndent = 144; // ~2 inch
      rightIndent = 144;
      fontSize = 20;
      spacingAfter = 0;
    }

    paragraphs.items.forEach((p) => {
      p.font.bold = true;
      p.font.size = fontSize;
      p.alignment = Word.Alignment.centered;
      p.font.name = "Arial";
      p.spaceAfter = spacingAfter;
      p.spaceBefore = spacingBefore;
      selection.font.italic = false;
      selection.font.underline = "None";
      selection.insertText(upperText, "Replace");
    });

    await context.sync();
  });
}

const CoverPage = memo((props) => {
  const styles = useStyles();

  const apply = (template) => {
    applyTemplateMargin(template);
  };
  return (
    <>
      <div className={styles.wrapper}>
        <h1 className={styles.cover}>Most-front Cover</h1>
      </div>
      <div className={styles.wrapperButtonCover}>
        <button onClick={() => apply("projectTitle")} className={styles.buttonCover}>
          PROJECT TITLEEEEE
        </button>
        <button className={styles.buttonCover} onClick={() => apply("studentName")}>
          STUDENT NAME
        </button>
        <button className={styles.buttonCover} onClick={() => apply("UPTM")}>
          UPTM TITLE
        </button>
      </div>
    </>
  );
});

export default CoverPage;
