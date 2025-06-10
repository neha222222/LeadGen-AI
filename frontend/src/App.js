import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  CircularProgress,
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Paper,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ListIcon from '@mui/icons-material/List';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import KeyIcon from '@mui/icons-material/Key';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6366F1',
    },
    secondary: {
      main: '#8B5CF6',
    },
  },
  typography: {
    h4: {
      fontWeight: 700,
      color: '#333',
    },
    h5: {
      fontWeight: 600,
      color: '#444',
    },
    h6: {
      fontWeight: 600,
      color: '#555',
    },
    body1: {
      fontSize: '1.05rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.9rem',
      lineHeight: 1.5,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 600,
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'scale(1.02)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          borderRadius: '8px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
    },
  },
});

const INDUSTRIES = [
  'Technology',
  'Finance',
  'Healthcare',
  'Retail',
  'Manufacturing',
  'Education',
  'Real Estate',
  'Hospitality',
  'Marketing',
  'Consulting'
];

const LOCATIONS = [
  'New York',
  'San Francisco',
  'London',
  'Berlin',
  'Tokyo',
  'Sydney',
  'Singapore',
  'Dubai'
];

const COMPANY_SIZES = [
  '1-10 employees',
  '11-50 employees',
  '51-200 employees',
  '201-500 employees',
  '501+ employees'
];

const KEYWORDS = [
  'Atlassian',
  'Jira',
  'Confluence',
  'Bitbucket',
  'Trello',
  'Agile',
  'DevOps',
  'Cloud',
  'Enterprise',
  'Collaboration',
  'Project Management',
  'Software Development',
  'Team Collaboration',
  'Work Management',
  'IT Service Management'
];

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setLeads([]);

    try {
      const payload = {
        ...formData,
        keywords: formData.keywords ? formData.keywords.split(',').map(kw => kw.trim()) : []
      };
      const response = await axios.post('/api/leads/generate', payload);
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
          <Typography variant="h4" component="h1" gutterBottom align="center">
            AI-Powered Lead Generation
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph align="center">
            Generate high-quality leads based on your specific criteria
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Industry</InputLabel>
                  <Select
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    label="Industry"
                    required
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
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Location</InputLabel>
                  <Select
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    label="Location"
                    required
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
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Company Size</InputLabel>
                  <Select
                    name="company_size"
                    value={formData.company_size}
                    onChange={handleChange}
                    label="Company Size"
                    required
                  >
                    {COMPANY_SIZES.map((size) => (
                      <MenuItem key={size} value={size}>
                        {size}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Keywords</InputLabel>
                  <Select
                    name="keywords"
                    value={formData.keywords}
                    onChange={handleChange}
                    label="Keywords"
                    required
                  >
                    {KEYWORDS.map((keyword) => (
                      <MenuItem key={keyword} value={keyword}>
                        {keyword}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<SearchIcon />}
                  disabled={loading || !formData.industry || !formData.location || !formData.company_size || !formData.keywords}
                  sx={{ mt: 2, px: 5, py: 1.5, fontSize: '1.1rem' }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Generate Leads'}
                </Button>
              </Grid>
            </Grid>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mt: 3, width: '100%' }}>
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
                    <Paper elevation={2} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="h6" gutterBottom>
                        {lead.company_name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph sx={{ flexGrow: 1 }}>
                        {lead.description}
                      </Typography>
                      <Typography variant="body2" color="primary">
                        Industry: {lead.industry}
                      </Typography>
                      <Typography variant="body2" color="primary">
                        Location: {lead.location}
                      </Typography>
                      <Typography variant="body2" color="primary">
                        Size: {lead.company_size}
                      </Typography>
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Score: {lead.score.toFixed(2)}</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Sentiment: {lead.sentiment_score.toFixed(2)}</Typography>
                      </Box>
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