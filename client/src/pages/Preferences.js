import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Slider from 'material-ui/Slider';
import {
  Step,
  Stepper,
  StepButton,
} from 'material-ui/Stepper';
import TextField from 'material-ui/TextField';
import '../Forecast.css';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 125,
  },
  slide: {
    padding: 10,
  },
  day: {
      p: {
          color: "DimGray",
      },
  },
  table: {
      width: "80%",
      margin: "auto",
  },
  tableRowColumn: {
      width: "225px",
  },
};

class ContentIdealCond extends React.Component {  
    constructor(props){
        super(props);
        this.handleIdealWind=this.handleIdealWind.bind(this);
        this.handleIdealMinTemp=this.handleIdealMinTemp.bind(this);
        this.handleIdealMaxTemp=this.handleIdealMaxTemp.bind(this);
        
    }    

    handleIdealWind(e, value){
        if (value >= 0 && value <= 40) {
            this.props.onWindChange(Number(value));
        } else if (value > 40) {
            this.props.onWindChange(40);
        } else if (value < 0) {
            this.props.onWindChange(0);
        } else {
            console.log("Invalid input: Please input a value between 0 - 40.");
        }
    }

    handleIdealMinTemp(e, value){
        if (value >= 0 && value <= 70) {
            this.props.onMinTempChange(Number(value));
        } else if (value > 70) {
            this.props.onMinTempChange(70);
        } else if (value < 0) {
            this.props.onMinTempChange(0);
        } else {
            console.log("Invalid input: Please input a value between 0 - 70.");
        }
    }

    handleIdealMaxTemp(e, value){
        if (value >= 0 && value <= 120) {
            this.props.onMaxTempChange(Number(value));
        } else if (value > 120) {
            this.props.onMaxTempChange(120);
        } else if (value < 0) {
            this.props.onMaxTempChange(0);
        } else {
            console.log("Invalid input: Please input a value between 0 - 120.");
        }
    }

    render(){
        let IdealWind = this.props.idealWind;

        return(
            <div style={styles.root}>
                <p>Max Wind (Mph): </p>
                <div>
                    <TextField
                        value={IdealWind}
                        onChange={this.handleIdealWind}
                        name="idealMaxWind"
                    /> 
                    <Slider
                        min={0}
                        max={40}
                        step={1}
                        axis="x"
                        value={this.props.idealWind}
                        onChange={this.handleIdealWind}
                    />
                </div>
                <p>Min Temp (F): </p>
                <TextField
                    value={this.props.idealMinTemp}
                    onChange={this.handleIdealMinTemp}
                    name="idealMinTemp"
                />
                <Slider
                    min={0}
                    max={70}
                    step={1}
                    axis="y-reverse"
                    value={this.props.idealMinTemp}
                    onChange={this.handleIdealMinTemp}
                />
                <p>Max Temp (F): </p>
                <TextField
                    value={this.props.idealMaxTemp}
                    onChange={this.handleIdealMaxTemp}
                    name="idealMaxTemp"
                />
                <Slider
                    min={0}
                    max={120}
                    step={1}
                    axis="y"
                    value={this.props.idealMaxTemp}
                    onChange={this.handleIdealMaxTemp}
                />
            </div>
        );
    }
}

class ContentUnplayCond extends React.Component {  
    constructor(props){
        super(props);
        this.handleUnplayWind=this.handleUnplayWind.bind(this);
        this.handleUnplayMinTemp=this.handleUnplayMinTemp.bind(this);
        this.handleUnplayMaxTemp=this.handleUnplayMaxTemp.bind(this);
    }    

    handleUnplayWind(e, value){
        if (value >= 0 && value <= 40) {
            this.props.onWindChange(Number(value));
        } else if (value > 40) {
            this.props.onWindChange(40);
        } else if (value < 0) {
            this.props.onWindChange(0);
        } else {
            console.log("Invalid input: Please input a value between 0 - 40.");             //todo: client-side error handling
        }
    }

