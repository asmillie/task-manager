import { IsNotEmpty, IsOptional, IsEmpty } from 'class-validator';

export class CreateTaskDto {

    @IsEmpty()
    private _owner: string;

    @IsNotEmpty({ message: 'Description is required' })
    readonly description: string;

    @IsOptional()
    readonly completed?: boolean;

    constructor(owner: string = '', description: string, completed?: boolean) {
        this._owner = owner;
        this.description = description;
        if (completed !== undefined) {
            this.completed = completed;
        }
    }

    get owner(): string {
        return this._owner;
    }

    set owner(owner: string) {
        this._owner = owner;
    }
}
