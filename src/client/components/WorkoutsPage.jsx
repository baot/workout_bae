import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';

import * as workoutActions from '../actions/workoutActions';

class WorkoutsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      workout: { date: null },
    };

    this.onDateChange = this.onDateChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
  }

  workoutRow(workout, index) {
    return <div key={index}>{workout.date.toString()}</div>;
  }

  onDateChange(event, date) {
    const workout = this.state.workout;
    workout.date = date;
    this.setState({ workout });
  }

  onClickSave() {
    this.props.actions.createWorkout(this.state.workout);
    // alert(`Saving ${this.state.workout.date}`);
  }

  render() {
    return (<div>
      <h1>Workouts!!</h1>
      {this.props.workouts.map(this.workoutRow)}
      <h2>Add Workout</h2>
      <DatePicker
        value={this.state.workout.date}
        onChange={this.onDateChange}
      />
      <RaisedButton
        label="Save"
        primary={true}
        onClick={this.onClickSave}
      />
    </div>);
  }
}

WorkoutsPage.propTypes = {
  actions: PropTypes.shape().isRequired,
  workouts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return {
    workouts: state.workouts,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(workoutActions, dispatch),
    // createWorkout: workout => dispatch(workoutActions.createWorkout(workout)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutsPage);
