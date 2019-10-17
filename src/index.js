import React from "react";
import ReactDOM from "react-dom";
import "./index.css";




class Rank extends React.Component{

  render(){
    const workers = this.props.workers;
    
    const ranking = workers.sort(
      (a, b) => {
        return b.point - a.point
      }
    ).map((worker, index) => {
      const style1 = {
        background: '#adeaf2',
        width:worker.point*20+'px',
        height:'22px' 
      }
      return (
        <li key={index} >
          {worker.name} <p style={style1}>{worker.point}</p> 
        </li>
      );
    });


    return (
      <div className="ranking-display">
         <ol>
           {ranking}
         </ol>
      </div>
    )
  }
}


class Complain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
        reporter: '袁晓强',
       content: ' ',
       suspect: '袁晓强'
       
    }
  }
  
  render() {
    const workers = this.props.workers;
    
    return (
      
      <div className="complain">
        
        <div>
          <label htmlFor="reporter">举报人：</label>
          <select id="reporter" value={this.state.reporter} onChange={e => {this.setState({reporter:e.target.value})}}>
            {workers.map(
    (worker) => {
      return <option key={worker.name} value={worker.name}>{worker.name}</option>
    }
  )}
          </select>
          </div>
          <div>
          <label>投诉问题：</label>
          <input id="content" value={this.state.content} onChange={e => {this.setState({content:e.target.value})}}></input>
          </div>
          <div>
          <label htmlFor="suspect">被投诉人：</label>
          <select id="suspect" value={this.state.suspect} onChange={e => {this.setState({suspect:e.target.value})}}>
            {workers.map(
    (worker) => {
      return <option key={worker.name} value={worker.name}>{worker.name}</option>
    }
  )}
          </select>
          </div>
          <button onClick={() => this.props.onClick(this.state.reporter, this.state.content, this.state.suspect)}>submit</button>
              </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workers: [
        {name:'陈科明',point:10},
        {name:'伍丽清',point:10},
        {name:'蔡雅雯',point:10},
        {name:'袁晓强',point:10},
        {name:'伍景锋',point:10},
        {name:'钟关旺',point:10},
        {name:'陈艺华',point:10},
        {name:'黎勇建',point:10},
        {name:'许传红',point:10},
      ],
      complain:{
        id: 0,
        reporter: '',
       content: '',
       suspect: '',
       time: new Date()
      }
    }
  }

  
  handleClick(reporter, content, suspect){
    
    const workers = this.state.workers.slice();
    workers.forEach((worker) => {
      if(worker.name === reporter){
        worker.point = worker.point+0.5
      }
      if(worker.name === suspect){
        worker.point = worker.point-1
      }

    })
    this.setState(
      {
        workers: workers
      }
    )
 }

  render() {
    const workers = this.state.workers;
    return (
      <div className="game">
        
        
          <Rank workers={workers}/>
        
        <div className="complaint">
          <Complain workers={workers} onClick={(reporter, content, suspect) => {this.handleClick(reporter, content, suspect)}}/>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
