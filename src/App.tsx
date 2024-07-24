import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { ThemeProvider } from './components/ui/theme-provider';
import AppLayout from './layout/AppLayout';
import Layout from './layout/Layout';
import Auth from './pages/Auth';
import Projects from './pages/Projects';
import { TooltipProvider } from './components/ui/tooltip';
import Dashboard from './pages/Dashboard';
import ToDO from './pages/ToDo';
import SignUPConfirm from './pages/SignUPConfirm';

const Routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Auth /> },
      { path: '/confirm-account', element: <SignUPConfirm /> }
    ]
  },
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'projects', element: <Projects /> },
      { path: 'todo', element: <ToDO /> }
    ]
  }
]);

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <TooltipProvider>
          <RouterProvider router={Routes} />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
