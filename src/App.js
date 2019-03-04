import React, { Component } from "react";
import { Button, Card, Collapse, Container, Row, Col } from "react-bootstrap";
import logo from "./logo.svg";
import "./App.css";

class FluzCarouselItem extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      nextActive: false
    };

    this.isActive = this.isActive.bind(this);
  }

  isActive() {
    return this.props.activeIndex === this.props.index;
  }

  render() {
    const zIndex = {
      zIndex:
        (this.props.zIndexPrioty + this.props.activeIndex) %
        this.props.zIndexLength
    };
    const className = this.isActive()
      ? "fluz-carousel-item "
      : "fluz-carousel-item fluz-carousel-item-next";
    return (
      <div className={className} style={zIndex}>
        <Card>
          <Card.Img variant="top" src={this.props.imgSrc} />
          <Card.Body>
            <Card.Text>
              You earned {this.props.earn}
              <br />
              from {this.props.user}
            </Card.Text>
            <Card.Img
              variant="bottom"
              src={this.props.logoSrc}
              className="carousel-item-logo"
            />
          </Card.Body>
        </Card>
      </div>
    );
  }
}

class FluzCarousel extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      activeIndex: 0,
      length: props.contents.length
    };

    this.next = this.next.bind(this);
  }

  componentDidMount() {
    setInterval(this.next, 2000);
  }

  next(event) {
    const { activeIndex, length } = this.state;
    const newActiveIndex = (activeIndex + 1) % length;
    this.setState({ activeIndex: newActiveIndex, length: length });
  }

  render() {
    return (
      <div className="fluz-carousel">
        {this.props.contents.map((item, index) => (
          <FluzCarouselItem
            index={index}
            activeIndex={this.state.activeIndex}
            imgSrc={item.imgSrc}
            logoSrc={item.logoSrc}
            earn={item.earn}
            user={item.user}
          />
        ))}
      </div>
    );
  }
}

const contents = [
  {
    imgSrc: "3rd-section/feed/itunes/itunes.jpg",
    logoSrc: "3rd-section/feed/itunes/apple-itunes.svg",
    earn: "$1.12",
    user: "fluzmaster21"
  },
  {
    imgSrc: "3rd-section/feed/nike/nike.jpg",
    logoSrc: "3rd-section/feed/nike/nike.svg",
    earn: "$0.91",
    user: "highlife18"
  },
  {
    imgSrc: "3rd-section/feed/panera/panera.jpg",
    logoSrc: "3rd-section/feed/panera/panera-bread.svg",
    earn: "$0.82",
    user: "breezy36"
  },
  {
    imgSrc: "3rd-section/feed/starbucks/starbucks.jpg",
    logoSrc: "3rd-section/feed/starbucks/starbucks.svg",
    earn: "$0.79",
    user: "connected26"
  }
];

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false
    };
  }

  render() {
    const { open } = this.state;
    return (
      <div className="App">
        <Container>
          <Row>
            <Col md={6}>
            <div>
              <FluzCarousel contents={contents} />
              </div>
            </Col>
            <Col md={6} >
              <div className="header-wrap">
                <h5 id="header-1">EARN FOR BEING SOCIAL</h5>
                <h1 id="header-2">Strength In Numbers</h1>
                <p id="header-3">
                  The little things add up. We use dozens of apps to connect to
                  each other and to brands. At Fluz, we’re trying to bridge the
                  two. Our mission is to connect as many shoppers as possible,
                  so that earning money becomes as easy as spending it.
                </p>
                <div className="toggle-box">

                  <img
                      className="button-icon"
                      src="3rd-section/dollar-sign.svg"
                      alt="dollar-sign"
                  />
                  <Button
                    className="toggle-button"
                    variant="light"
                    onClick={() => this.setState({ open: !open })}
                    aria-controls="toggle-text"
                    aria-expanded={open}
                  >
                    Where's the money coming from?
                    <span style={{float: "right"}}>icon</span>
                  </Button>
                  <Collapse in={this.state.open}>
                    <div id="toggle-text">
                      Retailers pay Fluz to bring them customers, i.e. our
                      network of shoppers. We divide up that sum and distribute
                      it across the network.
                    </div>
                  </Collapse>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
