import React, { Component } from 'react';
import './App.css';
import { LineChart, Line } from 'recharts';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      str: '',
      data: []
    }
  }

  handleSubmit = (event) => {
    let date = new Date()
    let current_date = date.getMinutes() + ':' + date.getSeconds() + ':' + date.getMilliseconds()
    this.setState({
      str: '',
      data: this.state.data.concat({name: current_date, uv: parseInt(this.state.str)})
    });
    event.preventDefault();
  }

  handleChange = (event) => {
    this.setState({
      str: event.target.value
    })
  }

  deleteEl = (index) => {
    this.setState({
      data: this.state.data.filter((el,ind) => ind !== index)
    })
  }

  render() {
    return (
      <div className="wrapper">
        <div className="charter_container">
          <div className="charts">
            <LineChart width={400} height={400} data={this.state.data}>
              <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            </LineChart>
          </div>
        </div>
        <div className="data">
          <h1>Data</h1>
          <form onSubmit={this.handleSubmit}>
            <input value={this.state.str} onChange={this.handleChange} type='text'/>
          </form>
          <p>List of values</p>
          <ul className="data_list">
            {this.state.data.map((el,i) => <li key={i}>
                                        {el.name}
                                        <span> {el.uv}</span>
                                        <button className='btn' onClick={this.deleteEl.bind(this, i)}>
                                          Remove
                                        </button>
                                      </li>)}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
