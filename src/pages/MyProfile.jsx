import React, { useState, useEffect, useContext } from 'react';
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
  CircularProgress,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import { UserContext } from '../context/UserContext';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import '../css/MyProfile.css';

const MyProfile = () => {
  const { user, setUser } = useContext(UserContext); // Get logged-in user's email from context
  const [dogData, setDogData] = useState(null); // State for dog and owner data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [isEditingDog, setIsEditingDog] = useState(false);
  const [isEditingOwner, setIsEditingOwner] = useState(false);
  const [editedDogData, setEditedDogData] = useState({});
  const [editedOwnerData, setEditedOwnerData] = useState({});
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [saveTarget, setSaveTarget] = useState(null); // Determines target ("dog" or "owner")
  const [breeds, setBreeds] = useState([]); // Dog breeds state
  const [cities, setCities] = useState([]); // City list state
  const [errors, setErrors] = useState({
    firstname: '',
    lastname: '',
    name: '',
  }); // for errors of validation of the data
  // Fetch list of cities from backend
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/get-cities');
        if (!response.ok) throw new Error('Failed to fetch cities');
        const data = await response.json();
        setCities(data.cities); // Set cities list from response
      } catch (error) {
        console.error('Error fetching cities:', error.message);
        setCities([]); // Default to empty list if fetch fails
      }
    };
    fetchCities();
  }, []);

  // Fetch dog breeds using a rest api
  useEffect(() => {
    fetch('https://dog.ceo/api/breeds/list/all')
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setBreeds(Object.keys(data.message)); // Extract breed names
        }
      })
      .catch((error) => {
        console.error('Error fetching dog breeds:', error);
        setBreeds([]);
      });
  }, []);
  // Fetch data from the backend
  useEffect(() => {
    const fetchOwnerAndDog = async () => {
      try {
        setLoading(true); // Show loading spinner
        setError(null); // Reset error state

        const response = await fetch(
          `http://localhost:5000/api/dogs/owner-and-dog?email=${user.email}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`); // Handle HTTP errors
        }

        const data = await response.json(); // Parse the response JSON
        const dog = data[0]; // Assuming only one owner-dog pair for simplicity
        setDogData(dog); // Set original data
        setEditedDogData(dog); // Initialize editable dog data
        setEditedOwnerData(dog.owner); // Initialize editable owner data
      } catch (err) {
        setError(err.message); // Capture error
      } finally {
        setLoading(false); // Hide spinner
      }
    };

    if (user && user.email) {
      fetchOwnerAndDog(); // Trigger fetch on component mount
    }
  }, [user]);

  if (loading) {
    // Render spinner while loading
    return (
      <div className="spinner-container">
        <CircularProgress />
        <p>Loading your profile...</p>
      </div>
    );
  }

  if (error) {
    // Render error message if fetch fails
    return <p className="error-message">Error: {error}</p>;
  }

  if (!dogData) {
    // Render message if no data is found
    return <p className="no-profile-message">No profile data found.</p>;
  }

  const handleDogInputChange = (e) => {
    const { name, value } = e.target;

    // Validate dog name
    if (name === 'name') {
      if (!isValidString(value)) {
        setErrors((prev) => ({
          ...prev,
          name: 'Only letters and spaces are allowed.',
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          name: '',
        }));
      }
    }

    // Update state
    setEditedDogData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // String validation
  const isValidString = (value) => /^[A-Za-z\s]+$/.test(value);

  // handle owner data
  const handleOwnerInputChange = (e) => {
    const { name, value } = e.target;

    // Validate firstname and lastname
    if (name === 'firstname' || name === 'lastname') {
      if (!isValidString(value)) {
        setErrors((prev) => ({
          ...prev,
          [name]: 'Only letters and spaces are allowed.',
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          [name]: '',
        }));
      }
    }

    // Update state
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
  const handleSaveConfirm = async (confirm) => {
    if (confirm) {
      if (saveTarget === 'dog') {
        //setDogData(editedDogData); // Save changes to the dog
        try {
          const response = await fetch(
            'http://localhost:5000/api/dogs/update-dog',
            {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ dogId: dogData.id, ...editedDogData }),
            }
          );

          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }

          const data = await response.json();

          // Update the dogData state
          setDogData((prevDogData) => ({
            ...prevDogData,
            ...data.dog, // Merge updated dog data
          }));
        } catch (err) {
          console.error(err);
          alert('Failed to update dog information. Please try again.');
        }
      } else if (saveTarget === 'owner') {
        //setDogData({ ...dogData, owner: editedOwnerData }); // Save changes to the owner
        try {
          const response = await fetch(
            'http://localhost:5000/api/users/update-owner',
            {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email: user.email, ...editedOwnerData }),
            }
          );

          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }

          const data = await response.json();
          setDogData({ ...dogData, owner: data.owner }); // Update state with new owner data
          // Update the UserContext with the new owner information
          setUser((prevUser) => ({
            ...prevUser,
            firstname: data.owner.firstname,
            lastname: data.owner.lastname,
          }));
        } catch (err) {
          console.error(err);
          alert('Failed to update owner information. Please try again.');
        }
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
          <SentimentSatisfiedAltIcon style={{ color: 'green' }} />
        </MenuItem>
        <MenuItem value={false}>
          <SentimentVeryDissatisfiedIcon style={{ color: 'red' }} />
        </MenuItem>
      </Select>
    </FormControl>
  );

  const renderEnergyLevel = () => {
    const levels = Array.from({ length: 5 }, (_, i) => (
      <FlashOnIcon
        key={i}
        style={{
          color: i < editedDogData.energylevel ? 'gold' : 'lightgrey',
          cursor: 'pointer',
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
      <Typography variant="h4" className="profile-title">
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
                  error={!!errors.name}
                  helperText={errors.name}
                />
                {/* <TextField
                  label="Breed"
                  name="breed"
                  value={editedDogData.breed}
                  onChange={handleDogInputChange}
                  fullWidth
                  margin="normal"
                /> */}
                <Typography>Breed:</Typography>
                <Select
                  label="Breed"
                  name="breed"
                  value={editedDogData.breed}
                  onChange={(e) => handleDogInputChange(e, 'dog')}
                >
                  {breeds.map((breed) => (
                    <MenuItem key={breed} value={breed}>
                      {breed}
                    </MenuItem>
                  ))}
                </Select>
                <Typography>Region:</Typography>
                <Select
                  label="Region"
                  name="region"
                  value={editedDogData.region}
                  onChange={handleDogInputChange}
                >
                  {cities.length > 0 ? (
                    cities.map((city, index) => (
                      <MenuItem key={index} value={city}>
                        {city}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No cities available</MenuItem>
                  )}
                </Select>
                <TextField
                  label="A bit more about me"
                  name="description"
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
                {renderEditableSmiley('isvaccinated')}
                <Typography>Good with Kids:</Typography>
                {renderEditableSmiley('isgoodwithkids')}
                <Typography>Good with Animals:</Typography>
                {renderEditableSmiley('isgoodwithanimals')}
                <Typography>Restricted Breed:</Typography>
                {renderEditableSmiley('isinrestrictedbreedscategory')}
                <Box className="edit-buttons">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => openConfirmDialog('dog')}
                    disabled={!!errors.name}
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
                  <span className="label">Sex:</span>{' '}
                  {dogData.sex === 'male' ? (
                    <MaleIcon className="icon male" />
                  ) : (
                    <FemaleIcon className="icon female" />
                  )}
                </Typography>
                <Typography>
                  <span className="label">Region:</span> {dogData.region}
                </Typography>
                <Typography>
                  <span className="label">Vaccinated:</span>{' '}
                  {renderSmileOrSadIcon(dogData.isvaccinated)}
                </Typography>
                <Typography>
                  <span className="label">Good with Kids:</span>{' '}
                  {renderSmileOrSadIcon(dogData.isgoodwithkids)}
                </Typography>
                <Typography>
                  <span className="label">Good with animals:</span>{' '}
                  {renderSmileOrSadIcon(dogData.isgoodwithanimals)}
                </Typography>
                <Typography>
                  <span className="label">Dangerous dog breed:</span>{' '}
                  {renderSmileOrSadIcon(dogData.isinrestrictedbreedscategory)}
                </Typography>
                <Typography>
                  <span className="label">Energy Level:</span>{' '}
                  {Array(dogData.energylevel)
                    .fill(null)
                    .map((_, i) => (
                      <FlashOnIcon key={i} style={{ color: 'gold' }} />
                    ))}
                </Typography>
                <Typography>
                  <span className="label">A bit more about me:</span>{' '}
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
                  error={!!errors.firstname}
                  helperText={errors.firstname}
                />
                <TextField
                  label="Last Name"
                  name="lastname"
                  value={editedOwnerData.lastname}
                  onChange={handleOwnerInputChange}
                  fullWidth
                  margin="normal"
                  error={!!errors.lastname}
                  helperText={errors.lastname}
                />
                <Typography>City:</Typography>
                <Select
                  label="City"
                  name="city"
                  value={editedOwnerData.city}
                  onChange={handleOwnerInputChange}
                >
                  {cities.length > 0 ? (
                    cities.map((city, index) => (
                      <MenuItem key={index} value={city}>
                        {city}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No cities available</MenuItem>
                  )}
                </Select>
                {/*<TextField
                  label="City"
                  name="city"
                  value={editedOwnerData.city}
                  onChange={handleOwnerInputChange}
                  fullWidth
                  margin="normal"
                />*/}
                <Box className="edit-buttons">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => openConfirmDialog('owner')}
                    disabled={!!errors.firstname || !!errors.lastname}
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
                  <span className="label"> Full Name:</span>{' '}
                  {dogData.owner.firstname} {dogData.owner.lastname}
                </Typography>
                <Typography>
                  <span className="label"> Age:</span> {dogData.owner.age}
                </Typography>
                <Typography>
                  <span className="label">Gender:</span>{' '}
                  {dogData.owner.gender === 'male' ? (
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
            Are you sure you want to save the changes to your{' '}
            {saveTarget === 'dog' ? 'Dog' : 'Owner'}?
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => handleSaveConfirm(false)}
              className="dialog-no-button"
            >
              No
            </Button>
            <Button
              className="dialog-yes-button"
              variant="contained"
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
