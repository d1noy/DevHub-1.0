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
  Alert,
} from "@mui/material";
import { Apple, Visibility, VisibilityOff } from "@mui/icons-material";

// Хэширование паролей (SHA-256)
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export default function MainRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError("");
    setSuccess("");

    if (!login || !email || !password) {
      setError("Заполните все поля!");
      return;
    }

    // Простая валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Введите корректный email!");
      return;
    }

    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      if (users.some((user) => user.email === email)) {
        setError("Пользователь с таким email уже существует!");
        return;
      }

      const passwordHash = await hashPassword(password);

      users.push({ login, email, passwordHash });
      localStorage.setItem("users", JSON.stringify(users));

      setSuccess("Регистрация успешна! Теперь можете войти.");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      console.error("Ошибка при регистрации:", err);
      setError("Ошибка системы. Попробуйте снова.");
    }
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

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <TextField
          label="Логин"
          variant="outlined"
          fullWidth
          sx={{ mb: 2, input: { color: "white" }, label: { color: "white" } }}
          value={login}
          onChange={(e) => setLogin(e.target.value.trim())}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          sx={{ mb: 2, input: { color: "white" }, label: { color: "white" } }}
          value={email}
          onChange={(e) => setEmail(e.target.value.trim())}
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
