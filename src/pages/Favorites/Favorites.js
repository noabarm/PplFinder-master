import React, { useEffect, useState } from "react";
import Text from "components/Text";
import * as S from "./style";
import UserList from "components/UserList";
//import FavoritesList from "components/FavoritesList";

const Favorites = () =>{
    const [favoritesList,setUserformLS] = useState([]);
    const [isListLoad,setIsListLoad] = useState(false)

    
    useEffect(()=>{
        getUserformLS();
    },[isListLoad])

    function getUserformLS() {
      if(JSON.parse(localStorage.getItem("favoriteUsers"))=== null){
        setUserformLS([]);
      }else{
        const tempFavoritesList = JSON.parse(localStorage.getItem("favoriteUsers"));
        setUserformLS(tempFavoritesList);
        setIsListLoad(true);
      }
    }

    const removeFromFavorite = (user)=>{
        let localFavoriteUsers = [...favoritesList];
          user.isFavorite = false;
          localFavoriteUsers = localFavoriteUsers.filter(function(item){
          return (item.id.value !== user.id.value);
        })
        setUserformLS(localFavoriteUsers);
        //favoriteUsersToLocalStorage = favoriteUsersFromLocalStorage.concat(localFavoriteUsers);
        localStorage.setItem("favoriteUsers", JSON.stringify(localFavoriteUsers));
    };

  

    return(
     <S.Favorites>
       <S.Content>
          <S.Header>
              <Text size="54px" bold>
                YOUR FAVORITES
              </Text>    
          </S.Header>
          <UserList users={favoritesList} isFavorie={true} handleFavorite={removeFromFavorite} />
          {/*<FavoritesList favoritesUsersList={favoritesList} />*/}
        </S.Content>
     </S.Favorites>
    );
};

export default Favorites;