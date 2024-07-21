const flattenObject = (obj: any, parent: string = '', res: any = {}): any => {
    for (let key in obj) {
      const propName = parent ? `${parent}.${key}` : key;
      if (typeof obj[key] === 'object') {
        flattenObject(obj[key], propName, res);
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
    if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
  };
  
  const convertJSONToCSV = (items: any) => {
    const flatItem = items.map((item: any) => flattenObject(item))

    const csvRows = [];
    const keys = Object.keys(flatItem[0]);
    csvRows.push(keys.join(','));

    flatItem.forEach((item: any)=>{
        //Array of values for each row
        const values = (Object.values(item))
        //After escaping common separators, like ',' ""' etc 
        const escapedValues = values.map((value: any) => escapeCsvValue(value))
        csvRows.push(escapedValues.join(','))
    })

    return csvRows.join('\n')
  }

  const handleDownloadReports = (csvData: string, reportType: string) => {
      //converting csvData to Blob object, which isa file-like object of immutable, read-only text or binary data.
      //https://developer.mozilla.org/en-US/docs/Web/API/Blob
      const blob = new Blob([csvData], {type: 'text/csv'})
      //creates a URL from the blob object
      const urlObj = window.URL.createObjectURL(blob)
      console.log(urlObj)
      const link = document.createElement('a')
      //Creating an anchor tag to download the urlObj
      //example: <a href={urlObj} download="device.csv">
      link.href = urlObj 
      const fileName = `${reportType}.csv`;
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      //click to download
      link.click()
      //Once download finished, remove the link from the document  
      link.remove()
  }
  
export const exportHandler =(items:any, reportType: string)=>{
    const csvData = convertJSONToCSV(items)
    handleDownloadReports(csvData, reportType) 
}


