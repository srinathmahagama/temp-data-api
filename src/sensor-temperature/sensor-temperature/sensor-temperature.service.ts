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

    //This method calls every minute's 15th and 45th second
    @Cron('15,45 * * * * *')
    async listenToCronJob(): Promise<any>{
        this.logger.debug('Cron job started');
        const cronObject: TemperatureSensorCreateDto  = {
            sensorId: '2',
            roomId: Number((Math.random()*10).toFixed(0)),
            devicePosition: DevicePosition.OUT,
            temperature: Number((Math.random()*100).toFixed(2)),
        }
        await this.syncToDb(cronObject);
        this.logger.debug('Cron job end');
    }
}
