import  React, { Component } from  'react';

import  LeaderboardAPI  from  './LeaderboardAPI';


const  leaderboardAPI  =  new  LeaderboardAPI();

class  Leaderboard  extends  Component {

    constructor(props) {
        super(props);      
        this.state = {region: 'us', class_name: 'barbarian',
        game_mode: '', season: 16, leaderboard: []};
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.goToPage = this.goToPage.bind(this);
    }

    componentDidMount() {
        leaderboardAPI.getLeaderboard('us-barbarian-s16')
        .then((response) => {
            this.setState({ leaderboard:  response.records})
        })
        .catch(err => console.log(err));;
        console.log(this.state);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
      }
    
    handleSubmit(e) {
      let arg = this.state.region + '-' + this.state.class_name + '-' 
      + this.state.game_mode + 's' + this.state.season;
      leaderboardAPI.getLeaderboard(arg)
      .then((response) => {
          this.setState({ leaderboard:  response.records})
      })
      .catch(err => alert(err));;
      e.preventDefault();
    }

    goToPage(e) {
      let page = e.target.value;
      let arg = this.state.region + '-' + this.state.class_name + '-' 
      + this.state.game_mode + 's' + this.state.season;
      leaderboardAPI.getLeaderboard(arg + '?page=' + page)
      .then((response) => {
          this.setState({ leaderboard:  response.records})
      })
      .catch(err => console.log(err))
    }

    render() {
      let is_solo = (this.state.class_name === 'solo');

      return (
      <div className="leaderboards">
        <div className="row justify-content-center">
          <div className="col-10 m-2">
      <form className="p-2 diablo-form" onSubmit={this.handleSubmit}>
        <div className="row mb-3 justify-content-center">
          <div className="col-sm-3 my-1">
            <select className="form-control" name="region" value={this.state.value} onChange={this.handleChange}>
              <option value="us">United States</option>
              <option value="eu">Europe</option>
              <option value="kr">Korea</option>
            </select>
          </div>
          <div className="col-sm-3 my-1">
            <select className="form-control" name="class_name" value={this.state.value} onChange={this.handleChange}>
              <option value="barbarian">Barbarian</option>
              <option value="crusader">Crusader</option>
              <option value="dh">Demon Hunter</option>
              <option value="monk">Monk</option>
              <option value="necromancer">Necromancer</option>
              <option value="wd">Witch Doctor</option>
              <option value="wizard">Wizard</option>
              <option value="solo">Top 1000 Solo</option>
            </select>
          </div>
          <div className="col-sm-3 my-1">
            <select className="form-control" name="game_mode" value={this.state.value} onChange={this.handleChange}>
              <option value="">Softcore</option>
              <option value="hardcore-">Hardcore</option>
            </select>
          </div>
          <div className="col-sm-3 my-1">
            <input className="form-control" name="season" type="number"  min="1" max="16"
            value={this.state.value} placeholder="Season" defaultValue="16" onChange={this.handleChange}/> 
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-sm-6">
            <input className="form-control btn" type="submit" value="SUBMIT" />
          </div>
        </div>
        </form>
      <div className="row justify-content-center">
        <span>
          <label className="lbl">Results page (1-20): </label>
          <input className="form-control" name="page" type="number"  min="1" max="20"
            placeholder="Results page" defaultValue="1" onChange={this.goToPage}/> 
        </span>
      </div>
      </div>
          </div>
          <div className="row justify-content-center">
          <table className="table table-sm table-dark table-bordered table-striped">
          <thead>
          <tr>
              <th scope="col">Rank</th>
              <th scope="col">Battletag</th>
              {is_solo ? <th scope="col">Class</th> : null}
              <th scope="col">GR Level</th>
              <th scope="col">Time</th>
              <th scope="col">Completed on</th>
          </tr>
          </thead>
          <tbody>
          {this.state.leaderboard.map(r => 
          <tr key={r.rank}>
              <td>{r.rank} </td>
              <td>{r.battletag} </td>
              {is_solo ? <td>{r.class_name}</td> : null}
              <td>{r.rift_level} </td>
              <td>{r.rift_time} </td>
              <td>{r.completed_on} </td>
          </tr>
          )}
          </tbody>
          </table>
          </div>
      </div>
      );
    }
}
export  default  Leaderboard;