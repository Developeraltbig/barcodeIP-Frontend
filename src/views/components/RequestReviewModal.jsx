
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  IconButton,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Divider,
  Stack
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const BRAND_RED = "#E94E34";

const RequestReviewModal = ({ open, onClose, project }) => {

  const [modules, setModules] = useState({
    patent: true,
    publication: true,
    product: true,
  });

  const [notes, setNotes] = useState('');
  const [successOpen, setSuccessOpen] = useState(false);

  const handleCheckboxChange = (event) => {
    setModules({ ...modules, [event.target.name]: event.target.checked });
  };

  const handleSubmit = () => {
    console.log("Submitting review for:", modules, "Notes:", notes);

    onClose();          // close main modal
    setSuccessOpen(true); // open success modal
  };

  const projectTitle =
    project?.project_title ||
    project?.projectName ||
    "Wireless Earbuds with Advanced Sensor Capabilities";

  const projectId = project?.project_id || "KQ-y9SBkKXxKADmw2ZBP";

  return (
    <>
      {/* -------------------- REQUEST MODAL -------------------- */}

      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "12px",
            boxShadow:
              "0 20px 25px -5px rgba(0,0,0,0.1),0 10px 10px -5px rgba(0,0,0,0.04)"
          }
        }}
      >
        {/* HEADER */}

        <DialogTitle sx={{ p: 3, pb: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <FactCheckOutlinedIcon sx={{ color: BRAND_RED }} />

              <Typography sx={{ fontWeight: 700 }}>
                Request Analyst Review
              </Typography>
            </Box>

            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <Divider />

        {/* CONTENT */}

        <DialogContent sx={{ p: 3 }}>
          <Box sx={{ bgcolor: "#f1f4f7", p: 2.5, borderRadius: 2, mb: 3 }}>
            <Typography sx={{ fontWeight: 700 }}>
              {projectTitle}
            </Typography>

            <Typography sx={{ color: "#94A3B8", fontFamily: "monospace" }}>
              ID: {projectId}
            </Typography>
          </Box>

          <Typography sx={{ fontWeight: 600, mb: 1.5 }}>
            Select modules to include in the review
          </Typography>

          <Stack>
            {[
              { label: "Patent Search Results", name: "patent" },
              { label: "Publication Search Results", name: "publication" },
              { label: "Product Search Results", name: "product" }
            ].map((item) => (
              <FormControlLabel
                key={item.name}
                control={
                  <Checkbox
                    checked={modules[item.name]}
                    onChange={handleCheckboxChange}
                    name={item.name}
                    sx={{
                      "&.Mui-checked": { color: BRAND_RED }
                    }}
                  />
                }
                label={item.label}
              />
            ))}
          </Stack>

          {/* Disabled options */}

          <Stack sx={{ mt: 1 }}>
            {[
              "Provisional Specification",
              "Non-Provisional Specification"
            ].map((label, idx) => (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <FormControlLabel
                  disabled
                  control={<Checkbox disabled />}
                  label={
                    <Typography sx={{ textDecoration: "line-through" }}>
                      {label}
                    </Typography>
                  }
                />

                <Typography sx={{ fontStyle: "italic", color: "#94A3B8" }}>
                  Not generated
                </Typography>
              </Box>
            ))}
          </Stack>

          {/* NOTES */}

          <Box sx={{ mt: 3 }}>
            <Typography sx={{ fontWeight: 700, mb: 1 }}>
              Additional Notes
            </Typography>

            <TextField
              multiline
              rows={3}
              fullWidth
              placeholder="Any specific areas you'd like the analyst to focus on..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </Box>
        </DialogContent>

        <Divider />

        {/* FOOTER */}

        <DialogActions sx={{ p: 3 }}>
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            variant="contained"
            startIcon={<SendIcon />}
            sx={{ bgcolor: BRAND_RED }}
          >
            Submit Request
          </Button>
        </DialogActions>
      </Dialog>

      {/* -------------------- SUCCESS MODAL -------------------- */}

      <Dialog
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            textAlign: "center",
            p: 4
          }
        }}
      >
        <DialogContent>

          {/* Animated Success Icon */}

          <CheckCircleIcon
            sx={{
              fontSize: 70,
              color: "#22C55E",
              mb: 2,
              animation: "pop 0.4s ease"
            }}
          />

          <Typography
            variant="h6"
            sx={{ fontWeight: 700, mb: 1 }}
          >
            Request Sent Successfully
          </Typography>

          <Typography sx={{ color: "#64748B", mb: 3 }}>
            Your request for
            <strong> "{projectTitle}" </strong>
            has been sent to our analyst team.  
            They will review it shortly.
          </Typography>

          <Button
            variant="contained"
            fullWidth
            onClick={() => setSuccessOpen(false)}
            sx={{
              bgcolor: BRAND_RED,
              textTransform: "none",
              fontWeight: 600
            }}
          >
            Done
          </Button>
        </DialogContent>
      </Dialog>

      {/* Animation */}

      <style>
        {`
        @keyframes pop {
          0% { transform: scale(0.6); opacity:0 }
          100% { transform: scale(1); opacity:1 }
        }
        `}
      </style>
    </>
  );
};

export default RequestReviewModal;