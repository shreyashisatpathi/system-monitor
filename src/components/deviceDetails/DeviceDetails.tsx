import type { Device, Vulnerability } from '@/type';
import VulnerabilityList from '../vulnerabilityList/VulnerabilityList';
import { Text, Paper, Title } from '@mantine/core';
import style from './DeviceDetails.module.css'
interface DeviceDetailsProps {
  device: Device;
  vulnerabilities: Vulnerability[];
}
const DeviceDetails: React.FC<DeviceDetailsProps> = ({
  device,
  vulnerabilities,
}) => {
  if (!device) {
    return <div>Device not found</div>;
  }

  return (
    <div className={style.container}>
      
      <Paper shadow="md" p="xs" radius="md">
        <Title order={4}>Device Details </Title>
        <p>Hostname: {device.hostname}</p>
        <p>IPv4 Address: {device.ipv4}</p>
        <p>Operating System: {device.operatingSystem}</p>
        <p>MAC Address: {device.macAddress}</p>
        <p>IPv6 Address: {device.ipv6}</p>
        <h3>Open Ports</h3>
        <ul>
          {device.openPorts.map((port) => (
            <li key={port.number}>
              {port.number} ({port.protocol})
            </li>
          ))}
        </ul>
      </Paper>
      <VulnerabilityList vulnerabilities={vulnerabilities} />
    </div>
  );
};
export default DeviceDetails;
