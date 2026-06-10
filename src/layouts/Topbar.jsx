import React, { memo, useEffect, useRef, useState } from "react";

function Topbar({
    userName = "Developeraltbig",
    onProfileClick,
    onLogoutConfirm
}) {
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsProfileMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    const handleProfileClick = () => {
        setIsProfileMenuOpen(false);

        if (onProfileClick) {
            onProfileClick();
        }
    };

    const handleLogoutClick = () => {
        setIsProfileMenuOpen(false);
        setIsLogoutModalOpen(true);
    };

    const handleConfirmLogout = () => {
        setIsLogoutModalOpen(false);

        if (onLogoutConfirm) {
            onLogoutConfirm();
        }
    };

    return (
        // <>
        //     <header className="topbar">
        //         <div />

        //         <div className="profile-menu-wrap" ref={menuRef}>
        //             <button
        //                 className={`profile-btn ${isProfileMenuOpen ? "active" : ""}`}
        //                 type="button"
        //                 onClick={() => setIsProfileMenuOpen((prev) => !prev)}
        //             >
        //                 <span className="profile-avatar">
        //                     <UserIcon />
        //                 </span>

        //                 <span>{userName}</span>

        //                 <span className="chevron">
        //                     <ChevronDownIcon />
        //                 </span>
        //             </button>

        //             {isProfileMenuOpen && (
        //                 <div className="profile-dropdown">
        //                     <button
        //                         type="button"
        //                         className="profile-dropdown-item"
        //                         onClick={handleProfileClick}
        //                     >
        //                         <UserSmallIcon />
        //                         <span>Profile</span>
        //                     </button>

        //                     <button
        //                         type="button"
        //                         className="profile-dropdown-item"
        //                         onClick={handleLogoutClick}
        //                     >
        //                         <LogoutIcon />
        //                         <span>Log Out</span>
        //                     </button>
        //                 </div>
        //             )}
        //         </div>
        //     </header>

        //     {isLogoutModalOpen && (
        //         <div className="logout-modal-overlay">
        //             <div className="logout-modal">
        //                 <div className="logout-modal-icon">
        //                     <LogoutIcon />
        //                 </div>

        //                 <h3>Log out?</h3>

        //                 <p>
        //                     Are you sure you want to log out from your BarcodeIP workspace?
        //                 </p>

        //                 <div className="logout-modal-actions">
        //                     <button
        //                         type="button"
        //                         className="btn-secondary"
        //                         onClick={() => setIsLogoutModalOpen(false)}
        //                     >
        //                         Cancel
        //                     </button>

        //                     <button
        //                         type="button"
        //                         className="btn-danger"
        //                         onClick={handleConfirmLogout}
        //                     >
        //                         Log Out
        //                     </button>
        //                 </div>
        //             </div>
        //         </div>
        //     )}
        // </>
        <></>
    );
}

function UserIcon() {
    return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
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

function UserSmallIcon() {
    return (
        <svg viewBox="0 0 24 24" width="19" height="19" fill="none">
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

function LogoutIcon() {
    return (
        <svg viewBox="0 0 24 24" width="19" height="19" fill="none">
            <path
                d="M15 17l5-5-5-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M20 12H9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <path
                d="M12 21H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
}

function ChevronDownIcon() {
    return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
            <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default memo(Topbar);