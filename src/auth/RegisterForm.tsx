import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

interface RegistrationFormData {
  firstName: string;
  lastName: string;
  birthday: string;
  gender: string;
  username: string;
  email: string;
  password: string;
}

const genders = ["Male", "Female"];

const RegisterForm = () => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    firstName: "",
    lastName: "",
    birthday: "",
    gender: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | { value: unknown }>
  ) => {
    const { name, value } = event.target as HTMLInputElement;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleGenderChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
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
                  <Box>
                    <TextField
                      id="firstName"
                      name="firstName"
                      label="First Name"
                      variant="outlined"
                      value={formData.firstName}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Box>
                  <Box sx={{ mt: "20px" }}>
                    <TextField
                      fullWidth
                      id="lastName"
                      name="lastName"
                      label="Last Name"
                      variant="outlined"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </Box>
                  <Box sx={{ mt: "20px" }}>
                    <TextField
                      fullWidth
                      id="birthday"
                      name="birthday"
                      label="Birthday"
                      variant="outlined"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      value={formData.birthday}
                      onChange={handleChange}
                    />
                  </Box>
                  <Box sx={{ mt: "20px" }}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id="gender-label">Gender</InputLabel>
                      <Select
                        labelId="gender-label"
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleGenderChange}
                        label="Gender"
                        fullWidth
                      >
                        {genders.map((gender) => (
                          <MenuItem key={gender} value={gender}>
                            {gender}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                  <Box sx={{ mt: "20px" }}>
                    <TextField
                      fullWidth
                      id="username"
                      name="username"
                      label="Username"
                      variant="outlined"
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </Box>
                  <Box sx={{ mt: "20px" }}>
                    <TextField
                      fullWidth
                      id="email"
                      name="email"
                      label="Email"
                      variant="outlined"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Box>
                  <Box sx={{ mt: "20px" }}>
                    <TextField
                      fullWidth
                      id="password"
                      name="password"
                      label="Password"
                      type="password"
                      autoComplete="current-password"
                      variant="outlined"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </Box>
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
                  >
                    Register
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
          <Divider sx={{ mt: 3, mb: 3 }} />
          <Link color="textSecondary" variant="body2">
            <a href="/login">Already have an account? Login</a>
          </Link>
        </Card>
      </Container>
    </Box>
  );
};

export default RegisterForm;
