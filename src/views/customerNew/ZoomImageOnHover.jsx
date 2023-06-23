import React from "react";

const src = "https://images.unsplash.com/photo-1444065381814-865dc9da92c0";

class Zoom extends React.Component {
  state = {
    backgroundImage: `url(${src})`,
    backgroundPosition: "0% 0%",
  };

  handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    this.setState({ backgroundPosition: `${x}% ${y}%` });
  };

  render = () => (
    <figure onMouseMove={this.handleMouseMove} style={this.state}>
      <img src={src} />
    </figure>
  );
}

export default Zoom;

// ReactDOM.render(<Zoom />, document.getElementById("zoomImageroot"));
