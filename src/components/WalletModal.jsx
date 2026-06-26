import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useCreateOrderMutation, useVerifyPaymentOrderMutation } from '../features/userApi';
import { toast } from "react-toastify";
import creditPurchase from "../assets/icons/credit_purchase.svg";
import closeIcon from "../assets/icons/closeIcon.svg";
import circleChecked from "../assets/icons/circle_checked.svg";
import shieldChecked from "../assets/icons/shield_checked.svg";

function WalletModal({ isOpen, onClose, currentBalance, onPaymentSuccess }) {
    // Standardized default tier value to $5 to prevent rendering disabled button elements on load
    const [amount, setAmount] = useState('5');
    const [createPayPalOrder, { isLoading: isCreating }] = useCreateOrderMutation();
    const [verifyPaymentOrder, { isLoading: isVerifying }] = useVerifyPaymentOrderMutation();

    const presets = [50, 100, 200, 500];

    const handlePresetSelection = (value) => {
        setAmount(value.toString());
    };

    const handleCustomInput = (e) => {
        const val = e.target.value;
        if (val === '' || /^\d+$/.test(val)) {
            setAmount(val);
        }
    };

    const parsedNumericAmount = amount ? parseInt(amount, 10) : 0;
    const isBelowMinimumLimit = parsedNumericAmount < 5;

    const paypalOptions = {
        "client-id": "ARp7PXThS37t807OY1Qa6Uu3LgIyON8a4lZ51Cf-umfbklKfFG2uh1VqdQkaO4HjP6ziZlyiZoSn7-Fz",
        currency: "USD",
        intent: "capture"
    };

    if (!isOpen) return null;

    return (
        <PayPalScriptProvider options={paypalOptions}>
            <div className="wallet-modal-overlay" onClick={onClose}>
                {/* Prevent click bubbling cutting off nested inputs */}
                <div className="wallet-modal-container animate-fade-in" onClick={(e) => e.stopPropagation()}>

                    {/* Header Controls Banner */}
                    <div className="wallet-modal-header">
                        <div className="title-group">
                            <h2><img src={creditPurchase} alt="credit_purchase" className="" /> Purchase Invention Credits</h2>
                            <p>Choose the modules you need. Each selected module costs 5 credits per invention case. <br />
                                For example, selecting all 5 modules will require 25 credits for one invention.</p>
                        </div>
                        <button type="button" onClick={onClose} className="close-modal-btn" aria-label="Close modal">
                            <img src={closeIcon} alt="close" className="" />
                        </button>
                    </div>

                    {/* Content Split Matrix Grid */}
                    <div className="wallet-modal-body">

                        {/* Interactive Left Input Interface Column */}
                        <div className="wallet-pane-left">
                            <label className="section-input-label">Recharge Credits</label>
                            <p className="subtext-mute">One invention case costs 5 credits per selected module.
                                Selecting all 5 modules requires 25 credits.</p>

                            <div className="presets-grid">
                                {presets.map((presetValue) => (
                                    <button
                                        key={presetValue}
                                        type="button"
                                        className={`preset-card-btn ${parsedNumericAmount === presetValue ? 'active' : ''}`}
                                        onClick={() => handlePresetSelection(presetValue)}
                                    >
                                        ${presetValue}
                                    </button>
                                ))}
                            </div>

                            <div className="custom-input-wrapper">
                                <label htmlFor="custom-credit-input">Custom / Selected Amount ($)</label>
                                <div className="input-icon-field">
                                    <span className="currency-symbol">$</span>
                                    <input
                                        id="custom-credit-input"
                                        type="text"
                                        placeholder="Enter custom amount"
                                        value={amount}
                                        onChange={handleCustomInput}
                                    />
                                </div>
                                {isBelowMinimumLimit && amount !== '' && (
                                    <p className="input-validation-error">
                                        <AlertCircle size={13} style={{ marginRight: '4px', display: 'inline' }} />
                                        Minimum deposit amount is $5
                                    </p>
                                )}
                            </div>

                            <div className="summary-calculation-box">
                                <span>You will receive</span>
                                <span className="highlighted-orange-text">
                                    {!isBelowMinimumLimit ? parsedNumericAmount : 0} Credits
                                </span>
                            </div>

                            {/* Secure Payment Trigger Target Wrapper */}
                            <div className="paypal-smart-buttons-wrapper">
                                {isBelowMinimumLimit ? (
                                    <div className="paypal-disabled-placeholder">
                                        Please enter an amount of $5 or more to unlock checkout options.
                                    </div>
                                ) : (
                                    <PayPalButtons
                                        style={{ layout: "vertical", shape: "rect", color: "gold", label: "pay" }}
                                        forceReRender={[parsedNumericAmount]}
                                        createOrder={async () => {
                                            try {
                                                const response = await createPayPalOrder({ amount: parsedNumericAmount }).unwrap();
                                                return response.id;
                                            } catch (err) {
                                                console.error("Order initiation failure:", err);
                                                toast.error("Failed to start transaction window with PayPal.");
                                                throw err;
                                            }
                                        }}
                                        // REMOVED 'actions' argument context block to cleanly stay compliant with server workflows
                                        onApprove={async (data) => {
                                            try {
                                                await verifyPaymentOrder({ orderID: data.orderID }).unwrap();

                                                if (typeof onPaymentSuccess === 'function') {
                                                    onPaymentSuccess();
                                                }
                                                toast.success(`Payment Confirmed! Successfully added ${parsedNumericAmount} credits.`);
                                                onClose();
                                            } catch (err) {
                                                console.error("Order fulfillment sync error:", err);
                                                toast.error("Payment went through, but your wallet balance failed to synchronize. Please contact support.");
                                            }
                                        }}
                                        onError={(err) => {
                                            console.error("PayPal Execution Lifecycle Failure:", err);
                                            toast.error("An error occurred with the PayPal window interface. Please try again.");
                                        }}
                                    />
                                )}
                            </div>
                        </div>

                        {/* Informational Right Context Branding Column */}
                        <div className="wallet-pane-right">
                            <h3>Credit Usage</h3>

                            <div className="module-rate-list">

                                <div className="rate-row-item">
                                    <span className="module-name">
                                        Patent Search
                                    </span>
                                    <span >
                                        <button className="badge-rate-pill">
                                            5 Credit
                                        </button>
                                    </span>
                                </div>

                                <div className="rate-row-item">
                                    <span className="module-name">
                                        Publication Search
                                    </span>
                                    <span >
                                        <button className="badge-rate-pill">
                                            5 Credit
                                        </button>
                                    </span>
                                </div>

                                <div className="rate-row-item">
                                    <span className="module-name">
                                        Product Search
                                    </span>
                                    <span >
                                        <button className="badge-rate-pill">
                                            5 Credit
                                        </button>
                                    </span>
                                </div>

                                <div className="rate-row-item">
                                    <span className="module-name">
                                        Provisional Draft
                                    </span>
                                    <span >
                                        <button className="badge-rate-pill">
                                            5 Credit
                                        </button>
                                    </span>
                                </div>

                                <div className="rate-row-item">
                                    <span className="module-name">
                                        Non-Provisional Draft
                                    </span>
                                    <span >
                                        <button className="badge-rate-pill">
                                            5 Credit
                                        </button>
                                    </span>
                                </div>

                            </div>

                            <div className="perks-checklist">

                                <div className="perk-bullet">
                                    <img src={circleChecked} alt="circleChecked" className="" />
                                    <span>Use credits across all invention modules</span>
                                </div>

                                <div className="perk-bullet">
                                    <img src={circleChecked} alt="circleChecked" className="" />
                                    <span>One credit supports one invention case</span>
                                </div>

                                <div className="perk-bullet">
                                    <img src={circleChecked} alt="circleChecked" className="" />
                                    <span>Download reports and generated outputs</span>
                                </div>

                            </div>
                            <hr />
                            <div className="encryption-disclaimer-footer">
                                <img src={shieldChecked} alt="shieldChecked" className="" />
                                <span>
                                    Secure payment processing powered by PayPal.
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </PayPalScriptProvider>
    );
}

export default WalletModal;