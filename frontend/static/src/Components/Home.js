import React from 'react'


class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <div className="welcome">
          <h1>Welcome</h1>
        </div>
        <div className="left-home">
          <h2>What is SweetSpot?</h2>
          <p><span>SweetSpot</span> is a note taking tool for the FGC, allowing players and coaches to create Notes on their VODs. Just like timestamps on Youtube, users are able to attach comments to specific times in their VODs, creating a relation between their analysis and their gameplay.</p>
        </div>
        <div className="right-home">

        </div>
      </div>
    )
  }
}


export default Home
