import type { Device, Vulnerability } from '@/type';

/**
 * const obj = {
 oid: 1,
 host: 'Laboratory1',
 openPorts: [{"number":3306,"protocol":"TCP"},{"number":22,"protocol":"TCP"}]}
};
const flattened = deepFlattenToObject(obj);
console.log(flattened); 

Output:-
{
  oid: "1",
  host: 'Laboratory1,
  openPorts.0.number: 3306,
  openPorts.0.protocol: "TCP",
  openPorts.1.number: 22,
  openPorts.1.protocol: "TCP"
}
**/

const deepFlattenToObject = (
  obj: any,
  parent: string = '',
  res: any = {}
): any => {
  for (let key in obj) {
    const propName = parent ? `${parent}.${key}` : key;
    if (typeof obj[key] === 'object') {
      deepFlattenToObject(obj[key], propName, res);
    } else {
      res[propName] = obj[key];
    }
  }

  return res;
};

/**
 * Escape a value for CSV
 */
const escapeCsvValue = (value: any): string => {
  if (value === null || value === undefined) {
    return '';
  }
  const stringValue = String(value);
  // Enclose the string in double quotes if it contains a comma, double quotes, or a newline
  if (
    stringValue.includes(',') ||
    stringValue.includes('"') ||
    stringValue.includes('\n')
  ) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
};

const convertJSONToCSV = (items: any) => {
  const flattenedItem = items.map((item: any) => deepFlattenToObject(item));
  const csvRows = [];
  const keys = Object.keys(flattenedItem[0]);
  csvRows.push(keys.join(','));

  flattenedItem.forEach((item: any) => {
    //Array of values for each row
    const values = Object.values(item);
    //After escaping common separators, like ',' ""' etc
    const escapedValues = values.map((value: any) => escapeCsvValue(value));
    csvRows.push(escapedValues.join(','));
  });

  return csvRows.join('\n');
};

const handleDownloadReports = (csvData: string, reportType: string) => {
  //converting csvData to Blob object, which isa file-like object of immutable, read-only text or binary data.
  //https://developer.mozilla.org/en-US/docs/Web/API/Blob
  const blob = new Blob([csvData], { type: 'text/csv' });
  //creates a URL from the blob object
  const urlObj = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  //Creating an anchor tag to download the urlObj
  //example: <a href={urlObj} download="device.csv">
  link.href = urlObj;
  const fileName = `${reportType}.csv`;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  //click to download
  link.click();
  //Once download finished, remove the link from the document
  link.remove();
};

export const exportHandler = (items: any, reportType: string) => {
  const csvData = convertJSONToCSV(items);
  handleDownloadReports(csvData, reportType);
};

export const selectedRecordForExport = <T extends { oid: string }>(
  allRecords: T[],
  checkedList: string[]
): T[] => {
  const checkedRecords = allRecords.filter((record: T) =>
    checkedList.includes(record.oid)
  );

  //If any device row is checked only export that one, otherwise export all devices in sorted order
  return checkedList.length > 0 ? checkedRecords : allRecords;
};
