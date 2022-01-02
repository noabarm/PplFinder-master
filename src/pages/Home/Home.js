import React from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import { usePeopleFetch } from "hooks";
import * as S from "./style";
import{ useEffect, useState } from "react";

const Home = () => {
  const { users, isLoading } = usePeopleFetch();

  let [favoriteUsersFromLocalStorage,setFavoriteFromLS] = useState([]);

  const addToFavorite = (user)=>{
    let localFavoriteUsers = [...favoriteUsersFromLocalStorage];
    if(!favoriteUsersFromLocalStorage.includes(user)){
      user.isFavorite = true;
      localFavoriteUsers =[...localFavoriteUsers,user];
    }else{
      user.isFavorite = false;
      console.log("in else")
      localFavoriteUsers = localFavoriteUsers.filter(function(item){
      return (item.id.value !== user.id.value);
    })
    }
    setFavoriteFromLS(localFavoriteUsers);
    localStorage.setItem("favoriteUsers", JSON.stringify(localFavoriteUsers));
  };

  useEffect(()=>{
    if(JSON.parse(localStorage.getItem("favoriteUsers"))=== null){
      setFavoriteFromLS([]);
    }else{
      setFavoriteFromLS(JSON.parse(localStorage.getItem("favoriteUsers")));
    }
  },[users])

  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFinder
          </Text>
        </S.Header>
        <UserList users={users} isLoading={isLoading} isFavorie={false} handleFavorite={addToFavorite}/>
      </S.Content>
    </S.Home>
  );
};

export default Home;
