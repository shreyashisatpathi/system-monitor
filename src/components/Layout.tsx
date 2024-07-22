import React, { ReactNode } from 'react';
import Link from 'next/link';
import { NavLink } from '@mantine/core';
import { AppShell, Burger, Group, Skeleton } from '@mantine/core';

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div>
      <AppShell
        header={{ height: 30 }}
        navbar={{
          width: 300,
          breakpoint: 'sm'
        }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Link href="/">Home</Link>
          </Group>
        </AppShell.Header>
        <AppShell.Main pl={0}>{children}</AppShell.Main>
      </AppShell>
    </div>
  );
};

export default Layout;
