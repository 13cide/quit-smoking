import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateChallengeDto {

    @IsNumber()
    @IsNotEmpty()
    initiatorId: number;

    @IsNumber()
    @IsNotEmpty()
    opponentId: number;

    @IsEnum(['ACTIVE', 'PENDING', 'ENDED'])
    @IsNotEmpty()
    status: 'ACTIVE' | 'PENDING' | 'ENDED'

    @IsString()
    @IsNotEmpty()
    startDate: string;

    @IsString()
    @IsNotEmpty()
    endDate: string;
}