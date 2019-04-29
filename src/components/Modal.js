import React from "react";
export default ({
  open,
  title,
  onClose,
  actionLabel,
  onAction,
  onCancel,
  cancelLabel,
  children
}) => (
  <div className={`modal ${open ? "is-active" : ""}`} style={{ zIndex: 9999 }}>
    <div className="modal-background" />
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">{title}</p>
        <button className="delete" aria-label="close" onClick={onClose} />
      </header>
      <section className="modal-card-body">{children}</section>
      <footer
        className="modal-card-foot"
        style={{ flexDirection: "row-reverse" }}
      >
        <button className="button is-success" onClick={onAction}>
          {actionLabel}
        </button>
        {onCancel && cancelLabel && (
          <button className="button" onClick={onCancel}>
            {cancelLabel}
          </button>
        )}
      </footer>
    </div>
  </div>
);
