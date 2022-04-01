import { DevicePosition } from "../enum/device-installed-position.enum";

export class temperatureSensorCreateDto {
    roomId: number;
    temperature: number
    devicePosition: DevicePosition
}