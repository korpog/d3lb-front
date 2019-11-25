import axios from 'axios';
const API_URL = 'http://localhost:3000';
const API_URL2 = 'https://d3lb.herokuapp.com';

export default class LeaderboardAPI{

    getLeaderboards() {
        const url = `${API_URL2}/leaderboards/`;
        return axios.get(url).then(response => response.data);
    }  
    
    getLeaderboard(slug) {
        const url = `${API_URL2}/leaderboards/${slug}`;
        return axios.get(url).then(response => response.data);
    }
}