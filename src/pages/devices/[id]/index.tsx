import DeviceDetails from '@/components/deviceDetails/DeviceDetails';
import { Device } from '@/type';
import { GetServerSideProps } from 'next';

interface Vulnerability {
  oid: string;
  name: string;
  severity: string;
  assetId : string;
  qod : string;
  solutionType: string;
}
interface DeviceDetailsPageProps {
  device: Device;
  vulnerabilities: Vulnerability[];
}

const DeviceDetailsPage: React.FC<DeviceDetailsPageProps> = ({
  device,
  vulnerabilities,
}) => {
  if (!device) {
    return <div>Device not found</div>;
  }
  return (
    <div>
      <h2>Device Details</h2>
      <DeviceDetails device={device} vulnerabilities={vulnerabilities} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({params}) => {
 if(!params){
  return {
    props: {
      device: null,
      vulnerabilities: null
    }
  }
 }
 
  const deviceResponse = await fetch(`http://localhost:8080/devices/${params.id}`);
 
  if (!deviceResponse.ok) {
    throw new Error(`Failed to fetch device details: ${deviceResponse.status} ${deviceResponse.statusText}`);
  }
  const device: Device[] = await deviceResponse.json();
  console.log('device details', device)
  const vulnerabilitiesResponse = await fetch(
    `http://localhost:8080/devices/${params.id}/vulnerabilities`
  );
  if (!vulnerabilitiesResponse.ok) {
    throw new Error(`Failed to fetch vulnerabilities: ${vulnerabilitiesResponse.status} ${vulnerabilitiesResponse.statusText}`);
  }
  const vulnerabilities: Vulnerability[] = await vulnerabilitiesResponse.json();
  console.log('vulnerabilities',vulnerabilities)
  return {
    props: {
      device,
      vulnerabilities,
    },
  };
} 
export default DeviceDetailsPage;
