import { Body, Controller, Post } from '@nestjs/common';
import { temperatureSensorCreateDto } from '../dto/temperatureSensorCreateDto';
import { SensorTemperatureService } from './sensor-temperature.service';

@Controller('sensor-temperature')
export class SensorTemperatureController {

    constructor(private sensorTemperatureService:SensorTemperatureService){}

    @Post()
    SaveReading(@Body() req: temperatureSensorCreateDto){
        try{
            this.sensorTemperatureService.syncToDb(req)
        }
        catch(err){
             throw err;
        }
        
    }
}
