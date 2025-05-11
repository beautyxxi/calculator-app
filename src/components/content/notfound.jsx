import React, { Component } from 'react';
import Base from './base';

class NotFound extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <Base>
                    404 Not Found
                </Base>
            </React.Fragment>
        );
    }
}
 
export default NotFound;