import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Divider,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Apple, Visibility, VisibilityOff } from "@mui/icons-material";

export default function MainRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!login || !email || !password) {
      alert("Заполните все поля!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.some((user) => user.email === email)) {
      alert("Пользователь с таким email уже существует!");
      return;
    }

    users.push({ login, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Регистрация успешна!");
    navigate("/"); // переходим на страницу логина
  };

  return (
    <Box
      sx={{
        height: "100dvh",
        width: "100dvw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url("/images/test.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: { xs: "90%", sm: 360 },
          borderRadius: 3,
          textAlign: "center",
          background: "rgba(250,250,250,0.05)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Typography variant="h5" sx={{ color: "white", mb: 1 }}>
          Регистрация
        </Typography>
        <Typography variant="body2" sx={{ color: "white", mb: 3 }}>
          Добро пожаловать на сайт DevHub!
        </Typography>

        <TextField
          label="Логин"
          variant="outlined"
          fullWidth
          sx={{ mb: 2, input: { color: "white" }, label: { color: "white" } }}
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          sx={{ mb: 2, input: { color: "white" }, label: { color: "white" } }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Пароль"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          fullWidth
          sx={{ mb: 2, input: { color: "white" }, label: { color: "white" } }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((s) => !s)}
                  edge="end"
                  sx={{ color: "white" }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{
            background: "linear-gradient(90deg, #7f00ff, #e100ff)",
            borderRadius: 2,
            mb: 2,
            color: "white",
          }}
          onClick={handleRegister}
        >
          Зарегистрироваться
        </Button>

        <Divider sx={{ my: 2, "&::before, &::after": { borderColor: "gray" }, color: "white" }}>
          или
        </Divider>

        <Button
          variant="outlined"
          startIcon={<Apple />}
          fullWidth
          sx={{ color: "white", borderColor: "gray", borderRadius: 2 }}
        >
          Войти через Apple
        </Button>

        <Typography variant="body2" sx={{ mt: 3, color: "white" }}>
          Уже есть аккаунт?{" "}
          <RouterLink to="/" style={{ color: "#9d4edd", textDecoration: "none" }}>
            Войти
          </RouterLink>
        </Typography>
      </Paper>
    </Box>
  );
}
