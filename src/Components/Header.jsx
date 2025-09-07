import { Box, Menu, MenuItem, Typography, Avatar, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button, Rating } from "@mui/material";
import logo from "../img/DEVHUB.png";
import avatar2 from "../img/avatar2.jpg";
import avatar3 from "../img/avatar3.jpg";
import avatar4 from "../img/avatar4.jpg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";

// Массив проектов вне компонента, чтобы useEffect не ругался на зависимости
const initialProjects = [
  { id: 1, title: "DevHub", description: "Платформа для разработчиков: демонстрация проектов, поиск единомышленников, обмен опытом и отслеживание IT-трендов.", rating: 4.5 },
  { id: 2, title: "Myvision.School", description: "Обучение немецкому языку с персональными настройками. Помогает студентам успешно сдавать экзамены, адаптироваться в Европе и расширять горизонты.", rating: 4.2 },
  { id: 3, title: "Telegram", description: "Кроссплатформенный мессенджер для текста, голосовых и видеосообщений, файлов и стикеров.", rating: 4.8 },
  { id: 4, title: "Discord", description: "Платформа для голосового, видео- и текстового общения. Используется сообществами, учебными и рабочими группами.", rating: 4.6 },
  { id: 5, title: "VK", description: "Социальная сеть для общения, обмена контентом, подписки на сообщества и использования сервисов и мини-приложений.", rating: 4.0 },
];

