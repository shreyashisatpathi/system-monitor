import { Inter } from 'next/font/google';
import DeviceList from '@/components/deviceList/DeviceList';
import type { Device } from '@/type';

const inter = Inter({ subsets: ['latin'] });

type DevicesProps = {
  devices: Device[];
};
const Home: React.FC<DevicesProps> = ({ devices }) => {
  return <DeviceList devices={devices} />;
};

export const getServerSideProps = async () => {
  let devices = [];
  try {
    const response = await fetch(
      `${process.env.DEVICE_MONITOR_SERVER_URL}/devices`
    );
    devices = await response.json();
    return {
      props: {
        devices,
      },
    };
  } catch (error) {
    console.log('error fetching the data from server', error);
    return {
      props: {
        devices: [],
      },
    };
  }
};

export default Home;
