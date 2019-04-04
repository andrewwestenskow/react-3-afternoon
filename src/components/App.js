import React, { Component } from 'react';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post'

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      searchText: ''
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts')
    .then(res => {
      let posts = res.data
      this.setState({
        posts: posts
      })
    })
    .catch(err =>{
      console.log('err', err)
    })
  }

  updatePost(id, text) {
    console.log(text)
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, {text})
    .then(res => {
      console.log(res)
      this.setState({
        posts: res.data
      })
    })
    .catch(err => {
      console.log('err', err, text, id)
    })
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
    .then(res => {
      this.setState({
        posts: res.data
      })
    })
    .catch(err => {
      console.log('err', err)
    })
  }

  createPost(body) {
    axios.post(`https://practiceapi.devmountain.com/api/posts`, body)
    .then(res => {
      this.setState({
        posts: res.data
      })
      toast.success('Post successfully submitted')
    })
    .catch(err => {
      console.log('err', err)
    })
  }

  searchText = (text) => {
    this.setState({
      searchText: text
    })
    this.searchPosts(text)
  }

  searchPosts = (text) => {
    let searchText = encodeURI(text)
    axios.get(`https://practiceapi.devmountain.com/api/posts/filter?text=${searchText}`)
    .then(res => {
      this.setState({
        posts: res.data
      })
    })
    .catch(err => {
      toast.error('Enter search term', {
        position: toast.POSITION.TOP_LEFT
      })
      console.log('err', err)
    })
  }

  render() {
    toast.configure()
    const { posts } = this.state;
    const showPosts = this.state.posts.map(post => {
      return <Post 
      key={post.id} 
      id={post.id}
      text={post.text} 
      date={post.date}
      editPost={this.updatePost} 
      deletePost={this.deletePost}
       />
    })

    return (
      <div className="App__parent">
      <ToastContainer/>
        <Header searchText={this.searchText}/>

        <section className="App__content">

          <Compose 
          createPost={this.createPost}
          posts={this.state.posts}/>
          
          {showPosts}
          
        </section>
      </div>
    );
  }
}

export default App;
