export interface companyInfo {
  cs_company_id: string;
  org_number: string;
  reg_number: string;
  co_number: string;
  ggs_id: string;
  connect_id: string;
  name: string;
  trading_name: string;
  address1: string;
  address2: string;
  city: string;
  address5: string;
  zip: string;
  region: string;
  country: string;
  phone: string;
  marketing_allowed: string;
  status: string;
  date_of_change: string;
  type: string;
  legal_form: string;
  incorp_date: string;
  reg_type: string;
  activity_code: string;
  include_in_extract: string;
  creditworthy: string;
  credit_score: string;
  credit_score_definition: string;
  credit_limit: string;
  previous_rating: string;
  previous_rating_definition: string;
  common_score: string;
  latest_accounts: string;
  consolidated_accounts: string;
  currency: string;
  turnover: string;
  pre_tax_profit: string;
  profit: string;
  employees: string;
  employees_num: string;
  total_fixed_assets: string;
  total_current_assets: string;
  total_current_liabilities: string;
  total_long_term_liabilities: string;
  shareholders_funds: string;
  working_capital: string;
  current_ratio: string;
  return_on_total_assets_employed: string;
  total_debt_ratio: string;
  current_debt_ratio: string;
  immediate_holding_company: string;
  immediate_holding_company_country: string;
  immediate_holding_company_identifier: string;
  ultimate_holding_company: string;
  ultimate_holding_company_country: string;
  ultimate_holding_company_identifier: string;
  effective_from: string;
  record_status: string;
  execution_date: string;
  prospect_addr_2: string;
  prospect_addr_3: string;
  prospect_addr_4: string;
  prospect_addr_5: string;
}

export interface companiesInfo {
  companies: Array<companyInfo>;
}

export enum Status {
  None = 0,
  InProgress = 1,
  Completed = 2,
}
