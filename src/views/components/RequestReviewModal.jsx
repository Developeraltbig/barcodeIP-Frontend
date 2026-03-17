
// import React, { useState } from 'react';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Box,
//   Typography,
//   IconButton,
//   Button,
//   Checkbox,
//   FormControlLabel,
//   TextField,
//   Divider,
//   Stack
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
// import SendIcon from '@mui/icons-material/Send';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import { useCreateAnalystConnectionsMutation } from '../../features/userApi';

// const BRAND_RED = "#E94E34";

// const RequestReviewModal = ({ open, onClose, project }) => {
//   const [modules, setModules] = useState({
//     patent: true,
//     publication: true,
//     product: true,
//   });

//   const checked_module = project?.module || [];
//   const [notes, setNotes] = useState('');
//   const [successOpen, setSuccessOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   // const [projectTitle, setProjectTitle] = useState(""); // store title for dialog

//   const [createAnalyst] = useCreateAnalystConnectionsMutation();

//   const handleCheckboxChange = (event) => {
//     setModules({ ...modules, [event.target.name]: event.target.checked });
//   };

//   const handleSubmit = async () => {
//     if (!project?._id) return;

//     setLoading(true);

//     try {
//       // Call the API
//       const response = await createAnalyst({
//         projectId: project._id,
//         body: {
//           email: project?.email || '', // optional
//           project_title: project?.project_title || project?.projectName || 'Untitled Project',
//           message: notes || 'Please review my project.',
//         }
//       }).unwrap();

//       console.log('Analyst review response:', response);

//       // Close modal and show success
//       onClose();
//       setSuccessOpen(true);

//     } catch (err) {
//       console.error('Error creating analyst request:', err);
//       // Optionally: show toast/alert
//     } finally {
//       setLoading(false);
//     }
//   };


// // Function to handle sending request and showing dialog
// const handleRequestReview = async () => {
//   if (!projectToReview) return;
//   try {
//     await sendReviewRequest(projectToReview.id); // your API call

//     // Optimistically update project status locally
//     setProjects(prev =>
//       prev.map(p =>
//         p.project_id === projectToReview.project_id
//           ? { ...p, analyst_status: "pending" }
//           : p
//       )
//     );

//     // Set title for success dialog
//     setProjectTitle(projectToReview.project_title || projectToReview.projectName || "Untitled Project");

//     // Close review modal and show success dialog
//     setReviewModalOpen(false);
//     setSuccessOpen(true);
//   } catch (error) {
//     console.error("Failed to request review:", error);
//   }
// };

//   const projectTitle = project?.project_title || project?.projectName || "Untitled Project";
//   const projectId = project?.case_id ? (project?.case_id).split('-').pop() : 'N/A'; 

//   return (
//     <>
//       {/* -------------------- REQUEST MODAL -------------------- */}
//       <Dialog
//         open={open}
//         onClose={onClose}
//         maxWidth="sm"
//         fullWidth
//         PaperProps={{
//           sx: {
//             borderRadius: "12px",
//             boxShadow:
//               "0 20px 25px -5px rgba(0,0,0,0.1),0 10px 10px -5px rgba(0,0,0,0.04)"
//           }
//         }}
//       >
//         {/* HEADER */}
//         <DialogTitle sx={{ p: 3, pb: 2 }}>
//           <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//               <FactCheckOutlinedIcon sx={{ color: BRAND_RED }} />
//               <Typography sx={{ fontWeight: 700 }}>
//                 Request Analyst Review
//               </Typography>
//             </Box>
//             <IconButton onClick={onClose}>
//               <CloseIcon />
//             </IconButton>
//           </Box>
//         </DialogTitle>

//         <Divider />

