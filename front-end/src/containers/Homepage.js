import React, { Component } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import loader from '../assets/images/loader.gif';
import { connect } from 'react-redux';
import actions from '../actions';
import { Filters, LoadingImage, Header } from '../components';


const intervals = [
  { label: 'year', seconds: 31536000 },
  { label: 'month', seconds: 2592000 },
  { label: 'day', seconds: 86400 },
  { label: 'hour', seconds: 3600 },
  { label: 'minute', seconds: 60 },
  { label: 'second', seconds: 0 }
];

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

  timeSince = (date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    const interval = intervals.find(i => i.seconds < seconds);
    const count = Math.floor(seconds / interval.seconds);
    return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
  }

  renderDates = (date) => {
    let nowDate = new Date();
    let itemDate = new Date(date)
    const diffTime = Math.abs(nowDate - itemDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 7) {
      return `${itemDate.getDate()}-${(itemDate.getMonth() + 1)}-${itemDate.getFullYear()}`;
    }
    else {
      return `${this.timeSince(itemDate)}`
    }
  }

  render() {
    const { products = [], fetching = false } = this.props.products;
    const { apiData } = this.state;
    return (
      <div className='homepage'>
        <Header />
        <div className='homepage-container'>
        <Container className='mb-2'>
          <Row className='m-0'>
            <div className='filters'>
              <Filters
                handleSorting={this.handleSorting}
                sortOption={(apiData && apiData.sort) || ""}
              />
            </div>
            {
              products && products.length ? products.map((item, i) => {
                return (
                  <React.Fragment key={i}>
                    {item.src ? <Col sm='12' md='12' className='text-center'>
                      {/* <img src={item.src} onLoad={this.handleLoad} /> */}
                      <LoadingImage src={item.src} />
                    </Col> : <Col sm={4} md={4} xs={6} lg={3} key={i}>
                        <div className='card-design'>
                          <div className='overlay' style={{ fontSize: `${item.size} px` }}>{item.face}</div>
                          <div className='card-details'>
                            <div className="card-dates">
                              <h6 className=' demo'>{this.renderDates(item.date)}</h6>
                              <h6 className=' demo'>{`${item.id}`}</h6>
                            </div>
                            <div className='card-price'>
                              <h6 className='text-center  my-2 demo'>{`$${item.price}`}</h6>
                            </div>
                          </div>
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
                    return <Col sm={4} md={4} xs={6} lg={3} key={i}>
                      <div className='card-design border-0'>
                        <img style={{ height: "50px", width: "50px" }} src={loader} alt='loading item' />
                      </div>
                    </Col>
                  })

                }
              </React.Fragment> : null
            }
            {
              products && products.length === 525 ? <div className='end-catalogue'>
                <h6>~ end of catalogue ~</h6>
              </div> : null
            }
          </Row>
        </Container>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return ({
    products: state.products
  })
}
export default connect(mapStateToProps)(Homepage)