    handleUnplayMinTemp(e, value){
        if (value >= -10 && value <= 65) {
            this.props.onMinTempChange(Number(value));
        } else if (value > 65) {
            this.props.onMinTempChange(65);
        } else if (value < -10) {
            this.props.onMinTempChange(-10);
        } else {
            console.log("Invalid input: Please input a value between -10 - 65.");
        }
    }

    handleUnplayMaxTemp(e, value){
        if (value >= 0 && value <= 120) {
            this.props.onMaxTempChange(Number(value));
        } else if (value > 120) {
            this.props.onMaxTempChange(120);
        } else if (value < 0) {
            this.props.onMaxTempChange(0);
        } else {
            console.log("Invalid input: Please input a value between 0 - 120.");
        }
    }
    render(){

        return(
            <div style={styles.root}>
                <p>Max Wind (Mph): </p>
                <div>
                    <TextField
                            value={this.props.unplayWind}
                            onChange={this.handleUnplayWind}
                            name="idealMaxWind"
                    />        
                    <Slider
                        min={0}
                        max={40}
                        step={1}
                        axis="x"
                        value={this.props.unplayWind}
                        onChange={this.handleUnplayWind}
                    />
                </div>
                <p>Min Temp (F): </p>
                <TextField
                        value={this.props.unplayMinTemp}
                        onChange={this.handleUnplayMinTemp}
                        name="idealMaxWind"
                />   
                <Slider
                    min={-10}
                    max={65}
                    step={1}
                    axis="y"
                    value={this.props.unplayMinTemp}
                    onChange={this.handleUnplayMinTemp}
                />
                <p>Max Temp (F): </p>
                <TextField
                        value={this.props.unplayMaxTemp}
                        onChange={this.handleUnplayMaxTemp}
                        name="idealMaxWind"
                />   
                <Slider
                    min={0}
                    max={120}
                    step={1}
                    axis="y"
                    value={this.props.unplayMaxTemp}
                    onChange={this.handleUnplayMaxTemp}
                />
            </div>
        );
    }
}

class ContentPlayCond extends React.Component {    

    render(){

        return(
            <div style={styles.root}>
                <p>Max Wind (Mph): </p>
                <div>
                    <TextField
                        value={this.props.playWind}
                        disabled={true}
                        name="playMaxWind"
                    />   
                    <Slider
                        min={0}
                        max={40}
                        step={1}
                        axis="x"
                        disabled={true}
                        value={this.props.playWind}
                    />
                </div>
                    <p>Min Temp (F): </p>
                    <TextField
                        value={this.props.playMinTemp}
                        disabled={true}
                        name="playMaxWind"
                    />   
                    <Slider
                        min={-10}
                        max={70}
                        step={1}
                        axis="y"
                        disabled={true}
                        value={this.props.playMinTemp}
                    />
                <p>Max Temp (F): </p>
                <TextField
                    value={this.props.playMaxTemp}
                    disabled={true}
                    name="playMaxTemp"
                />   
                <Slider
                    min={0}
                    max={120}
                    step={1}
                    axis="y"
                    disabled={true}
                    value={this.props.playMaxTemp}
                />
            </div>
        );
    }
}

