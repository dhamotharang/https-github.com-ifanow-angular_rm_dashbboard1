export const appConfig = {
  LOGIN: 'secure/login',
  FILE_GET: '/file/list/get',
  RT_FILE_GET: 'file/rt/list/get',
  TOTAL_GET_AUM: 'asset/clientTotalAum/get',
  GET_MIS_DATA: 'asset/mis/get',
  GET_SUBCAT_AUM: 'asset/cat/subcat/get',
  GET_SUBCAT_SCHEME: 'asset/cat/subcat/scheme',
  GET_SUBCAT_SCHEMENAME: 'asset/cat/subcat/scheme',
  GET_TOTAL_SCHEME_AUM: 'asset/schemeTotalAum/get',
  GET_TOTAL_AUM_BY_SCHEME: 'asset/schemeTotalAum/get',
  GET_CLIENT_WISE_TOTALAUM: 'asset/report/client/totalaum/get',
  GET_SIP_COUNT_GET: 'asset/sip/count/get',
  GET_AUM_APPLICANT: 'asset/aum/applicantWise/totalaum/applicantName/get',
  GET_AUM_APPLICANT_CATEGORY: 'asset/aum/applicantWise/totalaum/applicantsAllCategory/get',
  GET_AUM_APPLICANT_SUB_CATEGORY: 'asset/aum/applicantWise/totalaum/applicantSubCategory/get',
  GET_AUM_APPLICANT_SCHEME: 'asset/aum/applicantWise/totalaum/applicantSchemes/get',
  GET_AUM_CLIENT_TOTALAUM: 'asset/aum/client/totalaum/get',
  GET_AUM_CLIENT_SCHEME: 'asset/aum/client/schemes',


  /////////////////////// sip api call//////////////////////////////////

  GET_EXPIRING: 'asset/sip/expiring/get',
  GET_expired: 'asset/sip/expired/get',
  GET_SIP_REJECTION: 'asset/sip/sipRejection/get',
  GET_SIP_client_SEARCH: 'asset/sip/client/search/get',
  GET_SIP_SCHEME_SEARCH: 'asset/sip/scheme/search/get',

  GET_SIP_AMC: 'asset/sip/amc/get',
  GET_SIP_AMC_SCHEME: 'asset/sip/amc/scheme/get',
  GET_SIP_INVERSTORS: 'asset/sip/scheme/investors/get',
  Scheme_Investors_Applicants: 'asset/sip/scheme/investors/applicants/get',
  Sip_Schemewise_Get: 'asset/sip/schemewise/get',
  Scheme_Wise_Investor_Get: 'asset/sip/schemewiseInvestor/get',
  scheme_wise_Applicants_Get: 'asset/sip/schemewiseApplicants/get',

  ///////////////////////////// back office/////////////////////////////////////////////

  AllClient_get: 'asset/allClient/get',
  AllClient_ByName_get: 'asset/allClient/ByName/get',
  AllClient_ByTags_get: 'asset/allClient/ByTags/get',
  Update_expiryDate: 'asset/update/expiryDate',
  Update_Password: 'asset/update/password',
  Fileorder_Status_Report_Get: 'asset/fileorder/status/report/get',

////////////////////////////// subscription////////////////////////////////////////////


  GET_SUBSCRIPTION_INVOICE: 'subscription/invoice/get',
  // GET_SINGLE_INVOICE:'subscription/invoice/get',
  GET_PREFERENCE_BILLER_PROFILE: 'subscription/billerprofile/get',
  GET_PREFERENCE_INVOICE_QUOTATIONS_SUBSCRIPTION: 'subscription/setting/prefix/get',
  UPDATE_PREFERENCE_INVOICE_QUOTATIONS_SUBSCRIPTION: 'subscription/setting/prefix/update',
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
  GET_PLAN_DOCUMENTS_DATA: 'subscription/setting/plan-document/get',
  GET_DOCUMENT_COUNT_SIGNED: 'subscription/document/analytics/get',
  GET_CLIENT_WITH_SCRIPTION: 'subscription/analytics/get',
  GET_INVOICE_TO_BE_REVIEWED: 'subscription/invoice/review/get',
  GET_SUB_SUMMARY: 'subscription/dashboard/summary/get',
  FILTER_SUBCRIPTION: 'subscription/subscription/filtered/get',
  DASHBOARD_SUBSCRIPTION_LETS_BEGIN: 'subscription/lets-begin/get',
  CANCEL_SUBSCRIPTION: 'subscription/cancelled/subscription/update',
  DELETE_SUBSCRIPTION: 'subscription/subscription/deleted/update',
  SAVE_BILLER_PROFILE_SETTING: 'subscription/setting/billerprofile/save',
  UPDATE_BILLER_PROFILE_SETTING: 'subscription/setting/billerprofile/update',
  GET_SUBSCRIPTION_PLAN_SETTING: 'subscription/setting/plan/get',
  GET_SUBSCRIPTION_SERVICE_SETTING: 'subscription/setting/service/get',
  CREATE_SERVICE_SETTING: 'subscription/service/create',
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
  CHANGE_BILLER_SETTING: 'subscription/change/biller-setting/subscription',
  EDIT_PLAN_SETTING: 'subscription/plan/edit',
  GET_SERVICE_MODULE: 'subscription/service/module/get',
  MAP_MODULE_TO_PLANS: 'subscription/subscription/service/module-list/edit',
  GET_BILLER_PROFILE: 'subscription/biller/profiles/get',
  GET_SERVICES_LIST: 'subscription/invoice-service/get',
  ADD_INVOICE: 'subscription/invoice/manual/add',
  GET_PAYEE_PROFILE: 'subscription/client-biller/profiles/get',
  SET_AS_PRIMARY: 'clients/settings/profile/setprimary',
  MAP_DOCUMENTS_TO_SERVICE: 'subscription/mapped/document/service/insert',
  GET_DATA_FOR_CREATE_SERVICE: 'subscription/service/create/details/get',
  EDIT_FEE_MODIFY_STRUCTURE: 'subscription/client/subscription/fees/edit',
  GET_SUBSCRIPTION_START_DATA: 'subscription/start/subscription/detail/get',
  GET_DOCUMENT_GET: 'subscription/document/get',
  GET_DOCUMENT_UPDATE: 'subscription/document/edit',
  GET_EMAIL_TEMPLATE: 'subscription/email-template/list/get',
  EDIT_EMAIL_TEMPLATE: 'subscription/email-template/edit',
  START_SUBSCRIPTION: 'subscription/client/subscription/start',
  DELETE_SERVICE: 'subscription/service/delete',
  GET_CLIENTLIST: 'subscription/invoice/payees/get',
  SET_PRIMARY_BILLER: 'subscription/setting/billerprofile/setprimary',
  GET_PAYMENT_RECEIVE: 'subscription/invoice/payment/received/list/get',
  EDIT_PAYMENT_RECEIVE: 'subscription/invoice/payment/received/edit',
  GET_EMAIL_TEMPLATE_FILTER: 'subscription/emailtemplate/get',
  GET_BASE_64: 'api/v1/test/base64/decode'
};
