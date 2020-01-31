import React, { Component} from 'react';
import { Link, withRouter} from 'react-router-dom';
import firebase from '../../firebase';
import './login.css';

class Login extends Component{

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        };

        this.entrar = this.entrar.bind(this);
        this.login = this.login.bind(this);

    }

    componentDidMount(){
        //Check if have a logged user
        if(firebase.getCurrent()){
            return this.props.history.replace('dashboard');
        }
    }

    //where click in "enter" disable the reload of page and call the function login
    entrar(e){
        e.preventDefault();
        
        this.login();
    }
    
    //function that need wait
    login = async () => {
        const { email, password } = this.state;

        try{
            //wait the execution 
            await firebase.login(email, password)
            
            //if login ok
            .then(() => {
                this.props.history.replace('/dashboard');
            })

            //deals with mistakes
            .catch((error) => {
                if(error.code === 'auth/user-not-found'){
                    alert('Este usuário não existe!');
                }
                if(error.code === 'auth/wrong-password'){
                    alert('Senha incorreta!');
                }else{
                    alert('Error: ' + error.code);
                    
                    return null;
                }
                //clean the inputs
                this.setState({email: '', password: ''});
            });
        //if there other erros
        }catch(error){
            alert(error.message);
        }
    }


    render(){
        return(
            <div>
                <form onSubmit={this.entrar} id="login">
                    <label>Email:</label>
                    <input type="email" autoComplete="off" autoFocus value={this.state.email}
                    onChange={(e) => this.setState({email: e.target.value})} placeholder="nome@provedor.com" />

                    <label>Senha:</label>
                    <input type="password" autoComplete="off" value={this.state.password}
                    onChange={(e) => this.setState({password: e.target.value})} placeholder="Digite sua senha..." />
                
                    <button type="submit">Entrar</button>

                    <Link to="/register">Ainda não possui uma conta?</Link>

                </form>
            </div>
        );
    }
}

export default withRouter(Login);
