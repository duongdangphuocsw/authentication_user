import React, { useState } from "react";
import "./profile.scss";
import {toast } from 'react-toastify';
import { useSelector } from "react-redux";
import { update } from "../../services/userApi";

const Profile = () => {
    const user = useSelector(state => state.user)

  const [fields, setFields] = useState({
    fullname: "",
    dayOfBirth: "",
    email: user.username,
    phone: "",
  });
  const [errors, setErrors] = useState({});

  console.log(user);

  const handleChange = (field, e) => {
    setFields({ ...fields, [field]: e.target.value });
  };

  const handleValidation = () => {
    let formIsValid = true;

    // Email
    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "Cannot be empty";
    }
    if (typeof fields["email"] !== "undefined") {
      let lastAtPos = fields["email"].lastIndexOf("@");
      let lastDotPos = fields["email"].lastIndexOf(".");
      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          fields["email"].indexOf("@@") == -1 &&
          lastDotPos > 2 &&
          fields["email"].length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        errors["email"] = "Email is not valid";
      }
    }

    // Phone
    if (!fields["phone"]) {
      formIsValid = false;
      errors["phone"] = "Phone number can't be empty";
    }
    else if (typeof fields["phone"] !== "undefined") {
      formIsValid =
        /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/.test(
          fields["phone"]
        );
      if (!formIsValid) {
        errors["phone"] = "Phone number isn't valid";
      }
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = JSON.parse(localStorage.getItem('persist:root'));
    const user = JSON.parse(data.user)

    console.log(user.id);
    if (handleValidation()) {
        try {
            const response = await update(user.id, fields['email'])
            console.log(response);
            toast.success("Form submitted");
        } catch (error) {
            console.log('failed to update user', error)
        }
       
      
    } else {
        console.log('hit here');
        console.log(errors);
      for (const [key, value] of Object.entries(errors)) {
        console.log(value)
        toast.error(`${value}`);
      }
    }

    setErrors({});

    
  };

  return (
    <>
      <form className="profileForm__container">
        <h1 className="profileForm__header">Profile</h1>
        <div className="profileForm__group">
          <label htmlFor="fullname">Full name:</label>
          <input
            name="fullname"
            type="text"
            onChange={(e) => handleChange("fullname", e)}
            value={fields["fullname"]}
          />
        </div>
        <div className="profileForm__group">
          <label htmlFor="dayOfBirth">Day of birth:</label>
          <input
            name="dayOfBirth"
            type="text"
            onChange={(e) => handleChange("dayOfBirth", e)}
            value={fields["dayOfBirth"]}
          />
        </div>
        <div className="profileForm__group">
          <label htmlFor="email">Email:</label>
          <input
            name="email"
            type="text"
            onChange={(e) => handleChange("email", e)}
            value={fields["email"]}
          />
        </div>
        <div className="profileForm__group">
          <label htmlFor="phone">Phone:</label>
          <input
            name="phone"
            type="text"
            onChange={(e) => handleChange("phone", e)}
            value={fields['phone']}
            />
            </div>
            <div className="profileForm__footer">
            <button
              className="btnUpdate btn"
              //   onSubmit={(event) => }
              onClick={(event) => {
                handleSubmit(event);
              }}
            >
              Update
            </button>
            <button className="btnCancel btn">Cancel</button>
          </div>
        </form>
      </>
    );
  }
export default Profile;
