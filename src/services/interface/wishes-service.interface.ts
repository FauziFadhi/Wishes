export interface generateSendDateOptions {
  hour?: number;
  year?: number;
  date?: number;
  minute?: number;
  month?: number;
}

export interface GenerateSendDateDTO {
  timezone: string;
  referenceDate: string | Date;
}
