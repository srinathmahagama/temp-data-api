import { Body, Controller, Post } from '@nestjs/common';
import { TemperatureSensorCreateDto } from '../dto/temperatureSensorCreateDto';
import { SensorTemperatureService } from './sensor-temperature.service';

@Controller('sensor-temperature')
export class SensorTemperatureController {

    constructor(private sensorTemperatureService:SensorTemperatureService){}

    @Post()
    SaveReading(@Body() req: TemperatureSensorCreateDto){
        try{
            this.sensorTemperatureService.syncToDb(req)
        }
        catch(err){
             throw err;
        }
        
    }
}
