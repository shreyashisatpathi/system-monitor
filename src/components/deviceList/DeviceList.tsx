import {
  exportHandler,
  selectedRecordForExport,
} from '@/utils/exportToCSVFile';
import Link from 'next/link';
import { useState } from 'react';
import { Checkbox, Title, Text, Group } from '@mantine/core';
import { Table } from '@mantine/core';
import styles from './DeviceList.module.css';
import type { Device } from '@/type';
import { tableHeaderWithIcon } from '@/utils/iconHelper';

type DeviceListProps = {
  devices: Device[];
};
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
      <div className={styles.title}>
        <Title order={3}>Device List</Title>
      </div>
      <div className={styles.exportBtn}>
        <button
          onClick={() =>
            exportHandler(
              selectedRecordForExport(sortedDevices, checked),
              'Device'
            )
          }
        >
          Export to CSV
        </button>
      </div>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th></Table.Th>
            <Table.Th onClick={() => sortDevices('ipv4')}>
              {tableHeaderWithIcon('IPv4 Address')}
            </Table.Th>
            <Table.Th onClick={() => sortDevices('hostname')}>
              {tableHeaderWithIcon('Host name')}
            </Table.Th>
            <Table.Th onClick={() => sortDevices('operatingSystem')}>
              {tableHeaderWithIcon('Operating System')}
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