//         {/* CONTENT */}
//         <DialogContent sx={{ p: 3 }}>
//           <Box sx={{ bgcolor: "#f1f4f7", p: 2.5, borderRadius: 2, mb: 3 }}>
//             <Typography sx={{ fontWeight: 700 }}>{projectTitle}</Typography>
//             <Typography sx={{ color: "#94A3B8", fontFamily: "monospace" }}>
//              CASE ID : {projectId}
//             </Typography>
//           </Box>

//           <Typography sx={{ fontWeight: 600, mb: 1.5 }}>
//             Select modules to include in the review
//           </Typography>
//           <Stack>
//             {checked_module?.map((item) => (
//               <FormControlLabel
//                 key={item}
//                 control={
//                   <Checkbox
//                     checked={modules[item]}
//                     onChange={handleCheckboxChange}
//                     name={item}
//                     sx={{ "&.Mui-checked": { color: BRAND_RED } }}
//                   />
//                 }
//                 label={item}
//               />
//             ))}
//           </Stack>

//           {/* Notes */}
//           <Box sx={{ mt: 3 }}>
//             <Typography sx={{ fontWeight: 700, mb: 1 }}>Additional Notes</Typography>
//             <TextField
//               multiline
//               rows={3}
//               fullWidth
//               placeholder="Any specific areas you'd like the analyst to focus on..."
//               value={notes}
//               onChange={(e) => setNotes(e.target.value)}
//             />
//           </Box>
//         </DialogContent>

//         <Divider />

//         {/* FOOTER */}
//         <DialogActions sx={{ p: 3 }}>
//           <Button onClick={onClose} variant="outlined">Cancel</Button>
//           <Button
//             onClick={handleSubmit}
//             variant="contained"
//             startIcon={<SendIcon />}
//             sx={{ bgcolor: BRAND_RED }}
//             disabled={loading}
//           >
//             {loading ? 'Sending...' : 'Submit Request'}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* -------------------- SUCCESS MODAL -------------------- */}
     

// {/* // Success dialog */}
// <Dialog
//   open={successOpen}
//   onClose={() => setSuccessOpen(false)}
//   maxWidth="xs"
//   fullWidth
//   PaperProps={{ sx: { borderRadius: 3, textAlign: "center", p: 4 } }}
// >
//   <DialogContent>
//     <CheckCircleIcon
//       sx={{ fontSize: 70, color: "#22C55E", mb: 2, animation: "pop 0.4s ease" }}
//     />
//     <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
//       Request Sent Successfully
//     </Typography>
//     <Typography sx={{ color: "#64748B", mb: 3 }}>
//       Your request for <strong>"{projectTitle}"</strong> has been sent to our analyst team.  
//       They will review it shortly.
//     </Typography>
//     <Button
//       variant="contained"
//       fullWidth
//       onClick={() => setSuccessOpen(false)} // badge already updated
//       sx={{ bgcolor: BRAND_RED, textTransform: "none", fontWeight: 600 }}
//     >
//       Done
//     </Button>
//   </DialogContent>
// </Dialog>

//       <style>
//         {`
//         @keyframes pop {
//           0% { transform: scale(0.6); opacity:0 }
//           100% { transform: scale(1); opacity:1 }
//         }
//         `}
//       </style>
//     </>
//   );
// };

// export default RequestReviewModal;



















import React, { useEffect, useState } from 'react';
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
import { useCreateAnalystConnectionsMutation } from '../../features/userApi';

const BRAND_RED = "#E94E34";

