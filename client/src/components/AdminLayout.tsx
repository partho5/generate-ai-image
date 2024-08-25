// client/src/components/AdminLayout.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="admin-layout w-full">
            <Container>
                <main>{children}</main>
            </Container>
        </div>
    );
};

export default AdminLayout;
