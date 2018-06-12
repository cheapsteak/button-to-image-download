import React from "react";
import ReactDOM from "react-dom";
import { css } from "react-emotion";
import html2canvas from "html2canvas";
import downloadjs from "downloadjs";
import { Divider, Form, Label, Button, Input } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import "./index.css";

const canvasToDataUrl = canvas =>
  canvas
    .toDataURL("image/png", { backgroundColor: null })
    .replace(/^data:image\/[^;]/, "data:application/octet-stream");

const styles = {
  big: css`
    font-size: 26px;
    padding: 20px 30px;
    border-radius: 12px;
  `,
  small: css`
    font-size: 13px;
    padding: 4px 22px;
    border-radius: 8px;
  `
};

class App extends React.Component {
  state = {
    text: "Link Button",
    buttonSize: "big"
  };

  downloadImage = async () => {
    html2canvas(this.buttonEl).then(canvas => {
      const dataUrl = canvasToDataUrl(canvas);
      downloadjs(dataUrl, `button-${this.state.buttonSize}.png`);
    });
  };

  render() {
    return (
      <Form
        className={
          "App " +
          css`
            font-family: Roboto;
            padding-top: 30px;
          `
        }
      >
        <div
          className={css`
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            margin-bottom: 20px;
          `}
        >
          <Input
            fluid
            className={css`
              width: 30em;
              max-width: calc(100% - 50px);
            `}
            type="text"
            label="Button Text"
            placeholder="Button Text"
            value={this.state.text}
            onChange={e => this.setState({ text: e.target.value })}
            action
          >
            <input />

            <Button
              onClick={() => this.setState({ buttonSize: "big" })}
              active={this.state.buttonSize === "big"}
            >
              Large
            </Button>
            <Button
              onClick={() => this.setState({ buttonSize: "small" })}
              active={this.state.buttonSize === "small"}
            >
              Small
            </Button>
          </Input>
        </div>
        <div
          ref={buttonEl => (this.buttonEl = buttonEl)}
          className={css`
            background-image: linear-gradient(
              to right,
              rgb(239, 103, 37),
              rgb(236, 54, 116)
            );
            color: #fff;
            font-weight: 700;
            display: inline-block;
            ${styles[this.state.buttonSize]};
          `}
        >
          {this.state.text.replace(/ /g, "\u00A0")}
        </div>

        <div
          className={css`
            margin-top: 20px;
          `}
        >
          <Button onClick={this.downloadImage}>Download as image</Button>
        </div>
      </Form>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
