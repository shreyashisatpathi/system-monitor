import { exportHandler, selectedRecordForExport } from '@/utils/exportToCSVFile';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Checkbox } from '@mantine/core';
import { Table } from '@mantine/core';
interface Device {
  oid: string;
  ipv4: string;
  hostname: string;
  operatingSystem: string;
  manufacturer: string;
}
interface DeviceListProps {
  devices: Device[];
}
const DeviceList: React.FC<DeviceListProps> = ({ devices }) => {
  if (!devices || devices.length === 0) {
    return <div>No devices available</div>;
  }

  const [sortedDevices, setSortedDevices] = useState<Device[]>(devices);
  const [checked, setChecked] = useState<string[]>([]);
  const sortDevices = (key: keyof Device) => {
    const sortedDevices = [...devices].sort((a, b) => {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    });
    setSortedDevices(sortedDevices);
  };

  const toggleCheckBoxHandler = (oid: string) => {
    if (checked.includes(oid)) {
      setChecked(checked.filter((item) => item !== oid));
    } else {
      setChecked([...checked, oid]);
    }
  };

 
  return (
    <div>
      <h1>Device List</h1>
      <button onClick={() => exportHandler(selectedRecordForExport(sortedDevices, checked), 'Device')}>
        Export to CSV
      </button>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th></Table.Th>
            <Table.Th onClick={() => sortDevices('ipv4')}>IPv4 Address</Table.Th>
            <Table.Th onClick={() => sortDevices('hostname')}>Hostname</Table.Th>
            <Table.Th onClick={() => sortDevices('operatingSystem')}>
              Operating System
            </Table.Th>

            <Table.Th>Details</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <tbody>
          {sortedDevices.map((device) => (
            <Table.Tr key={device.oid}>
              <Table.Td>
                <Checkbox
                  checked={checked.includes(device.oid)}
                  onChange={() => toggleCheckBoxHandler(device.oid)}
                />
              </Table.Td>
              <Table.Td>{device.ipv4}</Table.Td>
              <Table.Td>{device.hostname}</Table.Td>
              <Table.Td>{device.operatingSystem}</Table.Td>
              <Table.Td>
                <Link href={`/devices/${device.oid}`}>View Details</Link>
              </Table.Td>
            </Table.Tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DeviceList;
