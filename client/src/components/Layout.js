import React from 'react';
import Nav from './Nav';
import Footer from './Footer';

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
                <Footer />
            </div>
        );
    }
}

export default Layout;