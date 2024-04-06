import './App.css'
import React, {useState, useEffect} from 'react'

const Posts = () => {

// Komptilan määritys
const [posts, setPosts] = useState([])
const [showPosts, setShowPosts] = useState(false)

useEffect(() => {
  fetch("https://jsonplaceholder.typicode.com/posts")
  .then(res => res.json()) //to javascript
  .then(oliot => setPosts(oliot))
},[]
)

  return (
    <>
    <h2 onClick={() => setShowPosts(!showPosts)}>Posts from typicode</h2>
        

        {
          showPosts && posts && posts.map(p =>

            <div className='posts' key={p.id}>
              <h3>####</h3>
              <h3>{p.title}</h3>
            <p>{p.body}</p>
            
            </div>
            )
        }

    </>
  )
}

export default Posts