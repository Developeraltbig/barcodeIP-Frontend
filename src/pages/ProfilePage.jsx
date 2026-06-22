import React, { memo, useState, useEffect, useRef } from "react";
import {
    Box, Typography, Avatar, Badge, IconButton, Divider,
    Grid, TextField, Button, Paper, styled, CircularProgress, Alert,
} from '@mui/material';
import { Camera, Eye } from "lucide-react";
import carbonViewIcons from "../assets/icons/carbon_view1.svg";
import { useGetUserDetailsQuery, useUpdateImageMutation, useUpdateProfileMutation } from '../features/slice/auth/authApi';
import { useSelector, useDispatch } from 'react-redux';
import { useChangePasswordMutation } from '../features/slice/auth/authApi';
import TransactionTable from '../views/Home/TransactionHistoryTable';

function ProfilePage() {
    const fileInputRef = useRef(null);
    const { user } = useSelector((state) => state.auth);
    const userId = user?._id || user?.id;
    const { data, isLoading, isError, refetch } = useGetUserDetailsQuery(userId, {
        skip: !userId,
    });
    const [updateProfile, { isLoading: isSaving }] = useUpdateProfileMutation();
    const [updateImage, { isLoading: isUploadingImage }] = useUpdateImageMutation();
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [localImagePreview, setLocalImagePreview] = useState(null);
    const [changePassword, { isLoading: passwordIsLoading }] = useChangePasswordMutation();
    const [profileForm, setProfileForm] = useState({
        firstName: "",
        lastName: "",
        email: "developeraltbig@gmail.com",
        phone: "8130047149",
        gender: ""
    });

    const [passwordForm, setPasswordForm] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [showPassword, setShowPassword] = useState({
        oldPassword: false,
        newPassword: false,
        confirmPassword: false
    });

    // Safely sync incoming API data with the profile form state
    useEffect(() => {
        if (data?.data) {
            const u = data?.data?.userDetails || data;
            setProfileForm({
                firstName: u?.first_name || u?.name || '',
                lastName: u?.last_name || '',
                email: u?.email || '',
                phone: u?.phone_number || u?.phone || '',
                gender: u?.gender || '' // Keeps radio buttons safe from 'undefined'
            });
            if (u.profile_image) {
                setLocalImagePreview(u.profile_image)
            }
        }
    }, [data]);

    const handleProfileChange = (event) => {
        const { name, value } = event.target;
        setSuccessMsg('');
        setErrorMsg('');
        setProfileForm((prev) => ({
            ...prev,
            [name]: value ?? '' // Fallback ensures it never goes to undefined
        }));
    };

    const handlePasswordChange = (event) => {
        const { name, value } = event.target;
        setPasswordForm((prev) => ({
            ...prev,
            [name]: value ?? ''
        }));
    };

    const handleCancel = () => {
        if (data?.data) {
            const u = data?.data?.userDetails || data;
            setProfileForm({
                firstName: u?.first_name || u?.name || '',
                lastName: u?.last_name || '',
                email: u?.email || '',
                phone: u?.phone_number || u?.phone || '',
                gender: u?.gender || ''
            });
        }
        setSuccessMsg('');
        setErrorMsg('');
    };

    const handleProfileSubmit = async (e) => {
        try {
            e.preventDefault();
            // FIXED: Pointed payload values to profileForm instead of non-existent formData
            await updateProfile({
                first_name: profileForm.firstName,
                last_name: profileForm.lastName,
                email: profileForm.email,
                phone_number: profileForm.phone,
                gender: profileForm.gender
            }).unwrap();
            setSuccessMsg('Profile updated successfully!');
            setErrorMsg('');
        } catch (err) {
            setErrorMsg(err?.data?.message || 'Failed to update profile.');
            setSuccessMsg('');
        }
    };

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        const allowedExtensions = '.jpg, .jpeg, .png, .webp';

        if (!allowedTypes.includes(file.type)) {
            setErrorMsg(`Invalid file type. Only ${allowedExtensions} files are allowed.`);
            e.target.value = '';
            return;
        }

        const maxSizeMB = 5;
        if (file.size > maxSizeMB * 1024 * 1024) {
            setErrorMsg(`File size too large. Maximum allowed size is ${maxSizeMB}MB.`);
            e.target.value = '';
            return;
        }

        const previewUrl = URL.createObjectURL(file);
        setLocalImagePreview(previewUrl);

        const formPayload = new FormData();
        formPayload.append('profile_image', file);

        try {
            await updateImage(formPayload).unwrap();
            setSuccessMsg('Profile image updated!');
            setErrorMsg('');
        } catch (err) {
            console.error('Image upload error:', err);
            setLocalImagePreview(null);
            setErrorMsg(err?.data?.message || 'Failed to update image.');
        }

        e.target.value = '';
    };

    const handlePasswordSubmit = async (event) => {
        event.preventDefault();
        console.log("Password saved:", passwordForm);

        // Validation
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            console.log("Password saved:", passwordForm)
            return;
        }

        try {
            // 1. Call API
            await changePassword(passwordForm).unwrap();

            // 2. Show Success Message
            setSuccessMsg('Password Updated Successfully');

            // 3. Clear Form (Optional, since we are navigating away)
            setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });

            // 4. Logout Logic (Delayed slightly so user sees the success message)
            setTimeout(() => {
                // A. Remove token from storage
                localStorage.removeItem('token');
                localStorage.removeItem('user'); // or whatever keys you use

                // B. Dispatch logout action (If using Redux)
                dispatch(logout());

                // // C. Redirect to Login
                // navigate('/login'); 
            }, 1500); // 1.5 second delay
        } catch (err) {
            setErrorMsg(`Failed to change password`);
        }
    }

    const togglePassword = (field) => {
        setShowPassword((prev) => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
                <CircularProgress sx={{ color: '#E94E34' }} />
            </Box>
        );
    }

    if (isError) {
        return (
            <Box sx={{ maxWidth: 'md', margin: 'auto', p: 3 }}>
                <Alert severity="error">Failed to load user details. Please try again.</Alert>
            </Box>
        );
    }

    return (
        <section className="profile-screen">
            <div className="profile-title-block">
                <h1>Profile</h1>
                <p>Manage user information and account security for this BarcodeIP workspace.</p>
            </div>

            {successMsg && <Alert severity="success" sx={{ mb: 2 }}>{successMsg}</Alert>}
            {errorMsg && <Alert severity="error" sx={{ mb: 2 }}>{errorMsg}</Alert>}

            <form className="profile-info-card" onSubmit={handleProfileSubmit}>
                <div className="profile-info-top">
                    <div className="profile-photo-wrap" onClick={handleImageClick} style={{ cursor: 'pointer' }}>
                        <div className="profile-photo">
                            {localImagePreview ? (
                                <img src={localImagePreview} alt="Avatar Preview" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                            ) : (
                                <span>HN</span>
                            )}
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                            accept=".jpg, .jpeg, .png, .webp"
                        />
                        <button type="button" className="profile-camera-btn">
                            <Camera size={14} />
                        </button>
                    </div>

                    <div className="profile-name-actions">
                        <h2>{profileForm.firstName || "User"}</h2>

                        <div className="profile-upload-actions">
                            <button type="button" className="profile-upload-btn" onClick={handleImageClick}>
                                Upload New
                            </button>
                            {/* <button type="button" className="profile-delete-btn" onClick={() => setLocalImagePreview(null)}>
                                Delete Avatar
                            </button> */}
                        </div>
                    </div>

                    <div className="gender-options">
                        <label className="gender-box">
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                checked={profileForm.gender === "male"}
                                onChange={handleProfileChange}
                            />
                            <span>Male</span>
                        </label>

                        <label className="gender-box">
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                checked={profileForm.gender === "female"}
                                onChange={handleProfileChange}
                            />
                            <span>Female</span>
                        </label>
                    </div>
                </div>

                <div className="profile-form-grid">
                    <div className="profile-form-group">
                        <label>First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={profileForm.firstName}
                            onChange={handleProfileChange}
                            placeholder="First Name"
                        />
                    </div>

                    <div className="profile-form-group">
                        <label>Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={profileForm.lastName}
                            onChange={handleProfileChange}
                            placeholder="Last Name"
                        />
                    </div>

                    <div className="profile-form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={profileForm.email}
                            onChange={handleProfileChange}
                            placeholder="Email"
                            disabled
                        />
                    </div>

                    <div className="profile-form-group">
                        <label>Phone Number</label>
                        <input
                            type="text"
                            name="phone"
                            value={profileForm.phone}
                            onChange={handleProfileChange}
                            placeholder="Phone Number"
                        />
                    </div>
                </div>

                <div className="profile-card-actions">
                    <button type="button" className="profile-cancel-btn" onClick={handleCancel}>
                        Cancel
                    </button>
                    <button type="submit" className="profile-save-btn">
                        Save Changes
                    </button>
                </div>
            </form>

            <div className="profile-title-block account-title-block">
                <h1>Account Settings</h1>
                <p>Update password details for workspace access.</p>
            </div>

            <form className="account-card" onSubmit={handlePasswordSubmit}>
                <PasswordInput
                    label="Current Password"
                    name="oldPassword"
                    value={passwordForm.oldPassword}
                    visible={showPassword.oldPassword}
                    onChange={handlePasswordChange}
                    onToggle={() => togglePassword("oldPassword")}
                />

                <PasswordInput
                    label="New Password"
                    name="newPassword"
                    value={passwordForm.newPassword}
                    visible={showPassword.newPassword}
                    onChange={handlePasswordChange}
                    onToggle={() => togglePassword("newPassword")}
                />

                <PasswordInput
                    label="Confirm Password"
                    name="confirmPassword"
                    value={passwordForm.confirmPassword}
                    visible={showPassword.confirmPassword}
                    onChange={handlePasswordChange}
                    onToggle={() => togglePassword("confirmPassword")}
                />

                <button type="submit" className="profile-save-btn password-save-btn">
                    Save Password
                </button>
            </form>
            <br />
            <TransactionTable />
        </section>
    );
}

function PasswordInput({ label, name, value, visible, onChange, onToggle }) {
    return (
        <div className="profile-form-group password-profile-group">
            <label>{label}</label>
            <div className="profile-password-wrap">
                <input
                    type={visible ? "text" : "password"}
                    name={name}
                    value={value || ""} // Additional safety wrapper
                    onChange={onChange}
                />
                <button type="button" onClick={onToggle}>
                    <img src={carbonViewIcons} alt="" className="carbon-view-icon" />
                </button>
            </div>
        </div>
    );
}

export default memo(ProfilePage);