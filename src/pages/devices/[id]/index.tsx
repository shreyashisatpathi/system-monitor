import DeviceDetails from '@/components/deviceDetails/DeviceDetails';
import { Device, Vulnerability } from '@/type';
import { GetServerSideProps } from 'next';

type DeviceDetailsPageProps = {
  device: Device;
  vulnerabilities: Vulnerability[];
}

const DeviceDetailsPage: React.FC<DeviceDetailsPageProps> = ({
  device,
  vulnerabilities,
}) => {

  return <DeviceDetails device={device} vulnerabilities={vulnerabilities} />;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!params) {
    return {
      props: {
        device: null,
        vulnerabilities: null,
      },
    };
  }

  const deviceResponse = await fetch(
    `${process.env.DEVICE_MONITOR_SERVER_URL}/devices/${params.id}`
  );

  if (!deviceResponse.ok) {
    throw new Error(
      `Failed to fetch device details: ${deviceResponse.status} ${deviceResponse.statusText}`
    );
  }
  const device: Device[] = await deviceResponse.json();
console.log(process.env.DEVICE_MONITOR_SERVER_URL)
  const vulnerabilitiesResponse = await fetch(
    `${process.env.DEVICE_MONITOR_SERVER_URL}/devices/${params.id}/vulnerabilities`
  );

  if (!vulnerabilitiesResponse.ok) {
    throw new Error(
      `Failed to fetch vulnerabilities: ${vulnerabilitiesResponse.status} ${vulnerabilitiesResponse.statusText}`
    );
  }
  const vulnerabilities: Vulnerability[] = await vulnerabilitiesResponse.json();

  return {
    props: {
      device,
      vulnerabilities,
    },
  };
};

export default DeviceDetailsPage;
