import React from 'react';
import Nav from '../Nav';
class Layout extends React.Component {
/*
    constructor() {
        super();

    }
*/
    render() {
        return (
            <div>
                <Nav />

                {this.props.children}
            </div>
        );
    }
}

export default Layout;