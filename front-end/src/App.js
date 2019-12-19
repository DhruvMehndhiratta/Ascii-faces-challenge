import React, { Component } from 'react';
import './App.css';
import { Row, Col, Container } from 'react-bootstrap';


class App extends Component {
  state = {
    faces: []
  }
  componentDidMount() {
    fetch('http://localhost:3000/products').then(resp => resp.json()).then(faces => {
      this.setState({
        faces
      })
    })
  }

  render() {
    const { faces = [] } = this.state;
    console.log(faces, "faces")
    return (
      <Container>
        <Row className='m-0'>
          {
            faces.length ? faces.map((item, i) => {
              return <Col sm={4} md={3} lg={2} xs={6} key={i}>
                <div className='demo'>
                  <div className='overlay' style={{ fontSize: `${item.size} px` }}>{item.face}</div>
                  <h6 className='text-center  my-2'>{`$${item.price}`}</h6>
                </div>
              </Col>
            }) : null
          }
        </Row>
      </Container>
    );
  }
}

export default App;
