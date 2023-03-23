import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const auth = useAuth();

  useEffect(() => {
    console.log(auth.isAuthenticated);
    console.log(auth.user);
  }, [auth]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <>
      {auth.user && <Navigate to="/" replace={true} />}
      <Box
        component="main"
        sx={{
          backgroundColor: "neutral.50",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          justifyContent: "center",
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            pb: {
              xs: "60px",
              md: "120px",
            },
            pt: {
              xs: 5,
              md: 5,
            },
          }}
        >
          <Card elevation={16} sx={{ p: 4 }}>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  height: 50,
                }}
              >
                MovieIO
              </Box>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                mt: 1,
              }}
            >
              <Box>
                <form onSubmit={handleSubmit}>
                  <Box>
                    <TextField
                      id="email"
                      label="Email"
                      variant="outlined"
                      value={email}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setEmail(event.target.value)
                      }
                      fullWidth
                    />
                  </Box>
                  <Box sx={{ mt: "20px" }}>
                    <TextField
                      id="password"
                      label="Password"
                      type="password"
                      autoComplete="current-password"
                      variant="outlined"
                      value={password}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setPassword(event.target.value)
                      }
                      fullWidth
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      sx={{ marginTop: 2 }}
                      type="submit"
                      variant="contained"
                      color="primary"
                      onClick={async () => {
                        const login = await auth.login({
                          username: email,
                          password: password,
                        });
                      }}
                    >
                      Login
                    </Button>
                  </Box>
                </form>
              </Box>
            </Box>
            <Divider sx={{ mt: 3, mb: 3 }} />
            <Link color="textSecondary" variant="body2">
              <a href="/register">Create Account</a>
            </Link>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default LoginForm;
