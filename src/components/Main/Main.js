import React, { useRef, useState, useEffect } from 'react';
import socket from '../../socket';
import './Main.css'

const Main = (props) => {
  const roomRef = useRef()
  const userRef = useRef()
  const [email,setEmail]=useState('')
  const [name,setName]=useState('')
  const [err, setErr] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const [loggedIn,setLoggedIn]=useState(false)

  useEffect(()=>{
		setEmail(JSON.parse(localStorage.getItem('myEmail')))
    setLoggedIn(localStorage.getItem('isLoggedIn'))
	},[setEmail])

  useEffect(() => {
		fetch(`https://group-call-backend.onrender.com/user/${email}`)
		  .then(response => response.json())
		  .then(data => {
			if (data.error) {
			  console.error(data.error);
			} else {
			  setName(data.name);
			}
		  })
		  .catch(error => console.error('Error fetching user by email:', error));
		  localStorage.setItem('myName', JSON.stringify(name))
	  }, [email,name])

  useEffect(() => {

    socket.on('FE-error-user-exist', ({ error }) => {
      if (!error) {
        const roomName = roomRef.current.value
        const userName = userRef.current.value

        sessionStorage.setItem('user', userName)
        props.history.push(`/room/${roomName}`)
      } else {
        setErr(error)
        setErrMsg('User name already exist')
      }
    })
  }, [props.history])

  function clickJoin() {
    const roomName = roomRef.current.value;
    const userName = userRef.current.value;
    console.log(roomName)
    console.log(userName)
    if (!roomName || !userName) {
      setErr(true);
      setErrMsg('Enter Room Name or User Name');
    } else {
      socket.emit('BE-check-user', { roomId: roomName, userName });
    }
  }

  return (
    <div className='body'>
      <div className='login-container'>
        {loggedIn && <h3>{name}</h3>}
        <div>
          <label>Room No.</label>
          <input type='text' id="roomName" ref={roomRef} placeholder='Enter Room No.'/>
          <div className={loggedIn ? 'none':''}>
            <label>Name</label>
            <input type="text" id="userName" ref={userRef} value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter Name'/>
          </div>
          <button  className='login-button' onClick={clickJoin}>Join</button>
          {err ? <div className='Error'>{errMsg}</div> : null}
        </div>
        <div className='mt-4'>
        <div>
          {!loggedIn ? <div className='additional-login'>
            <div className='login-button not-logged-in' onClick={()=>props.history.push('/signin')}>Sign In</div>
            <div className='login-button not-logged-in' onClick={()=>props.history.push('/signup')}>Sign Up</div>
          </div> :
            <span className='logout' onClick={()=>{
              props.history.push('/signin')
              localStorage.clear()
            }}>logout</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;