import React, { memo } from "react";
import { PAGES } from "../views/Home/constants";
import { navItems } from "../views/Home/data";

function Sidebar({ activePage, onPageChange }) {
    return (
        <aside className="sidebar">
            <div className="brand">
                <div className="brand-icon">b</div>

                <div className="brand-text">
                    barcode<span>IP.</span>
                </div>

                <button className="menu-btn" type="button" aria-label="Toggle menu">
                    ☰
                </button>
            </div>

            <nav className="sidebar-nav" aria-label="Main navigation">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        type="button"
                        className={`nav-item ${activePage === item.id ? "active" : ""}`}
                        onClick={() => onPageChange(item.id)}
                    >
                        <span>{item.icon}</span>
                        <span>{item.label}</span>

                        {item.badge ? (
                            <strong className="nav-badge">{item.badge}</strong>
                        ) : null}
                    </button>
                ))}
            </nav>

            <div className="sidebar-footer">
                <button type="button" onClick={() => onPageChange(PAGES.COMMENTS)}>
                    1 Comments Ready
                </button>
            </div>
        </aside>
    );
}

export default memo(Sidebar);