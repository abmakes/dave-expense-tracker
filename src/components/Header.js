import React from 'react'

export default function Header() {

  return (
    <div className="App-home">
      <img className="track-image" src="./track.png" alt="track-expences"/>
      <h1 className="home-title box-brutal">SAVE DAVE</h1>
      <img src="./dave2.png" alt="dave-cant-save"/>
      <img className="help-image" src="./help.png" alt="dave-cant-save"/>
      <button className='button-brutal'>Let's go</button>
    </div>
  )
}