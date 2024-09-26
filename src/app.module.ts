import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CountryModule } from './country/country.module';

@Module({
  imports: [ConfigModule.forRoot(), CountryModule],
})
export class AppModule {}
