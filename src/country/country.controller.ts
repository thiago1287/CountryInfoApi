import { Controller, Get, Param } from '@nestjs/common';
import { ContryInfo, CountryResponse, CountryService } from './country.service';

@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  getAllCountries(): Promise<CountryResponse[]> {
    return this.countryService.getAllCountries();
  }

  @Get('/info/:countryCode')
  async getCountryInfo(
    @Param('countryCode') countryCode: string,
  ): Promise<ContryInfo> {
    const countryInfo = await this.countryService.getCountryInfos(countryCode);

    return countryInfo;
  }
}
