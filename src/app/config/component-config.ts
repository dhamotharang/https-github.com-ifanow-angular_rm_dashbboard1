export const appConfig = {
  LOGIN: 'secure/login',
  FILE_GET: '/file/list/get',
  RT_FILE_GET: 'file/rt/list/get',


  ////////////////////////////get///////////////////////////
  TOTAL_GET_AUM: 'backoffice/clientTotalAum/get',
  GET_MIS_DATA: 'backoffice/mis/get',
  GET_SUBCAT_AUM: 'backoffice/cat/subcat/get',
  GET_SUBCAT_SCHEMENAME: 'backoffice/cat/subcat/scheme',
  GET_TOTAL_SCHEME_AUM: 'asset/schemeTotalAum/get',
  GET_TOTAL_AUM_BY_SCHEME: 'asset/schemeTotalAum/get',
  GET_CLIENT_WISE_TOTALAUM: 'asset/report/client/totalaum/get',
  GET_SIP_COUNT_GET: 'backoffice/sip/count/get',
  GET_AUM_APPLICANT: 'backoffice/aum/applicantWise/totalaum/applicantName/get',
  GET_AUM_APPLICANT_CATEGORY: 'backoffice/aum/applicantWise/totalaum/applicantsAllCategory/get',
  GET_AUM_APPLICANT_SUB_CATEGORY: 'backoffice/aum/applicantWise/totalaum/applicantSubCategory/get',
  GET_AUM_APPLICANT_SCHEME: 'backoffice/aum/applicantWise/totalaum/applicantSchemes/get',
  GET_AUM_CLIENT_TOTALAUM: 'backoffice/aum/client/totalaum/get',
  GET_AUM_FAMILY_MEMBER: 'backoffice/aum/client/familymember',
  GET_AUM_FAMILY_SCHEME: 'backoffice/aum/client/familymember/scheme',
  GET_AUM_FAMILY_SCHEME_FOLIO: 'backoffice/aum/client/familymember/scheme/folio',
  GET_AUM_CLIENT_SCHEME: 'backoffice/aum/client/schemes',
  GET_CLIENT_FOLIO_WISE: 'asset/cat/subcat/schemeName/clientFolioWise',
  GET_AMC_WISE: 'backoffice/mis/aum/amcWise/get',
  GET_APPLICANT_NAME: 'backoffice/mis/aum/amcWise/applicantName/get',
  ADVISOR_TAG_GET: '/advisor/tag/get',



  /////////////////////// sip api call//////////////////////////////////

  GET_EXPIRING: 'backoffice/sip/expiring/get',
  GET_expired: 'backoffice/sip/expired/get',
  GET_SIP_REJECTION: 'backoffice/sip/sipRejection/get',
  GET_SIP_client_SEARCH: 'backoffice/sip/client/search/get',
  GET_SIP_SCHEME_SEARCH: 'backoffice/sip/scheme/search/get',

  GET_SIP_AMC: 'backoffice/sip/amc/get',
  GET_SIP_AMC_SCHEME: 'backoffice/sip/amc/scheme/get',
  GET_SIP_INVERSTORS: 'backoffice/sip/scheme/investors/get',
  Scheme_Investors_Applicants: 'backoffice/sip/scheme/investors/applicants/get',
  Sip_Schemewise_Get: 'backoffice/sip/schemewise/get',
  Scheme_Wise_Investor_Get: 'backoffice/sip/schemewiseInvestor/get',
  scheme_wise_Applicants_Get: 'backoffice/sip/schemewiseApplicants/get',
  ALL_SIP_GET: 'backoffice/sip/allSip/get',
  CLIENT_WISE_CLIENTNAME_GET: 'backoffice/sip/ClientWiseClientsName/get',
  CLIENT_WISE_APPLICANT_GET: 'backoffice/sip/ClientWiseApplicants/get',
  SIP_PAN_COUNT: 'backoffice/sip/scheme/pan/count/get',
  WBR_FOLIO_PAN_COUNT: 'backoffice/folio/pan/count/get',

  ///////////////////////////// back office/////////////////////////////////////////////

  AllClient_get: 'asset/allClient/get',
  AllClient_ByName_get: 'asset/allClient/ByName/get',
  AllClient_ByTags_get: 'asset/allClient/ByTags/get',
  Update_expiryDate: 'asset/update/expiryDate',
  Update_Password: 'asset/update/password',
  Fileorder_Status_Report_Get: 'asset/fileorder/status/report/get',

  /////////////////////////////Accounts///////////////////////////////////
  ADD_FIXEDDEPOSIT: 'account/asset/fixed-income/fixed-deposit/add',
  ADD_LIFE_INSURANCE: 'account/insurance/life-insurance/add',
  GET_LIFE_INSURANCE: 'account/insurance/list/get',
  GET_GLOBAL_INSURANCE: 'account/insurance/global-list/get',
  EDIT_LIFE_INSURANCE: 'account/insurance/life-insurance/edit',
  GET_INSURANCE_GLOBAL_API: 'account/insurance/global/get',
  ADD_LIABILITY: 'account/liability/loan/add',
  GET_LIABILITY: 'account/liability/loan/list/get',
  EDIT_LIABILITY: 'account/liability/loan/edit',
  EDIT_FIXEDDEPOSIT: 'account/asset/fixed-income/fixed-deposit/edit',
  GET_LIST_FAMILY_MEMBER: 'account/income/family-members/get',
  GET_FIXEDDEPOSIT: 'account/asset/fixed-income/fixed-deposit/get',
  GET_RECURING_DEPOSIT: 'account/asset/fixed-income/recurring-deposit/list/get',
  GET_BONDS: 'account/asset/fixed-income/bond/list/get',
  ADD_RECURRING_DEPOSIT: 'account/asset/fixed-income/recurring-deposit/add',
  ADD_BOND: 'account/asset/fixed-income/bond/add',
  EDIT_RECURRING_DEPOSIT: 'account/asset/fixed-income/recurring-deposit/edit',
  EDIT_BONDS: 'account/asset/fixed-income/bond/edit',
  GET_GLOBAl: 'account/asset/nps/global-data/get',
  GET_BANK_ACCOUNTS: 'account/asset/bank-account/list/get',
  ADD_BANK_ACCOUNTS: 'account/asset/bank-account/add',
  EDIT_BANK_ACCOUNTS: 'account/asset/bank-account/edit',
  GET_CASH_IN_HAND: 'account/asset/cash-in-hand/list/get',
  ADD_CASH_IN_HAND: 'account/asset/cash-in-hand/add',
  EDIT_CASH_IN_HAND: 'account/asset/cash-in-hand/edit',
  GET_GOLD: 'account/asset/commodity/gold/list/get',
  ADD_GOLD: 'account/asset/commodity/gold/add',
  EDIT_GOLD: 'account/asset/commodity/gold/edit',
  GET_OTHERS: 'account/asset/commodity/other/list/get',
  ADD_OTHERS: 'account/asset/commodity/other/add',
  EDIT_OTHERS: 'account/asset/commodity/other/edit',
  GET_ASSET_SMALL_SAVING_SCHEME_PPF: 'account/asset/ssc/ppf/list/get',
  GET_ASSET_SMALL_SAVING_SCHEME_NSC: 'account/asset/ssc/nsc/list/get',
  GET_ASSET_SMALL_SAVING_SCHEME_SSY: 'account/asset/ssc/ssy/list/get',
  GET_ASSET_SMALL_SAVING_SCHEME_KVP: 'account/asset/ssc/kvp/list/get',
  GET_ASSET_SMALL_SAVING_SCHEME_SCSS: 'account/asset/ssc/scss/list/get',
  GET_ASSET_SMALL_SAVING_SCHEME_POSAVING: 'account/asset/saving-scheme/po-saving/list/get',
  GET_ASSET_SMALL_SAVING_SCHEME_PO_RD: 'account/asset/ssc/pord/list/get',
  GET_ASSET_SMALL_SAVING_SCHEME_PO_TD: 'account/asset/ssc/po-td/list/get',
  GET_ASSET_SMALL_SAVING_SCHEME_PO_MIS: 'account/asset/ssc/po-mis/list/get',
  ADD_OTHER_PAYABLES: 'account/liability/otherpayables/add',
  EDIT_OTHER_PAYABLES: 'account/liability/otherpayables/edit',
  ADD_REAL_ESTATE: 'account/asset/real-estate/add',
  EDIT_REAL_ESTATE: 'account/asset/real-estate/edit',
  ADD_PPF_SCHEME: 'account/asset/saving-scheme/ppf/add',
  ADD_NSC_SCHEME: 'account/asset/saving-scheme/nsc/add',
  ADD_SSY_SCHEME: 'account/asset/saving-scheme/ssy/add',
  ADD_SCSS_SCHEME: 'account/asset/saving-scheme/scss/add',
  ADD_PO_SAVING: 'account/asset/saving-scheme/po-saving/add',
  ADD_PO_RD_SCHEME: 'account/asset/saving-scheme/pord/add',
  EDIT_NSC_SCHEME: 'account/asset/saving-scheme/nsc/edit',
  EDIT_SSY_SCHEME: 'account/asset/saving-scheme/ssy/edit',
  EDIT_SCSS_SCHEME: 'account/asset/saving-scheme/scss/edit',
  EDIT_POSAVING_SCHEME: 'account/asset/saving-scheme/po-saving/edit',
  ADD_POMIS: 'account/asset/saving-scheme/pomis/add',
  EDIT_POMIS: 'account/asset/saving-scheme/pomis/edit',
  EDIT_PPF_SCHEME: 'account/asset/saving-scheme/ppf/edit',
  ADD_KVP_SCHEME: 'account/asset/saving-scheme/kvp/add',
  EDIT_KVP_SCHEME: 'account/asset/saving-scheme/kvp/edit',
  EDIT_PORD_SCHEME: 'account/asset/saving-scheme/pord/edit',
  ADD_POTD_SCHEME: 'account/asset/saving-scheme/potd/add',
  EDIT_POTD_SCHEME: 'account/asset/saving-scheme/potd/edit',
  GET_ASSET_COUNT_GLOBAL_DATA: 'account/asset/count/list',
  DELETE_PPF_SCHEME: 'account/asset/saving-scheme/ppf/delete',
  DELETE_NSC_SCHEME: 'account/asset/saving-scheme/nsc/delete',
  DELETE_SSY_SCHEME: 'account/asset/saving-scheme/ssy/delete',
  DELETE_KVP_SCHEME: 'account/asset/saving-scheme/kvp/delete',
  DELETE_SCSS_SCHEME: 'account/asset/saving-scheme/scss/delete',
  DELETE_POSAVING_SCHEME: 'account/asset/saving-scheme/po-saving/delete',
  DELETE_PORD_SCHEME: 'account/asset/saving-scheme/pord/delete',
  DELETE_POTD_SCHEME: 'account/asset/saving-scheme/potd/delete',
  DELETE_POMIS_SCHEME: 'account/asset/saving-scheme/pomis/delete',
  GET_POLICY_NAME: 'account/insurance/policy-list/get',
  DELETE_INSURANCE: 'account/insurance/life-insurance/delete',
  DELETE_REAL_ESTATE: 'account/asset/real-estate/delete',
  DELETE_OTHER_PAYABLES: 'account/liability/otherpayables/delete',
  DELETE_LIABILITIES: '/account/liability/loan/delete',
  GET_ALL_FILES: 'document/account/document/all-file/get',
  DOWNLOAD_FILE: 'document/account/document/all-file/file/get',
  DELETE_FILE: 'document/account/document/all-file/file/trash',
  MOVE_FILES: 'document/account/document/all-file/file/move',
  MOVE_FOLDER: 'document/account/document/all-file/folder/move',
  COPY_FILES: 'document/account/document/all-file/file/copy',
  RENAME_FILE: 'document/account/document/all-file/file/rename',
  RENAME_FOLDER: 'document/account/document/all-file/folder/rename',
  DELETE_FOLDER: 'document/account/document/all-file/folder/trash',
  SEARCH_FILE: 'document/account/document/all-file/search',
  STAR_FILE: 'document/document/all-file/star',
  VIEW_ACTIVITY_FILE: 'document/account/document/all-file/file/view-activity/get',
  VIEW_ACTIVITY_FOLDER: 'document/account/document/all-file/folder/view-activity/get',
  DELETE_FIXED_DEPOSITE: 'account/asset/fixed-income/fixed-deposit/delete',
  DELETE_RECURRING_DEPOSITE: 'account/asset/fixed-income/recurring-deposit/delete',
  DELETE_BOND: 'account/asset/fixed-income/bond/delete',
  DELETE_EPF: 'account/asset/retirement/epf/delete',
  DELETE_NPS: 'account/asset/retirement/nps/delete',
  DELETE_GRATUITY: 'account/asset/retirement/gratuity/delete',
  DELETE_SUPERANNUATION: 'account/asset/retirement/superannuation/delete',
  DELETE_EPS: 'account/asset/retirement/eps/delete',
  DELETE_BANKACCOUNT: 'account/asset/bank-account/delete',
  DELETE_CASHINHAND: 'account/asset/cash-in-hand/delete',
  DELETE_GOLD: 'account/asset/commodity/gold/delete',
  DELETE_OTHERS: 'account/asset/commodity/other/delete',
  GLOBAL_LIABILITIES: 'account/liability/global/get',
  UPLOAD_FILE: 'document/account/document/all-file/file/put',
  CLIENT_UPLOAD_FILE: 'document/upload/pre-signed-url/get',
  SAVE_CLIENT_UPLOAD_FILE: 'user/document/mapping/save',
  GET_CLIENT_UPLOAD_FILE: 'user/document/mapping/get',
  NEW_FOLDER: 'document/account/document/all-file/folder/post',
  GET_ASSET_STOCK: 'account/asset/stock/list/get',
  ADD_ASSET_STOCK: 'account/asset/stock/add',
  GET_PORTFOLIO_LIST: 'account/asset/stock/portfolio-list/get',
  GET_SCRIP_lIST: 'account/asset/stock/scrip-name/get',
  ADD_PORTFOLIO: 'account/asset/stock/portfolio/add',
  DELETE_STOCK: 'account/asset/stock/delete',
  EDIT_STOCK_PORTFOLIO: 'account/asset/stock/portfolio/edit',
  ADD_SCRIP: 'account/asset/stock/scrip-name/add',
  EDIT_SCRIP_HOLDING_TRANSACTION: 'account/asset/stock/holding/transaction/edit',
  MUTUAL_FUND_GET: 'mutual-fund/mutualfund/list/get',
  FOLIO_MASTER_DETAILS: 'mutual-fund/folioMasterDetails/list/get',
  SIP_DETAILS: 'mutual-fund/sipDetails/list/get',
  ////////////////////////////////plan////////////////////////////
  GET_RISK_PROFILE: 'plan/risk-assessment/get',
  SUBMIT_RISK: 'plan/risk-assessment/add',
  GET_GLOBAL_GOAL_DATA: 'goal-planning/goal/global-data/get',
  ADD_RETIREMENT_GOAL: '',
  ADD_HOUSE_GOAL: 'goal-planning/house/goal/add',
  ADD_CAR_GOAL: 'goal-planning/car/goal/add',
  ADD_MARRIAGE_GOAL: 'goal-planning/marriage/goal/add',
  ADD_VACATION_GOAL: '',
  ADD_EDUCATION_GOAL: '',
  ADD_EMERGENCY_GOAL: 'goal-planning/emergency/goal/add',
  ADD_WEALTH_CREATION_GOAL: 'goal-planning/wealth-creation/goal/add',
  ADD_BIGSPEND_GOAL: 'goal-planning/big-spend/goal/add',
  ADD_OTHERS_GOAL: 'goal-planning/others/goal/add',
  GET_TRANSACTION_EXPENSE: 'account/expense/transaction/list/get',
  ADD_EXPENSE: 'account/expense/transaction/add',
  EDIT_EXPENSE: 'account/expense/transaction/edit',
  RISK_HISTORY: 'plan/risk-assessment/history/get',
  RESULT_VIEW: 'plan/risk-assessment-result/get',
  RECURING_EXPENSE_ADD: 'account/expense/recurring/expense/add',
  RECURING_EXPENSE_GET: 'account/expense/recurring/expense/list/get',
  RECURING_EXPENSE_EDIT: 'account/expense/recurring/expense/edit',
  GET_BUDGETS: 'account/expense/budget/list/get',
  ADD_BUDGET: 'account/expense/budget/add',
  EDIT_BUDGET: 'account/expense/budget/edit',
  OTHERCOMMITMENTS_ADD: 'account/expense/othercommitments/add',
  OTHERCOMMITMENTS_EDIT: 'account/expense/othercommitments/edit',
  OTHERCOMMITMENTS_GET: 'account/expense/othercommitments/get',
  DELETE_TRANSACTION_EXPENSE: 'account/expense/transaction/delete',
  DELETE_RECURRING_EXPENSE: 'account/expense/recurring/expense/delete',
  DELETE_BUDGET: 'account/expense/budget/delete',
  DELETE_RECURING_BUDGET: 'account/expense/othercommitments/delete',
  ADD_MANAGE_EXCLUSIVE: '/activity/deployment/exclusion/edit',
  DELETE_DEPLOYMENT: '/activity/deployment/archive-record/put',
  ADD_FILTER_SCHEME_LIST: '/activity/deployment/add/filter/goal/scheme',
  GET_DEPLOYMENT_DETAILS: '/activity/deployment/combined/deployment/detail/get',
  ADD_PURCHASE_SCHEME: '/activity/deployment/purchase/scheme/post',
  GET_MUTUAL_FUND_SCHEME: '/activity/deployment/scheme/get',
  GET_ALL_ASSETS: 'goal-planning/static-allocation/get',
  GET_ALL_GOALS: 'goal-planning/goal/list/get',
  DELETE_GOAL: 'goal-planning/goal/delete',
  ////////////////////////////// subscription////////////////////////////////////////////
  GET_REAL_ESTATE: 'account/asset/real-estate/get',
  GET_EPF: 'account/asset/retirement/epf/list/get',
  ADD_EPF: 'account/asset/retirement/epf/add',
  EDIT_EPF: 'account/asset/retirement/epf/edit',
  GET_NPS: 'account/asset/retirement/nps/list/get',
  ADD_NPS: 'account/asset/retirement/nps/add',
  EDIT_NPS: 'account/asset/retirement/nps/edit',
  GET_GRATUITY: 'account/asset/retirement/gratuity/list/get',
  ADD_GRATUITY: 'account/asset/retirement/gratuity/add',
  EDIT_GRATUITY: 'account/asset/retirement/gratuity/edit',
  GET_SUPERANNUATION: 'account/asset/retirement/superannuation/list/get',
  ADD_SUPERANNUATION: 'account/asset/retirement/superannuation/add',
  EDIT_SUPERANNUATION: 'account/asset/retirement/superannuation/edit',
  GET_EPS: 'account/asset/retirement/eps/list/get',
  ADD_EPS: 'account/asset/retirement/eps/add',
  EDIT_EPS: 'account/asset/retirement/eps/edit',
  OTHER_PAYABLES: 'account/liability/otherpayables/get',


  ////////////////////////////// subscription////////////////////////////////////////////


  GET_SUBSCRIPTION_INVOICE: 'subscription/invoice/get',
  // GET_SINGLE_INVOICE:'subscription/invoice/get',
  GET_PREFERENCE_BILLER_PROFILE: 'subscription/billerprofile/get',
  GET_PREFERENCE_INVOICE_QUOTATIONS_SUBSCRIPTION: 'subscription/setting/prefix/get',
  UPDATE_PREFERENCE_INVOICE_QUOTATIONS_SUBSCRIPTION: 'subscription/setting/prefix/update',
  PREFERENCE_INVOICE_QUOTATIONS_SUBSCRIPTION_SAVE: 'subscription/setting/prefix/save',
  SAVE_PREFERENCE_INVOICE_QUOTATIONS_SUBSCRIPTION: 'subscription/setting/billerprofile/save',
  DASHBOARD_LETS_BEGIN_SUBSCRIPTION: 'subscription/dashboard/record/payment/add',
  GET_CLIENT_SUBSCRIPTION_LIST: 'subscription/client/get',
  GET_CLIENT_SUBSCRIPTION_QUOTATIONS_LIST: 'subscription/client/quotation/get',
  GET_CLIENT_SUBSCRIPTION_INVOICES_LIST: 'subscription/client/invoice/get',
  GET_CLIENT_SUBSCRIPTION_SETTING_PROFILE: 'subscription/client/setting/profile/get',
  GET_SUBSCRIPTION_QUOTATIONS: 'subscription/quotation/get',
  UPDATE_SUBSCRIPTION_QUOTATIONS: 'subscription/quotation/edit',
  GET_SUBSCRIPTION_SUBSCRIPTION: 'subscription/subscription/get',
  GET_SUBSCRIPTION_PLAN_SERVICE: 'subscription/setting/plan-services/get',
  ADD_SETTING_PLAN_OVERVIEW: 'subscription/plan/add',
  MAP_SERVICE_TO_PLAN: 'subscription/setting/plan/mapservice',
  MAP_DOCUMENTS_TO_PLAN: 'subscription/setting/plan/map/document',
  GET_PLAN_DOCUMENTS_DATA: 'subscription/setting/plan-admindocument/get',
  GET_DOCUMENT_COUNT_SIGNED: 'subscription/document/analytics/get',
  GET_CLIENT_WITH_SCRIPTION: 'subscription/analytics/get',
  GET_INVOICE_TO_BE_REVIEWED: 'subscription/invoice/review/get',
  GET_SUB_SUMMARY: 'subscription/dashboard/summary/get',
  FILTER_SUBCRIPTION: 'subscription/subscription/filtered/get',
  FILTER_INVOICES: 'subscription/invoice/get',
  DASHBOARD_SUBSCRIPTION_LETS_BEGIN: 'subscription/lets-begin/get',
  CANCEL_SUBSCRIPTION: 'subscription/cancelled/subscription/update',
  DELETE_SUBSCRIPTION: 'subscription/subscription/deleted/update',
  DELETE_CLIENT_PROFILE_FROM_SUBSCRIPTION_SETTING: 'subscription/setting/clientbillerprofile/delete',
  SAVE_BILLER_PROFILE_SETTING: 'subscription/setting/billerprofile/save',
  UPDATE_BILLER_PROFILE_SETTING: 'subscription/setting/billerprofile/update',
  GET_SUBSCRIPTION_PLAN_SETTING: 'subscription/setting/plan/get',
  GET_SUBSCRIPTION_SERVICE_SETTING: 'subscription/setting/service/get',
  CREATE_SERVICE_SETTING: 'subscription/service/create',
  EDIT_SERVICE_SETTING: 'subscription/service/edit',
  DELETE_SUBSCRIPTION_PLAN: 'subscription/plan/delete',
  GET_PLAN_MAPPED_TO_ADVISOR: 'subscription/plan/mapped-to/advisor/get',
  GET_SUBSCRIPTION_DOCUMENTS_SETTING: 'subscription/setting/document/get',
  GET_MAP_DOCUMENT_To_SERVICE: 'subscription/mapped/document/service/get',
  ADD_CLIENT_BILLER_PROFILE: 'subscription/client/biller/profile/add',
  ADD_SETTING_DOCUMENT: 'subscription/document/add',
  GET_PLAN_OF_ADVISOR_CLIENT: 'subscription/plans/of/advisor/get',
  GET_PLAN_INVOICE: 'subscription/invoice/get',
  CREATE_SUBSCRIPTION: 'subscription/client/subscription/add',
  EDIT_PAYEE_SETTINGS: 'subscription/client/setting/profile/update',
  MAP_PLAN_TO_SERVICE_SETTING: 'subscription/map/plan/service',
  UPDATE_INVOICE: 'subscription/invoice/edit',
  CHANGE_PAYEE_SETTING: 'subscription/client-biller/setting/subscription/update',
  CHANGE_SUBSCRIPTION_DETAILS: 'subscription/subscription/edit',
  CHANGE_BILLER_SETTING: 'subscription/change/biller-setting/subscription',
  EDIT_PLAN_SETTING: 'subscription/plan/edit',
  GET_SERVICE_MODULE: 'subscription/service/module/get',
  MAP_MODULE_TO_PLANS: 'subscription/subscription/service/module-list/edit',
  GET_BILLER_PROFILE: 'subscription/biller/profiles/get',
  GET_BANK_ADDRESS: 'misc/ifsc',
  GET_SERVICES_LIST: 'subscription/invoice-service/get',
  ADD_INVOICE: 'subscription/invoice/manual/add',
  GET_PAYEE_PROFILE: 'subscription/client-biller/profiles/get',
  SET_AS_PRIMARY: 'subscription/client/setting/profile/setprimary',
  MAP_DOCUMENTS_TO_SERVICE: 'subscription/map/plan/service/to/document/insert',
  MAP_SERVICE_TO_DOCUMENT: 'subscription/setting/service/map/document',
  GET_DATA_FOR_CREATE_SERVICE: 'subscription/service/create/details/get',
  EDIT_FEE_MODIFY_STRUCTURE: 'subscription/client/subscription/fees/edit',
  GET_SUBSCRIPTION_START_DATA: 'subscription/start/subscription/detail/get',
  GET_DOCUMENT_GET: 'subscription/document/get',
  GET_ESIGNED_DOCUMENT_GET: 'subscription/esigned/pdf/get',
  GET_DOCUMENT_UPDATE: 'subscription/document/edit',
  GET_EMAIL_TEMPLATE: 'subscription/email-template/list/get',
  EDIT_EMAIL_TEMPLATE: 'subscription/email-template/edit',
  START_SUBSCRIPTION: 'subscription/client/subscription/start',
  DELETE_SERVICE: 'subscription/service/delete',
  GET_CLIENTLIST: 'subscription/invoice/payees/get',
  SET_PRIMARY_BILLER: 'subscription/setting/billerprofile/setprimary',
  GET_PAYMENT_RECEIVE: 'subscription/invoice/payment/received/list/get',
  EDIT_PAYMENT_RECEIVE: 'subscription/invoice/payment/received/edit',
  GET_TEMPLATE: 'subscription/emailtemplate/get',
  GET_EMAIL_TEMPLATE_FILTER: 'subscription/emailtemplate/get',
  // GET_DOCUMENT_MAPPED_PLAN: 'subscription/document/plan/map/get',
  GET_DOCUMENT_MAPPED_PLAN: 'subscription/document/plan/mapping/get',
  GET_DOCUMENT_MAPPED_SERVICE: 'subscription/document/service/map/get',
  GET_TOTAL_SALE_RECIVED: 'subscription/dashboard/totalsales/feerecieved/get',
  DELETE_SUB_SETTING_BILLER_PROFILE: 'subscription/setting/billerprofile/delete',
  GET_IMAGE_UPLOAD: 'document/account/document/all-file/file/get',
  DELETE_SETTING_DOCUMENT: 'subscription/setting/document/delete',
  DELETE_CLIENT_DOCUMENT: 'subscription/multiple/subscription/document/delete',
  DELETE_QUOTATIONS: 'subscription/multiple/quotation/document/delete',
  DELETE_INVOICE: 'subscription/invoice/delete',
  DOCUMENT_ESIGN_REQUEST: 'subscription/invoice/esignDocumentSend',
  GET_QUOTATION_SERVICE_DATA: 'subscription/quotation/data/get',
  EMAIL_DOCUMENT: 'pdfAndEmail/send/docId',
  GET_INVOICE_STATTUS: 'subscription/invoice/status/edit',
  GET_BASE_64: 'api/v1/test/base64/decode',


  // Plan Module

  GET_INCOME_LIST: 'account/income/get',
  ADD_INCOME_LIST: 'account/income/add',
  EDIT_INCOME_LIST: 'account/income/edit',
  GET_GLOBAL_GROWTH_RATE: 'account/income/growth/rate/global/get',
  DELETE_INCOME: 'account/income/delete?',
  /////////////////////////Activity///////////////////////////////////
  ADVICE_GET_ALL: 'advice/asset/get',
  ADVICE_ADD_FD: 'advice/asset/fixed-income/suggest-new-fd/add',
  ADVICE_ADD_RD: 'advice/asset/fixed-income/recurring-deposit/add',
  ADVICE_ADD_PPF: 'advice/asset/small-saving-scheme/suggest-new-PPF/add',
  ADVICE_ADD_NSC: 'advice/asset/saving-scheme/suggest-new-nsc/add',
  ADVICE_ADD_SSY: 'advice/asset/small-saving-scheme/suggest-new-SSY/add',
  ADVICE_ADD_KVP: 'advice/asset/saving-scheme/suggest-new-kvp/add',
  ADVICE_ADD_SCSS: 'advice/asset/saving-scheme/scss/add',
  ADVICE_ADD_POSAVING: 'advice/asset/saving-scheme/po-saving/add',
  ADVICE_ADD_PORD: 'advice/asset/saving-scheme/suggest-new-pord/add',
  ADVICE_ADD_POTD: 'advice/asset/saving-scheme/po-td/add',
  ADVICE_ADD_POMIS: 'advice/asset/saving-scheme/suggest-new-pomis/add',
  ADVICE_ADD_REALESTATE: 'advice/asset/suggest-new-real-estate/add',
  ADVICE_ADD_EPF: 'advice/asset/retirement-account/suggest-new-epf/add',
  ADVICE_ADD_NPS: 'advice/asset/retirement/suggest-new-nps/add',
  ADVICE_ADD_GRATUITY: 'advice/asset/retirement-account/suggest-new-gratuity/add',
  ADVICE_ADD_SUPERANNUATION: 'advice/asset/retirement/suggest-new-superannuation/add',
  ADVICE_ADD_EPS: 'advice/asset/retirement/eps/add',
  ADVICE_ADD_BANKACCOUNT: 'advice/asset/cash-and-bank/suggest-new-bank-account/add',
  ADVICE_ADD_CASHINHAND: 'advice/asset/cash-and-bank/suggest-new-cash-in-hand/add',
  ADVICE_ADD_GOLD: 'advice/asset/commodity/suggest-new-gold/add',
  ADVICE_ADD_OTHERS: 'advice/asset/commodity/suggest-new-other/add',
  GET_ADVICE_BY_CATEGORY: 'advice/assetType/get',
  ADVICE_GET_DEPLOYMENTS: 'activity/deployment/get',
  GENERATE_GROUP_ID: 'advice/asset/consent/post',
  CONSENT_BYPASS_POST: 'advice/asset/consent-bypass/post',
  GET_ASSET_CONSENT: 'advice/advice/consent/get',
  UPDATE_ASSET_CONSENT: 'advice/asset/update/consent',
  SENT_EMAIL_CONSENT: 'advice/asset/update/consent/sent',
  GIVE_ADVICE_ON_GOLD: '/advice/asset/gold/advice/post',
  GIVE_ADVICE_ON_PO_SAVING: '/advice/asset/po-savings/advice/post',
  GIVE_ADVICE_ON_REAL_ESTATE: 'advice/asset/real-estate/advice/post',
  ////////////////////////////////////OnlineTransaction///////////////////////////////////////
  ADD_BSE_CREDENTIALS: 'user/save',
  GET_BSE_CREDENTIALS: '/user/view',
  GET_BSE_SUB_BROKER_CREDENTIALS: '/user/sub-broker/view',
  GET_NEW_SCHEMES: 'mutual-fund/search',
  GET_EXISTING_SCHEMES: 'mutual-fund/existing/search',
  GET_SCHEME_DETAILS: 'mutual-fund/product-limit/get',
  GET_FAMILY_MEMBER: 'family/name/get',
  GET_DEFAULT_DETAILS: '/user/family-member/transaction-setting/default',
  PURCHASE: 'bse/order/bse/order/create',
  GET_AMCWISE_FOLIO: 'mutual-fund/folios/amc-wise/get',
  GET_SCHEMEWISE_FOLIO: 'mutual-fund/folios/scheme-wise/get',
  GET_MANDATE_DETAILS: '/mandate/view',
  GET_UNMAPPED_CLIENTS: '/user/client/unmapped/view',
  GET_MAPPED_CLIENTS: '/user/client/mapped/view',
  MAP_UNMAP_CLIENT: '/user/clients/map/manual',
  UNMAP_MAP_CLIENT: '/user/clients/unmap',
  MAP_UNMAP_FOLIO: 'mutual-fund/folio/map/manual',
  UNMAP_MAP_FOLIO: 'mutual-fund/folio/unmap',
  GET_FREQUENCY: 'bse/scheme/sip/view',
  SIP_BSE: 'bse/order/create',
  BSE_TRANSACTION: 'bse/order/create',
  //  NSE_ACHMANDATE: 'nse/ach-mandate/report/get',
  BANK_DETAILS_NSE: 'nse/iin/bank-detail/get',
  GETIIN_DETAILS: 'nse/iin/detail/get',
  GET_FOLIO_MAPPED: '/mutual-fund/folios/mapped/get',
  GET_FOLIO_UNMAPPED: '/mutual-fund/folios/unmapped/get',
  GET_CLIENT_CODE: '/user/family-member/client-code',
  GET_EMPANELLED_AMC: 'mutual-fund/hidden-amc/amc-wise/get',
  ADD_HIDDEN_AMC: 'mutual-fund/hidden-amc/add',
  DELETE_HIDDEN_AMC: 'mutual-fund/hidden-amc/delete',
  SEARCH_SCHEME: 'report/transaction/list/get',
  GET_TRANSACTION_DETAILS: 'report/transaction/detail/get',
  GET_MANDATE_LIST: 'report/ach-mandate/get',
  GET_REGISTRATION_UCC_IIN: 'user/register/detail/get',
  CREATE_IIN_UCC: 'user/register/create',
  MANDATE_VIEW: '/mandate/view',
  GET_TOKEN: 'user/bse/upload/password',
  BANK_MANDTAE: 'nse/iin/bank-detail/get',
  ADD_MANDATE: 'mandate/add',
  // SIP_BSE:'bse/order/create',

  // cashflow
  CASHFLOW_ADD_INCOME: 'cashflow/income/add',
  CASHFLOW_GET_INCOME: 'cashflow/income/get',
  CASHFLOW_DELETE_INCOME: 'cashflow/income/delete',
  CASHFLOW_EDIT_INCOME: 'cashflow/income/edit',
  CASHFLOW_GET_MONTHLY_DISTRIBUTION_INCOME: 'cashflow/income/monthly-distribution/get',
  CASHFLOW_EDIT_MONTHLY_INCOME: 'cashflow/income/monthly/edit',
  CASHFLOW_GET_YEARLY_EXPENSE: 'cashflow/expense/list/get',
  CASHFLOW_GET_MONTHLY_EXPENSE: 'cashflow/expense/monthly/list/get',
  CASHFLOW_ADD_EXPENSES: 'cashflow/expense/add',
  CASHFLOW_EDIT_EXPENSES: 'cashflow/expense/edit',
  CASHFLOW_DELETE_EXPENSES: 'cashflow/expense/delete',
  CASHFLOW_EDIT_MONTHLY_EXPENSE_DISTRIBUTION: 'cashflow/expense/monthly-distribution/edit',
  CASHFLOW_GET_YEARLY_LIABILITIES: 'cashflow/liability/list/get',
  CASHFLOW_GET_MONTHLY_LIABILITIES: 'cashflow/liability/monthly/list/get',
  CASHFLOW_ADD_LIABILITIES: 'cashflow/liability/add',
  CASHFLOW_EDIT_LIABILITIES: 'cashflow/liability/edit',
  CASHFLOW_DELETE_LIABILITIES: 'cashflow/liability/delete',

  // backoffice

  BACKOFFICE_GET_ALL_SCHEMES_NJ: 'backoffice/get/allshemes/nj',
  BACKOFFICE_GET_ALL_SCHEMES_PRUDENT: 'backoffice/get/allshemes/prudent',
  BACKOFFICE_GET_UNMAPPED_SCHEMES_NJ: 'backoffice/get/unmapped/njschemes',
  BACKOFFICE_GET_UNMAPPED_SCHEMES_PRUDENT: 'backoffice/get/unmapped/prudentschemes',
  BACKOFFICE_GET_FILTERED_SCHEMES: 'backoffice/get/filtered/shemes',
  BACKOFFICE_ADV_GET_BROKER_LIST: 'backoffice/broker/list/get',
  BACKOFFICE_GET_RT_LIST: 'backoffice/rt/list/get',
  BACKOFFICE_GET_AUM_RECON_HISTORY_LIST: 'backoffice/aum/recon/history/get',
  BACKOFFICE_GET_AUM_ORDER_LIST: 'backoffice/aum/file/order/list/get',
  BACKOFFICE_GET_AUM_RECON_LIST: 'backoffice/aum/reconcillation/list/get',
  BACKOFFICE_PUT_AUM_TRANSACTION_KEEP_OR_REMOVE: 'backoffice/aum/transaction/keep/remove',
  BACKOFFICE_PUT_AUM_RECON_ADD: 'backoffice/aum/recon/add',
  BACKOFFICE_PUT_FILE_ORDER_RETRY: 'backoffice/aum/file/order/retry',
  BACKOFFICE_DELETE_AUM_TRANSACTION_SINGLE_MULTIPLE: 'backoffice/aum/transaction/multiple/delete',
  BACKOFFICE_DELETE_AND_REORDER: 'backoffice/aum/delete-reorder',
  BACKOFFICE_PUT_FREEZE_FOLIO_DATA: 'backoffice/aum/freeze/folio',
  BACKOFFICE_PUT_UNFREEZE_FOLIO_DATA: 'backoffice/mutual-fund/unfreeze',
  BACKOFFICE_GET_DUPLICATE_FOLIO_DATA: 'backoffice/duplicate/transaction/list/get',
  BACKOFFICE_FOLIOWISE_LIST_GET: 'backoffice/aum/transaction/foliowise/list/get',
  BACKOFFICE_PUT_UNMAP_FOLIO: 'backoffice/unmap/folio',
  BACKOFFICE_GET_FOLIO_MASTER_DETAIL: 'backoffice/mutual-fund/folio-master/get',
  BACKOFFICE_GET_DUPLICATE_DATA_LIST: 'backoffice/duplicate-data/get',
  BACKOFFICE_POST_UNMATCHED_FOLIOS_ADD: 'backoffice/aum/recon/unmatched/folios/add',
  BACKOFFICE_GET_AUM_REPORT_LIST: 'backoffice/aum/reconciliation/report/get',
  BACKOFFICE_GET_FOLIO_BASED_SEARCH_LIST: 'backoffice/folio/based/on/search/list/get',
  BACKOFFICE_GET_GROUP_HEAD_NAME_LIST: 'backoffice/foliowise/groupHead/list/get',
  BACKOFFICE_GET_INVESTOR_NAME_LIST: 'backoffice/foliowise/applicaName/list/get',
  BACKOFFICE_PUT_DELETE_UNFREEZE_TRANSACTION: 'backoffice/delete/unfreeze/transaction',

  BACKOFFICE_FILE_UPLOAD_TYPE: 'backoffice/file-upload/types/get',
  BACKOFFICE_FILTER: 'backoffice/file-upload/filter/get',
  BACKOFFICE_FILE_TO_UPLOAD: 'backoffice/file-upload/url/get',
  BACKOFFICE_TRANSACTIONS: 'backoffice/file-upload/uploaded/transaction/list/get',
  BACKOFFICE_SIP_STP: 'backoffice/file-upload/uploaded/sip/list/get',
  BACKOFFICE_FOLIO: 'backoffice/file-upload/uploaded/folio-master/list/get',
  BACKOFFICE_SUCCESS_FILE_UPLOAD: 'backoffice/file-upload/success',

  ///org setting ////
  GET_PERSONAL_PROFILE: 'setting/profile/personal/details/get',
  GET_ORG_PROFILE: 'setting/profile/organisation/details/get',
  EDIT_PERSONAL_PROFILE: 'setting/profile/personal/profile-photo/update',
  EDIT_ORG_PROFILE: 'setting/profile/organisation/update',
  GET_PORTFOLIO: 'setting/preferences/portfolio/get',
  GET_PLANS: 'setting/preferences/plan/get',
  PROTFOLIO_UPDATE: 'setting/preferences/portfolio/update',
  PLAN_SECTION_UPDATE: 'setting/preferences/plan/update',
  DOMAIN_GET: 'setting/preferences/domain/get',
  UPDATE_DOMAIN: 'goal-planning/advisor-plan-configuration/add',
  EDIT_ORG_PROFILE_LOGO: 'setting/profile/organisation/logo/update',
  EDIT_ORG_PROFILE_REPORT_LOGO: 'setting/profile/organisation/report/logo/update',
  GET_EMAIL_VERIFICATION: 'setting/preference/email/get',
  GET_EMAIL_TEMPLATES: 'setting/preference/email/template/get',
  ADD_EMAIL_VERIFY: 'setting/preferences/email/post',
  GET_ASSET_ALLOCATION: 'goal-planning/static-allocation/get',
  GET_RETURNS: 'plan/config/return-inflation/get',
  GET_KEY_PARAMETERS: 'goal-planning/key-parameters/get',
  UPLOAD_PLAN_GALLERY: 'goal-planning/goal-gallery/add',
  UPLOAD_KEY_PARAMETER: 'goal-planning/static-allocation/put',
  UPDATE_ASSET_ALLOCATION: 'goal-planning/static-allocation/put',
  GET_TASK_TEMPLATE: 'setting/task/template/list/get',
  GET_TEAM_MEMBER_LIST: 'user/advisor/team-members/detail/get',
  ADD_SUB_TASKTEMPLATE: 'setting/task/sub-task/add',
  TASK_GLOBAL: 'setting/task/template/global/data',
  ADD_TAK_TEMPLATE: 'setting/task/template/add',
  EDIT_TASK_TEMPLATE: 'setting/task/template/edit',
  DELETE_TASK_TEMPLATE: 'setting/task/template/delete',
  DELETE_SUBTASK_TEMPLATE: 'setting/task/sub-task/delete',
  OWNER_SUBTASK_UPDATE: 'setting/task/template/owner/update',
  OWNER_TASK_UPDATE: 'setting/task/sub-task/owner/update',

  // gmail
  ACCESS_TOKEN_SAVE: 'user/access-token/gmail/save',
  GET_PROFILE: 'gmail/users/getProfile',
  GET_RIGHT_SIDE_NAV: 'user/label/list/get',
  DELETE_MESSAGES: 'gmail/messages/delete',
  MODIFY_MESSAGES: 'gmail/messages/modify',
  MOVE_MESSAGES_TO_TRASH: 'gmail/messages/thrash',
  MOVE_MESSAGES_FROM_TRASH: 'gmail/messages/untrash',
  DELETE_MULTIPLE_THREADS: 'gmail/threads/delete',
  MODIFY_MULTIPLE_THREADS: 'gmail/threads/modify',
  MOVE_THREADS_TO_TRASH: 'gmail/threads/thrash',
  MOVE_THREADS_FROM_TRASH: 'gmail/threads/unthrash',
  GET_DRAFT_LIST: 'user/draft/list/get',
  GET_GMAIL_INBOX_LIST: 'user/thread/list/get',
  CREATE_DRAFT: 'user/draft/create',
  UPDATE_DRAFT: 'user/draft/modify/put',
  GET_MESSAGE_DETAIL: 'user/message/details',
  SEND_EMAIL: 'gmail/email/send',
  GET_ATTACHMENTS: 'gmail/attachment/get',
  //////////////////////////people/////////////////////////////////////
  GET_PEOPLE_CLIENT_LIST: 'user/client/all/get',
  ADD_CLIENT: 'user/client/add',
  EDIT_CLIENT: 'user/client/edit',
  ADD_EDIT_CLIENT_ADDRESS: 'user/address/add-edit',
  ADD_EDIT_CLIENT_BANK: 'user/bank/add-edit',
  ADD_EDIT_CLIENT_DEMAT: 'user/bank/demat/edit',
  GET_FAMILY_MEMBERS: 'user/family-member/get',
  DELETE_FAMILY_MEMBER: 'user/family-member/delete',
  ADD_FAMILY_MEMBER: 'user/family-member/add',
  ADD_MULTIPLE_FAMILY_MEMBERS: '/user/family-member/add/multiple',
  EDIT_FAMILY_MEMBER_BASIC_DETAILS_MORE_INFO: 'user/family-member/edit',
  GET_COMPANY_PERSON_DETAILS: 'user/client/company/person/get',
  SAVE_COMPANY_PERSON_DEATILS: 'user/client/company/person/add',
  UPDATE_COMPANY_PERSON_DETAILS: 'user/client/company/person/edit',
  TEAM_MEMBER_WISE_CLIENT_COUNT: 'user/advisor/team-member/count/get',
  GET_TEAM_MEMBERS: 'user/advisor/team-members/detail/get',
  //////////////////////////////Login///////////////////////////////////
  GENERATE_OTP: '/user/generate/otp',
  SAVE_AFTER_VERIFICATION: 'user/email/mobile/save',
  REGISTER: 'user/advisor/add',
  SEARCH_USERNAME: 'user/search/username',
  SAVE_PASSWORD: 'user/password/update',
  LOGIN_WITH_PASSWORD: 'user/login/with/password',
  ////////////////////////////// calendar////////////////////////////////////////////
  GET_EVENT: 'calendar/event/list/get',
  GET_UPDATE: 'calendar/event/update',
  GET_ADD: 'calendar/event/add',
  GET_DELETE: 'calendar/event/detele',
  ////////////////////////////// calendar////////////////////////////////////////////
  ///////////////////////////////Postal////////////////////////////////

  ////////////////////////////// settings////////////////////////////////////////////
  GET_PERSONAL_PROFILE_DETAILS: 'setting/profile/personal/details/get',
  UPLOAD_PERSONAL_PROFILE_PHOTO: 'setting/profile/personal/profile-photo/update',

  GET_ARN_RIA_GLOBAL_LIST: 'setting/arn-ria/global/data/get',

  GET_ARN_RIA_LIST: 'setting/arn-ria/list/get',
  ADD_ARN_RIA: 'setting/back-office/arn-ria/add',
  EDIT_ARN_RIA: 'setting/back-office/arn-ria/edit',
  GET_MF_RTA_LIST: 'setting/arn-ria/rta/list/get',
  ADD_MF_RTA: 'setting/arn-ria/rta/add',
  EDIT_MF_RTA: 'setting/arn-ria/rta/edit',
  DELETE_MF_RTA: 'setting/arn-ria/rta/delete',
  DELETE_MF_RTA_QUESTION: 'setting/arn-ria/fundnet/answer/delete',
  UPDATE_MF_RTA_QUESTION: 'setting/arn-ria/fundnet/answer/update',
  ADD_MF_RTA_QUESTION: 'setting/arn-ria/rta-sec/answer/add',

  GET_USER_ROLES_GLOBAL_DATA: 'setting/users/global/roles/get',

  GET_USER_ROLE_ROLE_LIST: 'setting/users-roles/role/get',
  EDIT_USER_ROLE: 'setting/users-roles/role/edit',
  DELETE_USER_ROLE: 'setting/users-roles/role/delete',
  CLONE_USER_ROLE: 'setting/users-roles/role/clone/add',
  ADD_USER_ROLE: 'setting/users-roles/role/add',
  GET_DETIALED_USER_ROLE: 'setting/users-roles/role/detail/get',

  GET_ALL_FEATURES: 'setting/users-roles/feature-capabilities/all/get',

  GET_USER_ACCESS_RIGHTS_LIST: 'setting/users-roles/access-rights/get',
  UPDATE_USER_ACCESS_RIGHTS_LIST: 'setting/users-roles/access-rights/update'


  ////////////////////////////// settings////////////////////////////////////////////
  //////////////////////////////////customer-overview-profile//////////////////////
};
