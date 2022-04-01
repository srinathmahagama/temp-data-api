import { DevicePosition } from "../enum/device-installed-position.enum";

export class TemperatureSensorLoadDto {
sensorId: string;
roomId: number;
startDate: Date;
endDate: Date;
temperature: number;
position: DevicePosition
}