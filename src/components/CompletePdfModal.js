import React from "react";
import { Link } from "gatsby";
import Modal from "./Modal";
import Animation from "./Animation";
import Share from "./Share";
import Divider from "./Divider";
import happybirthday from "../assets/animations/happybirthday.json";

export default ({ open, onClose, onAction }) => (
  <Modal
    open={open}
    title="PDFが完成しました！"
    onClose={onClose}
    actionLabel="保存する"
    onAction={onAction}
  >
    <div>
      {open ? (
        <Animation
          data={happybirthday}
          style={{
            width: "50%",
            height: "50%",
            margin: "0 auto"
          }}
        />
      ) : null}
      <p className="is-size-7" style={{ margin: "1.5rem 0" }}>
        <strong>
          labelmake.jpを使ってくれてありがとう！
          <br />
          あとは「保存する」ボタンを押して印刷してください！
          <br />
          <br />
          最後にお願いが2つだけ...
          <br />
          <br />
          ①サービスを改善していくために右のフィードバックや
          <Link to="/contact">コンタクト</Link>
          から感想、アイデア、提案などを送って欲しいです！
          <br />
          ②気に入ってくれたらぜひお友達にシェアしてください！
        </strong>
      </p>
      <Divider getterBottom />
      <Share center />
    </div>
  </Modal>
);
