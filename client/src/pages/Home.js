import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import FlatButton from 'material-ui/FlatButton';
import {hashHistory} from 'react-router';
import '../Forecast.css';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  tabs: {
      width: "80%",
      margin: "auto",
  },
};

class Home extends React.Component {  
    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.state = {
            userName: "",
            password: "",
        };
    }

    handleUserNameChange(e) {
        this.setState({userName: e.target.value});
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }

    handleLoginClick(e) {
        let userNameValue = this.state.userName;
        let passwordValue = this.state.password;
        hashHistory.push('/login/' + userNameValue + '/' + passwordValue);
        e.preventDefault();
    }

    render(){
        return(
            <div>
                <h1>Please login or register!</h1>
                <Tabs style={styles.tabs}>
                    <Tab label="Login" >
                        <div>
                            <form>
                                <p>Username: </p><input type="text" onChange={this.handleUserNameChange}/>
                                <p>Password: </p><input type="password" />
                                <p><a href="/forgotpw">Forgot password</a></p>
                                <br />
                                <FlatButton label="Login" primary={true} onTouchTap={this.handleLoginClick}/>
                           </form>
                        </div>
                    </Tab>
                    <Tab label="Register" >
                        <div>
                            <h2 style={styles.headline}>Tab Two</h2>
                            <form>
                                <p>Username: </p><input type="text" />
                                <p>Password: </p><input type="password" />
                                <p>Confirm Password: </p><input type="password" />
                                <p>First Name: </p><input type="text" />
                                <p>Last Name: </p><input type="text" />
                                <p>E-mail: </p><input type="text" />
                                <p>Phone: </p><input type="text" />

                                <br />

                            </form>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default Home;