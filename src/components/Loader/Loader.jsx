import React, { useLayoutEffect, useState } from "react";
import "./Loader.css"; // assuming you have your font applied there
import { Container } from "react-bootstrap";

const Title = () => {
  return (
    <Container
      fluid
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="loader-main"></div>
      <div className="logo-loader">
        <b>
          B<span>a</span>by<span>h</span>ug<span>S</span>
        </b>
      </div>
    </Container>
  );
};

export default Title;
