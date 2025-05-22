import React from 'react'
import VerticalNav from '../components/VerticalNav';
import XNav from '../components/XNav';
import Post from './Post';

import { useState, useEffect } from 'react';
import axios from 'axios';
const Results = ({query}) => {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    
  return (
    <div>Results</div>
  )
}

export default Results