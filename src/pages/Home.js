// import { useEffect,useState } from 'react';
// import propTypes from 'prop-types';
import styles from '../styles/home.module.css';
import { FriendsList,CreatePost, Post} from '../components'
import {Loader} from '../components'
// import { getPosts } from '../api';
// import { Link } from 'react-router-dom';
import { useAuth, usePosts } from '../hooks';
const Home= () => {
  // move this logic to useProvidePosts custom hook
  // const [posts, setPosts] = useState([]);
  // const [loading, setLoading] = useState(true);

  const auth = useAuth();

  const posts = usePosts();

  // move this logic to useProvidePosts custom hook

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const response = await getPosts();
  //     console.log('response', response);
  //     if(response.success){
  //     setPosts(response.data.posts)
  //     }
  //     setLoading(false);
  //   };

  //   fetchPosts();
  // }, []);

  if (posts.loading) {
    return <Loader />;
  }

  return (
    <div className={styles.home}>
      <div className={styles.postsList}>
        <CreatePost />
        {posts.data.map((post, index) => (
       <Post post={post} key={post._id}/>
        ))}
      </div>
      {auth.user && <FriendsList />}
    </div>
  );
}


// we are not using prop types so there is no use of this 
// Home.propTypes ={
//   posts:propTypes.array.isRequired ,
// }


export default Home;