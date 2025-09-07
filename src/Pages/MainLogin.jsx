// src/Pages/MainLogin.jsx
import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link as MuiLink,
  Divider,
  InputAdornment,
  IconButton,
  Paper,
} from "@mui/material";
import { Apple, Visibility, VisibilityOff } from "@mui/icons-material";

export default function MainLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

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
          Войти
        </Typography>

        <Typography variant="body2" sx={{ color: "white", mb: 3 }}>
          Добро пожаловать на сайте Devhub!
        </Typography>

        <TextField
          label="Электронная почта или телефон"
          variant="outlined"
          fullWidth
          sx={{
            mb: 2,
            input: { color: "white" },
            label: { color: "white" },
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.12)" },
          }}
        />

        <TextField
          label="Пароль"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          fullWidth
          sx={{ mb: 1, input: { color: "white" }, label: { color: "white" } }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((s) => !s)}
                  edge="end"
                  aria-label="toggle password visibility"
                  sx={{ color: "white" }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Box textAlign="right" mb={2}>
          <MuiLink href="#" underline="hover" sx={{ color: "white", fontSize: 13 }}>
            Забыли пароль?
          </MuiLink>
        </Box>

        {/* используем navigate() - программная навигация после клика */}
        <Button
          variant="contained"
          fullWidth
          onClick={() => {
            // здесь можно выполнить валидацию / запрос на сервер,
            // и потом перейти на /header при успехе:
            navigate("/header");
          }}
          sx={{
            background: "linear-gradient(90deg, #7f00ff, #e100ff)",
            borderRadius: 2,
            mb: 2,
            color: "white",
          }}
        >
          Войти
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
          Нету аккаунта?{" "}
          <MuiLink component={RouterLink} to="/join" underline="hover" sx={{ color: "#9d4edd" }}>
            Зарегистрироваться
          </MuiLink>
        </Typography>
      </Paper>
    </Box>
  );
}