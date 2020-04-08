import { AuthService } from 'src/app/auth-service/authService';
import { Injectable } from '@angular/core';
import * as Excel from 'exceljs';
import { saveAs } from 'file-saver';

@Injectable({
    providedIn: 'root'
})
export class ExcelMisService {

    constructor() { }

    static async exportExcel(headerData, header, excelData: any, footer: any[], metaData: any) {
        const wb = new Excel.Workbook();
        const ws = wb.addWorksheet();
        const meta1 = ws.getCell('A1');
        const meta2 = ws.getCell('A2');
        const meta3 = ws.getCell('A3');
        meta1.font = { bold: true };
        meta2.font = { bold: true };
        meta3.font = { bold: true };

        let userData = AuthService.getUserInfo();
        let username;
        if (userData.hasOwnProperty('fullName')) {
            username = userData.fullName;
        } else {
            username = userData.name;
        }

        ws.getCell('A1').value = 'Type of report - ' + metaData;
        ws.getCell('A2').value = `Client name - ` + username;
        ws.getCell('A3').value = 'Report as on - ' + new Date();

        const head = ws.getRow(5);
        head.font = { bold: true };

        ws.getRow(5).values = header;
        // ws.columns[0].style.alignment = {horizontal: 'left'};
        ws.columns = headerData;
        if (excelData && excelData.length !== 0) {
            excelData.forEach(element => {
                ws.addRow(element);
            });
        }
        footer.forEach(element => {
            const last = ws.addRow(element);
            last.font = { bold: true };
        });
        const buf = await wb.xlsx.writeBuffer();
        let name;
        if (userData.hasOwnProperty('fullName')) {
            name = userData.fullName;
        } else {
            name = userData.name;
        }
        saveAs(new Blob([buf]), name + '-' + metaData + '-' + new Date() + '.xlsx');
    }

