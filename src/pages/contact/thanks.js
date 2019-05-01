import React from "react";
import withLayout from "../../components/withLayout";

const Thanks = () => (
  <section className="section">
    <div className="container">
      <div className="content">
        <h1>お問い合わせありがとうございました!</h1>
        <p>お返事は基本的に1日で行います！</p>
      </div>
    </div>
  </section>
);

export default withLayout(Thanks, "お問い合わせありがとうございました");
