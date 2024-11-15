import React, { useEffect, useState } from "react";
import UsersList from "../components/UsersList";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";

function Users() {
  // const USERS = [
  //   {
  //     id: "u1",
  //     name: "John Smith",
  //     image:
  //       "https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  //     places: 3,
  //   },
  // ];
  const [loadedUsers, setLoadedUsers] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        //with fetch, the default request type is a GET request
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users`,
          "GET",
          null,
          {}
        );
        setLoadedUsers(responseData.users);
      } catch (err) {}
    };

    fetchUsers();
    //useCallback in sendRequest will never fire a new request
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </React.Fragment>
  );
}

export default Users;
