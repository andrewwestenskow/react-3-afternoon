import React, { Component } from 'react';

import './Search.css';

import SearchIcon from 'react-icons/lib/md/search';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {

  state = {
    text: ''
  }

handleText = (text) => {
  this.setState({
    text: text
  })
}

handleSearch = (text) => {
  this.props.searchText(text)
}

allowEnter = (event) => {
  if(event.keyCode === 13) {
    this.handleSearch(this.state.text)
  }
}

  render() {
    return (
      <section className="Search__parent">

        <div className="Search__content">
          <input 
          placeholder="Search Your Feed"
          onChange={e => this.handleText(e.target.value)} 
          onKeyDown={event => this.allowEnter(event)}
          value={this.state.tex}/>

          <SearchIcon onClick={() => this.handleSearch(this.state.text)} id="Search__icon" />
        </div>
        
      </section>
    )
  }
}