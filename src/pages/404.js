import React from "react";
import { Link } from "gatsby";
import withLayout from "../components/withLayout";
import Page from "../components/Page";

const NotFoundPage = () => (
  <>
    <Page title="404" description="ページが存在しません。">
      <Link to="/">Topに戻る</Link>
    </Page>
  </>
);
export default withLayout(NotFoundPage);
