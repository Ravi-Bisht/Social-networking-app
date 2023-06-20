import styles from '../styles/home.module.css';
import { Comment } from '../components';
// import { Loader } from '../components';
// import { getPosts } from '../api';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {  usePosts } from '../hooks';
import { useToasts } from 'react-toast-notifications';
import { createComment, toggleLike } from '../api';

const Post = ({post}) => {

    const [comment,setComment] = useState('');
    const [creatingComment , setCreatingComment] = useState(false);
    const Posts = usePosts();
    const {addToast} = useToasts();

    const handleAddComment = async(e) =>{

        if(e.key === 'Enter'){
            setCreatingComment(true);

            const response = await createComment(comment , post._id );

            if(response.success){
                setComment('');
                Posts.addComment(response.data.comment,post._id);
                return addToast('Comment Created Successfully' , {
                    appearance:'success',
                });
            }else{
                addToast(response.message, {
                  appearance: 'error',
                });
            }
            setCreatingComment(false);
        }
    }

    const handlePostLikeClick = async() =>{

      const response = await toggleLike(post._id , 'Post');
      console.log("***********",response)

       if (response.success) {
        if(response.data.deleted){
           addToast('Like Removed Successfully', {
            appearance: 'success',
          });

        }else{
           addToast('Liked Successfully', {
            appearance: 'success',
          });
        }
         
       } else {
         addToast(response.message, {
           appearance: 'error',
         });
       }
    }

  return (
    <div className={styles.postWrapper} key={`posts-${post._id}`}>
      <div className={styles.postHeader}>
        <div className={styles.postAvatar}>
          <img
            src="https://cdn-icons-png.flaticon.com/128/1464/1464795.png"
            alt="user-pic"
          />
          <div>
            <Link
              to={{
                pathname: `/user/${post.user._id}`,
                state: {
                  user: post.user,
                },
              }}
              className={styles.postAuthor}
            >
              {post.user.name}
            </Link>
            <span className={styles.postTime}>a minute ago</span>
          </div>
        </div>
        <div className={styles.postContent}>{post.content}</div>
        <div className={styles.postActions}>
          <div className={styles.postLike}>
            <button onClick={handlePostLikeClick}>
              <img
                src="https://cdn-icons-png.flaticon.com/128/126/126473.png"
                alt="likes-icon"
              />
            </button>
            <span>{post.likes.length}</span>
          </div>
          <div className={styles.postCommentsIcon}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/1380/1380338.png"
              alt="comments-icon"
            />
            <span>2</span>
          </div>
        </div>
        <div className={styles.postCommentBox}>
          <input
            placeholder="Start typing a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleAddComment}
          />
        </div>

        <div className={styles.postCommentsList}>
          {/* comment shifted to components  */}
          {/* <div className={styles.postCommentsItem}>
                  <div className={styles.postCommentHeader}>
                    <span className={styles.postCommentAuthor}>Private</span>
                    <span className={styles.postCommentTime}>a minute ago</span>
                    <span className={styles.postCommentLikes}>22</span>
                  </div>
                  <div className={styles.postCommentContent}>
                    Random Comment
                  </div>
                </div> */}
          {post.comments.map((comment) => (
            <Comment comment={comment} key={comment._id} />
          ))}
        </div>
      </div>
    </div>
  );
};


export default Post;