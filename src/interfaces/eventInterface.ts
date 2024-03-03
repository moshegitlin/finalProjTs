interface EventInterface {
    setDataAndTime(time: string,date:string): void;
    setEquipment(equipment: string): void;
    getTime(): string;
    getDate(): string;
    getDataAndTime():string;

}
export default EventInterface;
