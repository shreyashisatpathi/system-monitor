export const exportHandler =(items:any)=>{
    console.log('exporting', items)
    const csvRows = [];
    const keys = Object.keys(items[0]);
    csvRows.push(keys.join(','));
    console.log('csvRows1',csvRows)
    items.forEach((item: any)=>{
        csvRows.push(Object.values(item).join(','))
    })
    const csvData  = csvRows.join('\n')
    console.log('csvRows', csvData)
}