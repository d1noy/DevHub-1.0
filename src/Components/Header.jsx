import { Box, Menu, MenuItem, Typography, Avatar, TextField } from "@mui/material";
import logo from "../img/DEVHUB.png";
import avatar from "../img/avatar.png";
import avatar2 from "../img/avatar2.jpg";
import avatar3 from "../img/avatar3.jpg";
import avatar4 from "../img/avatar4.jpg";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const projects = [
    { title: "Проект DevHub", description: "это централизованная платформа для разработчиков, созданная для того, чтобы объединять, вдохновлять и стимулировать сообщество. Здесь вы можете не только демонстрировать свои проекты, но и находить единомышленников, обмениваться опытом и следить за последними трендами в мире IT."},
    { title: "Проект Myvision.School", description: "Мы обучаем немецкому языку с учетом всех пользовательских настроек - твоего уровня подготовки, твоих запросов, комфортного конкретно для тебя времени. Мы работаем в режиме постоянной коммуникации “студент - преподаватель”. А студенты, успешно сдавшие экзамены, реализуют свои первоначальные цели: успешное трудоустройство, адаптация в европейской среде, расширение социальных горизонтов."},
    { title: "Проект Telegram", description: "это кроссплатформенный мессенджер, который позволяет пользователям обмениваться текстовыми, голосовыми, видеосообщениями, файлами, фотографиями и стикерами"},
    { title: "Проект Discord", description: "это бесплатная кроссплатформенная платформа для голосового, видео- и текстового общения, изначально созданная для геймеров, но теперь широко используемая сообществами по интересам, учебными и рабочими группами"},
    { title: "Проект VK", description: " крупнейшая российская социальная сеть, позволяющая пользователям общаться, обмениваться контентом (фото, видео, музыка), подписываться на сообщества, слушать музыку, смотреть клипы, а также использовать различные сервисы и мини-приложения, такие как денежные переводы и игры"},

  ]

   const developers = [
    { name: "Даниил", surname: "Чукарин", avatar:avatar2 },
    { name: "Никита", surname: "Самотеев", avatar:avatar3 },
    { name: "Павел", surname: "Дуров", avatar:avatar4 },
  ];

  const navLinkStyle = {
    color: "#fff",
    textDecoration: "none",
    fontWeight: 500,
    "&:hover": { color: "#ff6b6b" },
    mb: "50px",
  };

  return (
    <Box   sx={{  overflowX: 'hidden'}}>
    <Box 
      sx={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        // Статичный градиент фона
        background: "linear-gradient(180deg, #0d0d0d, #4a0194, #992fc4)",
      }}
    >
      {/* Шапка */}
      <Box
        sx={{
          height: "12vh",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 5,
        }}
      >
        {/* Лого */}
        <Box
          component="img"
          src={logo}
          alt="devhub"
          sx={{
            width: "255px",
            height: "80%",
            maxHeight: 60,
            objectFit: "contain",
          }}
        />

        {/* Аватар с градиентом */}
        <Box
          onClick={handleClick}
          sx={{
            display: "inline-block",
            p: "3px",
            borderRadius: "50%",
            background: "linear-gradient(270deg, #561394ff, #561394ff, #561394ff)",
            cursor: "pointer",
          }}
        >
          <Avatar
            src={avatar}
            alt="devhub avatar"
            sx={{ width: 60, height: 60 }}
          />
        </Box>

        {/* Меню */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <MenuItem onClick={handleClose}>Профиль</MenuItem>
          <MenuItem onClick={handleClose}>Настройки</MenuItem>
          <MenuItem component={Link} to="/" onClick={handleClose}>
            Выйти
          </MenuItem>
        </Menu>
      </Box>

      {/* Основная сетка: навигация + контент */}
      <Box
        sx={{
          mt: 6,
          px: 5,
          py: 4,
          display: "grid",
          gridTemplateColumns: "250px 1fr",
          gap: 4,
          width: "90%",
          mx: "auto",
        }}
      >
        {/* Левая панель (навигация) */}
        <Box
          sx={{
            backgroundColor: "rgba(250, 250, 250, 0.1)",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
            height: "fit-content",
            p: 2,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            minHeight: "90dvh",
            gap: 2,
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Поиск..."
            size="small"
            fullWidth
            sx={{
              borderRadius: "8px",
              input: { padding: "8px" },
              mb: "100px",
            }}
          />
          <Typography component={Link} to="/header" sx={navLinkStyle}>
            Главная
          </Typography>
          <Typography component={Link} to="/projects" sx={navLinkStyle}>
            Мои проекты
          </Typography>
          <Typography component={Link} to="/about" sx={navLinkStyle}>
            Сообщения
          </Typography>
          <Typography component={Link} to="/about" sx={navLinkStyle}>
            Музыка
          </Typography>
          <Typography component={Link} to="/about" sx={navLinkStyle}>
            Настройки
          </Typography>
        </Box>

        {/* Контент справа */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {/* Добро пожаловать */}
          <Box
            sx={{
              backgroundColor: "rgba(255,255,255,0.1)",
              borderRadius: "16px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
              p: 4,
            }}
          >
            <Typography
              sx={{ color: "#fff", fontSize: "32px", fontWeight: "bold" }}
            >
              Добро пожаловать в DevHub 🚀
            </Typography>
            <Typography sx={{ color: "#ddd", fontSize: "18px", mt: 2 }}>
              Это централизованная платформа для разработчиков, созданная для того, чтобы объединять, вдохновлять и стимулировать сообщество. Здесь вы можете не только демонстрировать свои проекты, но и находить единомышленников, обмениваться опытом и следить за последними трендами в мире IT.
            </Typography>
          </Box>

          {/* Проекты */}
          <Box
            sx={{
              backgroundColor: "rgba(255,255,255,0.1)",
              borderRadius: "16px",
              p: 4,
              boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "#fff",
                fontWeight: "bold",
                mb: 3,
                display: "flex",
                justifyContent: "center",
              }}
            >
              Топ-5 проектов 🔥
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px,1fr))",
                gap: 3,
              }}
            >
              {projects.map((proj, index) => (
                <Box
                  key={index}
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    p: 3,
                    color: "#fff",
                    textAlign: "center",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 6px 20px rgba(0,0,0,0.5)",
                    },
                  }}
                >
                  <Typography variant="h6">{proj.title}</Typography>
                  <Typography variant="body2">{proj.description}</Typography>
                </Box>
              ))}
            </Box>
          </Box>

            <Box
            sx={{
              backgroundColor: "rgba(255,255,255,0.1)",
              borderRadius: "16px",
              p: 4,
              boxShadow: "0 4px 20px rgba(0,0,0,0.4)",

            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "#fff",
                fontWeight: "bold",
                mb: 3,
                display: "flex",
                justifyContent: "center",
  
              }}
            >
              Топ-3 разработчика 🔥
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(400px,1fr))",
                gap: 3,

                
              }}
            >
              {developers.map((dev, index) => (
                <Box
                  key={index}
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    p: 3,
                    color: "#fff",
                    textAlign: "center",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 6px 20px rgba(0,0,0,0.5)",

                      
                    },
                  }}
                >
                    <Box sx={{display: "flex", alignItems: "center"}}>
                   <Avatar src={dev.avatar} sx={{ width: 80, height: 80, mr:5, }} />
                    <Typography variant="h6">{dev.name} {dev.surname}</Typography>
                    
                    </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
    </Box>
  );
}
