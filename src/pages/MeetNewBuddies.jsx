import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext'; // Importing UserContext for user information
import '../css/MeetNewBuddies.css'; // Importing existing CSS for styling
import DogCard from '../components/DogCard'; // Using DogCard component for each dog
import CircularProgress from '@mui/material/CircularProgress'; // Importing MUI CircularProgress
import {
  Typography,
  Select,
  MenuItem,
  TextField,
  Tooltip,
  Box,
  Button,
} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt'; // Import Filter Icon
import EmptyState from '../components/EmptyState';

function MeetNewBuddies() {
  const { user } = useContext(UserContext); // Getting the logged-in user from context
  const [dogs, setDogs] = useState([]); // State for dog data
  const [loading, setLoading] = useState(true); // State to show spinner while loading
  const [error, setError] = useState(null); // State for handling errors
  const [refresh, setRefresh] = useState(false); // Trigger re-fetching data
  const [filters, setFilters] = useState({ city: '', sex: '', breed: '' }); // Filters for user choise
  const [breeds, setBreeds] = useState([]);
  const [cities, setCities] = useState([]); // City list state
  const [noResults, setNoResults] = useState(false); // Track no results due to filters

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

  // Fetch all breeds from the API
  useEffect(() => {
    fetch('https://dog.ceo/api/breeds/list/all')
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setBreeds(Object.keys(data.message));
        }
      })
      .catch((error) => console.error('Error fetching breeds:', error));
  }, []);

  // Fetch dogs on component load and whenever filters change
  useEffect(() => {
    fetchNotFriendsDogsAndOwners(filters);
  }, [filters]);

  // Function to fetch data from the backend
  const fetchNotFriendsDogsAndOwners = async (filters = {}) => {
    try {
      setLoading(true); // Show loading spinner
      // Construct the base URL with the email
      let url = `http://localhost:5000/api/dogs/not-friends-dogs-and-owners?email=${user.email}`;
      // Append filters manually
      if (filters.city) url += `&city=${encodeURIComponent(filters.city)}`;
      if (filters.sex) url += `&sex=${encodeURIComponent(filters.sex)}`;
      if (filters.breed) url += `&breed=${encodeURIComponent(filters.breed)}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`); // Handle HTTP errors
      }
      const data = await response.json();
      setDogs(data); // Update state with fetched data
      setNoResults(data.length === 0); // Update noResults based on the response
    } catch (err) {
      setError(err.message); // Set error state if fetch fails
    } finally {
      setLoading(false); // Hide spinner
    }
  };

  // Function to trigger data refresh
  const refreshDogs = async () => {
    await fetchNotFriendsDogsAndOwners(filters); // Toggle refresh state
  };

  const handleFilterChange = async (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({ city: '', sex: '', breed: '' });
  };

  if (loading) {
    // Render spinner while data is loading
    return (
      <div className="spinner-container">
        <CircularProgress />
        <p>Loading new buddies...</p>
      </div>
    );
  }

  if (error) {
    // Render error message if an error occurs
    return <p className="error-message">Error: {error}</p>;
  }

  return (
    <div className="meet-new-buddies">
      <Typography variant="h4" className="page-title">
        Meet New Buddies
      </Typography>

      <div className="filters">
        <Tooltip title="Filter by city">
          <Typography className="filter-label">City</Typography>
          <Select
            name="city"
            value={filters.city}
            onChange={handleFilterChange}
            fullWidth
          >
            <MenuItem value="">All Cities</MenuItem>
            {cities.map((city) => (
              <MenuItem key={city} value={city}>
                {city}
              </MenuItem>
            ))}
          </Select>
        </Tooltip>
        <Typography className="filter-label">Sex</Typography>
        <Tooltip title="Filter by sex">
          <Select
            name="sex"
            value={filters.sex}
            onChange={handleFilterChange}
            fullWidth
          >
            <MenuItem value="">All Sexes</MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
        </Tooltip>
        <Typography className="filter-label">Breeds</Typography>
        <Tooltip title="Filter by breed">
          <Select
            name="breed"
            value={filters.breed}
            onChange={handleFilterChange}
            fullWidth
          >
            <MenuItem value="">All Breeds</MenuItem>
            {breeds.map((breed) => (
              <MenuItem key={breed} value={breed}>
                {breed}
              </MenuItem>
            ))}
          </Select>
        </Tooltip>
        <Tooltip title="Clear all active filters ">
          <Button
            onClick={clearFilters}
            variant="contained"
            className="clear-filters-button"
          >
            Clear Filters
          </Button>
        </Tooltip>
      </div>
      {/* Dogs Section */}
      <div className="dog-list">
        {noResults ? (
          <div className="no-results">
            <Typography variant="body1">
              No dogs match the selected filters. Please adjust your filters.
            </Typography>
          </div>
        ) : dogs.length === 0 ? (
          // Ofir Change Here
          <EmptyState message="You have no pending friend requests." />
        ) : (
          // Ofir Change Here
          dogs.map((dog) => (
            <DogCard key={dog.id} dog={dog} refreshDogs={refreshDogs} />
          ))
        )}
      </div>
    </div>
  );
}

export default MeetNewBuddies;
