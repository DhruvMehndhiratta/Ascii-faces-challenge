import React, { Component } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import loader from './assets/images/loader.gif'

class App extends Component {
  state = {
    faces: [],
    loading:false
  }
  componentDidMount() {
    this.setState( {loading:true})
    fetch('http://localhost:3000/products').then(resp => resp.json()).then(faces => {
      this.setState({
        faces,
        loading:false
      })
    }).catch(err =>  this.setState({ loading: false }))
  }

  render() {
    const { faces = [], loading } = this.state;
    return (
      <Container>
        <Row className='m-0'>
          {
           !loading ?  faces.length ? faces.map((item, i) => {
              return <Col sm={4} md={3} lg={2} xs={6} key={i}>
                <div className='demo'>
                  <div className='overlay' style={{ fontSize: `${item.size} px` }}>{item.face}</div>
                  <h6 className='text-center  my-2'>{`$${item.price}`}</h6>
                </div>
              </Col>
            }) : null :  <React.Fragment>  {
                  [...Array(500)].map((item)=> {
                    return <Col sm={4} md={3} lg={2} xs={6}>
                    <div className='demo border-0'>
                      <img style={{ height:"50px" , width:"50px"}} src={loader}/>
                    </div>
                  </Col>
                  })
                 
                }
                </React.Fragment>

            

          }
        </Row>
      </Container>
    );
  }
}

export default App;
