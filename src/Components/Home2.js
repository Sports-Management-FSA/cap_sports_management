import React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
// import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector} from "react-redux";
import { Link } from 'react-router-dom';

const Home2 = () => {
    const { auth, leagues } = useSelector((state) => state);
    const defaultTheme = createTheme();
    return (
        
        <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
    
        <main>
          <Box
            sx={{bgcolor: 'background.paper',
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
              >
                Home
              </Typography>
              <Typography variant="h5" align="center" color="text.secondary" paragraph>
                Start browsing our leagues
              </Typography>
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
              </Stack>
            </Container>
          </Box>
          </main>
            <Container sx={{ py: 8 }} maxWidth="md">
            <Grid container spacing={2}>
                {leagues.leaguesList.map((league, idx) => (
                <Grid item key={idx} xs={12} sm={6} md={4}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <CardMedia 
                            component="div" 
                            sx={{
                            // 16:9
                            pt: '56.25%',
                            }}
                            image={league.logo}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h5" component="h2">
                            {league.name}
                            </Typography>
                            <Typography>{league.teams.length} teams </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small"><Link to={`/league/${league.id}`}>View League</Link></Button>
                        </CardActions>
                    </Card>
                </Grid>
                ))}
            </Grid>
        </Container>
    </ThemeProvider>
       
    );
};

export default Home2;