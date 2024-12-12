import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Fab,
  Tooltip,
} from "@mui/material";

import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "../css/Footer.css"; // Import external CSS

function Footer() {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box component="footer" className="footer">
      <Container>
        <Grid container spacing={4} className="footer-container">
          {/* Pages Section */}
          <Grid item xs={12} sm={4}>
            <Typography className="footer-header">Pages</Typography>
            <Link to="/" className="footer-link">
              Home
            </Link>
            <Link to="/contact" className="footer-link">
              Contact
            </Link>
            <Link to="/about" className="footer-link">
              About
            </Link>
          </Grid>

          {/* Social Media Section */}
          <Grid item xs={12} sm={4}>
            <Typography className="footer-header">Follow Us</Typography>
            <Box className="footer-social-icons">
              <IconButton className="footer-icon" href="#">
                <FacebookIcon />
              </IconButton>
              <IconButton className="footer-icon" href="#">
                <TwitterIcon />
              </IconButton>
              <IconButton className="footer-icon" href="#">
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Copyright Section */}
          <Grid item xs={12} sm={4}>
            <Typography className="footer-header">Copyright</Typography>
            <Typography className="footer-text">
              © {new Date().getFullYear()} Magen-Ofir-Viki | MTA College
            </Typography>
          </Grid>
        </Grid>
      </Container>

      {/* Back to Top Button */}
      <Tooltip title="Back to top">
        <Fab
          className="back-to-top"
          size="small"
          aria-label="back to top"
          onClick={handleBackToTop}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Tooltip>
    </Box>
  );
}

export default Footer;
