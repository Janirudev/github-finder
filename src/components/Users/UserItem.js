import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const UserItem = ({ user: { login, avatar_url, html_url } }) => {
  return (
    <div className="text-center card">
      <img src={avatar_url} alt={login} className="round-img" style={{ width: '60px' }} />
      <h3>{login}</h3>
      <div>
        <Link to={`/user/${login}`} className="my-1 btn btn-dark btn-sm">More</Link>
      </div>
    </div>
  )
}
UserItem.propTypes = {
  user: PropTypes.object.isRequired,
}

export default UserItem
