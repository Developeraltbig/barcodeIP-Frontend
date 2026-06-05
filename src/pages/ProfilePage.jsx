import React, { memo, useState } from "react";
import { Camera, Eye } from "lucide-react";

function ProfilePage() {
    const [profileForm, setProfileForm] = useState({
        firstName: "",
        lastName: "",
        email: "developeraltbig@gmail.com",
        phone: "8130047149",
        gender: ""
    });

    const [passwordForm, setPasswordForm] = useState({
        currentPassword: "12345678",
        newPassword: "12345678",
        confirmPassword: "12345678"
    });

    const [showPassword, setShowPassword] = useState({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false
    });

    const handleProfileChange = (event) => {
        const { name, value } = event.target;

        setProfileForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePasswordChange = (event) => {
        const { name, value } = event.target;

        setPasswordForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleProfileSubmit = (event) => {
        event.preventDefault();
        console.log("Profile saved:", profileForm);
    };

    const handlePasswordSubmit = (event) => {
        event.preventDefault();
        console.log("Password saved:", passwordForm);
    };

    const togglePassword = (field) => {
        setShowPassword((prev) => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    return (
        <section className="profile-screen">
            <div className="profile-title-block">
                <h1>Profile</h1>
                <p>Manage user information and account security for this BarcodeIP workspace.</p>
            </div>

            <form className="profile-info-card" onSubmit={handleProfileSubmit}>
                <div className="profile-info-top">
                    <div className="profile-photo-wrap">
                        <div className="profile-photo">
                            <span>HN</span>
                        </div>

                        <button type="button" className="profile-camera-btn">
                            <Camera size={14} />
                        </button>
                    </div>

                    <div className="profile-name-actions">
                        <h2>Roshan</h2>

                        <div className="profile-upload-actions">
                            <button type="button" className="profile-upload-btn">
                                Upload New
                            </button>

                            <button type="button" className="profile-delete-btn">
                                Delete Avatar
                            </button>
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
                    <button type="button" className="profile-cancel-btn">
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
                    name="currentPassword"
                    value={passwordForm.currentPassword}
                    visible={showPassword.currentPassword}
                    onChange={handlePasswordChange}
                    onToggle={() => togglePassword("currentPassword")}
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
                    label="New Password"
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
                    value={value}
                    onChange={onChange}
                />

                <button type="button" onClick={onToggle}>
                    <Eye size={15} />
                </button>
            </div>
        </div>
    );
}

export default memo(ProfilePage);