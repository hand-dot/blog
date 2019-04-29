import React, { Component } from "react";
import PropTypes from "prop-types";
import lottie from "lottie-web";
class Animation extends Component {
  componentDidMount() {
    const {
      data,
      immediate = false,
      speed = 1,
      delay = 500,
      onComplete = () => {}
    } = this.props;

    this.lottie = lottie.loadAnimation({
      container: this.container,
      renderer: "svg",
      loop: false,
      autoplay: immediate,
      animationData: data
    });
    this.lottie.setSpeed(speed);
    this.lottie.addEventListener("complete", () => {
      if (!immediate) {
        setTimeout(() => {
          onComplete();
        }, delay);
      } else {
        onComplete();
      }
    });
    if (!immediate) {
      setTimeout(() => {
        this.lottie.play();
      }, delay);
    }
  }
  render() {
    return (
      <div
        style={{ ...this.props.style }}
        ref={node => (this.container = node)}
      />
    );
  }
}

Animation.propTypes = {
  immediate: PropTypes.bool,
  speed: PropTypes.number,
  delay: PropTypes.number,
  onComplete: PropTypes.func,
  data: PropTypes.object.isRequired
};

export default Animation;
