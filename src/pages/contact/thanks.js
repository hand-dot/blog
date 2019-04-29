import React from "react";
import withLayout from "../../components/withLayout";

export default () =>
  withLayout(
    <section className="section">
      <div className="container">
        <div className="content">
          <h1>ありがとうございました!</h1>
          <p>お返事は基本的に1日で行います！</p>
        </div>
      </div>
    </section>
  );
