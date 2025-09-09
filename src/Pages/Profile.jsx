import {
    Box,
    Menu,
    MenuItem,
    Typography,
    Avatar,
    TextField,
    Button,
    Rating,
} from "@mui/material";
import { Email, Phone, Person, Tag, Info } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import logo from "../img/DEVHUB.png";
import avatar2 from "../img/avatar2.jpg";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    // Информация о пользователе
    const user = { nickname: "D1noy", name: "Даниил" };

    // Проверка доступности localStorage
    const lsAvailable = (() => {
        try {
            const k = "__ls_test__";
            localStorage.setItem(k, k);
            localStorage.removeItem(k);
            return true;
        } catch {
            return false;
        }
    })();

    // Безопасная загрузка рейтинга
    const [rating, setRating] = useState(() => {
        if (!lsAvailable) return 4.5;
        try {
            const saved = localStorage.getItem(`rating_${user.nickname}`);
            if (saved !== null) {
                const parsed = parseFloat(saved);
                if (Number.isFinite(parsed) && parsed >= 0 && parsed <= 5) {
                    return parsed;
                }
            }
        } catch (err) {
            console.error("Ошибка чтения localStorage:", err);
        }
        return 4.5;
    });

    // Сохранение
    const saveToStorage = (value) => {
        if (!lsAvailable) return;
        try {
            localStorage.setItem(`rating_${user.nickname}`, String(value));
        } catch (err) {
            console.error("Ошибка записи в localStorage:", err);
        }
    };

    // Обработка изменения рейтинга
    const handleRatingChange = (_e, newValue) => {
        if (typeof newValue !== "number" || !Number.isFinite(newValue)) return;
        const clamped = Math.min(5, Math.max(0, newValue));
        setRating(clamped);
        saveToStorage(clamped);
    };

    // Сброс рейтинга
    const handleReset = () => {
        setRating(4.5);
        if (!lsAvailable) return;
        try {
            localStorage.removeItem(`rating_${user.nickname}`);
        } catch (err) {
            console.error("Ошибка удаления из localStorage:", err);
        }
    };

    const handleClick = (e) => setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const skillStyle = {
        backgroundColor: "rgba(255,255,255,0.15)",
        padding: "4px 10px",
        borderRadius: "8px",
        fontSize: "14px",
        color: "#fff",
    };

    return (
        <Box sx={{ overflowX: "hidden" }}>
            <Box
                sx={{
                    minHeight: "100vh",
                    width: "100vw",
                    display: "flex",
                    flexDirection: "column",
                    background: "linear-gradient(180deg, #2b1a3f, #4a2c6f)",
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
                    <Box
                        component="img"
                        src={logo}
                        alt="devhub"
                        sx={{ width: "255px", height: "80%", maxHeight: 60, objectFit: "contain" }}
                    />

                    <Box
                        onClick={handleClick}
                        sx={{
                            display: "inline-block",
                            p: "3px",
                            borderRadius: "50%",
                            background: "rgba(255,255,255,0.15)",
                            cursor: "pointer",
                        }}
                    >
                        <Avatar src={avatar2} alt="devhub avatar" sx={{ width: 60, height: 60 }} />
                    </Box>

                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                        transformOrigin={{ vertical: "top", horizontal: "center" }}
                    >
                        <MenuItem component={Link} to="/profile" onClick={handleClose}>Профиль</MenuItem>
                        <MenuItem onClick={handleClose}>Настройки</MenuItem>
                        <MenuItem component={Link} to="/" onClick={handleClose}>Выйти</MenuItem>
                    </Menu>
                </Box>

                {/* Основная сетка */}
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
                    {/* Левая панель */}
                    <Box
                        sx={{
                            backgroundColor: "rgba(255,255,255,0.1)",
                            borderRadius: "16px",
                            p: 3,
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "column",
                            minHeight: "52dvh",
                            gap: 2,
                        }}
                    >
                        <TextField
                            variant="outlined"
                            placeholder="Поиск..."
                            size="small"
                            fullWidth
                            InputProps={{
                                startAdornment: <SearchIcon sx={{ color: "rgba(255,255,255,0.7)", mr: 1 }} />,
                            }}
                            sx={{
                                mb: 6,
                                borderRadius: "12px",
                                backgroundColor: "rgba(255,255,255,0.12)",
                                input: { color: "#fff", padding: "10px" },
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "12px",
                                    "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                                    "&.Mui-focused fieldset": { borderColor: "transparent", boxShadow: "0 0 8px rgba(255,255,255,0.3)" },
                                },
                            }}
                        />

                        {[{ label: "Главная", link: "/header" }, { label: "Мои проекты", link: "/projects" }, { label: "Сообщения", link: "/about" }, { label: "Музыка", link: "/about" }, { label: "Настройки", link: "/about" }].map((item, i) => (
                            <Typography
                                key={i}
                                component={Link}
                                to={item.link}
                                sx={{
                                    width: "100%",
                                    textAlign: "center",
                                    color: "#fff",
                                    textDecoration: "none",
                                    fontWeight: 500,
                                    fontSize: "16px",
                                    px: 2,
                                    py: 1.5,
                                    borderRadius: "10px",
                                    transition: "all 0.25s ease",
                                    "&:hover": {
                                        backgroundColor: "rgba(255,255,255,0.2)",
                                        color: "#e0c8ff",
                                        transform: "scale(1.03)",
                                        cursor: "pointer",
                                    },
                                }}
                            >
                                {item.label}
                            </Typography>
                        ))}
                    </Box>

                    {/* Контент */}
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        <Box
                            sx={{
                                backgroundColor: "rgba(255,255,255,0.15)",
                                borderRadius: "16px",
                                boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
                                p: 4,
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
                                <Avatar src={avatar2} sx={{ width: 150, height: 150 }} />
                                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                    <Typography sx={{ color: "#fff", fontSize: "28px", fontWeight: "bold" }}>{user.nickname}</Typography>
                                    <Typography sx={{ color: "#ddd", fontSize: "16px", mb: 1 }}>Frontend Developer</Typography>

                                    {/* Безопасный рейтинг */}
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <Rating
                                            value={rating}
                                            precision={0.5}
                                            onChange={handleRatingChange}
                                            sx={{ color: "#ffeb3b" }}
                                        />
                                        <Typography sx={{ color: "#fff" }}>
                                            {typeof rating === "number" ? rating.toFixed(1) : "—"}/5.0
                                        </Typography>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            onClick={handleReset}
                                            sx={{ ml: 2, color: "#fff", borderColor: "rgba(255,255,255,0.5)" }}
                                        >
                                            Сброс
                                        </Button>
                                    </Box>

                                    <Button
                                        variant="contained"
                                        sx={{
                                            background: "linear-gradient(180deg, #5e3aff, #9b6eff)",
                                            borderRadius: 2,
                                            mt: 2,
                                            color: "white",
                                            width: "200px",
                                            textTransform: "none",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Изменить профиль
                                    </Button>
                                </Box>
                            </Box>

                            {/* Личная информация и навыки */}
                            <Box sx={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 4, mt: 5 }}>
                                <Box>
                                    <Typography sx={{ color: "#fff", fontSize: "20px", fontWeight: "bold", mb: 2 }}>Личная информация</Typography>
                                    <Box sx={{ display: "grid", gridTemplateColumns: "130px 1fr", rowGap: 1.5, alignItems: "center" }}>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                            <Person sx={{ color: "#ddd", fontSize: 20 }} />
                                            <Typography sx={{ color: "#ddd" }}>Имя:</Typography>
                                        </Box>
                                        <Typography sx={{ color: "#fff" }}>Даниил</Typography>

                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                            <Tag sx={{ color: "#ddd", fontSize: 20 }} />
                                            <Typography sx={{ color: "#ddd" }}>Ник:</Typography>
                                        </Box>
                                        <Typography sx={{ color: "#fff" }}>D1noy</Typography>

                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                            <Email sx={{ color: "#ddd", fontSize: 20 }} />
                                            <Typography sx={{ color: "#ddd" }}>Email:</Typography>
                                        </Box>
                                        <Typography sx={{ color: "#fff" }}>d1noy@example.com</Typography>

                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                            <Phone sx={{ color: "#ddd", fontSize: 20 }} />
                                            <Typography sx={{ color: "#ddd" }}>Телефон:</Typography>
                                        </Box>
                                        <Typography sx={{ color: "#fff" }}>+7 (999) 123-45-67</Typography>

                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                            <Info sx={{ color: "#ddd", fontSize: 20 }} />
                                            <Typography sx={{ color: "#ddd" }}>О себе:</Typography>
                                        </Box>
                                        <Typography sx={{ color: "#fff" }}>Frontend разработчик, изучаю React и делаю проекты в DevHub 🚀</Typography>
                                    </Box>
                                </Box>

                                <Box>
                                    <Typography sx={{ color: "#fff", fontSize: "20px", fontWeight: "bold", mb: 2 }}>Навыки</Typography>
                                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                        <Box>
                                            <Typography sx={{ color: "#ddd", mb: 1 }}>Frontend:</Typography>
                                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                                <Box sx={skillStyle}>React</Box>
                                                <Box sx={skillStyle}>JavaScript</Box>
                                                <Box sx={skillStyle}>Vue</Box>
                                            </Box>
                                        </Box>
                                        <Box>
                                            <Typography sx={{ color: "#ddd", mb: 1 }}>Backend:</Typography>
                                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                                <Box sx={skillStyle}>Node.js</Box>
                                                <Box sx={skillStyle}>C#</Box>
                                                <Box sx={skillStyle}>Java</Box>
                                            </Box>
                                        </Box>
                                        <Box>
                                            <Typography sx={{ color: "#ddd", mb: 1 }}>Инструменты:</Typography>
                                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                                <Box sx={skillStyle}>Git</Box>
                                                <Box sx={skillStyle}>Npm</Box>
                                                <Box sx={skillStyle}>Mui</Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
