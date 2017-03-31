import React from 'react';
import '../Nav.css';

const styles = {
    Footer: {
        "paddingTop": "20px",
    },
}

class Footer extends React.Component {
    render() {

        return (
            <div className="Footer" style={styles.Footer}>
                <p>Powered by <a href="https://darksky.net/poweredby/">Dark Sky</a>.</p>
            </div>
        );
    }
}

export default Footer;
