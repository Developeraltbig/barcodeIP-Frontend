import React from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Container
} from "@mui/material";

const events = [
  "2007/10/03 - Application filed by Ethicon Inc",
  "2007/10/03 - Priority to US11/866,588",
  "2008/03/17 - Assigned to ETHICON, INC.",
  "2008/10/01 - Priority to AU200830860A",
  "2008/10/01 - Priority to JP2010528089A",
  "2008/10/01 - Priority to CA2701359A",
  "2008/10/01 - Priority to EP08834864A",
  "2008/10/01 - Priority to BRPI0818694A"
];

const classifications = [
  "A61N1/0514 - Electrodes for the urinary tract",
  "A61N1/36007 - Applying electric currents by contact electrodes",
  "A61N1/36017 - External stimulators",
  "A61N1/36071 - Pain",
  "A61N1/36171 - Frequency",
  "A61N1/36196 - Frequency modulation"
];

export default function PatentMetadataDashboard() {
  return (
  <Box >
      <Container maxWidth="xl" sx={{ p: 3}}>
      
      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          mb: 3,
          p: 2,
          textAlign: "center",
          background: "#f6e5e5",
          borderRadius: 1
        }}
      >
        <Typography
          variant="h6"
          sx={{ color: "#c0392b", fontWeight: 600 }}
        >
          US8352026B2
        </Typography>
      </Paper>

      <Grid container spacing={3}>
        
        {/* Left Top */}
        <Grid item size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 2, borderRadius: 1, height: "100%" }}>
            <Typography sx={{ color: "#c0392b", fontWeight: 600 }}>
              Inventor
            </Typography>

            <Typography sx={{ mb: 2 }}>
              Anthony DiUbaldi,
            </Typography>

            <Typography sx={{ color: "#c0392b", fontWeight: 600 }}>
              Current Assignee
            </Typography>

            <Typography>
              Ethicon Inc
            </Typography>
          </Paper>
        </Grid>

        {/* Right Top */}
        <Grid item size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 2, borderRadius: 1, height: "100%" , width: '100%'}}>
            <Typography sx={{ color: "#c0392b", fontWeight: 600, mb: 1 }}>
              Worldwide applications
            </Typography>

            <Typography><b>2007 </b>- US</Typography>
            <Typography><b>2008</b> - JP CN EP CA WO AU BR</Typography>
          </Paper>
        </Grid>

        {/* Left Bottom */}
        <Grid item size={{ xs: 12, md: 6 }}>
          <Paper
            sx={{
              p: 2,
              borderRadius: 1,
              height: 260,
              display: "flex",
              flexDirection: "column"
            }}
          >
            <Typography sx={{ color: "#c0392b", fontWeight: 600, mb: 1 }}>
              Application events
            </Typography>

            <Box sx={{ overflowY: "auto" }}>
              <List dense>
                {events.map((event, i) => (
                  <ListItem key={i} sx={{ py: 0 }}>
                    <ListItemText primary={event} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Paper>
        </Grid>

        {/* Right Bottom */}
        <Grid item size={{ xs: 12, md: 6 }}>
          <Paper
            sx={{
              p: 2,
              borderRadius: 1,
              height: 260,
              display: "flex",
              flexDirection: "column"
            }}
          >
            <Typography sx={{ color: "#c0392b", fontWeight: 600, mb: 1 }}>
              Classification
            </Typography>

            <Box sx={{ overflowY: "auto" }}>
              <List dense>
                {classifications.map((item, i) => (
                  <ListItem key={i} sx={{ py: 0 }}>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  </Box>
  );
}