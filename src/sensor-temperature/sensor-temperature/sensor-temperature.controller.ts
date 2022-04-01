import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { TemperatureSensorCreateDto } from '../dto/temperatureSensorCreateDto';
import { TemperatureSensorLoadDto } from '../dto/temperatureSensorLoadDto';
import { SensorTemperatureService } from './sensor-temperature.service';

@Controller('sensor-temperature')
export class SensorTemperatureController {

    constructor(private sensorTemperatureService:SensorTemperatureService){}

    @Post()
    saveReading(@Body() req: TemperatureSensorCreateDto){
        try{
            this.sensorTemperatureService.syncToDb(req)
        }
        catch(err){
             throw err;
        }
        
    }

    @Get()
    loadSensorData(@Query() query: TemperatureSensorLoadDto){
        try{
            return this.sensorTemperatureService.loadSensorData(query);
        }
        catch(err){
            throw err;
       }
    }
    
}
