import { Link } from 'react-router-dom';
import { useAuth } from '../hooks';
import styles from '../styles/home.module.css';
const FriendsList = () => {
    const auth = useAuth();
    const {friends=[]} = auth.user;
    console.log(friends)
    return (
      <div className={styles.friendsList}>
        <div className={styles.header}>Friends</div>

        {friends && friends.length === 0 && (
          <div className={styles.noFriends}> No Friends Found</div>
        )}

        {friends &&
          friends.map((friend) => (
            <div key={friend._id}>
              <Link className={styles.friendsItem} to={`/user/${friend.to_user._id}`}>
                <div className={styles.friendsImg}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/1464/1464795.png"
                    alt="user-profile"
                  />
                </div>
                <div className={styles.friendsName}>{friend.to_user.email}</div>
              </Link>
            </div>
          ))}
      </div>
    );
};

export default FriendsList;
