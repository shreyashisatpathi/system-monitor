import { exportHandler } from '@/utils/exportToCSVFile';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Checkbox } from '@mantine/core';
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
  const [checked, setChecked] = useState<String[]>([]);
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

  const seletedDevices = () => {
    const checkedDevices = sortedDevices.filter((device) =>
      checked.includes(device.oid)
    );

    //If any device row is checked only export that one, otherwise export all devices in sorted order
    return checked.length > 0 ? checkedDevices : sortedDevices;
  };

  return (
    <div>
      <h1>Device List</h1>
      <button onClick={() => exportHandler(seletedDevices(), 'Device')}>
        Export to CSV
      </button>
      <table>
        <thead>
          <tr>
            <th></th>
            <th onClick={() => sortDevices('ipv4')}>IPv4 Address</th>
            <th onClick={() => sortDevices('hostname')}>Hostname</th>
            <th onClick={() => sortDevices('operatingSystem')}>
              Operating System
            </th>

            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {sortedDevices.map((device) => (
            <tr key={device.oid}>
              <td>
                <Checkbox
                  checked={checked.includes(device.oid)}
                  onChange={() => toggleCheckBoxHandler(device.oid)}
                />
              </td>
              <td>{device.ipv4}</td>
              <td>{device.hostname}</td>
              <td>{device.operatingSystem}</td>
              <td>
                <Link href={`/devices/${device.oid}`}>View Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeviceList;
