import React, { useState } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert,
  ThemeProvider,
  createTheme,
  Autocomplete
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

// Predefined options
const INDUSTRIES = [
  'Technology',
  'Healthcare',
  'Finance',
  'Manufacturing',
  'Retail',
  'Education',
  'Energy',
  'Transportation',
  'Media',
  'Real Estate'
];

const LOCATIONS = [
  'United States',
  'Europe',
  'Asia',
  'Australia',
  'Canada',
  'United Kingdom',
  'Germany',
  'France',
  'Japan',
  'India'
];

const KEYWORDS = [
  'AI',
  'Machine Learning',
  'Cloud Computing',
  'Digital Transformation',
  'Cybersecurity',
  'Blockchain',
  'IoT',
  'Big Data',
  'SaaS',
  'Mobile Apps',
  'E-commerce',
  'Fintech',
  'Healthtech',
  'Edtech',
  'Clean Energy'
];

// Create theme first
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          padding: '10px 24px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

function App() {
  const [formData, setFormData] = useState({
    industry: '',
    location: '',
    company_size: '',
    keywords: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [leads, setLeads] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleKeywordsChange = (event, newValue) => {
    setFormData(prev => ({
      ...prev,
      keywords: newValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setLeads([]);

    try {
      const response = await axios.post('/api/generate-leads', formData);
      setLeads(response.data.leads);
    } catch (err) {
      setError(err.response?.data?.detail || 'An error occurred while generating leads');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            AI-Powered Lead Generation
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Generate high-quality leads based on your specific criteria
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Industry</InputLabel>
                  <Select
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    label="Industry"
                  >
                    {INDUSTRIES.map((industry) => (
                      <MenuItem key={industry} value={industry}>
                        {industry}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Location</InputLabel>
                  <Select
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    label="Location"
                  >
                    {LOCATIONS.map((location) => (
                      <MenuItem key={location} value={location}>
                        {location}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Company Size</InputLabel>
                  <Select
                    name="company_size"
                    value={formData.company_size}
                    onChange={handleChange}
                    label="Company Size"
                  >
                    <MenuItem value="1-10">1-10 employees</MenuItem>
                    <MenuItem value="11-50">11-50 employees</MenuItem>
                    <MenuItem value="51-200">51-200 employees</MenuItem>
                    <MenuItem value="201-500">201-500 employees</MenuItem>
                    <MenuItem value="501+">501+ employees</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  options={KEYWORDS}
                  value={formData.keywords}
                  onChange={handleKeywordsChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Keywords"
                      placeholder="Select or type keywords"
                    />
                  )}
                  freeSolo
                  multiple
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<SearchIcon />}
                  disabled={loading}
                  sx={{ mt: 2 }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Generate Leads'}
                </Button>
              </Grid>
            </Grid>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mt: 3 }}>
              {error}
            </Alert>
          )}

          {leads.length > 0 && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" gutterBottom>
                Generated Leads
              </Typography>
              <Grid container spacing={3}>
                {leads.map((lead, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Paper elevation={2} sx={{ p: 3 }}>
                      <Typography variant="h6" gutterBottom>
                        {lead.company_name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {lead.description}
                      </Typography>
                      <Typography variant="body2" color="primary">
                        Industry: {lead.industry}
                      </Typography>
                      <Typography variant="body2" color="primary">
                        Location: {lead.location}
                      </Typography>
                      <Typography variant="body2" color="primary">
                        Size: {lead.company_size} employees
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App; 