import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserProfile } from "../app/slices/authSlice.js";
import { Spinner, Alert } from "react-bootstrap";

const ProfileScreen = () => {
  const { user, loading, error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  return (
    <div>
      <h1>User Profile</h1>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : error ? (
        <Alert variant="danger">
          {error} <button onClick={() => dispatch(clearError())}>❌</button>
        </Alert>
      ) : (
        <div>
          <p>
            <strong>Name: </strong> {user.name}
          </p>
          <p>
            <strong>Email: </strong> {user.email}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfileScreen;
