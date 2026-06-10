import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  InputAdornment,
  IconButton,
  CssBaseline,
  GlobalStyles,
  Alert,
  CircularProgress,
  Fade
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { useLoginMutation } from "../../../features/slice/auth/authApi";
import { setCredentials } from "../../../features/slice/auth/authSlice";
import FullPageLoader from "../../../components/FullPageLoader";
import ForgotPassword from "./ForgotPassword";
import Logo from "assets/images/barcodeip-logo.png";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#D94130",
      contrastText: "#ffffff"
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff"
    },
    text: {
      primary: "#070707",
      secondary: "#666666"
    }
  },
  typography: {
    fontFamily: '"Inter", "Plus Jakarta Sans", sans-serif'
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
          fontWeight: 700,
          boxShadow: "none",
          height: "56px",
          fontSize: "18px",
          "&:hover": {
            boxShadow: "none"
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          height: "62px",
          borderRadius: "7px",
          backgroundColor: "#ffffff",
          boxShadow: "0 12px 26px rgba(0, 0, 0, 0.07)",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#d7d7d7"
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#bdbdbd"
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#D94130",
            borderWidth: "1px"
          }
        },
        input: {
          fontSize: "16px",
          padding: "18px 16px"
        }
      }
    }
  }
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading, error: apiError }] = useLoginMutation();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [view, setView] = useState("login");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (validationError) setValidationError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setValidationError("Please enter both email and password.");
      return;
    }

    try {
      const userData = await login({
        email: formData.email,
        password: formData.password
      }).unwrap();

      dispatch(setCredentials({ ...userData.data }));
      localStorage.setItem("rememberMe", rememberMe);

      toast.success("Successfully logged in!");
      navigate("/project/new-case", { replace: true });
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const getErrorMessage = () => {
    if (validationError) return validationError;

    if (apiError) {
      if ("data" in apiError) {
        return apiError.data?.message || "Invalid credentials.";
      }

      return "User not registered.";
    }

    return null;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <GlobalStyles
        styles={{
          "html, body, #root": {
            width: "100%",
            minHeight: "100%",
            margin: 0,
            padding: 0,
            backgroundColor: "#ffffff"
          },
          "*": {
            boxSizing: "border-box"
          }
        }}
      />

      {isLoading && (
        <FullPageLoader
          colors={["#D94130", "#D94130", "#D94130"]}
          label="Connecting to Dashboard..."
        />
      )}

      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "55% 45%"
          },
          backgroundColor: "#ffffff",
          overflow: "hidden"
        }}
      >
        {/* Left Side */}
        <Box
          sx={{
            display: {
              xs: "none",
              md: "block"
            },
            p: {
              md: "20px 0 20px 32px"
            }
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "calc(100vh - 40px)",
              borderRadius: "18px",
              position: "relative",
              overflow: "hidden",
              background:
                "radial-gradient(circle at 50% 55%, rgba(255, 145, 55, 0.95) 0%, rgba(255, 125, 55, 0.98) 34%, rgba(255, 164, 91, 0.95) 63%, rgba(255, 241, 191, 0.9) 100%)"
            }}
          >
            <Box
              component="img"
              src={Logo}
              alt="logo"
              sx={{
                width: "105px",
                position: "absolute",
                top: "50px",
                left: "85px",
                filter: "brightness(0)"
              }}
            />

            <Box
              sx={{
                position: "absolute",
                left: "85px",
                bottom: "78px",
                maxWidth: "520px"
              }}
            >
              <Typography
                sx={{
                  fontSize: "30px",
                  lineHeight: 1.2,
                  fontWeight: 400,
                  color: "#25313b",
                  mb: "22px"
                }}
              >
                You can easily
              </Typography>

              <Typography
                sx={{
                  fontSize: {
                    md: "40px",
                    lg: "46px"
                  },
                  lineHeight: 1.18,
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  color: "#000000"
                }}
              >
                Get access your personal hub for clarity and productivity.
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Right Side */}
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: {
              xs: 3,
              sm: 5,
              md: 7
            },
            py: 5,
            backgroundColor: "#ffffff"
          }}
        >
          <Fade in timeout={500}>
            <Box
              sx={{
                width: "100%",
                maxWidth: "520px"
              }}
            >
              {view === "login" ? (
                <>
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
                          xs: "49.6px",
                          md: "49.6px"
                        },
                        lineHeight: 1.05,
                        fontWeight: 600,
                        letterSpacing: "-0.045em",
                        color: "#050505",
                        mb: "12px",
                        fontFamily: 'Figtree',
                      }}
                    >
                      Sign In
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
                      Enter your credentials to access your dashboard, organize
                      your idea, search relevant references, and prepare reports.
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

                  <Box component="form" onSubmit={handleSubmit} noValidate>
                    <Box sx={{ mb: "28px" }}>
                      <Typography
                        sx={{
                          color: "#3E3E3E",
                          fontSize: "22px",
                          fontWeight: 500,
                          mb: "10px",
                          fontFamily: "Figtree"
                        }}
                      >
                        Your email
                      </Typography>

                      <TextField
                        fullWidth
                        name="email"
                        variant="outlined"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                      />
                    </Box>

                    <Box sx={{ mb: "16px" }}>
                      <Typography
                        sx={{
                          color: "#3E3E3E",
                          fontSize: "22px",
                          fontWeight: 500,
                          mb: "10px",
                          fontFamily: "Figtree"
                        }}
                      >
                        Password
                      </Typography>

                      <TextField
                        fullWidth
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="current-password"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword((prev) => !prev)}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityOff sx={{ fontSize: 22 }} />
                                ) : (
                                  <Visibility sx={{ fontSize: 22 }} />
                                )}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: "26px"
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            sx={{
                              color: "#D94130",
                              "&.Mui-checked": {
                                color: "#D94130"
                              }
                            }}
                          />
                        }
                        label={
                          <Typography
                            sx={{
                              fontSize: "14px",
                              color: "#555555"
                            }}
                          >
                            Remember me
                          </Typography>
                        }
                      />

                      <Link
                        component="button"
                        type="button"
                        onClick={() => setView("forgot")}
                        sx={{
                          color: "#D94130",
                          textDecoration: "none",
                          fontWeight: 700,
                          fontSize: "14px"
                        }}
                      >
                        Forgot password?
                      </Link>
                    </Box>

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      disabled={isLoading}
                      sx={{
                        background:
                          "linear-gradient(to right, #DF4833, #79271C);",
                        "&:hover": {
                          background:
                            "linear-gradient(90deg, #cf3b2d 0%, #741d15 100%)"
                        }
                      }}
                    >
                      {isLoading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        "Sign In"
                      )}
                    </Button>

                    <Box sx={{ textAlign: "center", mt: "26px" }}>
                      <Typography
                        sx={{
                          fontSize: "15px",
                          color: "#666666"
                        }}
                      >
                        Don&apos;t have an account?{" "}
                        <Link
                          component={RouterLink}
                          to="/pages/auth/register"
                          sx={{
                            color: "#D94130",
                            textDecoration: "none",
                            fontWeight: 800
                          }}
                        >
                          Create account
                        </Link>
                      </Typography>
                    </Box>
                  </Box>
                </>
              ) : (
                <ForgotPassword onBack={() => setView("login")} />
              )}
            </Box>
          </Fade>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Login;