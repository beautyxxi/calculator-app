//重复性的基础组件定义在这里

import React, { Component } from 'react';

class Base extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <div className="card" style={{marginTop: '20px'}}>
                    <div className="card-body">
                        <h5 className="card-title">{this.props.children}</h5>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default Base;