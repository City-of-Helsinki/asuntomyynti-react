export type Apartment = {
  acc_financeofficer: string;
  acc_salesperson: string;
  additional_information: string;
  apartment_address: string;
  apartment_holding_type: string;
  apartment_number: string;
  apartment_structure: string;
  application_url: string;
  balcony_description: string;
  bathroom_appliances: string;
  condition: number;
  debt_free_sales_price: number;
  financing_fee: number;
  floor: number;
  has_apartment_sauna: boolean;
  has_balcony: boolean;
  has_terrace: boolean;
  has_yard: boolean;
  housing_company_fee: number;
  kitchen_appliances: string;
  living_area: number;
  loan_share: number;
  maintenance_fee: number;
  other_fees: number;
  parking_fee: number;
  parking_fee_explanation: string;
  price_m2: number;
  project_apartment_count: number;
  project_application_end_time: string;
  project_application_start_time: string;
  project_attachment_urls: string[];
  project_building_type: string;
  project_city: string;
  project_construction_materials: string[];
  project_constructor: string;
  project_coordinate_lat: number;
  project_coordinate_lon: number;
  project_description?: string;
  project_district: string;
  project_energy_class: string;
  project_estate_agent: string;
  project_estate_agent_email: string;
  project_estate_agent_phone: string;
  project_estimated_completion: string;
  project_estimated_completion_date: string;
  project_has_elevator: boolean;
  project_has_sauna: boolean;
  project_heating_options: string[];
  project_holding_type: string;
  project_housing_company: string;
  project_housing_manager: string;
  project_id: number;
  project_image_urls: string[];
  project_main_image_url: string;
  project_manager: string;
  project_material_choice_dl: string;
  project_new_development_status: string;
  project_new_housing: boolean;
  project_possession_transfer_date: string;
  project_postal_code: string;
  project_premarketing_end_time: string;
  project_premarketing_start_time: string;
  project_publication_end_time: string;
  project_publication_start_time: string;
  project_realty_id: string;
  project_roof_material: string;
  project_sanitation: string;
  project_shareholder_meeting_date: string;
  project_site_area: number;
  project_site_renter: string;
  project_street_address: string;
  project_uuid: string;
  project_virtual_presentation_url: string;
  project_zoning_info: string;
  project_zoning_status: string;
  room_count: number;
  sales_price: number;
  services_description: string;
  showing_times: string[];
  site_owner: string;
  storage_description: string;
  title: string;
  uuid: string;
  view_description: string;
  water_fee: number;
  water_fee_explanation: string;
};

export type Project = {
  apartments: Apartment[];
  apartment_count: number;
  application_end_time: string;
  application_start_time: string;
  attachment_urls: string[];
  building_type: string;
  city: string;
  construction_materials: string[];
  constructor: string;
  coordinate_lat: number;
  coordinate_lon: number;
  description?: string;
  district: string;
  energy_class: string;
  estate_agent: string;
  estate_agent_email: string;
  estate_agent_phone: string;
  estimated_completion: string;
  estimated_completion_date: string;
  has_elevator: boolean;
  has_sauna: boolean;
  heating_options: string[];
  holding_type: string;
  housing_company: string;
  housing_manager: string;
  id: number;
  image_urls: string[];
  main_image_url: string;
  manager: string;
  material_choice_dl: string;
  new_development_status: string;
  new_housing: boolean;
  ownership_type: string;
  possession_transfer_date: string;
  postal_code: string;
  premarketing_end_time: string;
  premarketing_start_time: string;
  publication_end_time: string;
  publication_start_time: string;
  realty_id: string;
  roof_material: string;
  sanitation: string;
  shareholder_meeting_date: string;
  site_area: number;
  site_renter: string;
  state_of_sale: 'PRE_MARKETING' | 'ON_SALE';
  street_address: string;
  uuid: string;
  virtual_presentation_url: string;
  zoning_info: string;
  zoning_status: string;
};

