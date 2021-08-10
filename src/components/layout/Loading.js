import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default class Loading extends React.Component {

	render() {
		return (
			<div className="loader" >
      	<CircularProgress size={200} thickness={1.5} style={{ display: 'flex', margin: 'auto' }} color="secondary" />
			</div>
		);
	}
}
