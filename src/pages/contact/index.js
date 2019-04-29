import "whatwg-fetch";
import React from "react";
import { navigateTo } from "gatsby-link";
import withLayout from "../../components/withLayout";
import Page from "../../components/Page";

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

class ContactPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isValidated: false };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...this.state
      })
    })
      .then(() => navigateTo(form.getAttribute("action")))
      .catch(error => alert(error));
  };

  render() {
    return (
      <Page
        title="Contact"
        description="質問やリクエストなど、お気軽にどうぞ！"
      >
        <form
          name="contact"
          method="post"
          action="/contact/thanks/"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={this.handleSubmit}
        >
          {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
          <input type="hidden" name="form-name" value="contact" />
          <div hidden>
            <label>
              Don’t fill this out:{" "}
              <input name="bot-field" onChange={this.handleChange} />
            </label>
          </div>
          <div className="field">
            <label className="label" htmlFor={"name"}>
              氏名
            </label>
            <div className="control">
              <input
                className="input"
                type={"text"}
                name={"name"}
                onChange={this.handleChange}
                id={"name"}
                required={true}
              />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor={"email"}>
              メールアドレス
            </label>
            <div className="control">
              <input
                className="input"
                type={"email"}
                name={"email"}
                onChange={this.handleChange}
                id={"email"}
                required={true}
              />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor={"message"}>
              メッセージ
            </label>
            <div className="control">
              <textarea
                className="textarea"
                name={"message"}
                onChange={this.handleChange}
                id={"email"}
                required={true}
              />
            </div>
          </div>
          <div className="field">
            <button className="button is-link" type="submit">
              送信
            </button>
          </div>
        </form>{" "}
      </Page>
    );
  }
}

export default withLayout(ContactPage, "コンタクト・リクエスト");
