import React, { Component } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import loader from '../assets/images/loader.gif';
import { connect } from 'react-redux';
import actions from '../actions';
import { Filters, LoadingImage } from '../components';


class Homepage extends Component {
  constructor(props) {
    super(props);
    this.trackScrolling = this.trackScrolling.bind(this);
    this.state = {
      apiData: {
        page: 1,
        limit: 100,
        sort: ""
      }
    }
  }

  componentDidMount() {
    document.addEventListener("scroll", this.trackScrolling);
    this.props.dispatch(actions.getProducts(this.state.apiData))
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.trackScrolling);
  }

  trackScrolling = () => {
    const { apiData } = this.state;
    const { page, limit } = apiData;
    const { products = [] } = this.props.products;
    if (products.length < 525) {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        this.setState({
          apiData: {
            ...apiData,
            page: page + 1,
            limit: limit
          }
        }, () => this.props.dispatch(actions.getProducts(this.state.apiData)))
      }
    }
  }

  handleSorting = key => {
    const { apiData } = this.state;
    const updatedData = {
      ...apiData,
      page: 1,
      limit: 100,
      sort: key
    }
    this.props.dispatch(actions.emptyProducts())


    this.setState({
      apiData: updatedData
    }, () => this.props.dispatch(actions.getProducts(updatedData)))
  }

  handleLoad = () => {
    console.log("handle load")
  }

  render() {
    const { products = [], fetching = false } = this.props.products;
    const { apiData } = this.state;
    return (
      <Container className='homepage-container'>
        <Row className='m-0'>
          <div className='filters'>
            <Filters
              handleSorting={this.handleSorting}
              sortOption={apiData && apiData.sort || ""}
            />
          </div>
          {
            products && products.length ? products.map((item, i) => {
                return (
                  <React.Fragment key={i}>
                    {item.src ? <Col sm='12' md='12' className='text-center'>
                      {/* <img src={item.src} onLoad={this.handleLoad} /> */}
                      <LoadingImage  src={item.src} />
                    </Col> : <Col sm={3} xs={6} key={i}>
                      <div className='card-design'>
                        <div className='overlay' style={{ fontSize: `${item.size} px` }}>{item.face}</div>
                        <h6 className='text-center  my-2'>{`$${item.price}`}</h6>
                      </div>
                    </Col>}
                  </React.Fragment>
                )
                }) : null
          }
          {
            fetching ? <React.Fragment>
              {
                [...Array(100)].map((item, i) => {
                  return <Col sm={3} xs={6} key={i}>
                    <div className='card-design border-0'>
                      <img style={{ height: "50px", width: "50px" }} src={loader} alt='loading image' />
                    </div>
                  </Col>
                })

              }
            </React.Fragment> : null
          }
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return ({
    products: state.products
  })
}
export default connect(mapStateToProps)(Homepage)