    static async exportExcel2(arrayOfHeaders, arrayOfHeaderStyle, arrayOfExcelData, metaData, choice) {
        const wb = new Excel.Workbook();
        const ws = wb.addWorksheet();
        const meta1 = ws.getCell('A1');
        const meta2 = ws.getCell('A2');
        const meta3 = ws.getCell('A3');
        meta1.font = { bold: true };
        meta2.font = { bold: true };
        meta3.font = { bold: true };

        let userData = AuthService.getUserInfo();
        let username;
        if (userData.hasOwnProperty('fullName')) {
            username = userData.fullName;
        } else {
            username = userData.name;
        }

        ws.getCell('A1').value = 'Type of report - ' + metaData;
        ws.getCell('A2').value = `Client name - ` + username;
        ws.getCell('A3').value = 'Report as on - ' + new Date();

        const head = ws.getRow(5);
        head.font = { bold: true };


        console.log("this is what i got", arrayOfExcelData);

        // get a1


        let currentRowPos = 5;
        let headCell;

        if (choice === 'category-wise-aum-mis') {
            arrayOfExcelData.forEach((element, index1) => {
                if (index1 == 0) {
                    currentRowPos = 5;
                    ws.getRow(currentRowPos).values = arrayOfHeaders[0];
                    ws.columns = arrayOfHeaderStyle[0];
                    headCell = ws.getRow(currentRowPos);
                    headCell.font = { bold: true };
                } else {
                    ws.addRow(['', '', '', '']);
                    currentRowPos = currentRowPos + 2;
                    ws.getRow(currentRowPos).values = arrayOfHeaders[0];
                    ws.columns = arrayOfHeaderStyle[0];
                    headCell = ws.getRow(currentRowPos);
                    headCell.font = { bold: true };
                }
                ws.addRow([
                    element.index,
                    element.categoryName,
                    element.totalAum,
                    element.weightInPerc
                ]);
                if (element.subCatList.length !== 0) {
                    currentRowPos = currentRowPos + arrayOfExcelData.length + 1;
                    ws.getRow(currentRowPos).values = arrayOfHeaders[1];
                    ws.columns = arrayOfHeaderStyle[1];
                    headCell = ws.getRow(currentRowPos);
                    headCell.font = { bold: true };
                    element.subCatList.forEach((element, index2) => {
                        ws.addRow([
                            element.index,
                            element.name,
                            element.totalAum,
                            element.weightInPerc
                        ]);
                    });
                }

                if (element.schemeList.length !== 0) {
                    if (element.subCatList !== 0) {
                        currentRowPos = currentRowPos + element.subCatList.length + 1;
                    } else {
                        currentRowPos = currentRowPos + 2;
                    }

                    ws.getRow(currentRowPos).values = arrayOfHeaders[2];
                    ws.columns = arrayOfHeaderStyle[2];
                    headCell = ws.getRow(currentRowPos);
                    headCell.font = { bold: true };
                    element.schemeList.forEach(element => {
                        ws.addRow([
                            element.index,
                            element.name,
                            element.totalAum,
                            element.weightInPerc
                        ]);
                    });
                }
                if (element.applicantList.length !== 0) {
                    if (element.subCatList.length !== 0) {
                        currentRowPos = currentRowPos + element.subCatList.length + 1;
                    } else if (element.subCatList.length !== 0 && element.schemeList.length !== 0) {
                        currentRowPos = currentRowPos + element.subCatList.length + element.schemeList.length + 1;
                    } else {
                        currentRowPos = currentRowPos + 2;
                    }

                    ws.getRow(currentRowPos).values = arrayOfHeaders[3];
                    ws.columns = arrayOfHeaderStyle[3];
                    headCell = ws.getRow(currentRowPos);
                    headCell.font = { bold: true };

                    element.applicantList.forEach(element => {
                        ws.addRow([
                            element.name,
                            element.balanceUnit,
                            element.folioNumber,
                            element.totalAum,
                            element.weightInPerc
                        ]);
                    });
                }

            });
        }

        if (choice === 'amc-wise-aum-mis') {
            arrayOfExcelData.forEach((element, index1) => {
                if (index1 == 0) {
                    currentRowPos = 5;
                    ws.getRow(currentRowPos).values = arrayOfHeaders[0];
                    ws.columns = arrayOfHeaderStyle[0];
                    headCell = ws.getRow(currentRowPos);
                    headCell.font = { bold: true };
                } else {
                    currentRowPos = currentRowPos + 2;
                    ws.getRow(currentRowPos).values = arrayOfHeaders[0];
                    ws.columns = arrayOfHeaderStyle[0];
                    headCell = ws.getRow(currentRowPos);
                    headCell.font = { bold: true };
                }
                ws.addRow([
                    element.index,
                    element.name,
                    element.totalAum,
                    element.weightInPerc
                ]);
                if (element.schemeList.length !== 0) {
                    currentRowPos = currentRowPos + arrayOfExcelData.length + 1;
                    ws.getRow(currentRowPos).values = arrayOfHeaders[1];
                    ws.columns = arrayOfHeaderStyle[1];
                    headCell = ws.getRow(currentRowPos);
                    headCell.font = { bold: true };
                    element.schemeList.forEach((element, index2) => {
                        ws.addRow([
                            element.index,
                            element.name,
                            element.totalAum,
                            element.weightInPerc
                        ]);
                    });
                }

                if (element.applicantList.length !== 0) {
                    if (element.applicantList !== 0) {
                        currentRowPos = currentRowPos + element.applicantList.length + 1;
                    } else {
                        currentRowPos = currentRowPos + 2;
                    }

                    ws.getRow(currentRowPos).values = arrayOfHeaders[2];
                    ws.columns = arrayOfHeaderStyle[2];
                    headCell = ws.getRow(currentRowPos);
                    headCell.font = { bold: true };
                    element.applicantList.forEach(element => {
                        ws.addRow([
                            element.name,
                            element.balanceUnit,
                            element.folioNumber,
                            element.totalAum,
                            element.weightInPerc
                        ]);
                    });
                }
            });
        }

        if (choice === 'client-wise-aum-mis') {
            arrayOfExcelData.forEach((element, index1) => {
                if (index1 == 0) {
                    currentRowPos = 5;
                    ws.getRow(currentRowPos).values = arrayOfHeaders[0];
                    ws.columns = arrayOfHeaderStyle[0];
                    headCell = ws.getRow(currentRowPos);
                    headCell.font = { bold: true };
                } else {
                    currentRowPos = currentRowPos + 2;
                    ws.getRow(currentRowPos).values = arrayOfHeaders[0];
                    ws.columns = arrayOfHeaderStyle[0];
                    headCell = ws.getRow(currentRowPos);
                    headCell.font = { bold: true };
                }
                ws.addRow([
                    element.index,
                    element.name,
                    element.totalAum,
                    element.weightInPerc
                ]);
                if (element.investorList.length !== 0) {
                    currentRowPos = currentRowPos + arrayOfExcelData.length + 1;
                    ws.getRow(currentRowPos).values = arrayOfHeaders[1];
                    ws.columns = arrayOfHeaderStyle[1];
                    headCell = ws.getRow(currentRowPos);
                    headCell.font = { bold: true };
                    element.investorList.forEach((element, index2) => {
                        ws.addRow([
                            element.index,
                            element.name,
                            element.totalAum,
                            element.weightInPerc
                        ]);
                    });
                }

                if (element.schemeList.length !== 0) {
                    if (element.investorList !== 0) {
                        currentRowPos = currentRowPos + element.investorList.length + 1;
                    } else {
                        currentRowPos = currentRowPos + 2;
                    }

                    ws.getRow(currentRowPos).values = arrayOfHeaders[2];
                    ws.columns = arrayOfHeaderStyle[2];
                    headCell = ws.getRow(currentRowPos);
                    headCell.font = { bold: true };
                    element.schemeList.forEach(element => {
                        ws.addRow([
                            element.index,
                            element.name,
                            element.totalAum,
                            element.weightInPerc
                        ]);
                    });
                }
                if (element.schemeFolioList.length !== 0) {
                    if (element.investorList.length !== 0) {
                        currentRowPos = currentRowPos + element.investorList.length + 1;
                    } else if (element.investorList.length !== 0 && element.schemeList.length !== 0) {
                        currentRowPos = currentRowPos + element.investorList.length + element.schemeList.length + 1;
                    } else {
                        currentRowPos = currentRowPos + 2;
                    }

                    ws.getRow(currentRowPos).values = arrayOfHeaders[3];
                    ws.columns = arrayOfHeaderStyle[3];
                    headCell = ws.getRow(currentRowPos);
                    headCell.font = { bold: true };

                    element.schemeFolioList.forEach(element => {
                        ws.addRow([
                            element.index,
                            element.name,
                            element.folioNumber,
                            element.totalAum,
                            element.balanceUnit,
                            element.weightInPerc
                        ]);
                    });
                }

            });
        }

        if (choice === 'applicant-wise-aum-mis') {
            arrayOfExcelData.forEach((element, index1) => {
                if (index1 == 0) {
                    currentRowPos = 5;
                    ws.getRow(currentRowPos).values = arrayOfHeaders[0];
                    ws.columns = arrayOfHeaderStyle[0];
                    headCell = ws.getRow(currentRowPos);
                    headCell.font = { bold: true };
                } else {
                    currentRowPos = currentRowPos + 2;
                    ws.getRow(currentRowPos).values = arrayOfHeaders[0];
                    ws.columns = arrayOfHeaderStyle[0];
                    headCell = ws.getRow(currentRowPos);
                    headCell.font = { bold: true };
                }
                ws.addRow([
                    element.index,
                    element.name,
                    element.totalAum,
                    element.weightInPerc
                ]);
                if (element.categoryList.length !== 0) {
                    currentRowPos = currentRowPos + arrayOfExcelData.length + 1;
                    ws.getRow(currentRowPos).values = arrayOfHeaders[1];
                    ws.columns = arrayOfHeaderStyle[1];
                    headCell = ws.getRow(currentRowPos);
                    headCell.font = { bold: true };
                    element.categoryList.forEach((element, index2) => {
                        ws.addRow([
                            element.index,
                            element.name,
                            element.totalAum,
                            element.weightInPerc
                        ]);
                    });
                }

                if (element.subCategoryList.length !== 0) {
                    if (element.categoryList !== 0) {
                        currentRowPos = currentRowPos + element.categoryList.length + 1;
                    } else {
                        currentRowPos = currentRowPos + 2;
                    }

                    ws.getRow(currentRowPos).values = arrayOfHeaders[2];
                    ws.columns = arrayOfHeaderStyle[2];
                    headCell = ws.getRow(currentRowPos);
                    headCell.font = { bold: true };
                    element.subCategoryList.forEach(element => {
                        ws.addRow([
                            element.index,
                            element.name,
                            element.totalAum,
                            element.weightInPerc
                        ]);
                    });
                }
                if (element.schemeList.length !== 0) {
                    if (element.categoryList.length !== 0) {
                        currentRowPos = currentRowPos + element.categoryList.length + 1;
                    } else if (element.categoryList.length !== 0 && element.subCategoryList.length !== 0) {
                        currentRowPos = currentRowPos + element.categoryList.length + element.subCategoryList.length + 1;
                    } else {
                        currentRowPos = currentRowPos + 2;
                    }

                    ws.getRow(currentRowPos).values = arrayOfHeaders[3];
                    ws.columns = arrayOfHeaderStyle[3];
                    headCell = ws.getRow(currentRowPos);
                    headCell.font = { bold: true };

                    element.schemeList.forEach(element => {
                        ws.addRow([
                            element.index,
                            element.name,
                            element.folioNumber,
                            element.totalAum,
                            element.weightInPerc
                        ]);
                    });
                }

                if (element.schemeFolioList.length !== 0) {
                    if (element.categoryList.length !== 0) {
                        currentRowPos = currentRowPos + element.categoryList.length + 1;
                    } else if (element.categoryList.length !== 0 && element.subCategoryList.length !== 0) {
                        currentRowPos = currentRowPos + element.categoryList.length + element.subCategoryList.length + 1;
                    } else if (element.categoryList.length !== 0 && element.subCategoryList.length !== 0 && element.schemeList.length !== 0) {
                        currentRowPos = currentRowPos + element.categoryList.length + element.subCategoryList.length + element.schemeList.length + 1;
                    } else {
                        currentRowPos = currentRowPos + 2;
                    }

                    ws.getRow(currentRowPos).values = arrayOfHeaders[4];
                    ws.columns = arrayOfHeaderStyle[4];
                    headCell = ws.getRow(currentRowPos);
                    headCell.font = { bold: true };

                    element.schemeFolioList.forEach(element => {
                        ws.addRow([
                            element.index,
                            element.name,
                            element.folioNumber,
                            element.totalAum,
                            element.balanceUnit,
                            element.weightInPerc
                        ]);
                    });
                }
            });
        }


        // arrayOfExcelData[0].forEach(element => {
        //     ws.addRow(element);
        // });

        // let currentRowPos = arrayOfExcelData[0].length + 5 + 1;

        // ws.getRow(currentRowPos).values = arrayOfHeaders[1];
        // let head1 = ws.getRow(currentRowPos);
        // head1.font = { bold: true };

        // if (arrayOfExcelData[1] && arrayOfExcelData[1].length !== 0) {
        //     ws.columns = arrayOfHeaderStyle[1];
        //     arrayOfExcelData[1].forEach(element => {
        //         ws.addRow(element);
        //     });
        // } else {
        //     ws.addRow(['', 'No Data Found', '', '']);
        //     currentRowPos = currentRowPos + 1;
        // }

        // if (arrayOfExcelData[1] && arrayOfExcelData[1].length !== 0 && arrayOfHeaders[2]) {
        //     currentRowPos = currentRowPos + arrayOfExcelData[1].length + 1;
        //     ws.getRow(currentRowPos).values = arrayOfHeaders[2];
        //     let head2 = ws.getRow(currentRowPos);
        //     head2.font = { bold: true };
        // } else if (arrayOfHeaders[2] && arrayOfExcelData[1]) {
        //     currentRowPos = currentRowPos + arrayOfExcelData[1].length + 1;
        //     ws.getRow(currentRowPos).values = arrayOfHeaders[2];
        //     let head2 = ws.getRow(currentRowPos);
        //     head2.font = { bold: true };

        // }

        // if (arrayOfExcelData[2] && arrayOfExcelData[2].length !== 0) {
        //     ws.columns = arrayOfHeaderStyle[2];
        //     arrayOfExcelData[2].forEach(element => {
        //         ws.addRow(element);
        //     });
        // } else {
        //     ws.addRow(['', 'No Data Found', '', '']);
        //     currentRowPos = currentRowPos + 1;
        // }

        // if (arrayOfExcelData[2] && arrayOfExcelData[2].length !== 0 && arrayOfHeaders[3]) {
        //     currentRowPos = currentRowPos + arrayOfExcelData[2].length + 1;
        //     ws.getRow(currentRowPos).values = arrayOfHeaders[3];
        //     let head3 = ws.getRow(currentRowPos);

        //     head3.font = { bold: true };
        // } else if (arrayOfHeaders[3] && arrayOfExcelData[2]) {
        //     currentRowPos = currentRowPos + arrayOfExcelData[2].length + 1;
        //     ws.getRow(currentRowPos).values = arrayOfHeaders[3];
        //     let head3 = ws.getRow(currentRowPos);

        //     head3.font = { bold: true };
        // }

        // if (arrayOfExcelData[3] && arrayOfExcelData[3].length !== 0 && arrayOfHeaderStyle[3]) {
        //     ws.columns = arrayOfHeaderStyle[3];
        //     arrayOfExcelData[3].forEach(element => {
        //         ws.addRow(element);
        //     });
        // } else {
        //     ws.addRow(['', 'No data found', '', '', '']);
        //     currentRowPos = currentRowPos + 1;
        // }

        // if (arrayOfExcelData[3] && arrayOfExcelData[3].length !== 0 && arrayOfHeaders[4]) {
        //     console.log("hellow im here:", arrayOfHeaders[4]);
        //     currentRowPos = currentRowPos + arrayOfExcelData[3].length + 1;
        //     ws.getRow(currentRowPos).values = arrayOfHeaders[4];
        //     let head3 = ws.getRow(currentRowPos);
        //     head3.font = { bold: true };
        // } else if (arrayOfHeaders[4] && arrayOfExcelData[3]) {
        //     currentRowPos = currentRowPos + arrayOfExcelData[3].length + 1;
        //     ws.getRow(currentRowPos).values = arrayOfHeaders[4];
        //     let head3 = ws.getRow(currentRowPos);
        //     head3.font = { bold: true };
        // }

        // if (arrayOfExcelData[4] && arrayOfExcelData[4].length !== 0 && arrayOfHeaderStyle[4]) {
        //     ws.columns = arrayOfHeaderStyle[4];
        //     arrayOfExcelData[4].forEach(element => {
        //         ws.addRow(element);
        //     });
        // }

        // values forloop

        // insert another header1 data
        // header1Styles styles
        // values1 forloop
        // check for selectedSchemeName
        // if schemeName present
        // header for schemeName
        // values for schemeName
        // else 
        // continue

        // insert another header2 data
        // ehader2 styles
        // values2 forloop
        // check for selectedSchemeName
        // if schemeName present
        // header for schemeName
        // values for schemeName
        // else 
        // continue
        const buf = await wb.xlsx.writeBuffer();
        let name;
        if (userData.hasOwnProperty('fullName')) {
            name = userData.fullName;
        } else {
            name = userData.name;
        }
        saveAs(new Blob([buf]), name + '-' + metaData + '-' + new Date() + '.xlsx');

    }



}