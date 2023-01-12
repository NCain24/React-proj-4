import { useContext, useEffect, useState, useCallback } from 'react'
import Modal from './Modal'
import axios from 'axios'
import '../App.css'

import AuthContext from '../store/authContext'

const Profile = () => {
    const {userId, token} = useContext(AuthContext)

    const [ posts, setPosts ] = useState( [] )
  const [ isOpen, setIsOpen ] = useState( false );
  const [currentId, setCurrentId] = useState(null)


    const getUserPosts = useCallback(() => {
        axios.get(`/userposts/${userId}`)
            .then(res => setPosts(res.data))
            .catch(err => console.log(err))
    }, [userId])

    useEffect(() => {
        getUserPosts()
    }, [getUserPosts])

    const updatePost = (id, status) => {
        axios.put(`/posts/${id}`, {status: !status}, {
            headers: {
                authorization: token
            }
        })
            .then(() => {
                getUserPosts()
            })
            .catch(err => {
                console.log(err)
            })
    }

    const deletePost = id => {
        axios.delete(`/posts/${id}`, {
            headers: {
                authorization: token
            }
        })
            .then(() => {
                getUserPosts()
            })
            .catch(err => {
                console.log(err)
            })
    }

  const mappedPosts = posts.map( post => {
      console.log(post)
        return (
          <div key={post.id} className="post-card">
            <h2>{post.title}</h2>
            <h4>{post.user.username}</h4>
            <p>{post.content}</p>
            {userId === post.userId && (
              <div>
                <button
                  className="form-btn"
                  onClick={() => updatePost(post.id, post.privateStatus)}
                >
                  {post.privateStatus ? 'make public' : 'make private'}
                        </button>
                        


                <button
                  className="primaryBtn"
                  style={{ marginLeft: 10 }}
                  onClick={ () => { setIsOpen( true ); setCurrentId(post.id)}}
                >
                  Delete Post
                </button>
                       
  
                


              </div>
            )}
          </div>
        );
    })

    return mappedPosts.length >= 1 ? (
      <main>
        <h1>Your Posts</h1>
        {mappedPosts}
        {isOpen && (
          <Modal setIsOpen={setIsOpen} deletePost={deletePost} id={currentId} />
        )}
      </main>
    ) : (
      <main>
        <h1>You haven't posted yet!</h1>
      </main>
    );
}

export default Profile