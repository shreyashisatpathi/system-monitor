import type { Device, Vulnerability } from '@/type';
import VulnerabilityList from '../vulnerabilityList/VulnerabilityList';
import { Text, Paper, Container, List } from '@mantine/core';
import style from './DeviceDetails.module.css';
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
        <Container fluid h={30} bg="var(--mantine-color-blue-light)">
          Device Details
        </Container>
        <Text>Hostname: {device.hostname}</Text>
        <Text>IPv4 Address: {device.ipv4}</Text>
        <Text>Operating System: {device.operatingSystem}</Text>
        <Text>MAC Address: {device.macAddress}</Text>
        <Text>IPv6 Address: {device.ipv6}</Text>
        <Text>Open Ports:</Text>
        <List>
          {device.openPorts.map((port) => (
            <List.Item key={port.number}>
              Port number: {port.number}; Protocol: {port.protocol}
            </List.Item>
          ))}
        </List>
      </Paper>
      <VulnerabilityList vulnerabilities={vulnerabilities} />
    </div>
  );
};
export default DeviceDetails;
