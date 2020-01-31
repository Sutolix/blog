import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../firebase';
import './new.css';

class New extends Component{

    constructor(props){
        super(props);
        this.state = {
            titulo: '',
            imagem: null,
            url: '',
            descricao: '',
            progress: 0
        };

        this.postar = this.postar.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.handleUpload = this.handleUpload.bind(this);

    }

    componentDidMount(){
        if(!firebase.getCurrent()){
            this.props.history.replace('./');
            return null;
        }
    }

    postar = async(e) => {
        e.preventDefault();

        if(this.state.titulo !== '' &&
            this.state.imagem !== '' &&
            this.state.imagem !== null &&
            this.state.descricao !== '' &&
            this.state.url !== ''){
                
            let posts = firebase.app.ref('posts');
            //create a key about this post
            let chave = posts.push().key;

            await posts.child(chave).set({
                titulo: this.state.titulo,
                image: this.state.url,
                descricao: this.state.descricao,
                autor: localStorage.nome,
                alert: ''
            });

            this.props.history.push('/');
        }else{
            this.setState({alert: 'Preencha todos os campos!'});
        }

    }

    handleFile = async (e) => {

        if(e.target.files[0]){
            const image = e.target.files[0];  
            
            if(image.type === 'image/jpeg' || image.type === 'image/png'){
                await this.setState({imagem: image});
                this.handleUpload();
            }else{
                alert('Por favor envie uma imagem em jpg ou png!')
                this.setState({imagem: null})
                return null;
            }
        }
    }

    handleUpload = async () => {
        const { imagem } = this.state;
        const currentUid = firebase.getCurrentUid();
        
        const uploadTaks  = firebase.storage
        .ref(`image/${currentUid}/${imagem.name}`)
        .put(imagem);

        await uploadTaks.on('state_changed', (snapshot) => {
            //progress
            const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                this.setState({progress});
        },
        (error) => {
            //error
            console.log('Error imagem: ' + error);
        },
        () =>{
            //success
            firebase.storage.ref(`image/${currentUid}`)
            .child(imagem.name).getDownloadURL()
            .then(url => {
                this.setState({url: url});
            })
        })
    }

    render(){
        return(
            <div>
                <header id="new"><Link to="/dashboard">Voltar</Link></header>
                
                <form onSubmit={this.postar} id="new-post">

                    <span>{this.state.alert}</span>

                    <input type="file" onChange={this.handleFile} />
                    {this.state.url !== '' ?
                        <img src={this.state.url} width="250" height="150" alt="capa do post"/>
                        :
                        <progress value={this.state.progress} max="100"/>
                    }

                    <label>Titulo:</label>
                    <input type="text" placeholder="Nome do post" value={this.state.titulo} autoFocus
                        onChange={(e) => this.setState({titulo: e.target.value})} />

                    <label>Descrição:</label>
                    <textarea type="text" placeholder="Descreva seu post" value={this.state.descricao}
                        onChange={(e) => this.setState({descricao: e.target.value})} />
                
                    <button type="submit">Postar</button>

                </form>
            
            </div>
        )
    }
}

export default withRouter(New);
