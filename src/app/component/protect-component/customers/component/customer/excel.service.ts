import { Injectable } from '@angular/core';
import * as Excel from 'exceljs/dist/exceljs';
import { saveAs } from 'file-saver'

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  static async exportExcel(headerData, header,excelData: any, footer: any[],metaData: any) {
   const wb = new Excel.Workbook()
    const ws = wb.addWorksheet()
    //ws.mergeCells('A1', 'M1');
    const meta1 = ws.getCell('A1')
    const meta2 = ws.getCell('A2')
    const meta3 = ws.getCell('A3')
    meta1.font = { bold: true }
    meta2.font = { bold: true }
    meta3.font = { bold: true }
    ws.getCell('A1').value = 'Type of report - ' + metaData;
    ws.getCell('A2').value = 'Client name - Rahul Jain';
    ws.getCell('A3').value = 'Report as on - ' + new Date();
    //ws.getCell('A1').alignment = { horizontal: 'center' };
    const head = ws.getRow(5)
    head.font = { bold: true }
    head.fill = {
      type: 'pattern',
      pattern: 'darkVertical',
      fgColor: {
        argb: '#f5f7f7'
      }
    };
    ws.getRow(5).values = header;
    ws.columns.alignment = { horizontal: 'left' };
    ws.columns = headerData
    excelData.forEach(element => {
      ws.addRow(element)
    });
    footer.forEach(element => {
      const last = ws.addRow(element)
      last.font = { bold: true }
    });
    const buf = await wb.xlsx.writeBuffer()
    saveAs(new Blob([buf]), 'Rahul Jain-' + metaData + '-' + new Date() + '.xlsx')
  
  }
  constructor() { }
  
}
