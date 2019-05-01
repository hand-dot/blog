import React from "react";
import withLayout from "../../components/withLayout";
import Page from "../../components/Page";
import UnderDevelopment from "../../components/UnderDevelopment";

const ApiPage = () => (
  <Page
    title="About"
    description="サブプロジェクトや開発スキルを記載しています。"
  >
    <UnderDevelopment />
  </Page>
);

export default withLayout(ApiPage, "紹介");
