import { exportHandler } from '@/utils/exportToCSVFile';
import Link from 'next/link';
import { useState } from 'react';

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

  const sortDevices = (key: keyof Device) => {
    const sortedDevices = [...devices].sort((a, b) => {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    });
    setSortedDevices(sortedDevices);
  };
  

  return (
    <div>
      <h1>Device List</h1>
      <button onClick={()=>exportHandler(sortedDevices, 'Device')}>Export to CSV</button>
      <table>
        <thead>
          <tr>
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
