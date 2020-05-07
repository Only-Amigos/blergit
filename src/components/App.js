import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../store/actions/postsActions';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
// import {db} from '../firebase';

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      content: ''
    };
  };

  handleInputChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createPost(this.state);
  };
  componentDidMount() {

    // this.props.createPost(this.state);

    // db.collection('posts')
    //   .get()
    //   .then(querySnapshot => {
    //     const data = querySnapshot.docs.map(doc => doc.data());
    //     console.log(data);
    //     // this.setState({ users: data });
    //   });
  }

  render() {
    // console.log(this.props.posts[0])
    return (
      <BrowserRouter>
        <div>
          <h1>Blergit</h1>
          <h3>Posts:</h3>

          <form onSubmit={this.handleSubmit} className="new-post-form">
            <input onChange={this.handleInputChange} type="text" id='title'/>
            <textarea onChange={this.handleInputChange} id="content" cols="50" rows="10"></textarea>
            <button>SUBMIT</button>
          </form>

          <ul>
            {this.props.posts.map(post => {
              return (
                <li key={post.id}>
                  <h4>{post.title}</h4>
                  <p>{post.content}</p>
                </li>
              )
            })}
          </ul>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.firestore.ordered.posts || state.posts.posts
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createPost: (post) => dispatch(createPost(post))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    {collection: 'posts'}
  ])
)(App)