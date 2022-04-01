import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TemperatureSensor, TemperatureSensorSchema } from './schema/sensor-temperature.schema';
import { SensorTemperatureController } from './sensor-temperature/sensor-temperature.controller';
import { SensorTemperatureService } from './sensor-temperature/sensor-temperature.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: TemperatureSensor.name, schema: TemperatureSensorSchema }])],
  controllers: [SensorTemperatureController],
  providers: [SensorTemperatureService]
})
export class SensorTemperatureModule {}
