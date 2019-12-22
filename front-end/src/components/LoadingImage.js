//File Name: LoadingImage.js
//Path: src/components/common
//Description: this component is used to show Loading image when image of card is not fully loaded on screen 
import React, { Fragment } from 'react';

export default class LoadingImage extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    //FunctionName:imageLoaded
    //Description:This function used to handle and show an dummy image until image from backend is loaded
    imageLoaded = () => {
       this.setState({
           loading:false
       })
    }
    
    render() {
        const { loading } = this.state;
        let { src='' } = this.props;
        return (
            <div>
                <img
                    src={src}
                    onLoad={this.imageLoaded}
                />
                {loading ? <img
                    src={require('../assets/images/loader.gif')}
                   
                /> : null}
            </div>
        )
    }
}