const RequestReviewModal = ({ open, onClose, project, onSuccess }) => {
const [modules, setModules] = useState({});

useEffect(() => {
  const combined = [...new Set([...(project?.module || []), ...(project?.checked || [])])];

  const initialState = combined.reduce((acc, curr) => {
    acc[curr] = true;
    return acc;
  }, {});

  setModules(initialState);
}, [project]);

  const checked_module = [
  ...new Set([
    ...(project?.module || []),
    ...(project?.checked || [])
  ])
];
  const [notes, setNotes] = useState('');
  const [successOpen, setSuccessOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [createAnalyst] = useCreateAnalystConnectionsMutation();

  const handleCheckboxChange = (event) => {
    setModules({ ...modules, [event.target.name]: event.target.checked });
  };

  const handleSubmit = async () => {
    const selectedModules = Object.keys(modules).filter(key => modules[key]);
    if (!project?._id) return;

    setLoading(true);

    try {
      // Call the API
      await createAnalyst({
        projectId: project._id,
        body: {
          email: project?.email || '', // optional
          project_title: project?.project_title || project?.projectName || 'Untitled Project',
          message: notes || 'Please review my project.',
          checked: selectedModules
        }
      }).unwrap();

      // Open success modal (we will hide the main modal below using open && !successOpen)
      setSuccessOpen(true);

    } catch (err) {
      console.error('Error creating analyst request:', err);
    } finally {
      setLoading(false);
    }
  };

  // Called when the user clicks "Done" on the success dialog
  const handleFinish = () => {
    setSuccessOpen(false);
    if (onSuccess) {
      onSuccess(); // Triggers refetch() and closes the modal in MyProject
    } else {
      onClose();
    }
  };

  const projectTitle = project?.project_title || project?.projectName || "Untitled Project";
  const projectId = project?.case_id ? (project?.case_id).split('-').pop() : 'N/A'; 

  return (
    <>
      {/* -------------------- REQUEST MODAL -------------------- */}
      <Dialog
        open={open && !successOpen} // Automatically hide this if success modal is open
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
            <IconButton onClick={onClose} disabled={loading}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <Divider />

        {/* CONTENT */}
        <DialogContent sx={{ p: 3 }}>
          <Box sx={{ bgcolor: "#f1f4f7", p: 2.5, borderRadius: 2, mb: 3 }}>
            <Typography sx={{ fontWeight: 700 }}>{projectTitle}</Typography>
            <Typography sx={{ color: "#94A3B8", fontFamily: "monospace", mt: 0.5 }}>
             CASE ID : {projectId}
            </Typography>
          </Box>

          <Typography sx={{ fontWeight: 600, mb: 1.5 }}>
            Select modules to include in the review
          </Typography>
          <Stack>
            {checked_module?.map((item) => (
              <FormControlLabel
                key={item}
                control={
                  <Checkbox
                    checked={modules[item] || false}
                    onChange={handleCheckboxChange}
                    name={item}
                    sx={{ "&.Mui-checked": { color: BRAND_RED } }}
                  />
                }
                label={item}
              />
            ))}
          </Stack>

          {/* Notes */}
          <Box sx={{ mt: 3 }}>
            <Typography sx={{ fontWeight: 700, mb: 1 }}>Additional Notes</Typography>
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
          <Button onClick={onClose} variant="outlined" disabled={loading}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            startIcon={<SendIcon />}
            sx={{ bgcolor: BRAND_RED, '&:hover': { bgcolor: '#D1432C' } }}
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Submit Request'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* -------------------- SUCCESS MODAL -------------------- */}
      <Dialog
        open={successOpen}
        onClose={handleFinish}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3, textAlign: "center", p: 4 } }}
      >
        <DialogContent>
          <CheckCircleIcon
            sx={{ fontSize: 70, color: "#22C55E", mb: 2, animation: "pop 0.4s ease" }}
          />
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            Request Sent Successfully
          </Typography>
          <Typography sx={{ color: "#64748B", mb: 3 }}>
            Your request for <strong>"{projectTitle}"</strong> has been sent to our analyst team.  
            They will review it shortly.
          </Typography>
          <Button
            variant="contained"
            fullWidth
            onClick={handleFinish} // Calls onSuccess() to update parent UI
            sx={{ bgcolor: BRAND_RED, '&:hover': { bgcolor: '#D1432C' }, textTransform: "none", fontWeight: 600 }}
          >
            Done
          </Button>
        </DialogContent>
      </Dialog>

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