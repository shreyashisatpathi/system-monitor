import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DeviceList from './DeviceList';
import {
  exportHandler,
  selectedRecordForExport,
} from '@/utils/exportToCSVFile';
import { Device } from '@/type';
import TestWrapper from '@/utils/test-utils';

jest.mock('@/utils/exportToCSVFile');

const devices = [
  {
    oid: '1',
    ipv4: '192.168.1.1',
    hostname: 'device1',
    operatingSystem: 'Windows',
    macAddress: '00:14:22:01:23:45',
    ipv6: '::1',
    openPorts: [{ number: 80, protocol: 'TCP' }],
  },
  {
    oid: '2',
    ipv4: '192.168.1.2',
    hostname: 'device2',
    operatingSystem: 'Linux',
    macAddress: '00:14:22:01:23:46',
    ipv6: '::2',
    openPorts: [{ number: 443, protocol: 'TCP' }],
  },
];

describe('DeviceList Component', () => {
  
  it('should render the component', () => {
    render(
      <TestWrapper>
        <DeviceList devices={devices} />
      </TestWrapper>
    );
    expect(screen.getByText('Device List')).toBeInTheDocument();
  });

  it('should display "No devices available" when no devices are passed', () => {
    render(
      <TestWrapper>
        <DeviceList devices={[]} />
      </TestWrapper>
    );
    expect(screen.getByText('No devices available')).toBeInTheDocument();
  });

  it('should sort devices by hostname', () => {
    render(
      <TestWrapper>
        <DeviceList devices={devices} />
      </TestWrapper>
    );
    fireEvent.click(screen.getByText('Host name'));
    const sortedHostnames = screen.getAllByRole('cell').map((cell) => cell.textContent);
    console.log(sortedHostnames)
    expect(sortedHostnames).toEqual( [
      '',             '192.168.1.1',
      'device1',      'Windows',
      'View Details', '',
      '192.168.1.2',  'device2',
      'Linux',        'View Details'
    ]
);
  });

  it('should handle checkbox toggle', () => {
    render(
      <TestWrapper>
        <DeviceList devices={devices} />
      </TestWrapper>
    );
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);
    expect(checkboxes[0]).toBeChecked();
    fireEvent.click(checkboxes[0]);
    expect(checkboxes[0]).not.toBeChecked();
  });

  it('should call exportHandler on Export to CSV button click', () => {
    const selectedRecordForExportMock = selectedRecordForExport as jest.MockedFunction<typeof selectedRecordForExport>;
    const exportHandlerMock = exportHandler as jest.MockedFunction<typeof exportHandler>;

    selectedRecordForExportMock.mockReturnValue([devices[0]]);
    render(
      <TestWrapper>
        <DeviceList devices={devices} />
      </TestWrapper>
    );
    fireEvent.click(screen.getByText('Export to CSV'));

    expect(selectedRecordForExportMock).toHaveBeenCalledWith(devices, []);
    expect(exportHandlerMock).toHaveBeenCalledWith([devices[0]], 'Device');
  });
});
