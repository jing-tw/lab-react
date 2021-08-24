import * as React from "react";
import { Admin } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

// data source
const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

// bootstrap
const App = () => <Admin dataProvider={dataProvider} />;
export default App;
