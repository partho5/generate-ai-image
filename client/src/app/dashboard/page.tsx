// client/src/app/dashboard/page.tsx
'use client';

import { useState } from 'react';
import { Button, CircularProgress, Typography } from '@mui/material';
import AdminLayout from "@/components/AdminLayout";

export default function PrivatePage() {
  const [state, setState] = useState({
    isLoading: false,
    response: undefined,
    error: undefined,
  });

  const callApi = async () => {
    setState((previous) => ({ ...previous, isLoading: true }));

    try {
      const response = await fetch('/api/private-route');
      const data = await response.json();

      setState((previous) => ({
        ...previous,
        response: data,
        error: undefined,
      }));
    } catch (error) {
      setState((previous) => ({
        ...previous,
        response: undefined,
        error,
      }));
    } finally {
      setTimeout(()=>{
        setState((previous) => ({ ...previous, isLoading: false }));
      }, 1500);
    }
  };

  const { isLoading, response, error } = state;

  return (
      <AdminLayout>
        <Typography variant="h4" className="mt-10">
          Dashboard Page
        </Typography>

        <Button
            onClick={callApi}
            variant="contained"
            className="mt-10"
            disabled={isLoading}
            style={{
              minWidth: "100px", backgroundColor: "#0393eb"
            }}
        >
          {isLoading ? <CircularProgress size={24} style={{color: '#fff'}} /> : "Call API"}
        </Button>


          <div className="mt-20">
          {response && <div>{JSON.stringify(response)}</div>}
          {error && <div>Error: {error.message}</div>}
        </div>
      </AdminLayout>
  );
}
