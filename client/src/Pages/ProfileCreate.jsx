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
    const [gender, setGender] = useState('');

    const handleChange = (event) => {
        setGender(event.target.value);
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className={styles.profile}>
            <div className={styles.container}>
                <Button onClick={handleOpen}>Open modal</Button>
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
                                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField id="name" label="Enter Name" variant="standard" />
                            </Box>
                        </Box>
                        <Box sx={{ '& > :not(style)': { m: 1 } }}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <PersonAddAlt1Icon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField id="age" label="Enter Age" variant="standard" />
                            </Box>
                        </Box>
                        <Box sx={{ '& > :not(style)': { m: 1 } }}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <TransgenderIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                {/* <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel id="demo-simple-select-standard-label">Sex</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={gender}
                                        onChange={handleChange}
                                        label="Sex"
                                    >
                                        <MenuItem value="Male">Male</MenuItem>
                                        <MenuItem value="Female">Female</MenuItem>
                                    </Select>
                                </FormControl> */}
                                <TextField id="sex" label="Enter Gender" variant="standard" />
                            </Box>
                        </Box>
                        <Box sx={{ '& > :not(style)': { m: 1 } }}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <AlternateEmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField id="email" label="Enter Email" variant="standard" />
                            </Box>
                        </Box>
                        <Box sx={{ '& > :not(style)': { m: 1 } }}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <LocalPhoneIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField id="contact" label="Enter Contact" variant="standard" />
                            </Box>
                        </Box>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default ProfileCreate

