import Chart from '../components/MainChart';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import Header from '../components/Header';

export default function HomePage() {
  return (
    <div>
    <Header />

    <Container>
      <Chart />
    </Container>
    </div>
  );
}
