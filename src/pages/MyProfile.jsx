import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  TextField,
  Box,
  IconButton,
  Button,
  Tooltip,
  FormControl,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import { UserContext } from "../context/UserContext";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import "../css/MyProfile.css";

const MyProfile = () => {
  const { user } = useContext(UserContext);
  const [dogData, setDogData] = useState(null);
  const [isEditingDog, setIsEditingDog] = useState(false);
  const [isEditingOwner, setIsEditingOwner] = useState(false);
  const [editedDogData, setEditedDogData] = useState({});
  const [editedOwnerData, setEditedOwnerData] = useState({});
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [saveTarget, setSaveTarget] = useState(null); // Determines target ("dog" or "owner")

  useEffect(() => {
    fetch("/data/dogs.json")
      .then((res) => res.json())
      .then((data) => {
        const dog = data.find((d) => d.owner.email === user.email);
        setDogData(dog);
        setEditedDogData(dog);
        setEditedOwnerData(dog.owner);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, [user]);

  if (!dogData) {
    return <div>Loading...</div>;
  }

  const handleDogInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDogData({ ...editedDogData, [name]: value });
  };

  const handleOwnerInputChange = (e) => {
    const { name, value } = e.target;
    setEditedOwnerData({ ...editedOwnerData, [name]: value });
  };

  // Handle cancel of dog edit
  const handleCancelDog = () => {
    setEditedDogData(dogData);
    setIsEditingDog(false);
  };

  // Handle cancel of owenr edit
  const handleCancelOwner = () => {
    setEditedOwnerData(dogData.owner);
    setIsEditingOwner(false);
  };

  // Open confirmation dialog
  const openConfirmDialog = (target) => {
    setSaveTarget(target);
    setConfirmDialogOpen(true);
  };

  // Handle confirmation result
  const handleSaveConfirm = (confirm) => {
    if (confirm) {
      if (saveTarget === "dog") {
        setDogData(editedDogData); // Save changes to the dog
      } else if (saveTarget === "owner") {
        setDogData({ ...dogData, owner: editedOwnerData }); // Save changes to the owner
      }
    }
    setConfirmDialogOpen(false); // Close dialog
    setIsEditingDog(false);
    setIsEditingOwner(false);
  };

  const renderSmileOrSadIcon = (condition) =>
    condition ? (
      <SentimentSatisfiedAltIcon className="icon positive" />
    ) : (
      <SentimentVeryDissatisfiedIcon className="icon negative" />
    );

  const renderEditableSmiley = (field) => (
    <FormControl>
      <Select
        name={field}
        value={editedDogData[field]}
        onChange={(e) =>
          setEditedDogData({ ...editedDogData, [field]: e.target.value })
        }
      >
        <MenuItem value={true}>
          <SentimentSatisfiedAltIcon style={{ color: "green" }} />
        </MenuItem>
        <MenuItem value={false}>
          <SentimentVeryDissatisfiedIcon style={{ color: "red" }} />
        </MenuItem>
      </Select>
    </FormControl>
  );

  const renderEnergyLevel = () => {
    const levels = Array.from({ length: 5 }, (_, i) => (
      <FlashOnIcon
        key={i}
        style={{
          color: i < editedDogData.energylevel ? "gold" : "lightgrey",
          cursor: "pointer",
        }}
        onClick={() =>
          setEditedDogData({ ...editedDogData, energylevel: i + 1 })
        }
      />
    ));
    return <Box>{levels}</Box>;
  };

  return (
    <div className="my-profile">
      {/* Dog's Name as Page Title */}
      <Typography variant="h3" className="profile-title">
        {dogData.name} & {dogData.owner.firstname} {dogData.owner.lastname}'s
        Profile
      </Typography>
      <Box className="profile-container">
        {/* Dog Information Card */}
        <Card className="profile-card">
          <CardContent>
            <CardMedia
              component="img"
              image={dogData.image}
              alt={dogData.name}
              className="profile-image"
            />
            <Box className="card-header">
              <Typography variant="h5">Dog Information</Typography>
              <Tooltip title="Edit Dog Information">
                <IconButton onClick={() => setIsEditingDog(true)}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </Box>
            {isEditingDog ? (
              <>
                <TextField
                  label="Name"
                  name="name"
                  value={editedDogData.name}
                  onChange={handleDogInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Breed"
                  name="breed"
                  value={editedDogData.breed}
                  onChange={handleDogInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Region"
                  name="region"
                  value={editedDogData.region}
                  onChange={handleDogInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="A bit more about me"
                  name="A bit more about me"
                  value={editedDogData.description}
                  onChange={handleDogInputChange}
                  multiline
                  rows={3}
                  fullWidth
                  margin="normal"
                />
                <Typography>Energy Level:</Typography>
                {renderEnergyLevel()}
                <Typography>Vaccinated:</Typography>
                {renderEditableSmiley("isvaccinated")}
                <Typography>Good with Kids:</Typography>
                {renderEditableSmiley("isgoodwithkids")}
                <Typography>Good with Animals:</Typography>
                {renderEditableSmiley("isgoodwithanimals")}
                <Typography>Restricted Breed:</Typography>
                {renderEditableSmiley("isinrestrictedbreedscategory")}
                <Box className="edit-buttons">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => openConfirmDialog("dog")}
                  >
                    <SaveIcon />
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleCancelDog}
                  >
                    <CancelIcon />
                    Cancel
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Typography>
                  <span className="label">Name:</span> {dogData.name}
                </Typography>
                <Typography>
                  <span className="label">Breed:</span> {dogData.breed}
                </Typography>
                <Typography>
                  <span className="label">Age:</span> {dogData.age}
                </Typography>
                <Typography>
                  <span className="label">Sex:</span>{" "}
                  {dogData.sex === "male" ? (
                    <MaleIcon className="icon male" />
                  ) : (
                    <FemaleIcon className="icon female" />
                  )}
                </Typography>
                <Typography>
                  <span className="label">Region:</span> {dogData.region}
                </Typography>
                <Typography>
                  <span className="label">Vaccinated:</span>{" "}
                  {renderSmileOrSadIcon(dogData.isvaccinated)}
                </Typography>
                <Typography>
                  <span className="label">Good with Kids:</span>{" "}
                  {renderSmileOrSadIcon(dogData.isgoodwithkids)}
                </Typography>
                <Typography>
                  <span className="label">Good with animals:</span>{" "}
                  {renderSmileOrSadIcon(dogData.isgoodwithanimals)}
                </Typography>
                <Typography>
                  <span className="label">Dangerous dog breed:</span>{" "}
                  {renderSmileOrSadIcon(dogData.isinrestrictedbreedscategory)}
                </Typography>
                <Typography>
                  <span className="label">Energy Level:</span>{" "}
                  {Array(dogData.energylevel)
                    .fill(null)
                    .map((_, i) => (
                      <FlashOnIcon key={i} style={{ color: "gold" }} />
                    ))}
                </Typography>
                <Typography>
                  <span className="label">A bit more about me:</span>{" "}
                  {dogData.description}
                </Typography>
              </>
            )}
          </CardContent>
        </Card>

        {/* Owner Information Card */}
        <Card className="profile-card">
          <CardContent>
            <CardMedia
              component="img"
              image={dogData.owner.image}
              className="profile-image"
            />
            <Box className="card-header">
              <Typography variant="h5">Owner Information</Typography>
              <Tooltip title="Edit Owner Information">
                <IconButton onClick={() => setIsEditingOwner(true)}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </Box>
            {isEditingOwner ? (
              <>
                <TextField
                  label="First Name"
                  name="firstname"
                  value={editedOwnerData.firstname}
                  onChange={handleOwnerInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Last Name"
                  name="lastname"
                  value={editedOwnerData.lastname}
                  onChange={handleOwnerInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="City"
                  name="city"
                  value={editedOwnerData.city}
                  onChange={handleOwnerInputChange}
                  fullWidth
                  margin="normal"
                />
                <Box className="edit-buttons">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => openConfirmDialog("owner")}
                  >
                    <SaveIcon />
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleCancelOwner}
                  >
                    <CancelIcon />
                    Cancel
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Typography>
                  <span className="label"> Full Name:</span>{" "}
                  {dogData.owner.firstname} {dogData.owner.lastname}
                </Typography>
                <Typography>
                  <span className="label"> Age:</span> {dogData.owner.age}
                </Typography>
                <Typography>
                  <span className="label">Gender:</span>{" "}
                  {dogData.owner.gender === "male" ? (
                    <MaleIcon className="icon male" />
                  ) : (
                    <FemaleIcon className="icon female" />
                  )}
                </Typography>
                <Typography>
                  <span className="label">City:</span> {dogData.owner.city}
                </Typography>
                <Typography>
                  <span className="label">Email:</span> {dogData.owner.email}
                </Typography>
              </>
            )}
          </CardContent>
        </Card>
        {/* Confirmation Dialog */}
        <Dialog
          open={confirmDialogOpen}
          onClose={() => handleSaveConfirm(false)}
        >
          <DialogTitle>Confirm Changes</DialogTitle>
          <DialogContent>
            Are you sure you want to save the changes to your{" "}
            {saveTarget === "dog" ? "Dog" : "Owner"}?
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={() => handleSaveConfirm(false)}>
              No
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSaveConfirm(true)}
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
};

export default MyProfile;
