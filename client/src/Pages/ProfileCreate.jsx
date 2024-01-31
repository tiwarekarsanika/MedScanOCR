import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import TransgenderIcon from '@mui/icons-material/Transgender';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import styles from './ProfileCreate.module.css';


const ProfileCreate = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [name, setName] = useState('');
    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const [age, setAge] = useState('');
    const handleAgeChange = (event) => {
        setAge(event.target.value);
    };

    const [sex, setSex] = useState('');
    const handleSexChange = (event) => {
        setSex(event.target.value);
    };

    const [email, setEmail] = useState('');
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const [phone, setPhone] = useState('');
    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };

    const handleFormSubmit = () => {
        fetch('http://localhost:8000/profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "name": name, "gender": sex, "phone": phone, "email": email, "age": age }),
        })
            .then((response) => response.json())
            .then((data) => { console.log(data) })
            .catch((error) => console.error(error));
    };

    return (
        <div className={styles.profile}>
            <div className={styles.container}>
                <Button onClick={handleOpen} sx={{
                    "background-color": "var(--primary-color)",
                    "border": "none",
                    "color": "white",
                    "padding": "0.5rem 1rem",
                    "margin": "2rem",
                    "text-align": "center",
                    "text-decoration": "none",
                    "display": "inline-block",
                    "font-size": "1rem",
                    "cursor": "pointer",
                    "border-radius": "2rem",
                    "box-shadow": "0 1rem 2rem rgba(0, 0, 0, 0.2)",
                    "font-family": "Poppins, sans-serif",
                    "font-weight": "bold",
                    ':hover': {
                        backgroundColor: 'var(--secondary-color)',
                        boxShadow: '0 1rem 2rem rgba(0, 0, 0, 0.5)',
                    },
                }}>Create My Profile</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div className={styles.modal}>
                        <h1 className={styles.title}>Create Profile</h1>
                        <Box sx={{ '& > :not(style)': { m: 1 } }}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <AccountCircle sx={{ color: 'white', mr: 1, my: 0.5 }} />
                                <TextField id="name" label="Enter Name" variant="standard" value={name} onChange={handleNameChange} 
                                    sx={{
                                    '& .MuiInputLabel-root': {
                                        color: 'white',
                                    },
                                    '& .MuiInputBase-root': {
                                        color: 'white',
                                    },
                                    '& .MuiInputAdornment-root': {
                                        color: 'white',
                                    },
                                    '&:hover .MuiInputAdornment-root': {
                                        color: 'white',
                                    },
                                }}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ '& > :not(style)': { m: 1 } }}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <PersonAddAlt1Icon sx={{ color: 'white', mr: 1, my: 0.5 }} />
                                <TextField id="age" label="Enter Age" variant="standard" value={age} onChange={handleAgeChange} 
                                    sx={{
                                    '& .MuiInputLabel-root': {
                                        color: 'white',
                                    },
                                    '& .MuiInputBase-root': {
                                        color: 'white',
                                    },
                                    '& .MuiInputAdornment-root': {
                                        color: 'white',
                                    },
                                    '&:hover .MuiInputAdornment-root': {
                                        color: 'white',
                                    },
                                }}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ '& > :not(style)': { m: 1 } }}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <TransgenderIcon sx={{ color: 'white', mr: 1, my: 0.5 }} />
                                <TextField id="sex" label="Enter Gender" variant="standard" value={sex} onChange={handleSexChange} 
                                    sx={{
                                    '& .MuiInputLabel-root': {
                                        color: 'white',
                                    },
                                    '& .MuiInputBase-root': {
                                        color: 'white',
                                    },
                                    '& .MuiInputAdornment-root': {
                                        color: 'white',
                                    },
                                    '&:hover .MuiInputAdornment-root': {
                                        color: 'white',
                                    },
                                }}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ '& > :not(style)': { m: 1 } }}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <AlternateEmailIcon sx={{ color: 'white', mr: 1, my: 0.5 }} />
                                <TextField id="email" label="Enter Email" variant="standard" onChange={handleEmailChange} value={email} 
                                    sx={{
                                    '& .MuiInputLabel-root': {
                                        color: 'white',
                                    },
                                    '& .MuiInputBase-root': {
                                        color: 'white',
                                    },
                                    '& .MuiInputAdornment-root': {
                                        color: 'white',
                                    },
                                    '&:hover .MuiInputAdornment-root': {
                                        color: 'white',
                                    },
                                }}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ '& > :not(style)': { m: 1 } }}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <LocalPhoneIcon sx={{ color: 'white', mr: 1, my: 0.5 }} />
                                <TextField id="contact" label="Enter Contact" variant="standard" onChange={handlePhoneChange} value={phone} sx={{
                                    '& .MuiInputLabel-root': {
                                        color: 'white',
                                    },
                                    '& .MuiInputBase-root': {
                                        color: 'white',
                                    },
                                    '& .MuiInputAdornment-root': {
                                        color: 'white',
                                    },
                                    '&:hover .MuiInputAdornment-root': {
                                        color: 'white',
                                    },
                                }}
                                />
                            </Box>
                        </Box>
                        <Button onClick={handleFormSubmit} className={styles.butt2}
                            sx={{
                                "background-color": "var(--secondary-color)",
                                "border": "none",
                                "color": "white",
                                "padding": "0.5rem 1rem",
                                "margin": "1rem",
                                "text-align": "center",
                                "text-decoration": "none",
                                "display": "inline-block",
                                "font-size": "1rem",
                                "cursor": "pointer",
                                "border-radius": "2rem",
                                "box-shadow": "0 1rem 2rem rgba(0, 0, 0, 0.2)",
                                "font-family": "Poppins, sans-serif",
                                "font-weight": "bold",
                                ':hover': {
                                    backgroundColor: 'var(--background-color)',
                                    color: 'black',
                                    boxShadow: '0 1rem 2rem rgba(0, 0, 0, 0.5)',
                                },
                            }}>Submit</Button>
                    </div>
                </Modal>
            </div>
        </div >
    );
};

export default ProfileCreate

