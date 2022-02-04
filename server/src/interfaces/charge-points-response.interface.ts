export interface ChargePointsResponse {
    Scheme: Scheme;
    ChargeDevice: ChargeDevice[];
}

export interface ChargeDevice {
    ChargeDeviceId: string;
    ChargeDeviceRef: string;
    ChargeDeviceName: string;
    ChargeDeviceText: null;
    ChargeDeviceLocation: ChargeDeviceLocation;
    ChargeDeviceManufacturer: null | string;
    ChargeDeviceModel: null | string;
    PublishStatusID: string;
    DateCreated: Date;
    DateUpdated: Date;
    Attribution: string;
    DateDeleted: string;
    Connector: Connector[];
    DeviceOwner: SchemeData;
    DeviceController: SchemeData;
    DeviceAccess: any[] | DeviceAccessClass;
    DeviceNetworks: string;
    ChargeDeviceStatus: ChargeStatus;
    PublishStatus: string;
    DeviceValidated: string;
    RecordModerated: string;
    RecordLastUpdated: Date | null;
    RecordLastUpdatedBy: string;
    PaymentRequiredFlag: boolean;
    PaymentDetails: null | string;
    SubscriptionRequiredFlag: boolean;
    SubscriptionDetails: null | string;
    ParkingFeesFlag: boolean;
    ParkingFeesDetails: null | string;
    ParkingFeesUrl: null | string;
    AccessRestrictionFlag: boolean;
    AccessRestrictionDetails: null | string;
    PhysicalRestrictionFlag: boolean;
    PhysicalRestrictionText: null | string;
    OnStreetFlag: boolean;
    LocationType: string;
    Bearing: null;
    Accessible24Hours: boolean;
}

export interface ChargeDeviceLocation {
    Latitude: number;
    Longitude: number;
    Address: { [key: string]: null | string };
    LocationShortDescription: null | string;
    LocationLongDescription: null | string;
}

export enum ChargeStatus {
    InService = "In service"
}

export interface Connector {
    ConnectorId: string;
    ConnectorType: ConnectorType;
    RatedOutputkW: string;
    RatedOutputVoltage: string;
    RatedOutputCurrent: string;
    ChargeMethod: ChargeMethod;
    ChargeMode: string;
    ChargePointStatus: ChargeStatus;
    TetheredCable: string;
    Information: null | string;
    Validated: string;
}

export enum ChargeMethod {
    Dc = "DC",
    SinglePhaseAC = "Single Phase AC",
    ThreePhaseAC = "Three Phase AC"
}

export enum ConnectorType {
    CCSType2ComboIEC62196 = "CCS Type 2 Combo (IEC62196)",
    JEVSG105CHAdeMODC = "JEVS G105 (CHAdeMO) DC",
    Type2MennekesIEC62196 = "Type 2 Mennekes (IEC62196)"
}

export interface DeviceAccessClass {
    Open24Hours: boolean;
}

export interface SchemeData {
    OrganisationName: string;
    SchemeCode?: string;
    Website: string;
    TelephoneNo: string;
}

export interface Scheme {
    SchemeCode: string;
    SchemeData: SchemeData;
}
