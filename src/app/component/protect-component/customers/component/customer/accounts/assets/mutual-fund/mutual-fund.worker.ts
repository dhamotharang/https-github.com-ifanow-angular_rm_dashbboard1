/// <reference lib="webworker" />

// import {MfServiceService} from './mf-service.service';
import {TempserviceService} from './tempservice.service';

// importScripts('tempservice.service.ts');                 /* imports just "foo.js" */

addEventListener('message', ({data}) => {
  const response = `worker response to ${data}`;
  // console.log(`addEventListener got message:`, data);
  const mfService = new TempserviceService();
  const mutualFundList = data.mutualFundList;
  const totalValue = mfService.getFinalTotalValue(mutualFundList);
  const customDataSourceData = mfService.subCatArrayForSummary(mutualFundList,data.type,data.mutualFund);
  const output = {customDataSourceData ,totalValue};
  // console.log('Mutual fund script output: ', output);
  postMessage(output);
  // postMessage(response);
});
