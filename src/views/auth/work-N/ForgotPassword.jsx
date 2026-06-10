import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Link
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useForgotPasswordMutation } from "../../../features/slice/auth/authApi";
import { toast } from "react-toastify";

import Logo from "assets/images/barcodeip-logo.png";

const ForgotPassword = ({ onBack }) => {
  const [email, setEmail] = useState("");
  const [forgotPassword, { isLoading, error: apiError }] =
    useForgotPasswordMutation();
  const [isSent, setIsSent] = useState(false);

  const getErrorMessage = () => {
    if (!apiError) return null;

    if (apiError.status === 500 || apiError.status === "FETCH_ERROR") {
      return "This email is not registered with us, or the server is unavailable.";
    }

    if ("data" in apiError) {
      return apiError.data?.message || "Something went wrong. Please try again.";
    }

    return "An unexpected error occurred.";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    try {
      await forgotPassword({ email }).unwrap();
      toast.success("Reset link sent!");
      setIsSent(true);
    } catch (err) {
      console.error("Backend Error Object:", err);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ mb: "18px" }}>
        <Box
          component="img"
          src={Logo}
          alt="logo"
          sx={{
            width: "72px",
            mb: "14px",
            filter: "brightness(0)"
          }}
        />

        <Typography
          sx={{
            fontSize: {
              xs: "49px",
              md: "49px"
            },
            lineHeight: 1.05,
            fontWeight: 600,
            letterSpacing: "-0.045em",
            color: "#050505",
            mb: "12px",
            fontFamily: 'Figtree',
          }}
        >
          Forgot Password?
        </Typography>

        <Typography
          sx={{
            fontSize: "18.6px",
            lineHeight: 1.35,
            color: "#666666",
            maxWidth: "520px",
            fontWeight: "400",
            fontFamily: 'Figtree',
          }}
        >
          Enter your registered email address and we will send you a password
          reset link.
        </Typography>
      </Box>

      {getErrorMessage() && (
        <Alert
          severity="error"
          variant="outlined"
          sx={{
            mb: 3,
            borderRadius: "8px",
            borderColor: "#f3c5c0",
            backgroundColor: "#fff7f6",
            color: "#9b2f22"
          }}
        >
          {getErrorMessage()}
        </Alert>
      )}

      {isSent ? (
        <Box>
          <Alert
            severity="success"
            sx={{
              mb: "28px",
              borderRadius: "8px",
              backgroundColor: "#f0fdf4",
              color: "#166534"
            }}
          >
            Reset link sent to <strong>{email}</strong>. Please check your email
            inbox shortly.
          </Alert>

          <Button
            fullWidth
            variant="contained"
            type="button"
            onClick={onBack}
            sx={{
              height: "56px",
              borderRadius: "8px",
              fontSize: "18px",
              fontWeight: 700,
              textTransform: "none",
              background: "linear-gradient(90deg, #DF4232 0%, #872319 100%)",
              boxShadow: "none",
              "&:hover": {
                background: "linear-gradient(90deg, #cf3b2d 0%, #741d15 100%)",
                boxShadow: "none"
              }
            }}
          >
            Back to Login
          </Button>
        </Box>
      ) : (
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Box sx={{ mb: "28px" }}>
            <Typography
              sx={{
                color: "#333333",
                fontSize: "20px",
                fontWeight: 500,
                mb: "10px"
              }}
            >
              Your email
            </Typography>

            <TextField
              fullWidth
              placeholder=""
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!apiError}
              autoComplete="email"
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: "62px",
                  borderRadius: "7px",
                  backgroundColor: "#ffffff",
                  boxShadow: "0 12px 26px rgba(0, 0, 0, 0.07)"
                }
              }}
            />
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{
              height: "56px",
              borderRadius: "8px",
              fontSize: "18px",
              fontWeight: 700,
              textTransform: "none",
              background: "linear-gradient(to right, #DF4833, #79271C);",
              boxShadow: "none",
              "&:hover": {
                background: "linear-gradient(90deg, #cf3b2d 0%, #741d15 100%)",
                boxShadow: "none"
              }
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} sx={{ color: "#ffffff" }} />
            ) : (
              "Send Reset Link"
            )}
          </Button>

          <Box sx={{ textAlign: "center", mt: "26px" }}>
            <Link
              component="button"
              type="button"
              onClick={onBack}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                color: "#D94130",
                textDecoration: "none",
                fontWeight: 800,
                fontSize: "15px",
                border: 0,
                background: "transparent",
                cursor: "pointer"
              }}
            >
              <ArrowBack sx={{ fontSize: 18 }} />
              Back to Login
            </Link>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ForgotPassword;