class Preferences extends React.Component {  
    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
        this.getStepContent = this.getStepContent.bind(this);
        this.handleIdealMaxTempSlider = this.handleIdealMaxTempSlider.bind(this);
        this.handleIdealMinTempSlider = this.handleIdealMinTempSlider.bind(this);
        this.handleIdealWindSlider = this.handleIdealWindSlider.bind(this);
        this.handleUnplayMaxTempSlider = this.handleUnplayMaxTempSlider.bind(this);
        this.handleUnplayMinTempSlider = this.handleUnplayMinTempSlider.bind(this);
        this.handleUnplayWindSlider = this.handleUnplayWindSlider.bind(this);
        this.state = {
            finished: false,
            stepIndex: 0,
            idealMaxTemp: 85,
            idealMinTemp: 60,
            idealWind: 12,
            unplayMaxTemp: 110,
            unplayMinTemp: 25,
            unplayWind: 25,
            playMaxTemp: 109,
            playMinTemp: 26,
            playWind: 24,
        };
    }
    
    //Data Changes
    handleIdealMaxTempSlider(value) {
        this.setState({idealMaxTemp: value});
    };

    handleIdealMinTempSlider(value) {
        this.setState({idealMinTemp: value});
    };
    handleIdealWindSlider(value) {
        this.setState({idealWind: value});
    };

    handleUnplayMaxTempSlider(value) {
        this.setState({unplayMaxTemp: value});
        this.setState({playMaxTemp: value - 1});
    };
    handleUnplayMinTempSlider(value) {
        this.setState({unplayMinTemp: value});
        this.setState({playMinTemp: value + 1});
    };

    handleUnplayWindSlider(value) {
        this.setState({unplayWind: value});
        this.setState({playWind: value - 1});
    };

    //Step Navigation
    handleNext = () => {
        const {stepIndex} = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2,
        });
    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };

    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return <ContentIdealCond
                            idealMaxTemp={this.state.idealMaxTemp}
                            idealMinTemp={this.state.idealMinTemp}
                            idealWind={this.state.idealWind}
                            onMaxTempChange={this.handleIdealMaxTempSlider}
                            onMinTempChange={this.handleIdealMinTempSlider}
                            onWindChange={this.handleIdealWindSlider}
                        />;
            case 1:
                return <ContentUnplayCond
                            unplayMaxTemp={this.state.unplayMaxTemp}
                            unplayMinTemp={this.state.unplayMinTemp}
                            unplayWind={this.state.unplayWind}
                            onMaxTempChange={this.handleUnplayMaxTempSlider}
                            onMinTempChange={this.handleUnplayMinTempSlider}
                            onWindChange={this.handleUnplayWindSlider}
                        />;
            case 2:
                return <ContentPlayCond
                            playMaxTemp={this.state.playMaxTemp}
                            playMinTemp={this.state.playMinTemp}
                            playWind={this.state.playWind}
                        />;
            default:
                return 'Error: Refresh the page and try again!';
        }
    }

    render(){
        const {stepIndex} = this.state;
        const contentStyle = {margin: '0 16px'};

        return(
            <div style={{width: '100%', maxWidth: 700, margin: 'auto', "background-color": "#303030", color: "#808080"}}>
                <Stepper linear={false} activeStep={stepIndex}>
                    <Step>
                        <StepButton onClick={() => this.setState({stepIndex: 0})}>
                        Set Ideal Playing Conditions
                        </StepButton>
                    </Step>
                    <Step>
                        <StepButton onClick={() => this.setState({stepIndex: 1})}>
                        Set Unplayable Conditions
                        </StepButton>
                    </Step>
                    <Step>
                        <StepButton onClick={() => this.setState({stepIndex: 2})}>
                        Resulting Playable Conditions
                        </StepButton>
                    </Step>
                </Stepper>
                <div style={contentStyle}>
                    {this.getStepContent(stepIndex)}
                    <div style={{marginTop: 75}}>
                        <FlatButton
                            label="Back"
                            disabled={stepIndex === 0}
                            onTouchTap={this.handlePrev}
                            style={{marginLeft: "25%", marginRight: 12}}
                        />
                        <RaisedButton
                            label="Next"
                            disabled={stepIndex === 2}
                            primary={true}
                            onTouchTap={this.handleNext}
                            style={{marginRight: 12}}
                        />
                        <RaisedButton
                            label="Save Changes"
                            primary={true}
                            onTouchTap={this.handleNext}
                            style={{marginRight: 12}}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Preferences;

