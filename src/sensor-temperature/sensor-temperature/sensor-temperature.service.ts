import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TemperatureSensor, TemperatureSensorDocument } from '../schema/sensor-temperature.schema';
import { Model } from 'mongoose';
import { TemperatureSensorCreateDto } from '../dto/temperatureSensorCreateDto';
import { uuid } from 'uuidv4';
import { Cron } from '@nestjs/schedule';
import { DevicePosition } from '../enum/device-installed-position.enum';

@Injectable()
export class SensorTemperatureService {
    private readonly logger = new Logger(SensorTemperatureService.name);
    constructor(@InjectModel(TemperatureSensor.name) private temperatureSensorModel: Model<TemperatureSensorDocument>) { }

    async syncToDb(createDto: TemperatureSensorCreateDto): Promise<any> {
        const reading = {
            ...createDto,
            _id: uuid(),
            notedDate: new Date()
        }
        const savedReading = new this.temperatureSensorModel(reading);
        return savedReading.save();
    }

    //This method calls every minute's 45th second
    @Cron('45 * * * * *')
    async listenToCronJob(): Promise<any>{
        this.logger.debug('Cron job started when current second is 45');
        const cronObject: TemperatureSensorCreateDto  = {
            roomId: Number((Math.random()*10).toFixed(0)),
            devicePosition: DevicePosition.IN,
            temperature: Number((Math.random()*100).toFixed(2)),
        }
        await this.syncToDb(cronObject);
        this.logger.debug('Cron job end when current second is 45');
    }
}
