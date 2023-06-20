import propTypes from 'prop-types';
import styles from '../styles/home.module.css';
import { toggleLike } from '../api';
const Comment = ({comment}) => {
  console.log('comment', comment);
 

  const handleCommentLikeClick = async () => {
    const response = await toggleLike(comment._id, 'Comment');    
    console.log('***********', response);

    if (response.success) {
      if (response.data.deleted) {
        alert('Like Deleted')
      } else {
        alert('Like Added');
      }
    } else {
      alert(response.message);
    }
  };
  return (
    <div className={styles.postCommentsItem}>
      <div className={styles.postCommentHeader}>
        <span className={styles.postCommentAuthor}>{comment.user.name}</span>
        <span className={styles.postCommentTime}>{comment.createdAt}</span>
        <span className={styles.postCommentLikes}>{comment.likes.length}</span>
      </div>
      <div className={styles.postCommentContent}>
        {comment.content}
        <span style={likeButtonStyle}>
          <button onClick={handleCommentLikeClick}>
            <img
              style={iconStyle}
              src="https://cdn-icons-png.flaticon.com/128/126/126473.png"
              alt="likes-icon"
            />
          </button>
        </span>
      </div>
    </div>
  );
};

Comment.propTypes={
    comment:propTypes.object.isRequired,
}

const likeButtonStyle = {
  height: 10,
  marginLeft: 10,
};

const iconStyle = {
  height: 14,  
};

export default Comment;
