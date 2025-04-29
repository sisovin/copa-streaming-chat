import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../styles/theme';
import { AuthProvider } from '../contexts/AuthContext';
import { VideoCallProvider } from '../contexts/VideoCallContext';
import Layout from '../components/Layout';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <VideoCallProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </VideoCallProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default MyApp;
