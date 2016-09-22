import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { bindActionCreators } from 'redux';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';

import { renderDatePicker } from './helpers/FormComponents';
import * as workoutActions from '../actions/workoutActions';

class WorkoutsPage extends React.Component {
  constructor(props) {
    super(props);


    this.onClickSave = this.onClickSave.bind(this);
  }


  onClickSave() {
    this.props.actions.createWorkout(this.state.workout);
    // alert(`Saving ${this.state.workout.date}`);
  }

  render() {
    return (<div className="wrapper">
      <h1>Add Workout</h1>
      <form className="wrapper">
        <div>
        <Field name="date" component={renderDatePicker} label="Workout Date" />
        </div>
        <div className="loadingButton">
          <RaisedButton
            label="Save"
            primary
            onClick={this.onClickSave}
          />
        </div>
      </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'WorkoutForm',
  initialValues: { date: new Date() },
})(WorkoutsPage));
