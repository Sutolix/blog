import React, { Component, useCallback } from 'react';
import firebase from '../../firebase';
import './home.css';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            user: null
        }

    }

    componentDidMount() {
        //app = app.database() - This have referenced in firebase.js
        firebase.app.ref('posts').on('value', (snapshot) => {
            let posts = this.state.posts;
            posts = [];

            snapshot.forEach((childItem) => {
                posts.push({
                    key: childItem.key,
                    titulo: childItem.val().titulo,
                    image: childItem.val().image,
                    descricao: childItem.val().descricao,
                    autor: childItem.val().autor
                })
            });
            //inverts the order of posts
            posts.reverse();

            this.setState({ posts: posts });
        })

        firebase.isInitialized()
        .then(async (user) => {
            let userState = this.state.user;
            let isInitialized = this.state.isInitialized;

            if(!user){
                let info = await firebase.getUserName();
                userState = info;
            }

            isInitialized = true;
            this.setState({
                isInitialized: isInitialized,
                user: userState
            });
        })
        console.log(firebase.isInitialized());

    }

    deletar(e){
        firebase.deletePost(e);
    }

    render() {
        return (
            <section id="post">
                {this.state.posts.map((post) => {
                    return (
                        <article key={post.key}>

                            <header>
                                <div className="title">
                                    <strong>{post.titulo}</strong>
                                    <span>Autor: {post.autor}</span>
                                </div>


                                {this.props.isInitialized === null &&
                                    (<button onClick={(e) => this.deletar(post.key)}>Deletar</button>)
                                }

                            </header>

                            <img src={post.image} alt="Capa do post" />

                            <footer>
                                <p>{post.descricao}</p>
                            </footer>

                        </article>
                    );
                })}
            </section>
        );
    }
}

export default Home;