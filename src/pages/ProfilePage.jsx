import React, { memo, useState } from "react";

function ProfilePage({ onBack }) {
    const [profileForm, setProfileForm] = useState({
        fullName: "Team Dev",
        email: "developeraltbig@gmail.com",
        phone: "8130047149"
    });

    const [passwordForm, setPasswordForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
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
        <section className="profile-page">
            <div className="profile-hero-card">
                <button type="button" className="back-btn" onClick={onBack}>
                    <span>←</span>
                    Back
                </button>

                <div>
                    <h1>Profile</h1>
                    <p>Manage user information and account security for this BarcodeIP workspace.</p>
                </div>
            </div>

            <form className="profile-card" onSubmit={handleProfileSubmit}>
                <div className="profile-section-head">
                    <h2>User Information</h2>
                    <p>These details appear on your workspace and generated reports.</p>
                </div>

                <div className="profile-summary-box">
                    <div className="profile-large-avatar">
                        <UserIcon />
                        <span className="avatar-edit">✎</span>
                    </div>

                    <div>
                        <h3>{profileForm.fullName}</h3>
                        <p>{profileForm.email}</p>
                    </div>
                </div>

                <div className="profile-grid">
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={profileForm.fullName}
                            onChange={handleProfileChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={profileForm.email}
                            onChange={handleProfileChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Phone Number</label>
                        <input
                            type="text"
                            name="phone"
                            value={profileForm.phone}
                            onChange={handleProfileChange}
                        />
                    </div>
                </div>

                <div className="profile-actions">
                    <button type="button" className="btn-secondary">
                        Cancel
                    </button>

                    <button type="submit" className="btn-danger">
                        ✓ Save Changes
                    </button>
                </div>
            </form>

            <form className="profile-card" onSubmit={handlePasswordSubmit}>
                <div className="profile-section-head">
                    <h2>Account Settings</h2>
                    <p>Update password details for workspace access.</p>
                </div>

                <div className="password-form">
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
                        label="Confirm New Password"
                        name="confirmPassword"
                        value={passwordForm.confirmPassword}
                        visible={showPassword.confirmPassword}
                        onChange={handlePasswordChange}
                        onToggle={() => togglePassword("confirmPassword")}
                    />
                </div>

                <div className="profile-actions">
                    <button type="submit" className="btn-danger">
                        ✓ Save Password
                    </button>
                </div>
            </form>
        </section>
    );
}

function PasswordInput({ label, name, value, visible, onChange, onToggle }) {
    return (
        <div className="form-group password-group">
            <label>{label}</label>

            <div className="password-input-wrap">
                <input
                    type={visible ? "text" : "password"}
                    name={name}
                    value={value}
                    onChange={onChange}
                />

                <button type="button" onClick={onToggle}>
                    <EyeIcon />
                </button>
            </div>
        </div>
    );
}

function UserIcon() {
    return (
        <svg viewBox="0 0 24 24" width="34" height="34" fill="none">
            <path
                d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                stroke="currentColor"
                strokeWidth="2"
            />
            <path
                d="M4 21a8 8 0 0 1 16 0"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
}

function EyeIcon() {
    return (
        <svg viewBox="0 0 24 24" width="17" height="17" fill="none">
            <path
                d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"
                stroke="currentColor"
                strokeWidth="2"
            />
            <path
                d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                stroke="currentColor"
                strokeWidth="2"
            />
        </svg>
    );
}

export default memo(ProfilePage);