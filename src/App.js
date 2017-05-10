import React, { Component } from 'react';
import './App.css';
import { LineChart, Line, ResponsiveContainer, CartesianGrid } from 'recharts';

const regExp = new RegExp("^\/?$|[0-9\b]+");

export default class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      str: '',
      data: [],
      isCliked: [false,false],
      style: {
        flex: 1
      }
    }
  }

  handleSubmit = (event) => {
    const date = new Date();
    const current_date = date.getMinutes() + ':' + date.getSeconds() + ':' + date.getMilliseconds();
    if (this.state.str){
      this.setState((state) => ({
        str: '',
        data: state.data.concat({name: date.getTime() , uv: parseInt(state.str)})
      }));
    }
    
    event.preventDefault();
  }

  handleChange = (event) => {
    if (regExp.test(event.target.value))
      this.setState({
        str: event.target.value
      })
    else event.target.value = '';
  }

  handleClick = (index) => {
    this.setState((state) => ({
      isCliked: state.isCliked.map((el, i) => {
        if (i !== index) return el
        else  return !el
      })
    }));
  }

  resizeWrapper = (arr) => {
    if (arr[0] && arr[1]) return "charter_container_clicked"
    else if (arr[0] || arr[1]) return "charter_container_clicked_mid"
    else return "charter_container_notClicked"
  }

  changeDirectionBtn = (bol, direction) => {
    if (bol){
      if (direction == "left") return "right_triangle btn_margin_l"
      if (direction == "right") return "left_triangle btn_margin_r"
    }
    else {
      if (direction == "left") return "left_triangle"
      if (direction == "right") return "right_triangle"
    } 
  }


  deleteEl = (index) => {
    this.setState((state) => ({
      data: state.data.filter((el,ind) => ind !== index)
    }));
  }

  render() {
    return (
      <div className={"wrapper " + this.resizeWrapper(this.state.isCliked)}>
        <button className={"hide-btn btn_left " + this.changeDirectionBtn(this.state.isCliked[0], "left")} 
                onClick={this.handleClick.bind(this, 0)}>
        </button>
        <button className={"hide-btn btn_right " + this.changeDirectionBtn(this.state.isCliked[1], "right")}
                onClick={this.handleClick.bind(this, 1)}>
        </button>
        <div className={this.resizeWrapper(this.state.isCliked)}>
          <div className="charts">
            <ResponsiveContainer>
              <LineChart data={this.state.data}>
                <CartesianGrid/>
                <Line isAnimationActive={false}  type="monotone" dataKey="uv" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="data">
          <h1>Data</h1>
          <form onSubmit={this.handleSubmit}>
            <input value={this.state.str} onChange={this.handleChange} type='text'/>
          </form>
          <p>List of values</p>
          <ul className="data_list">
            {this.state.data.map((el,i) => 
              <li key={i}>
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
