import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import axios from "axios";

const api = axios.create({
  baseURL: "https://5da86761e44c790014cd4d84.mockapi.io"
});

class Rank extends React.Component {
  render() {
    const workers = this.props.workers;

    const ranking = workers
      .sort((a, b) => {
        return b.point - a.point;
      })
      .map((worker, index) => {
        const style1 = {
          background: "#adeaf2",
          width: worker.point * 20 + "px",
          height: "22px"
        };
        return (
          <li key={index}>
            {worker.name} <p style={style1}>{worker.point}</p>
          </li>
        );
      });

    return (
      <div className="ranking-display">
        <ol>{ranking}</ol>
      </div>
    );
  }
}

class Complain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reporter: "袁晓强",
      content: " ",
      suspect: "袁晓强"
    };
  }

  render() {
    const workers = this.props.workers;

    return (
      <div className="complain">
        <div>
          <label htmlFor="reporter">举报人：</label>
          <select
            id="reporter"
            value={this.state.reporter}
            onChange={e => {
              this.setState({ reporter: e.target.value });
            }}
          >
            {workers.map(worker => {
              return (
                <option key={worker.name} value={worker.name}>
                  {worker.name}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label>投诉问题：</label>
          <input
            id="content"
            value={this.state.content}
            onChange={e => {
              this.setState({ content: e.target.value });
            }}
          />
        </div>
        <div>
          <label htmlFor="suspect">被投诉人：</label>
          <select
            id="suspect"
            value={this.state.suspect}
            onChange={e => {
              this.setState({ suspect: e.target.value });
            }}
          >
            {workers.map(worker => {
              return (
                <option key={worker.name} value={worker.name}>
                  {worker.name}
                </option>
              );
            })}
          </select>
        </div>
        <button
          onClick={() =>
            this.props.onClick(
              this.state.reporter,
              this.state.content,
              this.state.suspect
            )
          }
        >
          submit
        </button>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workers: [],
      complain: {
        id: 0,
        reporter: "",
        content: "",
        suspect: "",
        time: new Date()
      }
    };
  }

  componentDidMount() {
    this.fetchWorkers();
  }

  async fetchWorkers() {
    const { workers } = await api.get("/workers");
    console.log(workers);
    const aa = await api.get("/workers").then(function(response) {
      return response.data;
    });
    // aa.forEach(item => {
    //   console.log(item.id);
    // });
    this.setState({
      workers: aa
    });
  }

  async updateWorker(worker) {
    await api
      .put("/workers/" + worker.id, {
        name: worker.name,
        point: worker.point,
        password: worker.password
      })
      .then(function(response) {
        return response.data;
      });
  }

  handleClick(reporter, content, suspect) {
    const workers = this.state.workers.slice();
    workers.forEach(worker => {
      if (worker.name === reporter) {
        worker.point = worker.point + 0.5;
        this.updateWorker(worker);
      }
      if (worker.name === suspect) {
        worker.point = worker.point - 1;
        this.updateWorker(worker);
      }
    });
    this.fetchWorkers();
  }

  render() {
    const workers = this.state.workers;
    return (
      <div className="game">
        <Rank workers={workers} />

        <div className="complaint">
          <Complain
            workers={workers}
            onClick={(reporter, content, suspect) => {
              this.handleClick(reporter, content, suspect);
            }}
          />
          <div>
            <table className="description">
              <tbody>
                <tr height="100px">
                  <td> </td>
                  <td> </td>
                </tr>
                <tr>
                  <td>排名</td>
                  <td>奖金分成</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>3200*25%+300=1100</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>3200*20%=640</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>3200*15%=480</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>3200*10%=320</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>3200*10%=320</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>3200*10%=320</td>
                </tr>
                <tr>
                  <td>7</td>
                  <td>3200*7%=224</td>
                </tr>
                <tr>
                  <td>8</td>
                  <td>3200*3%=96</td>
                </tr>
                <tr>
                  <td>9</td>
                  <td>0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
