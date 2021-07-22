import React, { useEffect, useState, useCallback } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import util from 'util';



function User(props:{userId:string}): JSX.Element  {
  console.log('User');
  const [user, setUser] = useState({ name: '', email: '' });

  // 更新 user工作 function:
  // 每次 render 都會重新 create function
  const fetchUser = async () => {
    console.log('fetchUser props.userId = ' + props.userId);
    const res = await fetch(
          `https://jsonplaceholder.typicode.com/users/${props.userId}`
    );
    const newUser = await res.json();
    setUser(newUser);    // <-- 會產生 render 事件
 };    

  //console.log('fetchUser ref = ' + util.inspect(fetchUser, false, null, true /* enable colors */))
  debugger;
  useEffect(() => {
    console.log('useEffect fetchUser = ' + fetchUser);
    fetchUser();        
  }, [fetchUser]);   // <<---- 因為每次 render 後, fetchUser 的 reference 都不一樣, 
                     // 因此, 就算是 userId 沒有變動也會執行 useEffect 裡面的 fetchUser. 而且是無限循環.        
                    

  return (
    <ListItem dense divider>
      <ListItemText primary={user.name} secondary={user.email} />
    </ListItem>
  );
}

export default User;