import React, { useEffect, useState, useCallback } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import util from 'util';



function User(props:{userId:string}): JSX.Element  {
  console.log('User');
  const [user, setUser] = useState({ name: '', email: '' });

  // 宣告更新 user工作 function (用 useCallback 包裝成  memorized callback function)
  const fetchUser = useCallback(async () => {
      console.log('fetchUser props.userId = ' + props.userId);
      const res = await fetch(
            `https://jsonplaceholder.typicode.com/users/${props.userId}`
      );
      const newUser = await res.json();
      setUser(newUser);    // <-- 會產生 render 事件
   }, [props.userId]);     // <<---- 因為 userID 不會變動, 因此 fetchUser 的內容不會變動
                           // 即 featchUser 回傳的 callback function 不會改變內容

  console.log('fetchUser ref = ' + util.inspect(fetchUser, false, null, true /* enable colors */))
  
  useEffect(() => {
    console.log('useEffect fetchUser = ' + fetchUser);
    fetchUser();        
  }, [fetchUser]);   // <<---- 因為 fetchUser 沒有變動, 所以 fetchUser 只會在 userId 變換時, 才呼叫         
                    

  return (
    <ListItem dense divider>
      <ListItemText primary={user.name} secondary={user.email} />
    </ListItem>
  );
}

export default User;