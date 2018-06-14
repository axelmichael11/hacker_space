
import React from 'react';
import {compose} from 'recompose'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

class Loader extends React.Component{
    constructor(props){
        super(props)
        this.state={
            limit:15000,
            start: this.props.start
        }
        this.tick = this.tick.bind(this)
    }
    componentWillMount(){

        // This is called before our render function. The object that is 
        // returned is assigned to this.state, so we can use it later.
        this.setState({elapsed: 0})
    }

    componentDidMount(){
        // componentDidMount is called by react when the component 
        // has been rendered on the page. We can set the interval here:
        this.timer = setInterval(this.tick, 50);
    }

    componentWillUnmount(){

        // This method is called immediately before the component is removed
        // from the page and destroyed. We can clear the interval here:
        console.log('unmoutning timer')
        clearInterval(this.timer);
    }

    tick(){

        // This function is called every 50 ms. It updates the 
        // elapsed counter. Calling setState causes the component to be re-rendered
        if (this.state.elapsed < this.state.limit){
            this.setState({elapsed: new Date() - this.state.start});
        } else {
            this.props.timeError()
        }
    }

    render(){
    const { classes } = this.props;
    console.log('LOADER', this.state,this.props)
        return (
            <div style={{textAlign:'center'}}>
                <CircularProgress style={{ color: "#000", textAlign:'center', margin:'auto'}} thickness={7} size={75}/>
                {this.state.elapsed}
            </div>
        );
    }
};



  export default Loader