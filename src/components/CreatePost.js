import { useState } from 'react';
import styles from '../styles/home.module.css';
import { addPost } from '../api';
import { useToasts } from 'react-toast-notifications';
import { usePosts } from '../hooks';

const CreatePost = () =>{

    const [post,setPost] = useState('');
    const [addingPost,setAddingPost] = useState(false);
    const {addToast} = useToasts();

    const posts = usePosts();


    const handleAddPostClick= async ()=>{
        setAddingPost(true);
        if(post===''){
            return;
        }
        const response = await addPost(post);

        if(response.success){
            setPost('');
            posts.addPostToState(response.data.post);

            addToast('Post Created Successfully' , {
                appearance:'success',
            });

        }else{
            addToast(response.message, {
              appearance: 'success',
            });


        }
        setAddingPost(false);
    };
    return (
      <div className={styles.createPost}>
        <textarea
          className={styles.addPost}
          value={post}
          onChange={(e) => setPost(e.target.value)}
        />

        <div>
          <button
            className={styles.addPostBtn}
            disabled={addingPost}
            onClick={handleAddPostClick}
          >
            {addingPost ? 'Adding Post...' : 'Add Post'}
          </button>
        </div>
      </div>
    );
}

export default CreatePost;