import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TemperatureSensor, TemperatureSensorDocument } from '../schema/sensor-temperature.schema';
import { Model } from 'mongoose';
import { TemperatureSensorCreateDto } from '../dto/temperatureSensorCreateDto';
import { uuid } from 'uuidv4';
import { Cron } from '@nestjs/schedule';
import { DevicePosition } from '../enum/device-installed-position.enum';
import { TemperatureSensorLoadDto } from '../dto/temperatureSensorLoadDto';

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
    // @Cron('15,45 * * * * *')
    // async listenToCronJob(): Promise<any> {
    //     this.logger.debug('Cron job started');
    //     const cronObject: TemperatureSensorCreateDto = {
    //         sensorId: '2',
    //         roomId: Number((Math.random() * 10).toFixed(0)),
    //         devicePosition: DevicePosition.OUT,
    //         temperature: Number((Math.random() * 100).toFixed(2)),
    //     }
    //     await this.syncToDb(cronObject);
    //     this.logger.debug('Cron job end');
    // }

    async loadSensorData(query: TemperatureSensorLoadDto): Promise<TemperatureSensor[]> {
        let fiter = {};
        if (query?.sensorId && query?.sensorId != '') {
            fiter = {
                sensorId: query.sensorId
            }
        }
        if (query?.roomId && query?.roomId?.toString() != '') {
            fiter = {
                ...fiter,
                roomId: query.roomId
            }
        }
        if (query?.temperature && query?.temperature?.toString() != '') {
            fiter = {
                ...fiter,
                temperature: query.temperature
            }
        }
        if (query?.position && query?.position?.toString() != '') {
            fiter = {
                ...fiter,
                devicePosition: query.position
            }
        }
        if (query?.startDate && query?.startDate != undefined && query?.endDate && query?.endDate != undefined) {
            fiter = {
                ...fiter,
                notedDate:
                {
                    $gte: new Date(query.startDate),
                    $lt: new Date(query.endDate)
                }
            }
        }

        const result = await this.temperatureSensorModel.find(fiter).sort({"notedDate": -1}).limit(10);
        return result;
    }
}


