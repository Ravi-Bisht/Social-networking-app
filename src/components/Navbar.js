import { Link } from 'react-router-dom';
import styles from '../styles/navbar.module.css'
import { useAuth } from '../hooks';
import { useEffect, useState } from 'react';
import { searchUsers } from '../api';
const Navbar = () =>{
  const [results,setResults] = useState([]);
  const [searchText,setSearchText] = useState('');
  const auth = useAuth();

  useEffect(()=>{

    const fetchUsers  = async () => {
        const response = await searchUsers(searchText);

        if(response.success){
          setResults(response.data.users);
          return;
        }
    }
    if(searchText.length > 2){
        fetchUsers();
    }else{
      setResults([]);
    }    
  },[searchText])
  const hideShowUsers = () => {
      setSearchText('');
      setResults([]);
  }

     return (
       <div className={styles.nav}>
         <div className={styles.leftDiv}>
           <Link to="/">
             <img
               alt=""
               src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
             />
           </Link>
         </div>

         {/* search bar  */}
         <div className={styles.searchContainer}>
           <img
             className={styles.searchIcon}
             alt="search"
             src="https://cdn-icons-png.flaticon.com/128/149/149852.png"
           />
           <input
             type="text"
             placeholder="Find Users"
             value={searchText}
             onChange={(e) => setSearchText(e.target.value)}
           />

           {results.length > 0 && (
             <div className={styles.searchResults}>
               <ul id="users">
                 {results.map((user) => (
                   <li
                     className={styles.searchResultsRow}
                     key={user._id}
                     onClick={hideShowUsers}
                   >
                     <Link to={`/user/${user._id}`}>
                       <img
                         src="https://cdn-icons-png.flaticon.com/128/1464/1464795.png"
                         alt="dp"
                       />
                       <span>{user.name}</span>
                     </Link>
                   </li>
                 ))}
               </ul>
             </div>
           )}
         </div>

         <div className={styles.rightNav}>
           {auth.user && (
             <div className={styles.user}>
               <Link to="/settings">
                 <img
                   src="https://cdn-icons-png.flaticon.com/128/1464/1464795.png"
                   alt=""
                   className={styles.userDp}
                 />
               </Link>
               <span>{auth.user.name}</span>
             </div>
           )}
           <div className={styles.navLinks}>
             <ul>
               {auth.user ? (
                 <>
                   <li>
                     <button className={styles.logoutBtn} onClick={auth.logout}>
                       Log out
                     </button>
                   </li>
                 </>
               ) : (
                 <>
                   <li>
                     <Link to="/login">Log In</Link>
                   </li>
                   <li>
                     <Link to="/register">Register</Link>
                   </li>
                 </>
               )}
             </ul>
           </div>
         </div>
       </div>
     );
}

export default Navbar;