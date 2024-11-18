import React from 'react';
import { Modal, Box, Typography } from '@mui/material';

const CustomModal = ({ open, onClose, title, message }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 300,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
        <Typography sx={{ mt: 2 }}>{message}</Typography>
      </Box>
    </Modal>
  );
};

export default CustomModal;
