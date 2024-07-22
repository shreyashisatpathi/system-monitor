import React, { ReactNode } from 'react';
import { MantineProvider } from '@mantine/core';

type TestWrapperProps = {
  children: ReactNode;
};

const TestWrapper: React.FC<TestWrapperProps> = ({ children }) => (
  <MantineProvider>
    {children}
  </MantineProvider>
);

export default TestWrapper;

