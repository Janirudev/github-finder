import React from 'react'
import PropTypes from 'prop-types'
import { RepoItem } from './RepoItem'

export const Repos = ({ repos }) => {
  return repos.map(repo => <RepoItem repo={repo} key={repo.id} />)
}

Repos.propType = {
  repos: PropTypes.array.isRequired,
}

