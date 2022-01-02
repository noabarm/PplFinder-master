import { useState, useEffect } from "react";
import axios from "axios";

export const usePeopleFetch = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setIsLoading(true);
    const response = await axios.get(`https://randomuser.me/api/?results=25&page=1`);
    setIsLoading(false);
    response.data.results.forEach((user)=>{user.isFavorite=false});
    let randomUsers = response.data.results;
    setUsers(randomUsers);
  }

  return { users, isLoading, fetchUsers };
};
