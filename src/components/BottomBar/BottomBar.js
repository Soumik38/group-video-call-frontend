import React, { useCallback } from 'react';
import styled from 'styled-components';

const BottomBar = ({
  clickChat,
  clickCameraDevice,
  goToBack,
  toggleCameraAudio,
  userVideoAudio,
  clickScreenSharing,
  screenShare,
  videoDevices,
  showVideoDevices,
  setShowVideoDevices
}) => {
  const handleToggle = useCallback(
    (e) => {
      setShowVideoDevices((state) => !state);
    },
    [setShowVideoDevices]
  );

  return (
    <Bar>
      <Center>
        <Button onClick={toggleCameraAudio} data-switch='video'>
          <div>
            {userVideoAudio.video ? (
              <FaIcon className='fas fa-video'></FaIcon>
            ) : (
              <FaIcon className='fas fa-video-slash'></FaIcon>
            )}
          </div>
        </Button>
        
        <Button onClick={toggleCameraAudio} data-switch='audio'>
          <div>
            {userVideoAudio.audio ? (
              <FaIcon className='fas fa-microphone'></FaIcon>
            ) : (
              <FaIcon className='fas fa-microphone-slash'></FaIcon>
            )}
          </div>
        </Button>
      
        <Button onClick={clickChat}>
          <div>
            <FaIcon className='fas fa-comments'></FaIcon>
          </div>
        </Button>
        <Button onClick={clickScreenSharing}>
          <div>
            <FaIcon
              className={`fas fa-upload ${screenShare ? 'sharing' : ''}`}
            ></FaIcon>
          </div>
        </Button>
      
        <Stop onClick={goToBack}>
          <div>
            <FaIcon className='fas fa-phone'></FaIcon>
          </div>
        </Stop>
      </Center>
    </Bar>
  );
};

const Bar = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 8%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
`;

const Center = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;



const FaIcon = styled.i`
  width: 30px;
  font-size: calc(16px + 1vmin);
`;

const Stop = styled.div`
position: relative;
width: 75px;
border: none;
font-size: 0.9375rem;
padding: 5px;

:hover {
  background-color: #ff0000;
  cursor: pointer;
  border-radius: 15px;
}

* {
  pointer-events: none;
}
`;

const Button = styled.div`
  position: relative;
  width: 75px;
  border: none;
  font-size: 0.9375rem;
  padding: 5px;

  :hover {
    background-color: #77b7dd;
    cursor: pointer;
    border-radius: 15px;
  }

  * {
    pointer-events: none;
  }

  .fa-microphone-slash {
    color: #ee2560;
  }

  .fa-video-slash {
    color: #ee2560;
  }

  .sharing {
    color: #00ff00;
  }

`;


export default BottomBar;