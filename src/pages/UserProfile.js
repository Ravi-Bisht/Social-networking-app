// import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from '../styles/settings.module.css';
import { useParams , useHistory } from 'react-router-dom';
import { addFriend, fetchUserProfile, removeFriend } from '../api';
import { useToasts } from 'react-toast-notifications';
import { Loader } from '../components';
import { useAuth } from '../hooks';
// import { useAuth } from '../hooks';

const UserProfile = () => {

  // using useLocation hook
  // const location = useLocation();
  // console.log("location" , location);
  // // console.log(location.state.email);
  // const {user} = location.state;
  const [user,setUser] =useState({});
  const [loading,setLoading] =useState(true);
  const[requestInProgress,setRequestInProgress]=useState(false);
  const {userId} =useParams();
  const {addToast} =useToasts();
  const history =useHistory();
  const auth = useAuth();
  // console.log(userId);
// console.log("user *****",auth.user.friends)
  useEffect(()=>{

    const getUser= async ()=>{
      const response = await fetchUserProfile(userId);
      console.log(response);

      if(response.success){
        setUser(response.data.user)

      }else{
        addToast(response.message , {
          appearance:'error',
        })
        return history.push('/');

      }
      setLoading(false);
    }
    getUser();

  },[userId, addToast, history]);

  if(loading){
    return <Loader/>
  }

  const checkIfUserIsAFriend = () =>{
    let friends = auth.user.friends;
    console.log(friends)

    const friendIds = friends.map(friend => friend.to_user._id);
    const index = friendIds.indexOf(userId);
    if(index !== -1 ){
      return true;
    }
    return false;
  }

  const handleRemoveFriendClick = async () =>{
    setRequestInProgress(true);

    const response = await removeFriend(userId);

    if (response.success) {
      const friendship = auth.user.friends.filter(friend => friend.to_user._id === userId)

      auth.updateUserFriends(false, friendship[0]);
      addToast('Friend Removed Successfully', {
        appearance: 'success',
      });
    } else {
      addToast(response.message, {
        appearance: 'error',
      });
    }
    setRequestInProgress(false);

  }

  const handleAddFriendClick = async () => {
    setRequestInProgress(true);

    const response = await addFriend(userId);

    if(response.success){
      const {friendship} = response.data;

      auth.updateUserFriends(true, friendship);
      addToast('Friend Added Successfully',{
        appearance:'success',
      })
    }else{
      addToast(response.message, {
        appearance: 'error',
      });

    }
    setRequestInProgress(false);
  };
  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://cdn-icons-png.flaticon.com/128/1464/1464795.png"
          alt=""
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user?.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>

        <div className={styles.fieldValue}>{user?.name}</div>
      </div>

      <div className={styles.btnGrp}>
        {checkIfUserIsAFriend() ? (
          <button
            className={`button ${styles.saveBtn}`}
            onClick={handleRemoveFriendClick}
          >
            {requestInProgress ? 'Removing Friend...' : 'Remove Friend'}
          </button>
        ) : (
          <button
            className={`button ${styles.saveBtn}`}
            onClick={handleAddFriendClick}
            disabled={requestInProgress}
          >
            {requestInProgress ? 'Adding Friend...' : 'Add Friend'}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