export type SearchResult = {
  _language: string;
  acc_financeofficer: string;
  acc_salesperson: string;
  additional_information: string;
  apartment_address: string;
  apartment_holding_type: string;
  apartment_number: string;
  apartment_structure: string;
  application_url: string;
  balcony_description: string;
  bathroom_appliances: string;
  condition: number;
  debt_free_sales_price: number;
  financing_fee: number;
  floor: number;
  has_apartment_sauna: boolean;
  has_balcony: boolean;
  has_terrace: boolean;
  has_yard: boolean;
  housing_company_fee: number;
  kitchen_appliances: string;
  living_area: number;
  loan_share: number;
  maintenance_fee: number;
  other_fees: number;
  parking_fee: number;
  parking_fee_explanation: string;
  price_m2: number;
  project_apartment_count: number;
  project_application_end_time: string;
  project_application_start_time: string;
  project_attachment_urls: string[];
  project_building_type: string;
  project_city: string;
  project_construction_materials: string[];
  project_constructor: string;
  project_coordinate_lat: number;
  project_coordinate_lon: number;
  project_description?: string;
  project_district: string;
  project_energy_class: string;
  project_estate_agent: string;
  project_estate_agent_email: string;
  project_estate_agent_phone: string;
  project_estimated_completion: string;
  project_estimated_completion_date: string;
  project_has_elevator: boolean;
  project_has_sauna: boolean;
  project_heating_options: string[];
  project_holding_type: string;
  project_housing_company: string;
  project_housing_manager: string;
  project_id: number;
  project_image_urls: string[];
  project_main_image_url: string;
  project_manager: string;
  project_material_choice_dl: string;
  project_new_development_status: string;
  project_new_housing: boolean;
  project_ownership_type: string;
  project_possession_transfer_date: string;
  project_postal_code: string;
  project_premarketing_end_time: string;
  project_premarketing_start_time: string;
  project_publication_end_time: string;
  project_publication_start_time: string;
  project_realty_id: string;
  project_roof_material: string;
  project_sanitation: string;
  project_shareholder_meeting_date: string;
  project_site_area: number;
  project_site_renter: string;
  project_street_address: string;
  project_uuid: string;
  project_virtual_presentation_url: string;
  project_zoning_info: string;
  project_zoning_status: string;
  room_count: number;
  sales_price: number;
  services_description: string;
  showing_times: string[];
  site_owner: string;
  storage_description: string;
  title: string;
  uuid: string;
  view_description: string;
  water_fee: number;
  water_fee_explanation: string;
};

export type QueryParams = {
  terms?: {
    [key in FilterName]?: (number | string)[];
  };
  term?: {
    [key in FilterName]?: number | string | boolean;
  };
  range?: {
    [key in FilterName]?: {
      gte?: number;
      lte?: number;
      boost?: number;
    };
  };
};

export type FilterItem = {
  label: string;
  placeholder?: string;
  max?: number;
  min?: number;
  info?: string;
  helperText?: string;
};

export enum FilterType {
  MultiSelect,
  Input,
  Range,
}

export type PartialConfig = {
  items: string[];
  label: string;
  suffix: string | null;
};

export type DefaultFilterConfig = PartialConfig & {
  getQuery: (values: string[]) => QueryParams[];
  getLabel: (values: string[]) => string;
  getTagLabel: (serializedValue: string) => ParamList;
};

export type FilterConfig = Omit<DefaultFilterConfig, 'items' | 'suffix'> & {
  type: FilterType;
  icon?: string;
  items: (FilterItem | string)[];
};

export enum FilterName {
  LivingArea = 'living_area',
  ProjectBuildingType = 'project_building_type',
  ProjectDistrict = 'project_district',
  ProjectNewDevelopmentStatus = 'project_new_development_status',
  Properties = 'properties',
  RoomCount = 'room_count',
  SalesPrice = 'sales_price',
  StateOfSale = 'project_state_of_sale',
}

export type FilterConfigs = {
  [key in FilterName]: FilterConfig;
};

export type BaseFilterConfigs = {
  [key in FilterName]?: PartialConfig;
};

export type DefaultFilterConfigs = {
  [key in FilterName]: DefaultFilterConfig;
};

export type ParamList = Array<[FilterName, string] | [FilterName, string, string]>;
