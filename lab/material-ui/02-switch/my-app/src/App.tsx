import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

function App() {
  const [state, setState] = React.useState({
    checkedA: true,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div>
      <FormControlLabel
        label={state.checkedA ? "On" : "Off"}    // or label = {JSON.stringify(state.checkedA)}
        control = {<Switch
            checked={state.checkedA}
            onChange={handleChange}
            color="primary"
            name="checkedA"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />}
        />
    </div>
  );
}

export default App;
