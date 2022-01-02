import React, { useEffect, useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";

const UserList = ({ users, isLoading,isFavorie,handleFavorite}) => {
  const [userList,setUsers] = useState([]);

  const [countryList,setCountryList] = useState([]);
  
  const [hoveredUserId, setHoveredUserId] = useState();

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  
  const filterByCountery = (value,label,isChecked) => {
   
    countryList.map((country)=>{
      if(country[0]=== label){
        country.isSelected=isChecked;
      }
    });
    
    let selectedCountries = countryList.filter(country=>country.isSelected===true).map(country => country[0]);

    const filterUsers = (selectedCountries.length === 0)? users : users.filter(user=>{
      return (selectedCountries.indexOf(user.location.country)!==-1)
    });

    setUsers(filterUsers);
  };

  const getPopulerCuntries = (users) => {
    let countryMap = new Map();
    users.forEach(element => {
        if (countryMap.get(element.location.country)!=null){
          countryMap.set(element.location.country,countryMap.get(element.location.country)+1);
        }
        else{
          countryMap.set(element.location.country,1);
        }    
    });
    let newCountries= [...countryMap.entries()].sort((a,b)=> b[1] - a[1]).slice(0,5);
    newCountries.forEach((country)=>{country.isSelected=false});
    console.log(newCountries);
    setCountryList(newCountries);
  }

  useEffect(()=>{
    setUsers(users);
    getPopulerCuntries(users) 
  },[users])


  return (
    <S.UserList>
      <S.Filters>
        {countryList.map((country)=>{
         return(
           <CheckBox  label={country[0]} onChange={filterByCountery} />
         )
       })}
      </S.Filters>
      <S.List>
        {userList.map((user, index) => {
          return (
            <S.User
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <S.UserPicture src={user?.picture.large} alt="" />
              <S.UserInfo>
                <Text size="22px" bold>
                  {user?.name.title} {user?.name.first} {user?.name.last}
                </Text>
                <Text size="14px">{user?.email}</Text>
                <Text size="14px">
                  {user?.location.street.number} {user?.location.street.name}
                </Text>
                <Text size="14px">
                  {user?.location.city} {user?.location.country}
                </Text>
              </S.UserInfo>
              <S.IconButtonWrapper isVisible={index === hoveredUserId || user.isFavorite}>
                <IconButton onClick={()=>handleFavorite(user,isFavorie)}>
                  <FavoriteIcon color="error" />
                </IconButton>
              </S.IconButtonWrapper>
            </S.User>
          );
        })}
        {isLoading && (
          <S.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </S.SpinnerWrapper>
        )}
      </S.List>
    </S.UserList>
  );
};

export default UserList;
