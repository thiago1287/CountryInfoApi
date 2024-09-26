import { Injectable } from '@nestjs/common';
import axios from 'axios';

export interface CountryResponse {
  countryCode: string;
  name: string;
}
export interface BorderCountry {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: [];
}
export interface PopulationData {
  popoulationCounts: [country: string, popoulationCounts: []];
}
export interface ContryFlag {
  name: string;
  flag: string;
}
export interface ContryInfo {
  borders: BorderCountry[];
  popoulationCounts: PopulationData[];
  flagImage: ContryFlag;
}

@Injectable()
export class CountryService {
  async getAllCountries(): Promise<CountryResponse[]> {
    const response = await axios.get(process.env.AVAILABLE_COUNTRIES_API);
    const countries = response.data as CountryResponse[];
    return countries;
  }

  async getCountryInfos(countryCode: string): Promise<ContryInfo> {
    const neighborCountriesResponse = await axios.get(
      `${process.env.AVAILABLE_COUNTRY_INFO_API}/${countryCode}`,
    );
    const countryBorders = neighborCountriesResponse.data;

    const bordersCoutriesResponse = countryBorders.borders.map(
      (border) => border.commonName,
    );

    const populationResponse = await axios.get(
      process.env.AVAILABLE_COUNTRIES_POPULATION_API,
    );

    const countryName = countryBorders.commonName;

    const popoulationData = populationResponse.data.data.find(
      (data) => data.country === countryName,
    ).populationCounts;

    const countryFlagResponse = await axios.get(
      process.env.AVAILABLE_COUNTRIES_FLAGS_API,
    );

    const countryFlag = countryFlagResponse.data.data.find(
      (data) => data.name === countryName,
    ).flag;

    return {
      borders: bordersCoutriesResponse,
      flagImage: countryFlag,
      popoulationCounts: popoulationData,
    };
  }
}
