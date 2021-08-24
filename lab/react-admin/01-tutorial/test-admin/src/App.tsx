import { Admin, Resource, ListGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

// data source
const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

// Admin component
const App = () => (
  <Admin dataProvider={dataProvider}> 

    {/* 
    1. Fetch the record with the name as  "users" from ${dataProvider}/users URL
    2. and list the record using ListGuesser component to display it */}
    <Resource name="users" list={ListGuesser} />

  </Admin>
  
  );

export default App;
