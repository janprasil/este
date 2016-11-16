import './style.css';
import React from 'react';
import ReactSlider from 'react-slider';

const containerStyle = {
  width: '100%',
};

const sliderStyle = {
  width: '80%',
  float: 'left',
};

const valuesStyle = {
  min: {
    float: 'left',
  },
  max: {
    float: 'right',
  },
  general: {
    width: '100%',
    float: 'left',
    height: '3px',
  },
};

const selectStyle = {
  width: '18%',
  float: 'left',
  marginLeft: '2%',
};

const LoanSlider = ({ interval, value, onChange }) => {
  const { defaultValue, max, min, step } = interval;
  const values = [];
  for (let i = min; i <= max; i += step) {
    values.push(<option value={i} key={i}>{i}</option>);
  }
  return (
    <div style={containerStyle}>
      <div style={sliderStyle}>
        <ReactSlider
          defaultValue={defaultValue}
          value={value}
          max={max}
          min={min}
          step={step}
          onChange={val => onChange(val)}
          className="custom-slider"
        />
        <div style={valuesStyle.general}>
          <span style={valuesStyle.min}>{min}</span>
          <span style={valuesStyle.max}>{max}</span>
        </div>
      </div>
      <div style={{ selectStyle }}>
        <select value={value} onChange={event => onChange(event.target.value)}>
          {values}
        </select>
      </div>
    </div>
  );
};

LoanSlider.propTypes = {
  interval: React.PropTypes.object,
  value: React.PropTypes.number,
  onChange: React.PropTypes.func,
};

export default LoanSlider;
