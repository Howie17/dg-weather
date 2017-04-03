import React from 'react';
//import request from 'request';
import {Tabs, Tab} from 'material-ui/Tabs';
import FlatButton from 'material-ui/FlatButton';
//import {hashHistory} from 'react-router';
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
        this.handleRegisterClick = this.handleRegisterClick.bind(this);
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
        //let userNameValue = this.state.userName;
        //let passwordValue = this.state.password;

        /*
        request.post('/login', {json: {key: 'value'}}, function(err, res, body){
            console.log('Login request sent.');
            if(!err && res.statusCode === 200){
                console.log(body);
            }
        });
        */
        e.preventDefault();
    }

    handleRegisterClick(e) {
        //let userNameValue = this.state.userName;
        //let passwordValue = this.state.password;
        //request.post('/register');
        e.preventDefault();
    }

    render(){
        return(
            <div>
                <h1>Please login or register!</h1>
                <Tabs style={styles.tabs}>
                    <Tab label="Login" >
                        <div>
                            <form action="http://localhost:3001/api/login" method="post">
                                <p>Username: </p><input type="text" onChange={this.handleUserNameChange} name="username"/>
                                <p>Password: </p><input type="password" name="password"/>
                                <p><a href="/forgotpw">Forgot password</a></p>                                  {/*todo: pw reset*/}
                                <br />
                                <FlatButton type="submit" label="Login" primary={true} />
                           </form>
                        </div>
                    </Tab>
                    <Tab label="Register" >
                        <div>
                            <h2 style={styles.headline}>Tab Two</h2>
                            <form action="/register" method="post" onSubmit={this.handleRegisterClick}>
                                <p>Username: </p><input type="text" name="username" />
                                <p>Password: </p><input type="password" name="password" />
                                <p>Confirm Password: </p><input type="password" name="confirmpassword" />
                                <p>First Name: </p><input type="text" name="firstname" />
                                <p>Last Name: </p><input type="text" name="lastname" />
                                <p>E-mail: </p><input type="text" name="email" />
                                <p>Phone: </p><input type="text" name="phone" />
                                <br />
                                <FlatButton type="submit" label="Register" primary={true} onTouchTap={this.handleRegisterClick}/>
                            </form>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default Home;