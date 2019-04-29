import React from "react";
import PropTypes from "prop-types";
import Divider from "./Divider";

const Page = ({
  title,
  titleImage,
  bgImage,
  description,
  children,
  divider = true
}) => (
  <section className="section section--gradient" style={{ padding: 0 }}>
    <div className="container">
      <div className="section" style={{ paddingTop: 0 }}>
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="content">
              <div
                className="full-width-image-container margin-top-0"
                style={
                  bgImage
                    ? {
                        backgroundImage: `url(${bgImage})`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center"
                      }
                    : {
                        background: "linear-gradient(90deg,#6c63ff,#4641ff)"
                      }
                }
              >
                {titleImage && (
                  <img
                    src={titleImage}
                    style={{
                      maxWidth: 350,
                      background: "#fff",
                      padding: "1rem 7rem"
                    }}
                    alt={title}
                  />
                )}
                <div style={{ textAlign: "center" }}>
                  {title && (
                    <h2
                      className="has-text-weight-nomal is-size-4"
                      style={{
                        color: "white",
                        padding: "0.5rem 2rem"
                      }}
                    >
                      {title}
                    </h2>
                  )}
                  <br />
                  {description && (
                    <p
                      className="has-text-weight-light is-size-6"
                      style={{ color: "white" }}
                    >
                      {description}
                    </p>
                  )}
                </div>
              </div>
              {divider && <Divider getterBottom />}
              <div style={{ paddingTop: "2rem" }} />
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

Page.propTypes = {
  title: PropTypes.string,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  description: PropTypes.string
};

export default Page;
