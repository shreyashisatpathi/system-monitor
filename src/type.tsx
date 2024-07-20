export type port = {
    number: number;
    protocol:  string;
}

export type Device = {
  oid: string;
  ipv4: string;
  hostname: string;
  operatingSystem: string;
  macAddress: string;
  ipv6: string;
  openPorts: port[]
}

export type Vulnerability = {
    oid: string;
    name: string;
    severity: string;
    assetId: string;
    qod: string;
    solutionType: string;
  }