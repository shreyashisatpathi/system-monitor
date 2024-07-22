import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import DeviceList from '@/components/deviceList/DeviceList';
import { FC } from 'react';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });
interface Device {
  oid: string;
  ipv4: string;
  hostname: string;
  operatingSystem: string;
  manufacturer: string;
}
interface DevicesProps {
  devices: Device[];
}
const Home: React.FC<DevicesProps> = ({ devices }) => {
  
  return <DeviceList devices={devices} />
};

export const getServerSideProps = async () => {
  let devices = [];
  try {
    const response = await fetch(`${process.env.DEVICE_MONITOR_SERVER_URL}/devices`);
    devices = await response.json();
    return {
      props: {
        devices,
      },
    }
  } catch (error) {
    console.log('error fetching the data from server', error);
   return {
    props: {
      devices:[],
    },
  };
};
}
export default Home;
