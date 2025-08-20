import * as React from "react";
import { useState } from "react";
import { Button, Field, Textarea, tokens, makeStyles } from "@fluentui/react-components";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  instructions: {
    fontWeight: tokens.fontWeightSemibold,
    marginTop: "20px",
    marginBottom: "10px",
  },
  textPromptAndInsertion: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  textAreaField: {
    marginLeft: "20px",
    marginTop: "30px",
    marginBottom: "20px",
    marginRight: "20px",
    maxWidth: "50%",
  },
});

const TextInsertion = (props) => {
  const [text, setText] = useState("Some text.");

  async function applyTemplateMargin(template) {
    await Word.run(async (context) => {
      const selection = context.document.getSelection();
      const paragraphs = selection.paragraphs;
      paragraphs.load("items");
      await context.sync();

      let leftIndent = 0;
      let rightIndent = 0;

      // Template margin style
      if (template === "narrow") {
        leftIndent = 18; // ~0.25 inch (18 points)
        rightIndent = 18;
      } else if (template === "wide") {
        leftIndent = 72; // ~1 inch (72 points)
        rightIndent = 72;
      } else if (template === "extra-wide") {
        leftIndent = 144; // ~2 inch
        rightIndent = 144;
      }

      paragraphs.items.forEach((p) => {
        p.leftIndent = leftIndent;
        p.rightIndent = rightIndent;
      });

      await context.sync();
    });
  }

  const apply = (template) => {
    applyTemplateMargin(template);
  };

  const handleTextInsertion = async () => {
    await props.insertText(text);
  };

  const handleTextChange = async (event) => {
    setText(event.target.value);
  };

  const styles = useStyles();

  return (
    <div className={styles.textPromptAndInsertion}>
      <Field
        className={styles.textAreaField}
        size="large"
        label="Enter text to be inserted into the document."
      >
        <Textarea size="large" value={text} onChange={handleTextChange} />
      </Field>
      <Field className={styles.instructions}>Click the button to insert text.</Field>
      <Button appearance="primary" disabled={false} size="large" onClick={handleTextInsertion}>
        Insert text
      </Button>

      <h3>Pilih Template Margin</h3>
      <button onClick={() => apply("narrow")}>Narrow (0.25")</button>
      <button onClick={() => apply("wide")}>Wide (1")</button>
      <button onClick={() => apply("extra-wide")}>Extra Wide (2")</button>
    </div>
  );
};

export default TextInsertion;
