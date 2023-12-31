import { useContext,useEffect,useState } from "react";
import jwt from "jwt-decode";
import { AuthContext, PostsContext } from "../providers";
import { login as userLogin, register, editProfile, fetchUserFriends, getPosts } from '../api';
import { setItemInLocalStorage, LOCALSTORAGE_TOKEN_KEY, removeItemFromLocalStorage, getItemFromLocalStorage } from '../utils';


export const useAuth = () => {
    return useContext(AuthContext)
}

export const useProvideAuth = () =>{
    const [user,setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
      const getUser = async () =>{ 
      const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);

      if(userToken){
        const user = jwt(userToken);
        const response = await fetchUserFriends();

        let friends = [];
        if(response.success){
            friends=response.data.friends;          
        }

        setUser({
          ...user,
          friends
        });
      }
      setLoading(false);
    }
    getUser();

    },[])
    const login = async (email,password)=>{
        const response = await userLogin(email, password);
        // console.log(response);

        if (response.success) {
            setUser(response.data.user)
            setItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY, response.data.token ? response.data.token : null);
          return {
            success: true,
          };
        } else {
          return {
            success:false,
            message:response.message,
          };
        }

    };

     const signup = async (name, email, password, confirmPassword) => {
       const response = await register(name, email, password, confirmPassword);

       if (response.success) {
         return {
           success: true,
         };
       } else {
         return {
           success: false,
           message: response.message,
         };
       }
     };

     const updateUser = async (userId, name, password, confirmPassword) => {
       const response = await editProfile(userId , name, password, confirmPassword);
       console.log('response' ,response)

       if (response.success) {
         
         setUser(response.data.user);
         setItemInLocalStorage(
           LOCALSTORAGE_TOKEN_KEY,
           response.data.token ? response.data.token : null
         );
         return {
           success: true,
         };
       } else {
         return {
           success: false,
           message: response.message,
         };
       }
     };
    

    const logout = () => {
        setUser(null)
        removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    };

    const updateUserFriends = (addFriend,friend) =>{
      if(addFriend){
        setUser({
          ...user,
          friends:[...user.friends,friend]
        })
        return;
      }
      
      const newFriends = user.friends.filter(f =>  f.to_user._id !== friend.to_user._id);

      setUser({
        ...user,
        friends:newFriends,
      })
            
    }

    //whenever user logs in we will set the user over here and useProvideAuth in AuthProvider.js will be called and application will be rerendered
    return {
        user,
        login,
        logout,
        loading,
        signup,
        updateUser,
        updateUserFriends,
    }
    
}


export const useProvidePosts = () =>{
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();
      console.log('response', response);
      if(response.success){
      setPosts(response.data.posts)
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const addPostToState = (post) =>{

    const newPosts = [post , ...posts];

    setPosts(newPosts);
  }

  const addComment = (comment,postId)=>{
    const newPosts = posts.map((post)=>{
      if(post._id===postId){
        return { ...post ,comments:[...post.comments , comment] };
      }
      return post;
    })
    setPosts(newPosts);
  }

  return {
    data: posts,
    loading,
    addPostToState,
    addComment,
  };
}

export const usePosts = () => {
  return useContext(PostsContext);
};

