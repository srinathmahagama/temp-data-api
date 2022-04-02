import { Body, Controller, Get, Headers, Param, Post, Query } from '@nestjs/common';
import { TemperatureSensorCreateDto } from '../dto/temperatureSensorCreateDto';
import { TemperatureSensorLoadDto } from '../dto/temperatureSensorLoadDto';
import { TemperatureSensor } from '../schema/sensor-temperature.schema';
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
    loadSensorData(@Query() query: TemperatureSensorLoadDto, @Headers() headers ): Promise<TemperatureSensor[]>{
        try{
            return this.sensorTemperatureService.loadSensorData(query);
        }
        catch(err){
            throw err;
       }
    }
    
}
