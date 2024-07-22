// src/components/deviceDetails/DeviceDetails.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import DeviceDetails from './DeviceDetails';
import type { Device, Vulnerability } from '@/type';
import TestWrapper from '@/utils/test-utils';
import { useRouter } from 'next/router';

jest.mock('next/router');

const mockDevice: Device = {
  oid: '1',
  hostname: 'Test Device',
  ipv4: '192.168.1.1',
  ipv6: 'fe80::1',
  macAddress: '00:0a:95:9d:68:16',
  operatingSystem: 'Test OS',
  openPorts: [
    { number: 80, protocol: 'TCP' },
    { number: 443, protocol: 'TCP' },
  ],
};

const mockVulnerabilities: Vulnerability[] = [
  {
    oid: 'CVE-2021-12345',
    name: 'Test Vulnerability',
    severity: 'High',
    solutionType: 'Test solution',
    qod: '30',
    assetId: '1',
  },
];

describe('DeviceDetails', () => {
  beforeEach(() => {
    // Mock the useRouter hook
    (useRouter as jest.Mock).mockReturnValue({
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
    });
  });

  test('renders device details correctly', () => {
    render(
      <TestWrapper>
        <DeviceDetails
          device={mockDevice}
          vulnerabilities={mockVulnerabilities}
        />
      </TestWrapper>
    );
    expect(screen.getByText('Hostname: Test Device')).toBeInTheDocument();
    expect(screen.getByText('IPv4 Address: 192.168.1.1')).toBeInTheDocument();
    expect(screen.getByText('Operating System: Test OS')).toBeInTheDocument();
    expect(
      screen.getByText('MAC Address: 00:0a:95:9d:68:16')
    ).toBeInTheDocument();
    expect(screen.getByText('IPv6 Address: fe80::1')).toBeInTheDocument();
    expect(
      screen.getByText('Port number: 80; Protocol: TCP')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Port number: 443; Protocol: TCP')
    ).toBeInTheDocument();
  });
});
