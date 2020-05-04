import React, { Component } from 'react';

class PostForm extends Component {
  state = {
    id: '1',
    name: '',
    post: '',
  }

  submitForm = (e) => {
    e.preventDefault();
    console.log(e)
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    return (
      <form onSubmit={this.submitForm}>
        <label htmlFor="name">
          Name: 
          <input type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
        </label>
        <label htmlFor="post">
          Post:
          <textarea type="text" name="post" value={this.state.post} onChange={this.handleChange}>
          </textarea>
        </label>
        <input type="submit" value="submit"/>
      </form>
    )
  }
}


export default PostForm;
