import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../firebase';
import './dashboard.css';

class Dashboard extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            nome: localStorage.nome
        };

        this.logout = this.logout.bind(this);
    }
    
    async componentDidMount(){
        if(!firebase.getCurrent()){
            this.props.history.replace('./login');
            return null;
        }

        //info receive the callback for database (check the firebase.js)
        firebase.getUserName((info) => {
            localStorage.nome = info.val().nome;
            //with localhost, the information (nome) is saved in the cache of browser
            this.setState({nome: localStorage.nome});
        })
    }

    logout = async() =>{
        
        await firebase.logout()
        
        .catch((error) => {
            console.log(error);
        });
        //remove the name of localStorage
        localStorage.removeItem("nome");
        //forward for home
        this.props.history.push('/login');
    }
    
    render(){
        return(
            <div id="dashboard">
                <div className="user-info">
                    <h1>Olá {this.state.nome}</h1>
                    <Link to="/dashboard/new">Novo Post</Link>
                </div>

                <div className="logout">
                    <p>Logado com: {firebase.getCurrent()}</p>
                    <button onClick={() => this.logout()}>Deslogar</button>
                </div>
            </div>
        );
    }
}

export default withRouter(Dashboard);
