import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useVerifyPaymentOrderMutation } from '../features/userApi';

function WalletModal({ isOpen, onClose, currentBalance }) {
    const [amount, setAmount] = useState('100'); // Standardized default tier value string
    const [verifyPaymentOrder, { isLoading: isVerifying }] = useVerifyPaymentOrderMutation();

    const presets = [50, 100, 200, 500];

    // Synced configuration handler: syncs selection matrices directly to the input values
    const handlePresetSelection = (value) => {
        setAmount(value.toString());
    };

    const handleCustomInput = (e) => {
        const val = e.target.value;
        // Strict evaluation matching valid numeric entries or empty strings
        if (val === '' || /^\d+$/.test(val)) {
            setAmount(val);
        }
    };

    const parsedNumericAmount = amount ? parseInt(amount, 10) : 0;
    const isBelowMinimumLimit = parsedNumericAmount < 5;

    // Set fallback credentials. Use sandbox parameters for testing
    const paypalOptions = {
        "client-id": "ARp7PXThS37t807OY1Qa6Uu3LgIyON8a4lZ51Cf-umfbklKfFG2uh1VqdQkaO4HjP6ziZlyiZoSn7-Fz", // Replace with your actual PayPal Client ID
        currency: "USD",
        intent: "capture"
    };

    if (!isOpen) return null;

    return (
        <PayPalScriptProvider options={paypalOptions}>
            <div className="wallet-modal-overlay">
                <div className="wallet-modal-container animate-fade-in">

                    {/* Header Controls Banner */}
                    <div className="wallet-modal-header">
                        <div className="title-group">
                            <h2>Top-up Credits</h2>
                            <p>Select a pre-configured package or type your amount. Credits apply globally across modules.</p>
                        </div>
                        <button type="button" onClick={onClose} className="close-modal-btn" aria-label="Close modal">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Content Split Matrix Grid */}
                    <div className="wallet-modal-body">

                        {/* Interactive Left Input Interface Column */}
                        <div className="wallet-pane-left">
                            <label className="section-input-label">Recharge Credits</label>
                            <p className="subtext-mute">Select an automated package tier below</p>

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
                                        forceReRender={[parsedNumericAmount]} // Forces checkout reconfiguration parameters to update instantly
                                        createOrder={(data, actions) => {
                                            return actions.order.create({
                                                purchase_units: [{
                                                    amount: {
                                                        currency_code: "USD",
                                                        value: parsedNumericAmount.toString(),
                                                    },
                                                    description: `BarcodeIP Platform Wallet Recharge - ${parsedNumericAmount} Credits`
                                                }],
                                            });
                                        }}
                                        onApprove={async (data, actions) => {
                                            try {
                                                // Trigger server verification route endpoints asynchronously
                                                await verifyPaymentOrder({ orderID: data.orderID }).unwrap();
                                                alert(`Payment Confirmed! Successfully added ${parsedNumericAmount} credits.`);
                                                onClose();
                                            } catch (err) {
                                                console.error("Order fulfillment sync error:", err);
                                                alert("Payment went through, but your wallet balance failed to synchronize. Please contact support.");
                                            }
                                        }}
                                        onError={(err) => {
                                            console.error("PayPal Execution Lifecycle Failure:", err);
                                            alert("An error occurred with the PayPal window interface. Please try again.");
                                        }}
                                    />
                                )}
                            </div>
                        </div>

                        {/* Informational Right Context Branding Column */}
                        <div className="wallet-pane-right">
                            <h3>How Credits Work</h3>

                            <div className="module-rate-list">
                                <div className="rate-row-item">
                                    <span className="module-name">FTO & Patent Analysis</span>
                                    <span className="badge-rate-pill">1 Credit = 1 Analysis</span>
                                </div>
                                <div className="rate-row-item">
                                    <span className="module-name">Infringement AI Mapping</span>
                                    <span className="badge-rate-pill">1 Credit = 1 Analysis</span>
                                </div>
                                <div className="rate-row-item">
                                    <span className="module-name">Portfolio Intelligence Search</span>
                                    <span className="badge-rate-pill">1 Credit = 1 Analysis</span>
                                </div>
                            </div>

                            <div className="perks-checklist">
                                <div className="perk-bullet">
                                    <CheckCircle2 size={15} className="check-orange" />
                                    <span>Access all operational analytics modules</span>
                                </div>
                                <div className="perk-bullet">
                                    <CheckCircle2 size={15} className="check-orange" />
                                    <span>Priority Email and Analyst support desk queues</span>
                                </div>
                                <div className="perk-bullet">
                                    <CheckCircle2 size={15} className="check-orange" />
                                    <span>Export directly to parsed Microsoft Word tables</span>
                                </div>
                            </div>

                            <div className="encryption-disclaimer-footer">
                                <ShieldCheck size={16} />
                                <span>Payments are secure, automated, and encrypted via PayPal.</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </PayPalScriptProvider>
    );
}

export default WalletModal;