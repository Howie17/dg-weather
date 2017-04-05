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
            this.props.onWindChange(value);
        } else if (value > 40) {
            this.props.onWindChange(40);
        }
    }

    handleIdealMinTemp(e){
        this.props.onMinTempChange(e.target.value);
    }

    handleIdealMaxTemp(e){
        this.props.onMaxTempChange(e.target.value);
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
                        defaultValue={12}
                        min={1}
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
                    defaultValue={60}
                    min={-5}
                    max={110}
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
                    defaultValue={80}
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

    handleUnplayWind(e){
        this.props.onWindChange(e.target.value);
    }

    handleUnplayMinTemp(e){
        this.props.onMinTempChange(e.target.value);
    }

    handleUnplayMaxTemp(e){
        this.props.onMaxTempChange(e.target.value);
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
                        defaultValue={28}
                        min={1}
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
                    defaultValue={25}
                    min={-5}
                    max={110}
                    step={1}
                    axis="y-reverse"
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
                    defaultValue={105}
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
                <div style={styles.root}>
                    <TextField
                        value={this.props.playWind}
                        onChange={this.handlePlayWind}
                        name="playMaxWind"
                    />   
                    <Slider
                        defaultValue={27}
                        min={1}
                        max={40}
                        step={1}
                        axis="x"
                        disabled={true}
                        value={this.props.playWind}
                    />
                    <p>Min Temp (F): </p>
                    <TextField
                        value={this.props.playMinTemp}
                        onChange={this.handlePlayMinTemp}
                        name="playMaxWind"
                    />   
                    <Slider
                        defaultValue={26}
                        min={-5}
                        max={110}
                        step={1}
                        axis="y-reverse"
                        disabled={true}
                        value={this.props.playMinTemp}
                    />
                </div>
                <p>Max Temp (F): </p>
                <TextField
                    value={this.props.playMaxTemp}
                    onChange={this.handlePlayMaxTemp}
                    name="playMaxTemp"
                />   
                <Slider
                    defaultValue={104}
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
    handleIdealMaxTempSlider = (event, value) => {
        this.setState({idealMaxTemp: value});
    };

    handleIdealMinTempSlider = (event, value) => {
        this.setState({idealMinTemp: value});
    };
    handleIdealWindSlider = (event, value) => {
        this.setState({idealWind: value});
        console.log(event.target);
        console.log(value);
    };

    handleUnplayMaxTempSlider = (event, value) => {
        this.setState({unplayMaxTemp: value});
        this.setState({playMaxTemp: value - 1});
    };
    handleUnplayMinTempSlider = (event, value) => {
        this.setState({unplayMinTemp: value});
        this.setState({playMinTemp: value + 1});
    };

    handleUnplayWindSlider = (event, value) => {
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
            <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
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
                    <div style={{marginTop: 12}}>
                        <FlatButton
                            label="Back"
                            disabled={stepIndex === 0}
                            onTouchTap={this.handlePrev}
                            style={{marginRight: 12}}
                        />
                        <RaisedButton
                            label="Next"
                            disabled={stepIndex === 2}
                            primary={true}
                            onTouchTap={this.handleNext}
                        />
                        <RaisedButton
                            label="Save Changes"
                            primary={true}
                            onTouchTap={this.handleNext}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Preferences;