const developers = [
  { name: "Даниил", surname: "Чукарин", avatar: avatar2 },
  { name: "Никита", surname: "Самотеев", avatar: avatar3 },
  { name: "Павел", surname: "Дуров", avatar: avatar4 },
];

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [rating, setRating] = useState(4);
  const open = Boolean(anchorEl);

  // Загрузка проектов из localStorage или инициализация
  useEffect(() => {
    const savedProjects = localStorage.getItem("projects");
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      setProjects(initialProjects);
    }
  }, []);

  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleProjectClick = (proj) => {
    setSelectedProject(proj);
    setRating(proj.rating || 4);
  };

  const handleCloseDialog = () => setSelectedProject(null);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    setProjects((prev) =>
      prev.map((proj) =>
        proj.id === selectedProject.id ? { ...proj, rating: newRating } : proj
      )
    );
    localStorage.setItem(
      "projects",
      JSON.stringify(
        projects.map((proj) =>
          proj.id === selectedProject.id ? { ...proj, rating: newRating } : proj
        )
      )
    );
  };

  return (
    <Box sx={{ overflowX: 'hidden' }}>
      <Box sx={{ minHeight: "100vh", width: "100vw", display: "flex", flexDirection: "column", background: "linear-gradient(180deg, #2b1a3f, #4a2c6f)" }}>
        
        {/* Header */}
        <Box sx={{ height: "12vh", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", px: 5 }}>
          <Box component="img" src={logo} alt="devhub" sx={{ width: "255px", height: "80%", maxHeight: 60, objectFit: "contain" }} />
          <Box onClick={handleClick} sx={{ display: "inline-block", p: "3px", borderRadius: "50%", background: "rgba(255,255,255,0.15)", cursor: "pointer" }}>
            <Avatar src={avatar2} alt="devhub avatar" sx={{ width: 60, height: 60 }} />
          </Box>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} transformOrigin={{ vertical: "top", horizontal: "center" }}>
            <MenuItem component={Link} to="/profile" onClick={handleClose}>Профиль</MenuItem>
            <MenuItem onClick={handleClose}>Настройки</MenuItem>
            <MenuItem component={Link} to="/" onClick={handleClose}>Выйти</MenuItem>
          </Menu>
        </Box>

        {/* Main Grid */}
        <Box sx={{ mt: 6, px: 5, py: 4, display: "grid", gridTemplateColumns: "250px 1fr", gap: 4, width: "90%", mx: "auto" }}>
          
          {/* Sidebar */}
          <Box sx={{ backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "16px", p: 3, display: "flex", alignItems: "center", flexDirection: "column", minHeight: "55dvh", gap: 2 }}>
            <TextField
              variant="outlined"
              placeholder="Поиск..."
              size="small"
              fullWidth
              InputProps={{ startAdornment: <SearchIcon sx={{ color: "rgba(255,255,255,0.7)", mr: 1 }} /> }}
              sx={{ mb: 6, borderRadius: "12px", backgroundColor: "rgba(255,255,255,0.1)", input: { color: "#fff", padding: "10px" }, "& .MuiOutlinedInput-root": { borderRadius: "12px", "& fieldset": { borderColor: "rgba(255,255,255,0.3)" }, "&.Mui-focused fieldset": { borderColor: "transparent", boxShadow: "0 0 8px rgba(255,255,255,0.3)" } } }}
            />
            {[{ label: "Главная", link: "/header" }, { label: "Мои проекты", link: "/projects" }, { label: "Сообщения", link: "/about" }, { label: "Музыка", link: "/about" }, { label: "Настройки", link: "/about" }].map((item, i) => (
              <Typography key={i} component={Link} to={item.link} sx={{ width: "100%", textAlign: "center", color: "#fff", textDecoration: "none", fontWeight: 500, fontSize: "16px", px: 2, py: 1.5, borderRadius: "10px", transition: "all 0.25s ease", "&:hover": { backgroundColor: "rgba(255,255,255,0.2)", color: "#e0c8ff", transform: "scale(1.03)", cursor: "pointer" } }}>{item.label}</Typography>
            ))}
          </Box>

          {/* Content */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {/* Welcome */}
            <Box sx={{ backgroundColor: "rgba(255,255,255,0.08)", borderRadius: "16px", p: 4 }}>
              <Typography sx={{ color: "#fff", fontSize: "32px", fontWeight: "bold" }}>Добро пожаловать в DevHub 🚀</Typography>
              <Typography sx={{ color: "#f0e6ff", fontSize: "18px", mt: 2 }}>
                Платформа для разработчиков: демонстрация проектов, поиск единомышленников и обмен опытом.
              </Typography>
            </Box>

            {/* Projects */}
            <Box sx={{ backgroundColor: "rgba(255,255,255,0.15)", borderRadius: "16px", p: 4 }}>
              <Typography variant="h5" sx={{ color: "#fff", fontWeight: "bold", mb: 3, textAlign: "center" }}>Топ-5 проектов 🔥</Typography>
              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px,1fr))", gap: 3 }}>
                {projects.map((proj) => (
                  <Box
                    key={proj.id}
                    onClick={() => handleProjectClick(proj)}
                    sx={{ backgroundColor: "rgba(255,255,255,0.12)", borderRadius: "12px", p: 3, textAlign: "center", color: "#fff", cursor: "pointer", transition: "all 0.3s ease", "&:hover": { transform: "scale(1.05)", backgroundColor: "rgba(255,255,255,0.25)", boxShadow: "0 8px 20px rgba(255,255,255,0.2)" } }}
                  >
                    <Typography sx={{ mb: 2, fontWeight: "700", fontSize: "18px" }}>{proj.title}</Typography>
                    <Typography sx={{ color: "#f8f4ff", fontWeight: "500", fontSize: "16px", lineHeight: 1.6 }}>{proj.description.slice(0, 60)}...</Typography>
                    <Rating value={proj.rating} precision={0.1} readOnly sx={{ mt: 1, "& .MuiRating-iconFilled": { color: "#ffeb3b" }, "&:hover .MuiRating-iconEmpty": { color: "#ffe066" } }} />
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Developers */}
            <Box sx={{ backgroundColor: "rgba(255,255,255,0.08)", borderRadius: "16px", p: 4 }}>
              <Typography variant="h5" sx={{ color: "#fff", fontWeight: "bold", mb: 3, textAlign: "center" }}>Топ-3 разработчика 🔥</Typography>
              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(400px,1fr))", gap: 3 }}>
                {developers.map((dev, index) => (
                  <Box
                    key={index}
                    sx={{ backgroundColor: "rgba(255,255,255,0.12)", borderRadius: "12px", p: 3, textAlign: "center", transition: "transform 0.2s, background-color 0.2s", "&:hover": { transform: "scale(1.03)", backgroundColor: "rgba(255,255,255,0.2)" } }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                      <Avatar src={dev.avatar} sx={{ width: 80, height: 80 }} />
                      <Typography variant="h6" sx={{ color: "#fff", fontWeight: "600" }}>{dev.name} {dev.surname}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Dialog для подробной информации о проекте */}
        <Dialog open={Boolean(selectedProject)} onClose={handleCloseDialog} PaperProps={{ sx: { backgroundColor: "rgba(43,26,63,0.95)", color: "#fff", borderRadius: 2 } }}>
          <DialogTitle sx={{ fontWeight: "bold" }}>{selectedProject?.title}</DialogTitle>
          <DialogContent>
            <Typography sx={{ mb: 2 }}>{selectedProject?.description}</Typography>
            <Typography>Рейтинг проекта:</Typography>
            <Rating
              value={rating}
              precision={0.1}
              onChange={(e, newValue) => handleRatingChange(newValue)}
              sx={{ "& .MuiRating-iconFilled": { color: "#ffeb3b" }, "& .MuiRating-iconHover": { color: "#ffe066" }, mt: 1 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} sx={{ color: "#fff" }}>Закрыть</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
