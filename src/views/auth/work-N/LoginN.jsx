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
import Logo from "assets/images/login-background.png";

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
          height: {
            xs: 50,
            md: 56,
          },
          fontSize: {
            xs: "16px",
            md: "18px",
          },
          "&:hover": {
            boxShadow: "none"
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          height: {
            xs: 54,
            sm: 58,
            md: 62,
          },
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
          padding: {
            xs: "15px 14px",
            md: "18px 16px",
          },
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
      const response = await login({
        email: formData.email,
        password: formData.password
      }).unwrap();

      dispatch(setCredentials({
        user: response.data.user,
        accessToken: response.data.accessToken,
      }));
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
            md: "1fr",
            lg: "55% 45%",
          },
          backgroundColor: "#ffffff",
          overflow: "hidden",
        }}
      >
        {/* Left Side */}
        <Box
          sx={{
            display: {
              xs: "none",
              lg: "block"
            },
            p: {
              lg: "20px 0 20px 32px"
            }
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "calc(100vh - 40px)",
              minHeight: 700,
              borderRadius: "18px",
              position: "relative",
              overflow: "hidden",
              backgroundImage: `url(${Logo})`
            }}
          >
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
              xs: 2,
              sm: 4,
              md: 5,
              lg: 7,
            },
            py: 5,
            backgroundColor: "#ffffff"
          }}
        >
          <Fade in timeout={500}>
            <Box
              sx={{
                width: "100%",
                maxWidth: {
                  xs: "100%",
                  sm: "420px",
                  md: "500px",
                  lg: "520px",
                }
              }}
            >
              {view === "login" ? (
                <>
                  <Box sx={{ mb: "18px" }}>
                    {/* <Box
                      component="img"
                      src={Logo}
                      alt="logo"
                      sx={{
                        width: "72px",
                        mb: "14px",
                        filter: "brightness(0)"
                      }}
                    /> */}

                    <Typography
                      sx={{
                        fontSize: {
                          xs: "34px",
                          sm: "42px",
                          md: "48px",
                          lg: "50px",
                        },
                        lineHeight: 1.05,
                        fontWeight: {
                          xs: 700,
                          md: 600,
                        },
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
                        fontSize: {
                          xs: "15px",
                          sm: "16px",
                          md: "18px",
                        },
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
                          fontSize: {
                            xs: "18px",
                            md: "22px",
                          },
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
                          fontSize: {
                            xs: "18px",
                            md: "22px",
                          },
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
                        display: "flex",
                        flexDirection: {
                          xs: "column",
                          sm: "row",
                        },
                        alignItems: {
                          xs: "flex-start",
                          sm: "center",
                        },
                        justifyContent: "space-between",
                        gap: 1,
                        mb: "26px"
                      }}
                    >
                      {/* <FormControlLabel
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
                      /> */}

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
                          to="/auth/register"
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
      </Box >
    </ThemeProvider >
  );
};

export default Login;