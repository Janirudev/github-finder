import React, { Component } from 'react'
import Spinner from '../Layout/Spinner'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Repos } from '../Repos/Repos'

export class User extends Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.login)
    this.props.getUserRepos(this.props.match.params.login)
  }

  static propTypes = {
    loading: PropTypes.bool,
    user: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired,
    getUserRepos: PropTypes.func.isRequired,
    repos: PropTypes.array.isRequired,
  }

  render() {
    const { name, avatar_url, location, bio, blog, login, html_url, company, followers, following, public_repos, public_gits, hireable } = this.props.user;
    const { loading, repos } = this.props;

    if (loading) {
      return <Spinner />
    }

    return <>
      <Link to="/" className="btn btn-light">Back To Search</Link>Hireable: {' '}
      {hireable ? <svg style={{ "height": "24px", "width": "24px" }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg> : <svg style={{ "height": "24px", "width": "24px" }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>}
      <div className="card grid-2">
        <div className="all-center">
          <img src={avatar_url} className="round-img" alt={name} style={{ width: "200px" }} />
          <h1>{name}</h1>
          <p>Location: {location}</p>
        </div>
        <div>
          {bio && <>
            <h3>Bio</h3>
            <p>{bio}</p>
          </>}
          <a href={html_url} className="my-1 btn btn-dark">Visit Github Profile</a>
          <ul>
            <li>
              {login && <>
                <strong>Username: </strong> {login}
              </>}
            </li>
            <li>
              {login && <>
                <strong>Company: </strong> {company}
              </>}
            </li>
            <li>
              {login && <>
                <strong>Website: </strong> {blog}
              </>}
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center card">
        <div className="badge badge-primary">Followers: {followers}</div>
        <div className="badge badge-success">Foollowing: {following}</div>
        <div className="badge badge-light">Public Repos: {public_repos}</div>
        <div className="badge badge-dark">Public Gits: {public_gits}</div>
      </div>

      <Repos repos={repos} />

    </>;
  }
}
export default User
